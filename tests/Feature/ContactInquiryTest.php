<?php

namespace Tests\Feature;

use App\Notifications\ContactInquiryReceived;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Queue;
use Inertia\Testing\AssertableInertia as Assert;
use RuntimeException;
use Tests\TestCase;

class ContactInquiryTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Every request in this suite must work without a database connection.
        config([
            'database.default' => 'unavailable',
            'database.connections.unavailable' => ['driver' => 'unavailable'],
            'kairu.email' => 'contacto@example.com',
            'kairu.whatsapp' => '',
        ]);
        Notification::fake();
        Queue::fake();
    }

    /** @return array<string, string> */
    private function inquiry(): array
    {
        return [
            'name' => 'Persona de prueba',
            'company' => 'Empresa de prueba',
            'email' => 'consulta@example.com',
            'whatsapp' => '+51 999 000 000',
            'service' => 'Sistema empresarial',
            'message' => 'Quiero simplificar la gestión de mis pedidos.',
            'website' => '',
        ];
    }

    public function test_landing_exposes_configured_contact_and_seo_without_a_database(): void
    {
        config(['kairu.whatsapp' => '51999000000']);

        $this->get(route('home'))->assertOk()
            ->assertSee('Kairu | Desarrollo de software en Perú')
            ->assertSee('property="og:image"', false)
            ->assertSee('name="csrf-token"', false)
            ->assertInertia(fn (Assert $page) => $page->component('welcome')
                ->where('contact.email', 'contacto@example.com')
                ->where('contact.whatsapp', '51999000000'));
    }

    public function test_projects_page_is_public_and_has_its_own_canonical_without_a_database(): void
    {
        $this->get(route('projects'))->assertOk()
            ->assertSee('Proyectos y demos | Kairu')
            ->assertSee(config('kairu.url').'/proyectos', false)
            ->assertInertia(fn (Assert $page) => $page->component('projects')
                ->where('contact.email', 'contacto@example.com'));
        $this->get(route('sitemap'))->assertOk()
            ->assertSee(config('kairu.url').'/proyectos', false);
    }

    public function test_whatsapp_requires_between_seven_and_fifteen_digits_when_provided(): void
    {
        foreach (['+++', '123456', '1234567890123456', '51abc999999999'] as $phone) {
            $this->postJson(route('contact.store'), [...$this->inquiry(), 'whatsapp' => $phone])
                ->assertUnprocessable()->assertJsonValidationErrors('whatsapp');
        }
        Notification::assertNothingSent();
    }

    public function test_missing_destination_does_not_report_a_successful_send(): void
    {
        config(['kairu.email' => '']);
        $this->postJson(route('contact.store'), $this->inquiry())->assertStatus(503)
            ->assertJson(['message' => 'No pudimos enviar el mensaje. Intenta nuevamente.']);
        Notification::assertNothingSent();
        Queue::assertNothingPushed();
    }

    public function test_company_and_whatsapp_are_optional(): void
    {
        $this->postJson(route('contact.store'), array_diff_key($this->inquiry(), ['company' => true, 'whatsapp' => true]))->assertOk();
        Notification::assertSentOnDemand(ContactInquiryReceived::class,
            fn (ContactInquiryReceived $notification) => $notification->company === '' && $notification->whatsapp === '');
    }

    public function test_sends_directly_to_configured_address_without_a_queue(): void
    {
        $this->postJson(route('contact.store'), $this->inquiry())->assertOk()
            ->assertJson(['message' => 'Mensaje enviado correctamente.']);

        Notification::assertSentOnDemand(ContactInquiryReceived::class,
            fn (ContactInquiryReceived $notification, array $channels, AnonymousNotifiable $notifiable) => $notifiable->routes['mail'] === 'contacto@example.com'
                && $channels === ['mail']
                && $notification->email === 'consulta@example.com'
                && $notification->message === $this->inquiry()['message']);
        Queue::assertNothingPushed();
    }

    public function test_mail_failure_returns_an_error_instead_of_success(): void
    {
        Notification::shouldReceive('sendNow')->once()->andThrow(new RuntimeException('SMTP unavailable'));
        $this->postJson(route('contact.store'), $this->inquiry())->assertStatus(503)
            ->assertJson(['message' => 'No pudimos enviar el mensaje. Intenta nuevamente.']);
        Queue::assertNothingPushed();
    }

    public function test_invalid_fields_are_rejected_without_sending(): void
    {
        $this->postJson(route('contact.store'), ['name' => 'A', 'email' => 'invalid', 'service' => 'Unknown', 'message' => 'Short', 'whatsapp' => 'not-a-number'])
            ->assertUnprocessable()->assertJsonValidationErrors(['name', 'email', 'service', 'message', 'whatsapp']);
        Notification::assertNothingSent();
    }

    public function test_honeypot_rejects_automated_submissions(): void
    {
        $this->postJson(route('contact.store'), [...$this->inquiry(), 'website' => 'https://spam.example'])
            ->assertUnprocessable()->assertJsonValidationErrors('website');
        Notification::assertNothingSent();
    }

    public function test_rate_limit_stops_repeated_submissions(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson(route('contact.store'), $this->inquiry())->assertOk();
        }
        $this->postJson(route('contact.store'), $this->inquiry())->assertTooManyRequests();
        Notification::assertSentOnDemandTimes(ContactInquiryReceived::class, 5);
    }

    public function test_public_routes_do_not_query_a_preexisting_login_session(): void
    {
        $this->withSession([Auth::guard('web')->getName() => 123]);
        $this->get(route('home'))->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('auth.user', null));
        $this->get(route('sitemap'))->assertOk();
        $this->get(route('robots'))->assertOk();
        $this->postJson(route('contact.store'), $this->inquiry())->assertOk();
    }

    public function test_sitemap_and_robots_use_the_configured_public_url(): void
    {
        config(['kairu.url' => 'https://kairu.example']);
        $this->get(route('sitemap'))->assertOk()->assertHeader('Content-Type', 'application/xml')
            ->assertSee('<loc>https://kairu.example/</loc>', false);
        $this->get(route('robots'))->assertOk()->assertSee('Sitemap: https://kairu.example/sitemap.xml');
    }

    public function test_email_contains_the_message_and_reply_to_address(): void
    {
        $notification = new ContactInquiryReceived('Nombre', 'consulta@example.com', 'Desarrollo web', 'Mensaje de ejemplo.');
        $mail = $notification->toMail(new AnonymousNotifiable);
        $this->assertSame([['consulta@example.com', 'Nombre']], $mail->replyTo);
        $text = view('mail.contact-inquiry-text', $mail->viewData)->render();
        $this->assertStringContainsString('Mensaje de ejemplo.', $text);
        $this->assertStringNotContainsString('Empresa:', $text);
        $this->assertStringNotContainsString('WhatsApp:', $text);
    }
}

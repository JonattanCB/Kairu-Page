<?php

namespace Tests\Feature;

use App\Notifications\ContactInquiryReceived;
use Illuminate\Mail\Message;
use Symfony\Component\Mime\Email;
use Tests\TestCase;

class ContactEmailTemplateTest extends TestCase
{
    public function test_email_embeds_brand_and_escapes_inquiry_while_linking_contact_details(): void
    {
        $notification = new ContactInquiryReceived('Ana <script>', 'ana@example.com', 'Desarrollo web', "Primera línea\n<script>alert(1)</script>", 'Empresa', '+51 999 123 456');
        $mail = $notification->toMail(new \stdClass);
        $email = new Email;
        $html = view('mail.contact-inquiry', [...$mail->viewData, 'message' => new Message($email)])->render();
        $this->assertStringContainsString('cid:', $html);
        $this->assertCount(1, $email->getAttachments());
        $this->assertStringContainsString('https://wa.me/51999123456', $html);
        $this->assertStringContainsString('mailto:ana@example.com?subject=', $html);
        $this->assertStringContainsString('&lt;script&gt;', $html);
        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringNotContainsString('Laravel', $html);
        $this->assertSame('ana@example.com', $mail->replyTo[0][0]);
        $this->assertStringContainsString('Desarrollo web', $mail->subject);
    }

    public function test_local_peruvian_mobile_is_normalized_and_international_prefix_is_preserved(): void
    {
        foreach (['999 123 456' => '51999123456', '+34 612 345 678' => '34612345678'] as $phone => $digits) {
            $mail = (new ContactInquiryReceived('Ana', 'ana@example.com', 'Otro', 'Consulta de prueba', whatsapp: $phone))->toMail(new \stdClass);
            $this->assertSame('https://wa.me/'.$digits, $mail->viewData['whatsappUrl']);
        }
    }

    public function test_optional_details_are_omitted_and_plain_text_is_available(): void
    {
        $mail = (new ContactInquiryReceived('Ana', 'ana@example.com', 'Otro', 'Consulta de prueba'))->toMail(new \stdClass);
        $data = [...$mail->viewData, 'message' => new Message(new Email)];
        $html = view('mail.contact-inquiry', $data)->render();
        $this->assertStringNotContainsString('wa.me', $html);
        $this->assertStringNotContainsString('Abrir WhatsApp', $html);
        $text = view('mail.contact-inquiry-text', $mail->viewData)->render();
        $this->assertStringContainsString('Consulta de prueba', $text);
        $this->assertStringContainsString('ana@example.com', $text);
    }
}

<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactInquiryReceived extends Notification
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $service,
        public readonly string $message,
        public readonly string $company = '',
        public readonly string $whatsapp = '',
    ) {}

    /** @return array<string> */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $digits = preg_replace('/\D/', '', $this->whatsapp) ?? '';
        // A Peruvian mobile may be entered locally; international numbers keep their prefix.
        if (preg_match('/^9\d{8}$/', $digits)) {
            $digits = '51'.$digits;
        }
        $whatsappUrl = $digits !== '' ? 'https://wa.me/'.$digits : null;
        $data = [
            'inquiry' => $this,
            'whatsappUrl' => $whatsappUrl,
            'replyUrl' => 'mailto:'.$this->email.'?subject='.rawurlencode('Re: Tu consulta sobre '.$this->service),
            'siteUrl' => config('kairu.url'),
        ];

        return (new MailMessage)
            ->subject('Nueva consulta · '.$this->service.' | Kairu')
            ->replyTo($this->email, $this->name)
            ->view(['html' => 'mail.contact-inquiry', 'text' => 'mail.contact-inquiry-text'], $data);
    }
}

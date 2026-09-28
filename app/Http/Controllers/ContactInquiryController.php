<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactInquiryRequest;
use App\Notifications\ContactInquiryReceived;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;
use Throwable;

class ContactInquiryController extends Controller
{
    public function __invoke(ContactInquiryRequest $request): JsonResponse
    {
        $email = config('kairu.email');

        if (! is_string($email) || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'No pudimos enviar el mensaje. Intenta nuevamente.'], 503);
        }

        try {
            Notification::route('mail', $email)->notifyNow(new ContactInquiryReceived(
                name: $request->string('name')->toString(),
                email: $request->string('email')->toString(),
                service: $request->string('service')->toString(),
                message: $request->string('message')->toString(),
                company: $request->string('company')->toString(),
                whatsapp: $request->string('whatsapp')->toString(),
            ));
        } catch (Throwable $exception) {
            report($exception);

            return response()->json(['message' => 'No pudimos enviar el mensaje. Intenta nuevamente.'], 503);
        }

        return response()->json(['message' => 'Mensaje enviado correctamente.']);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContactInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'company' => ['nullable', 'string', 'max:160'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:30', 'regex:/^(?=(?:\D*\d){7,15}\D*$)\+?[\d\s().-]+$/'],
            'service' => ['required', Rule::in(['Sistema empresarial', 'Desarrollo web', 'Aplicación móvil', 'Software a medida', 'Automatización', 'Otro'])],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'website' => ['nullable', 'string', 'max:0'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required' => 'Cuéntanos cómo te llamas.',
            'name.min' => 'Escribe al menos 2 caracteres.',
            'name.max' => 'Usa un máximo de 120 caracteres.',
            'company.max' => 'Usa un máximo de 160 caracteres.',
            'email.required' => 'Ingresa tu correo electrónico.',
            'email.email' => 'Ingresa un correo válido.',
            'email.max' => 'Usa un máximo de 255 caracteres.',
            'whatsapp.regex' => 'Usa entre 7 y 15 dígitos; puedes incluir +, espacios o guiones.',
            'whatsapp.max' => 'Usa un máximo de 30 caracteres.',
            'service.required' => 'Selecciona el tipo de solución que necesitas.',
            'service.in' => 'Selecciona una opción de la lista.',
            'message.required' => 'Cuéntanos un poco sobre lo que necesitas.',
            'message.min' => 'Escribe al menos 10 caracteres.',
            'message.max' => 'Usa un máximo de 5000 caracteres.',
            'website.max' => 'No pudimos enviar el mensaje. Intenta nuevamente.',
        ];
    }
}

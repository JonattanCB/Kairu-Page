KAIRU — NUEVA CONSULTA

Nombre: {{ $inquiry->name }}
@if($inquiry->company !== '')
Empresa: {{ $inquiry->company }}
@endif
Correo: {{ $inquiry->email }}
@if($whatsappUrl)
WhatsApp: {{ $inquiry->whatsapp }}
Abrir WhatsApp: {{ $whatsappUrl }}
@endif
Servicio: {{ $inquiry->service }}

LO QUE NECESITA
{{ $inquiry->message }}

Responder por correo: {{ $replyUrl }}
También puedes usar «Responder» para contactar directamente con la persona.

Kairu · Chimbote, Áncash, Perú.
{{ $siteUrl }}

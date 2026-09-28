<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>Nueva consulta | Kairu</title>
    <style>
        @media only screen and (max-width: 480px) {
            .mail-outer { padding: 20px 12px !important; }
            .mail-content { padding-left: 20px !important; padding-right: 20px !important; }
            .mail-title { font-size: 28px !important; }
            .mail-action { display: block !important; margin: 0 0 12px !important; text-align: center !important; }
        }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#fafbf9;font-family:Arial,Helvetica,sans-serif;color:#181d19;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">{{ $inquiry->name }} quiere conversar sobre {{ $inquiry->service }}.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafbf9;">
        <tr><td align="center" class="mail-outer" style="padding:40px 16px;">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
                <tr><td align="center" style="padding:0 0 28px;">
                    <a href="{{ $siteUrl }}" style="text-decoration:none;color:#181d19;">
                        <img src="{{ $message->embed(public_path('brand/icon-192.png')) }}" alt="Kairu" width="40" height="40" style="display:inline-block;vertical-align:middle;border:0;border-radius:8px;">
                        <span style="display:inline-block;vertical-align:middle;font-size:28px;font-weight:700;letter-spacing:-1px;padding-left:8px;">kairu<span style="color:#2854ff;">.</span></span>
                    </a>
                </td></tr>
                <tr><td style="background-color:#ffffff;border:1px solid #dce5f7;border-radius:24px;overflow:hidden;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr><td class="mail-content" align="center" style="padding:36px 32px 28px;background-color:#f4f6ff;background-image:linear-gradient(#e6ecff 1px,transparent 1px),linear-gradient(90deg,#e6ecff 1px,transparent 1px);background-size:28px 28px;border-radius:24px 24px 0 0;border-bottom:1px solid #dce5f7;">
                            <p style="margin:0 0 12px;color:#2854ff;font-size:12px;font-weight:700;">Un nuevo proyecto empieza con una conversación</p>
                            <h1 class="mail-title" style="margin:0 0 16px;font-size:34px;font-weight:600;line-height:1.15;letter-spacing:-1.2px;">Tienes una nueva consulta.</h1>
                            <p style="margin:0;color:#62708b;font-size:14px;line-height:1.7;">{{ $inquiry->name }} te escribió desde el formulario de Kairu.</p>
                        </td></tr>
                        <tr><td class="mail-content" style="padding:20px 32px 28px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.7;">
                                <tr><td style="padding:12px 0;border-bottom:1px solid #edf1f7;color:#62708b;width:90px;vertical-align:top;">Nombre</td><td style="padding:12px 0;border-bottom:1px solid #edf1f7;word-break:break-word;">{{ $inquiry->name }}</td></tr>
                                @if($inquiry->company !== '')
                                <tr><td style="padding:12px 0;border-bottom:1px solid #edf1f7;color:#62708b;vertical-align:top;">Empresa</td><td style="padding:12px 0;border-bottom:1px solid #edf1f7;word-break:break-word;">{{ $inquiry->company }}</td></tr>
                                @endif
                                <tr><td style="padding:12px 0;border-bottom:1px solid #edf1f7;color:#62708b;vertical-align:top;">Correo</td><td style="padding:12px 0;border-bottom:1px solid #edf1f7;word-break:break-word;"><a href="{{ $replyUrl }}" style="color:#2854ff;text-decoration:underline;">{{ $inquiry->email }}</a></td></tr>
                                @if($whatsappUrl)
                                <tr><td style="padding:12px 0;border-bottom:1px solid #edf1f7;color:#62708b;vertical-align:top;">WhatsApp</td><td style="padding:12px 0;border-bottom:1px solid #edf1f7;"><a href="{{ $whatsappUrl }}" style="color:#2854ff;text-decoration:underline;">{{ $inquiry->whatsapp }}</a></td></tr>
                                @endif
                                <tr><td style="padding:12px 0;color:#62708b;vertical-align:top;">Servicio</td><td style="padding:12px 0;font-weight:700;">{{ $inquiry->service }}</td></tr>
                            </table>
                        </td></tr>
                        <tr><td class="mail-content" style="padding:0 32px 32px;">
                            <h2 style="margin:0 0 12px;font-size:14px;">Lo que necesita</h2>
                            <div style="background-color:#fafbf9;border:1px solid #dce5f7;border-radius:16px;padding:18px;font-size:14px;line-height:1.8;word-break:break-word;">{!! nl2br(e($inquiry->message)) !!}</div>
                        </td></tr>
                        <tr><td class="mail-content" style="padding:0 32px 32px;">
                            <a class="mail-action" href="{{ $replyUrl }}" style="display:inline-block;background-color:#2854ff;border:1px solid #2854ff;border-radius:24px;color:#ffffff;text-decoration:none;padding:13px 22px;font-size:13px;font-weight:600;margin:0 8px 10px 0;">Responder por correo</a>
                            @if($whatsappUrl)
                            <a class="mail-action" href="{{ $whatsappUrl }}" style="display:inline-block;background-color:#f2f5ff;border:1px solid #c8d6ff;border-radius:24px;color:#2854ff;text-decoration:none;padding:13px 22px;font-size:13px;font-weight:600;margin-bottom:10px;">Abrir WhatsApp</a>
                            @endif
                            <p style="margin:8px 0 0;font-size:12px;line-height:1.7;color:#62708b;">También puedes usar «Responder» en tu correo: la respuesta irá directamente a {{ $inquiry->name }}.</p>
                        </td></tr>
                    </table>
                </td></tr>
                <tr><td style="padding:28px 12px;text-align:center;background-color:#fafbf9;font-size:12px;line-height:1.8;color:#718099;">Kairu · Software pensado para hacer el trabajo más simple.<br>Chimbote, Áncash, Perú.<br><a href="{{ $siteUrl }}" style="color:#2854ff;text-decoration:none;">Visitar Kairu</a></td></tr>
            </table>
        </td></tr>
    </table>
</body>
</html>

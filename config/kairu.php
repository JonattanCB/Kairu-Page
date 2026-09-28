<?php

$url = env('KAIRU_URL', env('APP_URL', 'http://localhost'));
$whatsapp = env('KAIRU_WHATSAPP', '');

return [
    'name' => 'Kairu',
    'url' => is_string($url) ? rtrim($url, '/') : 'http://localhost',
    'email' => env('KAIRU_CONTACT_EMAIL', ''),
    'whatsapp' => is_string($whatsapp) ? preg_replace('/\D/', '', $whatsapp) : '',
    'socials' => [
        'Instagram' => env('KAIRU_INSTAGRAM', ''),
        'Facebook' => env('KAIRU_FACEBOOK', ''),
        'TikTok' => env('KAIRU_TIKTOK', ''),
        'LinkedIn' => env('KAIRU_LINKEDIN', ''),
    ],
];

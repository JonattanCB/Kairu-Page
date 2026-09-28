@php($isProjects = ($page['component'] ?? '') === 'projects')
@php($isLanding = in_array($page['component'] ?? '', ['welcome', 'projects']))
@php($publicPath = $isProjects ? '/proyectos' : '/')
@php($publicTitle = $isProjects ? 'Proyectos y demos | Kairu' : 'Kairu | Desarrollo de software en Perú')
<!DOCTYPE html>
<html lang="{{ $isLanding ? 'es-PE' : str_replace('_', '-', app()->getLocale()) }}" @if($isLanding) data-kairu="true" @endif @class(['dark' => ! $isLanding && ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#245BFF">
        @if($isLanding)
            <meta name="description" content="Creamos sistemas, aplicaciones y soluciones digitales que simplifican la forma de trabajar de tu negocio.">
            <link rel="canonical" href="{{ config('kairu.url') }}{{ $publicPath }}">
            <meta property="og:type" content="website">
            <meta property="og:locale" content="es_PE">
            <meta property="og:site_name" content="Kairu">
            <meta property="og:title" content="{{ $publicTitle }}">
            <meta property="og:description" content="Creamos sistemas, aplicaciones y soluciones digitales que simplifican la forma de trabajar de tu negocio.">
            <meta property="og:url" content="{{ config('kairu.url') }}{{ $publicPath }}">
            <meta property="og:image" content="{{ config('kairu.url') }}/brand/kairu-og.png">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="630">
            <meta property="og:image:alt" content="Kairu. Software que hace el trabajo más simple.">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="{{ $publicTitle }}">
            <meta name="twitter:description" content="Creamos sistemas, aplicaciones y soluciones digitales que simplifican la forma de trabajar de tu negocio.">
            <meta name="twitter:image" content="{{ config('kairu.url') }}/brand/kairu-og.png">
            <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
        @endif

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                if (document.documentElement.dataset.kairu) return;
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $isLanding ? $publicTitle : config('app.name', 'Kairu') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>

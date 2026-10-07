<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __invoke(Request $request, ?string $demo = null): Response
    {
        if ($request->routeIs('projects.demo') || $demo !== null) {
            if (! in_array($demo, ['escuela', 'terapiq'], true)) {
                abort(404);
            }

            return Inertia::render($demo === 'escuela' ? 'demos/escuela' : 'demos/terapiq', [
                'contact' => $this->contactConfig(),
            ]);
        }

        return Inertia::render($request->routeIs('projects') ? 'projects' : 'welcome', [
            'contact' => $this->contactConfig(),
        ]);
    }

    private function contactConfig(): array
    {
        return [
            'email' => config('kairu.email'),
            'whatsapp' => config('kairu.whatsapp'),
            'socials' => array_filter(config('kairu.socials')),
        ];
    }
}

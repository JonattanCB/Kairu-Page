<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render($request->routeIs('projects') ? 'projects' : 'welcome', [
            'contact' => [
                'email' => config('kairu.email'),
                'whatsapp' => config('kairu.whatsapp'),
                'socials' => array_filter(config('kairu.socials')),
            ],
        ]);
    }
}

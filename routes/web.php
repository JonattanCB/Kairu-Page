<?php

use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use App\Http\Middleware\SetTeamUrlDefaults;
use Illuminate\Support\Facades\Route;

Route::withoutMiddleware(SetTeamUrlDefaults::class)->group(function () {
    Route::get('/', LandingController::class)->name('home');
    Route::get('/proyectos', LandingController::class)->name('projects');
    Route::get('/proyectos/{demo}', LandingController::class)->name('projects.demo');
    Route::post('/contacto', ContactInquiryController::class)->middleware('throttle:contact')->name('contact.store');
    Route::get('/sitemap.xml', function () {
        return response()->view('sitemap', ['url' => config('kairu.url')])->header('Content-Type', 'application/xml');
    })->name('sitemap');
    Route::get('/robots.txt', function () {
        return response("User-agent: *\nAllow: /\nSitemap: ".config('kairu.url')."/sitemap.xml\n")
            ->header('Content-Type', 'text/plain');
    })->name('robots');
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';

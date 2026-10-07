<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_a_successful_response(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk();
    }

    public function test_projects_and_full_screen_demos_return_successful_responses(): void
    {
        $this->get(route('projects'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('projects'));

        $this->get(route('projects.demo', 'escuela'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('demos/escuela'));

        $this->get(route('projects.demo', 'terapiq'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('demos/terapiq'));

        $this->get(route('projects.demo', 'inexistente'))
            ->assertNotFound();
    }
}

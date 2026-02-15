<?php

declare(strict_types=1);

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', fn () => Inertia::render('welcome', [
    'canRegister' => Features::enabled(Features::registration()),
]))->name('home');

require __DIR__.'/settings.php';

Route::middleware(['auth', 'admin'])->group(function (): void {

    Route::get('dashboard', fn () => Inertia::render('dashboard'))
        ->name('dashboard');

    Route::resource('courses', CourseController::class);
});

Route::middleware(['auth'])->group(function (): void {

    Route::get('main', fn () => Inertia::render('main'))
        ->name('main');
});

<?php

declare(strict_types=1);

use App\Http\Controllers\BatchController;
use App\Http\Controllers\BatchCourseController;
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

    Route::resource('courses/{course}/batches', BatchCourseController::class)
        ->only(['create', 'store']);

    Route::resource('batches', BatchController::class)
        ->only(['show']);

    Route::resource('courses', CourseController::class)
        ->only(['index', 'create', 'store', 'show', 'edit', 'update']);
});

Route::middleware(['auth'])->group(function (): void {

    Route::get('main', fn () => Inertia::render('main'))
        ->name('main');
});

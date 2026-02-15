<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse;

final class CustomRegisterResponse implements RegisterResponse
{
    public function toResponse($request): RedirectResponse
    {
        return redirect(route('main'));
    }
}

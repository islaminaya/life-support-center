<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse;

final class CustomLoginResponse implements LoginResponse
{
    public function toResponse($request): RedirectResponse
    {

        if ($request->user()?->is_admin) {
            return redirect(route('dashboard'));
        }

        return redirect(route('main'));
    }
}

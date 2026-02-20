<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

final class UserData extends Data
{
    public function __construct(
        public Optional|int $id,
        public string $name,
        public string $email,
    ) {}
}

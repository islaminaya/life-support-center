<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

final class CourseData extends Data
{
    public function __construct(
        public Optional|string $id,

        public Optional|string|null $name,

        public Optional|string|null $image_url,

        public string $visibility,

        public Optional|int|null $created_by,

        public Optional|int|null $updated_by,

        /** @var array<BatchData>|Optional|Lazy */
        public Lazy|Optional|array $batches,

        /** @var Lazy|Optional|array<UserData> */
        public Lazy|Optional|array $users
    ) {}
}

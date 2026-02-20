<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

final class BatchData extends Data
{
    public function __construct(
        public Optional|int $id,
        public int $course_id,
        public Optional|string $name,
        public string $start_date,
        public string $start_time,
        public string $end_time,
        public string $visibility,
        public Optional|Lazy|CourseData $course,
        /** @var UserData[] $users */
        public Optional|Lazy|array $users,
    ) {}
}

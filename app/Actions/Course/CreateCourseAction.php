<?php

declare(strict_types=1);

namespace App\Actions\Course;

use App\Data\CourseData;
use App\Models\Course;

final readonly class CreateCourseAction
{
    /**
     * Execute the action.
     */
    public function handle(CourseData $data): Course
    {
        /** @var array<string, mixed> $attributes */
        $attributes = $data->toArray();

        return Course::query()->create($attributes);
    }
}

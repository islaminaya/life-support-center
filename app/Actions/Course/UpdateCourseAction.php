<?php

declare(strict_types=1);

namespace App\Actions\Course;

use App\Data\CourseData;
use App\Models\Course;

final readonly class UpdateCourseAction
{
    /**
     * Execute the action.
     */
    public function handle(Course $course, CourseData $data): Course
    {
        /** @var array<string, mixed> $attributes */
        $attributes = $data->toArray();

        $course->update($attributes);

        return $course;
    }
}

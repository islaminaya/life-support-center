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
        $course->update(
            array_merge($data->toArray(),
                ['updated_by' => auth()->id()])
        );

        return $course;
    }
}

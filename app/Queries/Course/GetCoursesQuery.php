<?php

declare(strict_types=1);

namespace App\Queries\Course;

use App\Http\Resources\CourseResource;
use App\Models\Course;

final class GetCoursesQuery
{
    public function handle(Course $course): CourseResource
    {
        return CourseResource::make($course);
    }
}

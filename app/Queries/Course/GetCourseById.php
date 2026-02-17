<?php

declare(strict_types=1);

namespace App\Queries\Course;

use App\Models\Course;

final class GetCourseById
{
    public function handle(int $id): Course
    {
        return Course::query()->findOrFail($id);
    }
}

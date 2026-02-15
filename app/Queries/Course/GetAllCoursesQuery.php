<?php

declare(strict_types=1);

namespace App\Queries\Course;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Resources\Json\JsonResource;

final class GetAllCoursesQuery
{
    public function handle(): JsonResource
    {
        return CourseResource::collection(Course::query()->latest()->get());
    }
}

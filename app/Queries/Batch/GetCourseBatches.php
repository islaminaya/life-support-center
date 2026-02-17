<?php

declare(strict_types=1);

namespace App\Queries\Batch;

use App\Models\Batch;
use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;

final class GetCourseBatches
{
    /**
     * @return Collection<int, Batch>
     */
    public function __invoke(Course $course): Collection
    {
        return $course->batches()->get();
    }
}

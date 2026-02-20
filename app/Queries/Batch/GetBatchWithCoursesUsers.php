<?php

declare(strict_types=1);

namespace App\Queries\Batch;

use App\Models\Batch;

final class GetBatchWithCoursesUsers
{
    public function handle(Batch $batch): Batch
    {
        return $batch->load(['users', 'course']);
    }
}

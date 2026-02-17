<?php

declare(strict_types=1);

namespace App\Actions\Batch;

use App\Data\BatchData;
use App\Models\Course;

final readonly class StoreBatchAction
{
    /**
     * Execute the action.
     */
    public function handle(Course $course, BatchData $data): void
    {
        /** @var array<string, mixed> $attributes */
        $attributes = $data->toArray();

        $attributes['name'] = \Illuminate\Support\Str::slug($course->name).time();

        $course->batches()->create($attributes);
    }
}

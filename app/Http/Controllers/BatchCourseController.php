<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Batch\StoreBatchAction;
use App\Data\BatchData;
use App\Http\Requests\StoreBatchRequest;
use App\Models\Batch;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

final class BatchCourseController extends Controller
{
    public function store(StoreBatchRequest $request, Course $course, StoreBatchAction $action): RedirectResponse
    {
        Gate::authorize('create', Batch::class);

        $action->handle($course, BatchData::from($request));

        return to_route('courses.show', $course->id)
            ->with(['success' => 'Batch saved successfully']);
    }

    public function create(Course $course): Response
    {
        Gate::authorize('create', Batch::class);

        return inertia('batches/create', [
            'course' => $course,
        ]);
    }
}

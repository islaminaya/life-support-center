<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Batch\StoreBatchAction;
use App\Data\BatchData;
use App\Http\Requests\StoreBatchRequest;
use App\Queries\Course\GetCourseById;
use Illuminate\Http\RedirectResponse;

final class BatchCourseController extends Controller
{
    public function store(StoreBatchRequest $request, StoreBatchAction $action): RedirectResponse
    {
        $course = (new GetCourseById())->handle($request->integer('course_id'));

        $action->handle($course, BatchData::from($request));

        return to_route('courses.show', $course->id)
            ->with(['success' => 'Batch saved successfully']);
    }
}

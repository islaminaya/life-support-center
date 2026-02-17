<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Course\CreateCourseAction;
use App\Actions\Course\UpdateCourseAction;
use App\Data\CourseData;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Queries\Course\GetAllCoursesQuery;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

final class CourseController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(GetAllCoursesQuery $query): Response
    {
        $this->authorize('viewAny', Course::class);

        return inertia('courses/index', [
            'courses' => $query->handle(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Course::class);

        return inertia('courses/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request, CreateCourseAction $action): RedirectResponse
    {
        $this->authorize('create', Course::class);

        $data = $request->validated();

        $data['created_by'] = auth()->id();

        $action->handle(CourseData::from($data));

        return to_route('courses.index')->with(['success' => 'Course saved successfully']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course): Response
    {
        $this->authorize('view', $course);

        $course->load('batches');

        return inertia('courses/show', [
            'course' => CourseData::from($course),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course): Response
    {
        $this->authorize('update', $course);

        return inertia('courses/edit', [
            'course' => $course,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course, UpdateCourseAction $action): RedirectResponse
    {
        $this->authorize('update', $course);

        $data = $request->validated();

        $data['updated_by'] = auth()->id();

        $action->handle($course, CourseData::from($data));

        return to_route('courses.index')->with(['success' => 'Course Updated successfully']);

    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\BatchData;
use App\Models\Batch;
use App\Queries\Batch\GetBatchWithCoursesUsers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

final class BatchController extends Controller
{
    use AuthorizesRequests;

    public function show(Batch $batch, GetBatchWithCoursesUsers $query): Response
    {
        Gate::authorize('view', Batch::class);

        return inertia('batches/show', [
            'batch' => BatchData::from($query->handle($batch)),
        ]);
    }
}

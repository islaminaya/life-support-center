<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Batch;
use Illuminate\Database\Seeder;

final class BatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Batch::factory(100)->create();
    }
}

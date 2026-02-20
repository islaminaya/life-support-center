<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enum\Visibility;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use function sprintf;

final class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            'HSFA CPR AED',
            'PALS',
            'NRP',
            'ACLS',
            'BLS',
        ];

        foreach ($courses as $key => $value) {
            Course::query()->create([
                'id' => Str::uuid(),
                'name' => $value,
                'image_url' => sprintf('https://picsum.photos/200/300?random=%d', $key),
                'visibility' => Visibility::PUBLIC,
            ]);
        }
    }
}

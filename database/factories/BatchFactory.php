<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enum\Visibility;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Batch>
 */
final class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /** @var Course $course */
        $course = Course::query()->inRandomOrder()->first();

        return [
            'course_id' => $course->id,
            'name' => fake()->unique()->word().time(),
            'start_date' => fake()->dateTimeBetween('-1 week', '+1 week')->format('Y-m-d'),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'visibility' => fake()->randomElement(Visibility::cases()),
        ];
    }
}

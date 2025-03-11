<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'creator_id' => User::factory(),
            'token_cost' => fake()->numberBetween(10, 100),
            'content_type' => fake()->randomElement(['text', 'video', 'audio', 'book']),
            'content_path' => fake()->optional()->url(),
            'language' => fake()->randomElement(['ar', 'fr', 'en']),
        ];
    }

    public function freeLesson(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_cost' => 0,
        ]);
    }

    public function premiumLesson(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_cost' => fake()->numberBetween(100, 500),
        ]);
    }
}
<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'creator_id' => User::factory(),
            'token_cost' => fake()->randomFloat(2, 5, 100),
            'content_type' => fake()->randomElement(['text', 'video', 'audio', 'book']),
            'content_path' => fake()->optional()->url(),
            'language' => fake()->randomElement(['ar', 'fr', 'en'])
        ];
    }

    public function withCreator(User $creator): static
    {
        return $this->state(fn (array $attributes) => [
            'creator_id' => $creator->id,
        ]);
    }

    public function freeLesson(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_cost' => 0,
        ]);
    }
}
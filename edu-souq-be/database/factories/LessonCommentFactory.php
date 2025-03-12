<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonCommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'lesson_id' => Lesson::factory(),
            'comment_text' => fake()->paragraph()
        ];
    }

    public function forLesson(Lesson $lesson): static
    {
        return $this->state(fn (array $attributes) => [
            'lesson_id' => $lesson->id,
        ]);
    }

    public function byUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }
}
<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_id' => User::factory(),
            'teacher_id' => User::factory(),
            'lesson_id' => Lesson::factory(),
            'token_amount' => fake()->randomFloat(2, 5, 100)
        ];
    }

    public function forStudent(User $student): static
    {
        return $this->state(fn (array $attributes) => [
            'student_id' => $student->id,
        ]);
    }

    public function forTeacher(User $teacher): static
    {
        return $this->state(fn (array $attributes) => [
            'teacher_id' => $teacher->id,
        ]);
    }

    public function forLesson(Lesson $lesson): static
    {
        return $this->state(fn (array $attributes) => [
            'lesson_id' => $lesson->id,
            'token_amount' => $lesson->token_cost
        ]);
    }
}
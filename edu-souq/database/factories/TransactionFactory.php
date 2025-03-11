<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'student_id' => User::factory(),
            'teacher_id' => User::factory(),
            'lesson_id' => Lesson::factory(),
            'token_amount' => fake()->numberBetween(10, 500),
        ];
    }

    public function smallTransaction(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_amount' => fake()->numberBetween(1, 50),
        ]);
    }

    public function largeTransaction(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_amount' => fake()->numberBetween(500, 1000),
        ]);
    }
}
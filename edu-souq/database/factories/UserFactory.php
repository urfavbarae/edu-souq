<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'language' => fake()->randomElement(['ar', 'fr', 'en']),
            'token_balance' => fake()->numberBetween(100, 1000),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function withLowBalance(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_balance' => fake()->numberBetween(0, 100),
        ]);
    }

    public function withHighBalance(): static
    {
        return $this->state(fn (array $attributes) => [
            'token_balance' => fake()->numberBetween(1000, 5000),
        ]);
    }
}

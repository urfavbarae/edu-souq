<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lesson;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 users with a mix of token balances
        $users = User::factory(10)->create();

        // Create 20 lessons distributed among users
        $lessons = collect();
        $users->each(function ($user) use ($lessons) {
            // Each user creates 2 lessons
            $userLessons = Lesson::factory(2)
                ->sequence(
                    ['token_cost' => 0], // One free lesson
                    ['token_cost' => fake()->numberBetween(50, 200)] // One paid lesson
                )
                ->create(['creator_id' => $user->id]);
            $lessons->push(...$userLessons);
        });

        // Create transactions for paid lessons
        $paidLessons = $lessons->where('token_cost', '>', 0);
        $paidLessons->each(function ($lesson) use ($users) {
            // Generate 1-3 purchases for each paid lesson
            $numPurchases = fake()->numberBetween(1, 3);
            
            // Get random students (excluding the lesson creator)
            $potentialStudents = $users->where('id', '!=', $lesson->creator_id);
            
            for ($i = 0; $i < $numPurchases; $i++) {
                // Select a random student who hasn't purchased this lesson yet
                $student = $potentialStudents->random();
                
                // Create the transaction
                Transaction::create([
                    'student_id' => $student->id,
                    'teacher_id' => $lesson->creator_id,
                    'lesson_id' => $lesson->id,
                    'token_amount' => $lesson->token_cost,
                ]);
                
                // Update balances
                $student->decrement('token_balance', $lesson->token_cost);
                User::find($lesson->creator_id)->increment('token_balance', $lesson->token_cost);
            }
        });
    }
}

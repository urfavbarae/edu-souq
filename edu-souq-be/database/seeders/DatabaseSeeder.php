<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lesson;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@edusouq.com',
            'SQ_token' => 1000.00
        ]);

        // Create teachers with different language preferences
        $teachers = User::factory(5)->create([
            'SQ_token' => 500.00
        ]);

        // Create regular students
        $students = User::factory(20)->create([
            'SQ_token' => 100.00
        ]);

        // Create lessons by teachers
        $teachers->each(function ($teacher) {
            // Create paid lessons
            Lesson::factory(3)
                ->withCreator($teacher)
                ->create();
            
            // Create one free lesson
            Lesson::factory()
                ->withCreator($teacher)
                ->freeLesson()
                ->create();
        });

        // Create community posts with separate logic for teachers and students
        $communityUsers = $teachers->concat($students);
        $communityUsers->each(function ($user) use ($students, $teachers) {
            Post::factory(2)
                ->byUser($user)
                ->create()
                ->each(function ($post) use ($students, $teachers) {
                    // Randomly decide if comments will come from students or teachers or both
                    $potentialCommenters = rand(0, 1) ? $students : $teachers->concat($students);
                    $commenters = $potentialCommenters->random(rand(1, 3));
                    $commenters->each(function ($commenter) use ($post) {
                        $post->comments()->create([
                            'user_id' => $commenter->id,
                            'comment_text' => fake()->paragraph()
                        ]);
                    });
                });
        });


        // Create lesson comments and transactions
        $lessons = Lesson::where('token_cost', '>', 0)->get();
        $lessons->each(function ($lesson) use ($students) {
            // Add 1-5 comments to paid lessons
            $commenters = $students->random(rand(1, 5));
            $commenters->each(function ($student) use ($lesson) {
                $lesson->comments()->create([
                    'user_id' => $student->id,
                    'comment_text' => fake()->paragraph()
                ]);

                // Create transaction for the lesson
                $lesson->transactions()->create([
                    'student_id' => $student->id,
                    'teacher_id' => $lesson->creator_id,
                    'token_amount' => $lesson->token_cost
                ]);
            });
        });
    }
}

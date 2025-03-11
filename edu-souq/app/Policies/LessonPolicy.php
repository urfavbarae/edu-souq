<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Lesson;
use Illuminate\Auth\Access\HandlesAuthorization;

class LessonPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Lesson $lesson)
    {
        // Anyone can view free lessons
        if ($lesson->token_cost === 0) {
            return true;
        }

        // Lesson creator can view their own lessons
        if ($user->id === $lesson->creator_id) {
            return true;
        }

        // Check if user has purchased the lesson
        return $user->studentTransactions()
            ->where('lesson_id', $lesson->id)
            ->exists();
    }

    public function update(User $user, Lesson $lesson)
    {
        // Only lesson creator can update their lessons
        return $user->id === $lesson->creator_id;
    }

    public function delete(User $user, Lesson $lesson)
    {
        // Only lesson creator can delete their lessons
        return $user->id === $lesson->creator_id;
    }

    public function purchase(User $user, Lesson $lesson)
    {
        // Cannot purchase own lesson
        if ($user->id === $lesson->creator_id) {
            return false;
        }

        // Cannot purchase if already purchased
        if ($user->studentTransactions()->where('lesson_id', $lesson->id)->exists()) {
            return false;
        }

        // Cannot purchase if insufficient balance
        return $user->token_balance >= $lesson->token_cost;
    }
}
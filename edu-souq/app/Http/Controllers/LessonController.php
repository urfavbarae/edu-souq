<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        return Lesson::with('creator')
            ->when($request->language, fn($query, $language) => 
                $query->where('language', $language)
            )
            ->when($request->content_type, fn($query, $type) => 
                $query->where('content_type', $type)
            )
            ->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'token_cost' => ['required', 'integer', 'min:0'],
            'content_type' => ['required', Rule::in(['text', 'video', 'audio', 'book'])],
            'content_path' => ['nullable', 'string', 'max:255'],
            'language' => ['required', Rule::in(['ar', 'fr', 'en'])],
        ]);

        $validated['creator_id'] = $request->user()->id;

        return Lesson::create($validated);
    }

    public function show(Lesson $lesson)
    {
        $this->authorize('view', $lesson);
        return $lesson->load(['creator']);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $this->authorize('update', $lesson);

        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:100'],
            'description' => ['sometimes', 'string'],
            'token_cost' => ['sometimes', 'integer', 'min:0'],
            'content_type' => ['sometimes', Rule::in(['text', 'video', 'audio', 'book'])],
            'content_path' => ['nullable', 'string', 'max:255'],
            'language' => ['sometimes', Rule::in(['ar', 'fr', 'en'])],
        ]);

        $lesson->update($validated);
        return $lesson;
    }

    public function destroy(Lesson $lesson)
    {
        $this->authorize('delete', $lesson);
        $lesson->delete();
        return response()->noContent();
    }

    public function purchase(Request $request, Lesson $lesson)
    {
        $user = $request->user();
        
        if ($user->token_balance < $lesson->token_cost) {
            return response()->json([
                'message' => 'Insufficient token balance'
            ], 403);
        }

        DB::transaction(function () use ($user, $lesson) {
            // Deduct tokens from student
            $user->decrement('token_balance', $lesson->token_cost);

            // Create transaction record
            Transaction::create([
                'student_id' => $user->id,
                'teacher_id' => $lesson->creator_id,
                'lesson_id' => $lesson->id,
                'token_amount' => $lesson->token_cost,
            ]);

            // Add tokens to teacher's balance
            $lesson->creator->increment('token_balance', $lesson->token_cost);
        });

        return response()->json([
            'message' => 'Lesson purchased successfully',
            'new_balance' => $user->token_balance - $lesson->token_cost
        ]);
    }
}
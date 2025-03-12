<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LessonController extends Controller
{
    public function index(): JsonResponse
    {
        $lessons = Lesson::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($lessons);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'token_cost' => 'required|numeric|min:0',
            'content_type' => 'required|in:text,video,audio,book',
            'content' => 'required_if:content_type,text|string|nullable',
            'content_file' => 'required_unless:content_type,text|file|max:102400|nullable',
            'language' => 'required|in:ar,fr,en'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lesson = new Lesson();
        $lesson->title = $request->title;
        $lesson->description = $request->description;
        $lesson->creator_id = Auth::id();
        $lesson->token_cost = $request->token_cost;
        $lesson->content_type = $request->content_type;
        $lesson->language = $request->language;

        if ($request->content_type === 'text') {
            $lesson->content_path = $request->content;
        } else if ($request->hasFile('content_file')) {
            $path = $request->file('content_file')->store('lessons', 'public');
            $lesson->content_path = $path;
        }

        $lesson->save();

        return response()->json($lesson, 201);
    }

    public function show(Lesson $lesson): JsonResponse
    {
        $lesson->load('creator', 'comments.user');
        return response()->json($lesson);
    }

    public function update(Request $request, Lesson $lesson): JsonResponse
    {
        if ($lesson->creator_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:100',
            'description' => 'string',
            'token_cost' => 'numeric|min:0',
            'content' => 'string|nullable',
            'content_file' => 'file|max:102400|nullable',
            'language' => 'in:ar,fr,en'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('title')) {
            $lesson->title = $request->title;
        }
        if ($request->has('description')) {
            $lesson->description = $request->description;
        }
        if ($request->has('token_cost')) {
            $lesson->token_cost = $request->token_cost;
        }
        if ($request->has('language')) {
            $lesson->language = $request->language;
        }

        if ($request->has('content') && $lesson->content_type === 'text') {
            $lesson->content_path = $request->content;
        } else if ($request->hasFile('content_file') && $lesson->content_type !== 'text') {
            if ($lesson->content_path) {
                Storage::disk('public')->delete($lesson->content_path);
            }
            $path = $request->file('content_file')->store('lessons', 'public');
            $lesson->content_path = $path;
        }

        $lesson->save();

        return response()->json($lesson);
    }

    public function destroy(Lesson $lesson): JsonResponse
    {
        if ($lesson->creator_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($lesson->content_type !== 'text' && $lesson->content_path) {
            Storage::disk('public')->delete($lesson->content_path);
        }

        $lesson->delete();

        return response()->json(null, 204);
    }
}
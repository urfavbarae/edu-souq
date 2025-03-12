<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($posts);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'content' => 'required|string',
            'language' => 'required|in:ar,fr,en'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->language = $request->language;
        $post->user_id = Auth::id();
        $post->save();

        return response()->json($post, 201);
    }

    public function show(Post $post): JsonResponse
    {
        $post->load('user', 'comments.user');
        return response()->json($post);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:100',
            'content' => 'string',
            'language' => 'in:ar,fr,en'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('title')) {
            $post->title = $request->title;
        }
        if ($request->has('content')) {
            $post->content = $request->content;
        }
        if ($request->has('language')) {
            $post->language = $request->language;
        }

        $post->save();

        return response()->json($post);
    }

    public function destroy(Post $post): JsonResponse
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}
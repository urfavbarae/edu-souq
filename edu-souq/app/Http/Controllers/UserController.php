<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return User::paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:50', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:100', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'language' => ['required', Rule::in(['ar', 'fr', 'en'])],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['token_balance'] = 500; // Default token balance

        return User::create($validated);
    }

    public function show(User $user)
    {
        return $user->load(['createdLessons', 'studentTransactions', 'teacherTransactions']);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => ['sometimes', 'string', 'max:50', Rule::unique('users')->ignore($user->id)],
            'email' => ['sometimes', 'string', 'email', 'max:100', Rule::unique('users')->ignore($user->id)],
            'language' => ['sometimes', Rule::in(['ar', 'fr', 'en'])],
            'token_balance' => ['sometimes', 'integer', 'min:0'],
        ]);

        if ($request->has('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);
        return $user;
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }
}
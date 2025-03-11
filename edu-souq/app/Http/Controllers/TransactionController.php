<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        return Transaction::with(['student', 'teacher', 'lesson'])
            ->when($request->student_id, fn($query, $id) => 
                $query->where('student_id', $id)
            )
            ->when($request->teacher_id, fn($query, $id) => 
                $query->where('teacher_id', $id)
            )
            ->when($request->lesson_id, fn($query, $id) => 
                $query->where('lesson_id', $id)
            )
            ->latest()
            ->paginate(10);
    }

    public function show(Transaction $transaction)
    {
        return $transaction->load(['student', 'teacher', 'lesson']);
    }

    public function userTransactions(Request $request)
    {
        $user = $request->user();
        return Transaction::where('student_id', $user->id)
            ->orWhere('teacher_id', $user->id)
            ->with(['student', 'teacher', 'lesson'])
            ->latest()
            ->paginate(10);
    }
}
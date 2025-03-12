<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index(): JsonResponse
    {
        $transactions = Transaction::with(['student', 'teacher', 'lesson'])
            ->where('student_id', Auth::id())
            ->orWhere('teacher_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($transactions);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'lesson_id' => 'required|exists:lessons,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lesson = Lesson::findOrFail($request->lesson_id);
        $student = Auth::user();

        if ($lesson->creator_id === $student->id) {
            return response()->json(['message' => 'You cannot purchase your own lesson'], 403);
        }

        if ($student->SQ_token < $lesson->token_cost) {
            return response()->json(['message' => 'Insufficient token balance'], 400);
        }

        try {
            DB::beginTransaction();

            // Create the transaction
            $transaction = new Transaction();
            $transaction->student_id = $student->id;
            $transaction->teacher_id = $lesson->creator_id;
            $transaction->lesson_id = $lesson->id;
            $transaction->token_amount = $lesson->token_cost;
            $transaction->save();

            // Update student's token balance
            $student->SQ_token -= $lesson->token_cost;
            $student->save();

            // Update teacher's token balance
            $teacher = User::findOrFail($lesson->creator_id);
            $teacher->SQ_token += $lesson->token_cost;
            $teacher->save();

            DB::commit();

            return response()->json($transaction->load(['student', 'teacher', 'lesson']), 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Transaction failed'], 500);
        }
    }

    public function show(Transaction $transaction): JsonResponse
    {
        if ($transaction->student_id !== Auth::id() && $transaction->teacher_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($transaction->load(['student', 'teacher', 'lesson']));
    }
}
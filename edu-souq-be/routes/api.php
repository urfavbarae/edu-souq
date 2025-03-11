<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Public routes
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // User routes
    Route::get('user', [AuthController::class, 'user']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::put('user/profile', [AuthController::class, 'updateProfile']);
    
    // Course routes
    Route::apiResource('courses', CourseController::class);
    Route::get('courses/{course}/lessons', [CourseController::class, 'lessons']);
    
    // Lesson routes
    Route::apiResource('lessons', LessonController::class);
    
    // Transaction routes
    Route::apiResource('transactions', TransactionController::class);
    Route::get('wallet/balance', [TransactionController::class, 'balance']);
});
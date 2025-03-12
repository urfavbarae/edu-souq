<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('lesson_id')->nullable();
            $table->decimal('token_amount', 10, 2);
            $table->timestamps();

            $table->index('student_id');
            $table->index('teacher_id');
            $table->index('lesson_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
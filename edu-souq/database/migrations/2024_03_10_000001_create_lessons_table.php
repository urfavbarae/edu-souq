<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->text('description');
            $table->foreignId('creator_id')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('token_cost');
            $table->enum('content_type', ['text', 'video', 'audio', 'book']);
            $table->string('content_path')->nullable();
            $table->enum('language', ['ar', 'fr', 'en']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
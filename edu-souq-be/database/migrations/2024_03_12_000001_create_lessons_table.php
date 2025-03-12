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
            $table->decimal('token_cost', 10, 2);
            $table->enum('content_type', ['text', 'video', 'audio', 'book']);
            $table->string('content_path', 255)->nullable();
            $table->enum('language', ['ar', 'fr', 'en']);
            $table->timestamps();

            $table->index('creator_id');
            $table->index('language');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
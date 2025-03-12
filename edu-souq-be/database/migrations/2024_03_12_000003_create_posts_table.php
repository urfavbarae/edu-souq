<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title', 100);
            $table->text('content');
            $table->enum('language', ['ar', 'fr', 'en']);
            $table->timestamps();

            $table->index('user_id');
            $table->index('language');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
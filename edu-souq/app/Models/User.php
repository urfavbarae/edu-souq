<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'language',
        'token_balance',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'token_balance' => 'integer',
        'language' => 'string',
    ];

    public function createdLessons(): HasMany
    {
        return $this->hasMany(Lesson::class, 'creator_id');
    }

    public function studentTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'student_id');
    }

    public function teacherTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'teacher_id');
    }
}

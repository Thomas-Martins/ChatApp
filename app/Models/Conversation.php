<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'conversations';

    protected $fillable = [
        'user_1',
        'user_2'
    ];

    public function user1Info()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function user2Info()
    {
        return $this->belongsTo(User::class, 'user_2');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id');
    }
}

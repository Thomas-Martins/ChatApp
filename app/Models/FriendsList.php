<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendsList extends Model
{
    use HasFactory;

    protected $table = 'friends_list';

    protected $fillable = [
        'user_id',
        'friend_id',
        'status'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'friend_id', 'id');
    }
}

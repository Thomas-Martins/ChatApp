<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function allUserConversation()
    {
        $userId = auth()->id();

        $conversations = Conversation::with('user1Info', 'user2Info')
            ->where('user_1', $userId)
            ->orWhere('user_2', $userId)
            ->get();

        return response()->json($conversations);
    }

    public function createConversation(Request $request)
    {
        $conversation = $request->validate([
            'user_1' => 'required',
            'user_2' => 'required'
        ]);

        $conversation = Conversation::create($conversation);


        return response()->json($conversation, 201);
    }
}

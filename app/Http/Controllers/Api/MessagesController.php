<?php

namespace App\Http\Controllers\Api;

use App\Events\NewMessageEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index()
    {
        return Message::all();
    }

    public function show($id)
    {
        $messages =  Message::where('conversation_id', $id)->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $message = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'send_by' => 'required|exists:users,id',
            'received_by' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create($message);

        event(new NewMessageEvent($message));

        return response()->json($message);
    }
}

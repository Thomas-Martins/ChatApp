<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FriendsList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendsListController extends Controller
{
    // Show All friends request that the users have sent: GET
    public function index()
    {
        $userId = Auth::user()->id;

        // Utilisez une jointure pour inclure les informations de l'utilisateur destinataire
        $sentRequests = FriendsList::where('user_id', $userId)
            ->with('receiver') // Nom de la relation définie dans le modèle FriendsList
            ->get();

        if ($sentRequests->isEmpty()) {
            return response()->json(['message' => 'Pas de demandes envoyées pour le moment.'], 200);
        }

        return $sentRequests;
    }

    // Show All friends request that the users have received: GET
    public function showFriendsRequestReceived()
    {
        $userId = Auth::user()->id;

        // Utilisez une jointure pour inclure les informations de l'utilisateur émetteur
        $friendRequests = FriendsList::where('friend_id', $userId)
            ->with('sender') // Nom de la relation définie dans le modèle FriendsList
            ->get();

        if ($friendRequests->isEmpty()) {
            return response()->json(['message' => 'Pas de demandes reçues pour le moment.'], 200);
        }

        return $friendRequests;
    }

    // Sending a friend request method POST
    public function addFriend(Request $request)
    {
        // Get the current user (who is sending the friend request)
        $userId = Auth::user()->id;

        // Get the id of the target user (based on the username received in the request)
        $friendUsername = $request->input('username');
        $friend = User::where('username', $friendUsername)->first();

        if (!$friend) {
            return response(['message' => '❌ L\'utilisateur avec ce nom est introuvable.']);
        } else {
            // Check if a friend request already exists
            $existingRequest = FriendsList::where('user_id', $userId)
                ->where('friend_id', $friend->id)
                ->first();

            if ($existingRequest) {
                return response()->json(['message' => '👇 Vous avez déjà envoyé une demande à cet utilisateur.']);
            }

            // Create a new entry in the friends_list table
            FriendsList::create([
                'user_id' => $userId,
                'friend_id' => $friend->id,
                'status' => 'Pending', // Statut par défaut
            ]);

            return response()->json(['message' => '✅ Demande d\'ami envoyée avec succès.'], 200);
        }
    }

    // Accept a friend Request POST
    public function acceptFriend()
    {
    }

    // Reject a friend Request POST or DELETE
    public function rejectFriend()
    {
    }
}

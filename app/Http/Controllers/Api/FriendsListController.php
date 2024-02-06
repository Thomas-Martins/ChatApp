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
    public function showRequestSend()
    {
        $userId = Auth::user()->id;

        // Utilisez une jointure pour inclure les informations de l'utilisateur destinataire
        $sentRequests = FriendsList::where('user_id', $userId)
            ->where('status', 'Pending')
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
            ->where('status', 'Pending')
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
    public function acceptFriend($id)
    {
        // Get the current user (who is receiving the friend request)
        $userId = Auth::user()->id;

        // Utilisez l'ID dans l'URL pour récupérer la demande d'ami spécifique
        $friendRequest = FriendsList::where('id', $id)
            ->where('friend_id', $userId)
            ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Une erreur est survenue.'], 500);
        } else {
            $friendRequest->update([
                'status' => 'Accepted',
            ]);

            return response()->json(['message' => '✅ Demande d\'ami acceptée.'], 200);
        }
    }

    // Reject a friend Request POST or DELETE
    public function rejectFriend()
    {
        // Get the current user (who is receiving the friend request)
        $userId = Auth::user()->id;

        $friendRequest = FriendsList::where('friend_id', $userId)
            ->where('status', 'Pending')
            ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Une erreur est survenue.'], 500);
        } else {
            $friendRequest->update([
                'status' => 'Rejected',
            ]);

            return response()->json(['message' => '❌ Demande d\'ami rejetée.'], 200);
        }
    }

    //Show all friends of the current user: GET
    public function showFriends()
    {
        $userId = Auth::user()->id;

        $friendsList = FriendsList::where('status', 'Accepted')
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->orWhere('friend_id', $userId);
            })
            ->with(['sender', 'receiver'])
            ->get();

        if ($friendsList->isEmpty()) {
            return response()->json(['message' => 'Pas d\'amis pour le moment.'], 200);
        }

        return $friendsList;
    }
}

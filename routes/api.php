<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FriendsListController;
use App\Models\Conversation;
use App\Models\FriendsList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\MessagesController;
use Symfony\Component\Mailer\DataCollector\MessageDataCollector;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Authenticated Route
Route::middleware('auth:sanctum')->group(function () {
  //FRIENDS REQUEST
  Route::get('/friends', [FriendsListController::class, 'showFriends']);
  Route::get('friends-request', [FriendsListController::class, 'showRequestSend']);
  Route::get('friends-request-received', [FriendsListController::class, 'showFriendsRequestReceived']);
  Route::post('friends-request', [FriendsListController::class, 'addFriend']);
  Route::post('friends-request/{id}/accept', [FriendsListController::class, 'acceptFriend']);
  Route::post('friends-request/{id}/rejected', [FriendsListController::class, 'rejectFriend']);

  //CONVERSATION
  Route::get('conversations', [ConversationController::class, 'allUserConversation']);
  Route::post('conversations/new', [ConversationController::class, 'createConversation']);
  Route::get('conversation/{id}', [ConversationController::class, 'showConversation']);
  //Messages
  Route::get('/messages', [MessagesController::class, 'index']);
  Route::post('/messages', [MessagesController::class, 'store']);

  //LOGOUT
  Route::post('/logout', [AuthController::class, 'logout']);
});

//For Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('messages/{id}', [MessagesController::class, 'show']);

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        // $token = $user->createToken('main')->plainTextToken;
        return response([
            'message' => 'Utilisateur crée',
            'user' => $user,
            // 'user_id' => $user->id, // Ajoute l'ID de l'utilisateur à la réponse
            // 'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'L\'email ou le mot de passe est incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        // $token = $user->createToken('main')->plainTextToken;

        // return response(['message' => 'Utilisateur connecté', $user]);

        return response([
            'message' => 'Utilisateur connecté',
            'user' => [
                'id' => $user->id, // ou  si vous souhaitez utiliser le champ UUID
                'username' => $user->username,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
            // 'user_id' => $user->id, // Ajoute l'ID de l'utilisateur à la réponse
            // 'token' => $token,
        ]);
    }

    public function logout()
    {

    }
}

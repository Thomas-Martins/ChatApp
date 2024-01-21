<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
     * Register a new user.
     *
     * @param  \App\Http\Requests\RegisterRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        // Validate the request data
        $data = $request->validated();

        // Create a new User with the validated data
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        //Create an access token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        //Return the response with user details and access token
        return response([
            'message' => 'Utilisateur crée',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Log in a user.
     *
     * @param  \App\Http\Requests\LoginRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        //Validate the login request credentials
        $credentials = $request->validated();

        //Attempt a login with the provided credentials
        if (!Auth::attempt($credentials)) {
            //Return a response if the login failed
            return response([
                'message' => 'L\'email ou le mot de passe est incorrect'
            ], 422);
        }

        //Get the authenticated user
        /** @var User $user */
        $user = User::where('email', $request['email'])->firstOrFail();

        //Create a new token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        //Return the response with the user details and the token
        return response([
            'message' => 'Utilisateur connecté',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

        /**
     * Log out the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Delete the current access token of the logged-in user
        $request->user()->currentAccessToken()->delete();

        // Return a response indicating that the user is logged out
        return response(['message' => 'Utilisateur déconnecté']);
    }
}

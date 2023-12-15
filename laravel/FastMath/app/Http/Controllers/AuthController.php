<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    
        // Generar token de acceso personal para el usuario recién registrado
        $token = $user->createToken('auth_token')->plainTextToken;
    
        // Actualizar el campo 'token' en lugar de 'current_token'
        $user->update(['token' => $token]);
    
        $response = [
            'user' => $user,
            'token' => $token
        ];
    
        return response($response, 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);


        $user = User::where('email', $credentials['email'])->first();

        if ($user && bcrypt($credentials['password']) === $user->password) {
            $token = $user->createToken('auth_token')->plainTextToken;


        // Actualiza el campo 'token' en lugar de 'current_token'
        $user->update(['token' => $token]);

        $response = [
            'user' => $user,
            'token' => $token
        ];


            return response($response, 201);
        }


        return response([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}

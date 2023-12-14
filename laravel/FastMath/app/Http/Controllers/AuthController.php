<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $REQUEST  ){
        request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
        $user = user::create([
            'name' => $REQUEST->name,
            'email' => $REQUEST->email,
            'password' => bcrypt($REQUEST->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response,201);
    }
     
    public function login(Request $REQUEST){
        $field = $REQUEST->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email',$field['email'])->first();

        if(!$user || !Hash::check($field['password'],$user->password)){
            return response([
                'message' => 'Bad credentials'
            ],401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;   


        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response,201);
    }

    public function logout(Request $REQUEST){
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}

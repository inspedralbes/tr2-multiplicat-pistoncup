<?php

use App\Http\Controllers\PreguntesController;
use App\Http\Controllers\PlayersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/preguntes', [PreguntesController::class, 'index']);
Route::post('/preguntes', [PreguntesController::class, 'store']);
Route::get('/preguntes/{id}', [PreguntesController::class, 'show']);
Route::put('/preguntes/{id}', [PreguntesController::class, 'update']);
Route::delete('/preguntes/{id}', [PreguntesController::class, 'destroy']);

Route::get('/players', [PlayersController::class, 'index']);
Route::post('/players', [PlayersController::class, 'store']);
Route::get('/players/{id}', [PlayersController::class, 'show']);
Route::put('/players/{id}', [PlayersController::class, 'update']);
Route::delete('/players/{id}', [PlayersController::class, 'destroy']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

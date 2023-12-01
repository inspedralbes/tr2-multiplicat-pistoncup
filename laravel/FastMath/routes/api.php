<?php
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\PilotsController;
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
route::get('/teams', [TeamsController::class, 'index']);
route::post('/teams', [TeamsController::class, 'store']);
route::get('/teams/{id}', [TeamsController::class, 'show']);
route::put('/teams/{id}', [TeamsController::class, 'update']);
route::delete('/teams/{id}', [TeamsController::class, 'destroy']);

Route::get('/pilots', [PilotsController::class, 'index']);
Route::post('/pilots', [PilotsController::class, 'store']);
Route::get('/pilots/{id}', [PilotsController::class, 'show']);
Route::put('/pilots/{id}', [PilotsController::class, 'update']);
Route::delete('/pilots/{id}', [PilotsController::class, 'destroy']);

Route::get('/preguntes', [PreguntesController::class, 'index']);
Route::post('/preguntes', [PreguntesController::class, 'store']);
Route::get('/preguntes/{id}', [PreguntesController::class, 'show']);
Route::put('/preguntes/{id}', [PreguntesController::class, 'update']);
Route::delete('/preguntes/{id}', [PreguntesController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

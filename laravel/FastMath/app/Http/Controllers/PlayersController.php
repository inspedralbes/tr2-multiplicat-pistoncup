<?php

namespace App\Http\Controllers;
use App\Models\Players;
use Illuminate\Http\Request;

class PlayersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Players::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nick' => 'required',
            'points' => 'required',
            'position' => 'required',
        ]);

        return Players::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Players::find($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $player = Players::find($id);
        $player->update($request->all());
        return $player;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Players::destroy($id);
    }
}

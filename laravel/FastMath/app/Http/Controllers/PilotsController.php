<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PilotsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pilots::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'pilot_name' => 'required',
        ]);

        return Pilots::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Pilots::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pilot = Pilots::find($id);
        $pilot->update($request->all());
        return $pilot;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Pilots::destroy($id);
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Preguntes;
use Illuminate\Http\Request;

class PreguntesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Preguntes::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tema' => 'required',
            'enunciat' => 'required',
            'explicacio' => 'required',
            'resposta1' => 'required',
            'resposta2' => 'required',
            'resposta3' => 'required',
            'resposta4' => 'required',
            'correcta' => 'required',
        ]);

        return Preguntes::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Preguntes::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pregunta = Preguntes::find($id);
        $pregunta->update($request->all());
        return $pregunta;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Preguntes::destroy($id);
    }
}

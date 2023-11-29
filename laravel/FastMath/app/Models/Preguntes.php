<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preguntes extends Model
{
    use HasFactory;
    protected $table = 'preguntes';
    protected $fillable = [
        'tema',
        'enunciat',
        'imatge',
        'explicacio',
        'resposta1',
        'resposta2',
        'resposta3',
        'resposta4',
    ];
}

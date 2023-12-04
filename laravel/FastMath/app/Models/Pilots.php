<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pilots extends Model
{
    use HasFactory;
    protected $table = 'pilots';
    protected $fillable = [
        'pilot_name',
    ];
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preguntes', function (Blueprint $table) {
            $table->id();
            $table->string('tema');
            $table->string('enunciat');
            $table->binary('imatge')->nullable()->default(null);
            $table->string('explicacio');
            $table->string('resposta1');
            $table->string('resposta2');
            $table->string('resposta3');
            $table->string('resposta4');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntes');
    }
};

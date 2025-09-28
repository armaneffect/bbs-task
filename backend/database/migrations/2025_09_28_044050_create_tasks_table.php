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
        Schema::create('tasks', function (Blueprint $table) {
                  $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // optional
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('priority', ['low','medium','high'])->default('medium');
            $table->date('due_date')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            // index for queries
            $table->index(['user_id', 'priority', 'due_date']);
         
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller

{

    public function index()
    {
        $tasks = Task::paginate(10);
        return response()->json([
            'status' => 'success',
            'data'   => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tasks' => 'required|array|min:1',
            'tasks.*.title' => 'required|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.is_completed' => 'boolean',
            'tasks.*.priority' => 'nullable|in:low,medium,high',
            'tasks.*.due_date' => 'nullable|date',
        ]);


        if (empty($validated['tasks'])) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No tasks provided'
            ], 400);
        }

        $tasks = collect($validated['tasks'])->map(function ($task) {
            return [
                'title'       => $task['title'],
                'description' => $task['description'] ?? null,
                'is_completed' => $task['is_completed'] ?? false,
                'priority'    => $task['priority'] ?? 'medium',
                'due_date'    => $task['due_date'] ?? null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ];
        })->toArray();

        // Bulk insert (one query)
        Task::insert($tasks);

        return response()->json([
            'status'  => 'success',
            'message' => 'Tasks created successfully',
            'count'   => count($tasks),
        ], 201);
    }


    public function show($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Task not found'
                ],
                404
            );
        }
        return response()->json(['status' => 'success', 'data' => $task]);
    }
}

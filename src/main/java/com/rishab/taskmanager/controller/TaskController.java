package com.rishab.taskmanager.controller;

import com.rishab.taskmanager.dto.TaskRequest;
import com.rishab.taskmanager.dto.TaskResponse;
import com.rishab.taskmanager.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    
    private final TaskService taskService;

    // ─── CREATE TASK ──────────────────────────────────────────────────
    // POST http://localhost:8080/api/tasks
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        TaskResponse task = taskService.createTask(request);
        return ResponseEntity.ok(task);
    }

    // ─── GET ALL TASKS ────────────────────────────────────────────────
    // GET http://localhost:8080/api/tasks
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        List<TaskResponse> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // ─── GET SINGLE TASK ──────────────────────────────────────────────
    // GET http://localhost:8080/api/tasks/1
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    // ─── UPDATE TASK ──────────────────────────────────────────────────
    // PUT http://localhost:8080/api/tasks/1
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id,
                                                   @Valid @RequestBody TaskRequest request) {
        TaskResponse task = taskService.updateTask(id, request);
        return ResponseEntity.ok(task);
    }

    // ─── DELETE TASK ──────────────────────────────────────────────────
    // DELETE http://localhost:8080/api/tasks/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/paginated")
public ResponseEntity<Page<TaskResponse>> getTasksPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
) {

    Page<TaskResponse> tasks =
            taskService.getTasksPaginated(page, size);

    return ResponseEntity.ok(tasks);
}

}
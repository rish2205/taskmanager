package com.rishab.taskmanager.service;

import com.rishab.taskmanager.dto.TaskRequest;
import com.rishab.taskmanager.dto.TaskResponse;
import com.rishab.taskmanager.Entity.Task;
import com.rishab.taskmanager.Entity.User;
import com.rishab.taskmanager.repository.TaskRepository;
import com.rishab.taskmanager.repository.UserRepository;

import com.rishab.taskmanager.exception.TaskNotFoundException;
import com.rishab.taskmanager.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    // ─── GET CURRENT USER ────────────────────────────────────────────
    private User getCurrentUser() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );
    }

    // ─── CONVERT ENTITY → DTO ───────────────────────────────────────
    private TaskResponse mapToResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUser().getName()
        );
    }

    // ─── CREATE TASK ─────────────────────────────────────────────────
    public TaskResponse createTask(TaskRequest request) {

        User currentUser = getCurrentUser();

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        task.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : "TODO"
        );

        task.setUser(currentUser);

        Task savedTask = taskRepository.save(task);

        return mapToResponse(savedTask);
    }

    // ─── GET ALL TASKS ───────────────────────────────────────────────
    public List<TaskResponse> getAllTasks() {

        User currentUser = getCurrentUser();

        List<Task> tasks = taskRepository.findByUser(currentUser);

        return tasks.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ─── GET TASK BY ID ──────────────────────────────────────────────
    public TaskResponse getTaskById(Long id) {

        User currentUser = getCurrentUser();

        Task task = taskRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found")
                );

        return mapToResponse(task);
    }

    // ─── UPDATE TASK ─────────────────────────────────────────────────
    public TaskResponse updateTask(Long id, TaskRequest request) {

        User currentUser = getCurrentUser();

        Task existingTask = taskRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found")
                );

        // Update fields only if provided
        if (request.getTitle() != null) {
            existingTask.setTitle(request.getTitle());
        }

        if (request.getDescription() != null) {
            existingTask.setDescription(request.getDescription());
        }

        if (request.getStatus() != null) {
            existingTask.setStatus(request.getStatus());
        }

        // Save updated task
        Task updatedTask = taskRepository.save(existingTask);

        return mapToResponse(updatedTask);
    }

    // ─── DELETE TASK ─────────────────────────────────────────────────
    public void deleteTask(Long id) {

        User currentUser = getCurrentUser();

        Task task = taskRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found")
                );

        taskRepository.delete(task);
    }
    public Page<TaskResponse> getTasksPaginated(int page, int size) {

    User currentUser = getCurrentUser();

    Pageable pageable = PageRequest.of(page, size);

    Page<Task> taskPage =
            taskRepository.findByUser(currentUser, pageable);

    return taskPage.map(this::mapToResponse);
}
}
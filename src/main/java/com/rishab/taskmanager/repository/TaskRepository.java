package com.rishab.taskmanager.repository;

import com.rishab.taskmanager.Entity.Task;
import com.rishab.taskmanager.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Get all tasks belonging to a specific user
    List<Task> findByUser(User user);

    // Get a specific task by id AND user (ensures user can't access another user's task)
    Optional<Task> findByIdAndUser(Long id, User user);

    // Delete all tasks of a user
    void deleteByUser(User user);
    Page<Task> findByUser(User user, Pageable pageable);

}

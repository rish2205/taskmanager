import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-state">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
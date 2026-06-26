function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span className={`status-badge status-${task.status}`}>
          {task.status}
        </span>
      </div>

      <p className="task-description">
        {task.description || "No description"}
      </p>

      <div className="task-actions">
        <button
          className="secondary-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="danger-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
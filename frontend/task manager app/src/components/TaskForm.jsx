function TaskForm({
  taskForm,
  handleChange,
  handleSubmit,
  editingTaskId,
  formLoading,
  resetForm,
}) {
  return (
    <div className="dashboard-card">
      <h2>
        {editingTaskId ? "Edit Task" : "Create New Task"}
      </h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">
            Title
          </label>

          <input
            id="task-title"
            type="text"
            name="title"
            placeholder="Enter task title"
            value={taskForm.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">
            Description
          </label>

          <textarea
            id="task-description"
            name="description"
            placeholder="Enter task description"
            rows="4"
            value={taskForm.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-status">
            Status
          </label>

          <select
            id="task-status"
            name="status"
            value={taskForm.status}
            onChange={handleChange}
          >
            <option value="PENDING">
              Pending
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>
        </div>

        <div className="task-form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={formLoading}
          >
            {formLoading
              ? editingTaskId
                ? "Updating..."
                : "Creating..."
              : editingTaskId
              ? "Update Task"
              : "Create Task"}
          </button>

          {editingTaskId && (
            <button
              type="button"
              className="secondary-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
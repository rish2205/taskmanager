import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";

import {
  createTask,
  deleteTask,
  getPaginatedTasks,
  updateTask,
} from "../services/taskService";

function DashboardPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [pageLoading, setPageLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  const userName = localStorage.getItem("userName") || "User";

  const loadTasks = async (pageNumber = page) => {
    try {
      setPageLoading(true);
      setError("");

      const response = await getPaginatedTasks(pageNumber, size);

      setTasks(response.content || []);
      setPage(response.number ?? pageNumber);
      setTotalPages(response.totalPages ?? 0);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(page);
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setTaskForm({
      title: "",
      description: "",
      status: "PENDING",
    });

    setEditingTaskId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setFormLoading(true);

      if (editingTaskId) {
        await updateTask(editingTaskId, taskForm);
        setSuccessMessage("Task updated successfully.");
      } else {
        await createTask(taskForm);
        setSuccessMessage("Task created successfully.");
      }

      resetForm();

      await loadTasks(page);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save task."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);

    setTaskForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      if (tasks.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        loadTasks(page);
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <Navbar
          userName={userName}
          onLogout={handleLogout}
        />

        {error && (
          <p className="message error-message">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="message success-message">
            {successMessage}
          </p>
        )}

        <div className="dashboard-grid">

          <TaskForm
            taskForm={taskForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingTaskId={editingTaskId}
            formLoading={formLoading}
            resetForm={resetForm}
          />

          <div className="dashboard-card">

            <h2>Your Tasks</h2>

            {pageLoading ? (
              <p className="empty-state">
                Loading...
              </p>
            ) : (
              <>
                <TaskList
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;
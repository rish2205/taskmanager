import api from "../api/axios";

export const getPaginatedTasks = async (page = 0, size = 5) => {
  const response = await api.get("/tasks/paginated", {
    params: { page, size },
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
import api from "./api";

export const fetchTasks = () => api.get("/tasks");
export const updateTaskStatus = (id, data) =>
  api.put(`/tasks/${id}/status`, data);
export const fetchTaskHistory = (id) =>
  api.get(`/tasks/${id}/history`);

import api from "./api";
export const fetchTaskReport = () => api.get("/reports/tasks");

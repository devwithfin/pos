import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getRoles = () => API.get("/roles");
export const saveRole = (role) => API.post("/role", role);
export const updateRole = (id, data) => API.put(`/role/${id}`, data);
export const deleteRole = (id) => API.delete(`/role/${id}`);
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/user", data);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/user/${id}`);

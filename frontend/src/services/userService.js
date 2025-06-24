import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getUsers = () => API.get("/users");
export const saveUser = (user) => API.post("/user", user);
export const deleteUser = (id) => API.delete(`/user/${id}`);


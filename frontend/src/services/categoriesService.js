import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getCategories = () => API.get("/categories");
export const saveCategory = (category) => API.post("/categories", category);

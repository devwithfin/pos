import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getCategories = () => API.get("/categories");
export const saveCategory = (category) => API.post("/category", category);
export const updateCategory = (id, data) => API.put(`/category/${id}`, data);
export const deleteCategory = (id) => API.delete(`/category/${id}`);

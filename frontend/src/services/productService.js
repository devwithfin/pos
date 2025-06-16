import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getProducts = () => API.get("/products");
export const saveProduct = (product) => API.post("/product", product);
export const updateProduct = (id, data) => API.put(`/product/${id}`, data);
export const deleteProduct = (id) => API.delete(`/product/${id}`);

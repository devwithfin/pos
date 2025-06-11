import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getProducts = () => API.get("/products");
export const saveProduct = (product) => API.post("/products", product);

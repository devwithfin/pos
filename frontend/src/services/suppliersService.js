import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getSuppliers = () => API.get("/suppliers");
export const saveSupplier = (supplier) => API.post("/suppliers", supplier);

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getSuppliers = () => API.get("/suppliers");
export const saveSupplier = (supplier) => API.post("/supplier", supplier);
export const updateSupplier = (id, data) => API.put(`/supplier/${id}`, data);
export const deleteSupplier = (id) => API.delete(`/supplier/${id}`);


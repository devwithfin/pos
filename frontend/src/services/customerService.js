import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getCustomers = () => API.get("/customers");
export const saveCustomer = (customer) => API.post("/customer", customer);
export const updateCustomer = (id, data) => API.put(`/Customer/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customer/${id}`);

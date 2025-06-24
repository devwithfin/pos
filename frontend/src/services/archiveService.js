import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getArchived = () => API.get("/archived");
export const restoreArchivedItem = (type, id) => API.put(`/restore/${type}/${id}`);
export const permanentlyDeleteItem = (type, id) => API.delete(`/delete/${type}/${id}`);


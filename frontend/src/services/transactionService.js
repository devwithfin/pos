import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});


export const savePurchase = (purchase) =>
  API.post("/transaction/purchase", purchase);

export const saveSale = (sale) =>
  API.post("/transaction/sale", sale);


export const getInventory = () => API.get("/transactions/inventory");
export const getHistoryPurchases = () => API.get("/transactions/purchases/history");
export const getHistorySales = () => API.get("/transactions/sales/history");
export const getWeeklyPurchases = () =>
  API.get("/purchases/weekly");

export const getWeeklySales = () =>
  API.get("/sales/weekly");

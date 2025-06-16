import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});


export const savePurchase = (purchase) =>
  API.post("/transaction/purchase", purchase);

export const saveSale = (sale) =>
  API.post("/transaction/sale", sale);

export const getTransactionsHistory = async () => {
  try {
    const response = await API.get("/transactions/history");
    return response.data;
  } catch (error) {
    console.error("Failed to Fetch Transactions History:", error);
    throw error;
  }
};

export const getWeeklyPurchases = () =>
  API.get("/purchases/weekly");

export const getWeeklySales = () =>
  API.get("/sales/weekly");

export const deleteTransactionsHistory = (id) => API.delete(`/transaction/history/${id}`);
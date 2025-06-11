import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});


export const savePurchase = (purchase) =>
  API.post("/transactions/purchase", purchase);

export const saveSale = (sale) =>
  API.post("/transactions/sale", sale);

export const getTransactionsHistory = async () => {
  try {
    const response = await API.get("/transactions/history");
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve transactions history:", error);
    throw error;
  }
};

export const getWeeklyPurchases = () =>
  API.get("/purchases/week");

export const getWeeklySales = () =>
  API.get("/sales/week");
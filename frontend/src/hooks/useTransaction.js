import { useEffect, useState } from "react";
import { getTransactionsHistory, getWeeklyPurchases, getWeeklySales } from "../services/transactionService";

export function useTransactionsHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getTransactionsHistory();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return data;
}

export function useWeeklyPurchases() {
  const [data, setData] = useState(Array(7).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWeeklyPurchases();
        const result = res.data;

        const purchasesMap = {};
        result.forEach((item) => {
          const localDate = new Date(item.created_at);
          const dateStr = localDate.toISOString().split("T")[0];
          purchasesMap[dateStr] = Number(item.total);
        });

        const today = new Date();
        const purchasesPerDay = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          purchasesPerDay.push(purchasesMap[dateStr] || 0);
        }

        setData(purchasesPerDay);
      } catch (error) {
        console.error("Failed to Fetch Weekly Purchases Data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export function useWeeklySales() {
  const [data, setData] = useState(Array(7).fill(0));

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await getWeeklySales();
        const result = res.data;

        const salesMap = {};
        result.forEach((item) => {
          const localDate = new Date(item.created_at);
          const dateStr = localDate.toISOString().split("T")[0];
          salesMap[dateStr] = Number(item.total);
        });

        const today = new Date();
        const salesPerDay = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          salesPerDay.push(salesMap[dateStr] || 0);
        }

        setData(salesPerDay);
      } catch (error) {
        console.error("Failed to fetch weekly sales data:", error);
      }
    };

    fetchSales();
  }, []);

  return data;
}

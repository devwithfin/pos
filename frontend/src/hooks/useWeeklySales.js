import { useEffect, useState } from "react";
import { getWeeklySales } from "../services/transactionsService";

export default function useWeeklySales() {
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

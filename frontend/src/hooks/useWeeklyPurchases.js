import { useEffect, useState } from "react";
import { getWeeklyPurchases } from "../services/transactionsService";

export default function useWeeklyPurchases() {
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
        console.error("Failed to fetch weekly purchases data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}

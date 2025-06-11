import { useEffect, useState } from "react";
import { getTransactionsHistory } from "../services/transactionsService";

export default function useTransactionsHistory() {
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

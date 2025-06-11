// hooks/useUsers.js
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export default function useUsers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to Retrieve Users Data:", err));
  }, []);

  return data;
}

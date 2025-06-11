import { useState, useEffect } from "react";

export default function useProfile() {
  const [id_user, setIdUser] = useState("");
  const [username, setUsername] = useState("");
  const [role_name, setRoleName] = useState("");

  useEffect(() => {
    setIdUser(localStorage.getItem("id_user") || "");
    setUsername(localStorage.getItem("username") || "");
    setRoleName(localStorage.getItem("role_name") || "");
  }, []);

  return {
    id_user,
    username,
    role_name,
  };
}

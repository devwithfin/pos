import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login, logout } from "../services/authService";

export default function useAuth() {
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const { data } = await login(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("id_user", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role_name", data.role_name);

      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        text: "Welcome Back!",
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (error) {
      const message = error.response?.data?.message || "Please Try Again!";
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: message,
      });
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      await logout(token);

      Swal.fire({
        icon: "success",
        title: "Successful Logout",
        text: "You're out. See you again!",
        showConfirmButton: false,
        timer: 1000,
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Please Try Again!";
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: message,
      });
    }
  }, [navigate]);

  return { handleLogin, handleLogout };
}

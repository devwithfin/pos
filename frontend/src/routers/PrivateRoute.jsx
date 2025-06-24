import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isTokenValid, clearAuthData, parseJwt } from "../utils/authToken";

const PrivateRoute = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const [authorized, setAuthorized] = useState("checking");  

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role_name");

      if (!isTokenValid(token)) {
        await Swal.fire({
          icon: "warning",
          title: "Session expired",   
          text: "Token is invalid or expired. Please re-login",
          confirmButtonText: "OK",
        });
        clearAuthData();
        navigate("/", { replace: true });
        return;
      }

      const decoded = parseJwt(token);
      const timeout = decoded.exp * 1000 - Date.now();
      timerRef.current = setTimeout(async () => {
        await Swal.fire({
          icon: "info",
          title: "Session timeout",
          text: "The token has expired. You will be logged out",
          confirmButtonText: "OK",
        });
        clearAuthData();
        navigate("/", { replace: true });
      }, timeout);

      const normalizedRole = role?.trim().toLowerCase();
      const allowedNormalized = allowedRoles.map(r => r.toLowerCase());

      if (!allowedNormalized.includes(normalizedRole)) {
        setAuthorized("denied");
        return;
      }

      setAuthorized("allowed");
    };

    checkAccess();
    return () => clearTimeout(timerRef.current);
  }, [allowedRoles, navigate]);

  if (authorized === "checking") return null;

  if (authorized === "denied") {
    Swal.fire({
      icon: "error",
      title: "Access denied",
      text: "You do not have permission to access this page",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/admin/dashboard", { replace: true });
    });
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;

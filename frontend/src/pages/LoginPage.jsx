// pages/LoginPage.js (atau sesuai path kamu)
import React from "react";
import useLogin from "../hooks/useAuth";

const LoginPage = () => {
  const { handleLogin } = useLogin();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#4369D7" }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-center mb-4 fw-medium" style={{ fontSize: "24px" }}>
          POS Login
        </h1>
        <form onSubmit={handleLogin} className="mt-2">
          <div className="mb-3">
            <input
              type="username"
              id="username"
              name="username"
              className="form-control py-3"
              autoComplete="off"
              placeholder="Enter Username..."
              required
              style={{ border: "1px solid #D1D3E2" }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control py-3"
              autoComplete="off"
              placeholder="Enter Password..."
              required
              style={{ border: "1px solid #D1D3E2" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-medium mt-3"
            style={{ backgroundColor: "#4369D7", color: "#fff" }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

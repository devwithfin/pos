import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faSearch,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useAuth";

const Navbar = () => {
  const role_name = localStorage.getItem("role_name");
  const [activeItem, setActiveItem] = useState("");

  const { handleLogout } = useLogin();

  return (
    <nav
      className="navbar bg-white py-3 shadow-sm"
      style={{ position: "sticky", top: 0, zIndex: 900 }}
    >
      <div className="container-fluid mx-4 d-flex justify-content-between align-items-center">
        <form className="d-flex align-items-center" role="search">
          <div className="input-group">
            <input
              type="search"
              className="form-control bg-light border-0 py-2"
              placeholder="Search for..."
              aria-label="Search"
              style={{ fontSize: "14px", width: "350px" }}
            />
            <button
              type="submit"
              className="btn border-0 shadow-none py-2"
              style={{ backgroundColor: "#4E73DF" }}
            >
              <FontAwesomeIcon icon={faSearch} className="text-white fw-bold" />
            </button>
          </div>
        </form>

        <ul className="navbar-nav flex-row align-items-center gap-3">
          <li className="nav-item">
            <FontAwesomeIcon icon={faEnvelope} role="button" style={{ color: "#DAD3E2" }} />
          </li>
          <li className="nav-item">
            <FontAwesomeIcon icon={faBell} role="button" style={{ color: "#DAD3E2" }} />
          </li>

          <li className="nav-item mx-3">
            <div style={{ height: "36px", borderLeft: "0.1px solid #ccc" }} />
          </li>

          <li className="nav-item position-relative">
            <div
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
              tabIndex="0"
              className="d-flex align-items-center cursor-pointer"
            >
              <div className="d-flex flex-column me-2">
                <span
                  className="text-secondary fw-medium"
                  style={{ fontSize: "12px" }}
                >
                  {role_name}
                </span>
              </div>
              <img
                src="/images/profile.svg"
                alt="User Profile"
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              />
            </div>

            <ul
              className="dropdown-menu dropdown-menu-end shadow"
              aria-labelledby="userDropdown"
              style={{
                position: "absolute",
                top: "52px",
                border: "none",
                boxShadow: "none",
              }}
            >
              <li>
                <Link
                  to="/admin/profile"
                  className="dropdown-item d-flex align-items-center text-decoration-none"
                  style={{
                    color: activeItem === "profile" ? "#fff" : "#000",
                    backgroundColor: activeItem === "profile" ? "#4e73df" : "transparent",
                  }}
                  onMouseDown={() => setActiveItem("profile")}
                  onMouseUp={() => setActiveItem("")}
                  onMouseLeave={() => setActiveItem("")}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2"
                    style={{ width: "30px", color: "#DAD3E2" }}
                  />
                  <span style={{ fontSize: "14px" }}>Profile</span>
                </Link>
              </li>

              <li><hr className="dropdown-divider" /></li>

              <li>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout}
                  style={{
                    fontSize: "14px",
                    paddingLeft: "25px",
                    color: activeItem === "logout" ? "#fff" : "#000",
                    backgroundColor: activeItem === "logout" ? "#4e73df" : "transparent",
                  }}
                  onMouseDown={() => setActiveItem("logout")}
                  onMouseUp={() => setActiveItem("")}
                  onMouseLeave={() => setActiveItem("")}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="me-3"
                    style={{ color: "#DAD3E2" }}
                  />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

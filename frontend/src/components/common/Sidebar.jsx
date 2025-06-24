import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faFile,
  faHome,
  faCog,
  faAngleDown,
  faAngleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

const Sidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openMasterData, setOpenMasterData] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);

  const role = localStorage.getItem("role_name")?.toLowerCase();

  const canAccess = {
    dashboard: ["superadmin", "cashier", "purchasing", "sales", "inventory manager"],
    categories: ["superadmin", "purchasing", "inventory manager"],
    products: ["superadmin", "purchasing", "inventory manager"],
    suppliers: ["superadmin", "purchasing", "inventory manager"],
    customers: ["superadmin", "inventory manager"],
    roles: ["superadmin"],
    users: ["superadmin"],
    archived: ["superadmin"],
    transactionsPurchase: ["superadmin", "purchasing", "inventory manager"],
    historyPurchases: ["superadmin", "purchasing", "inventory manager"],
    transactionsSale: ["superadmin", "sales", "inventory manager", "cashier"],
    historySales: ["superadmin", "sales", "inventory manager", "cashier"],
    inventory: ["superadmin", "cashier", "purchasing", "sales", "inventory manager"],
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenuMasterData = (e) => {
    e.stopPropagation();
    setOpenMasterData(!openMasterData);
    setOpenTransactions(false);
  };

  const toggleMenuTransactions = (e) => {
    e.stopPropagation();
    setOpenTransactions(!openTransactions);
    setOpenMasterData(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenMasterData(false);
        setOpenTransactions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #fff !important;
        }
        .nav-link svg {
          transition: color 0.3s ease;
          color: inherit;
          width: 20px;
        }
        .submenu {
          background: #fff;
          margin-left: 1rem;
          border-radius: 0.25rem;
        }
        .submenu a {
          color: #343a40 !important;
          font-size: 13px;
          padding: 6px 12px;
          display: block;
          text-decoration: none;
        }
        .submenu a:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #000 !important;
        }
      `}</style>

      <div
        ref={sidebarRef}
        className="text-white position-fixed"
        style={{
          backgroundColor: "#4E73DF",
          width: "225px",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1030,
        }}
      >
        <div className="text-center py-4 fw-bold">
          <Link
            to="/admin/dashboard"
            className="text-white text-decoration-none d-flex gap-1 align-items-center justify-content-center"
          >
            <span>POS</span>
            <FontAwesomeIcon icon={faBuilding} size="2x" />
          </Link>
        </div>
        <hr className="mx-3" style={{ borderColor: "rgba(255, 255, 255, 0.8)", marginTop: "0.5rem" }} />

        <ul className="nav flex-column px-1 py-3">
          {canAccess.dashboard.includes(role) && (
            <li className="nav-item mb-2">
              <Link
                to="/admin/dashboard"
                className={`nav-link fw-medium d-flex align-items-center gap-2 ${isActive("/admin/dashboard") ? "active" : ""}`}
                style={{ fontSize: "14px" }}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Dashboard</span>
              </Link>
            </li>
          )}

          {(canAccess.categories.includes(role) ||
            canAccess.products.includes(role) ||
            canAccess.suppliers.includes(role) ||
            canAccess.customers.includes(role) ||
            canAccess.roles.includes(role) ||
            canAccess.users.includes(role)) && (
            <li className="nav-item mb-2">
              <div
                className={`nav-link fw-medium d-flex align-items-center justify-content-between`}
                onClick={toggleMenuMasterData}
                style={{ fontSize: "14px", cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faCog} />
                  <span>Master Data</span>
                </div>
                <FontAwesomeIcon icon={openMasterData ? faAngleDown : faAngleRight} />
              </div>

              {openMasterData && (
                <div className="submenu shadow-sm mt-1 py-2 px-3">
                  {canAccess.categories.includes(role) && (
                    <Link to="/admin/data/categories" className={`d-block py-1 ${isActive("/admin/data/categories") ? "fw-bold text-dark" : "text-muted"}`}>
                      Categories
                    </Link>
                  )}
                  {canAccess.products.includes(role) && (
                    <Link to="/admin/data/products" className={`d-block py-1 ${isActive("/admin/data/products") ? "fw-bold text-dark" : "text-muted"}`}>
                      Products
                    </Link>
                  )}
                  {canAccess.suppliers.includes(role) && (
                    <Link to="/admin/data/suppliers" className={`d-block py-1 ${isActive("/admin/data/suppliers") ? "fw-bold text-dark" : "text-muted"}`}>
                      Suppliers
                    </Link>
                  )}
                  {canAccess.customers.includes(role) && (
                    <Link to="/admin/data/customers" className={`d-block py-1 ${isActive("/admin/data/customers") ? "fw-bold text-dark" : "text-muted"}`}>
                      Customers
                    </Link>
                  )}
                  {canAccess.roles.includes(role) && (
                    <Link to="/admin/data/roles" className={`d-block py-1 ${isActive("/admin/data/roles") ? "fw-bold text-dark" : "text-muted"}`}>
                      Roles
                    </Link>
                  )}
                  {canAccess.users.includes(role) && (
                    <Link to="/admin/data/users" className={`d-block py-1 ${isActive("/admin/data/users") ? "fw-bold text-dark" : "text-muted"}`}>
                      Users
                    </Link>
                  )}
                </div>
              )}
            </li>
          )}

          {(canAccess.transactionsPurchase.includes(role) ||
            canAccess.transactionsSale.includes(role) ||
            canAccess.historyPurchases.includes(role) ||
            canAccess.historySales.includes(role) ||
            canAccess.inventory.includes(role)) && (
            <li className="nav-item mb-2">
              <div
                className={`nav-link fw-medium d-flex align-items-center justify-content-between`}
                onClick={toggleMenuTransactions}
                style={{ fontSize: "14px", cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faFile} />
                  <span>Transactions</span>
                </div>
                <FontAwesomeIcon icon={openTransactions ? faAngleDown : faAngleRight} />
              </div>

              {openTransactions && (
                <div className="submenu shadow-sm mt-1 py-2 px-3">
                  {canAccess.transactionsPurchase.includes(role) && (
                    <Link to="/admin/transactions/purchase" className={`d-block py-1 ${isActive("/admin/transactions/purchase") ? "fw-bold text-dark" : "text-muted"}`}>
                      Purchase
                    </Link>
                  )}
                  {canAccess.historyPurchases.includes(role) && (
                    <Link to="/admin/transactions/purchases/history" className={`d-block py-1 ${isActive("/admin/transactions/purchases/history") ? "fw-bold text-dark" : "text-muted"}`}>
                      History Purchases
                    </Link>
                  )}
                  {canAccess.transactionsSale.includes(role) && (
                    <Link to="/admin/transactions/sale" className={`d-block py-1 ${isActive("/admin/transactions/sale") ? "fw-bold text-dark" : "text-muted"}`}>
                      Sale
                    </Link>
                  )}
                   {canAccess.historySales.includes(role) && (
                    <Link to="/admin/transactions/sales/history" className={`d-block py-1 ${isActive("/admin/transactions/sales/history") ? "fw-bold text-dark" : "text-muted"}`}>
                      History Sales
                    </Link>
                  )}
                  {canAccess.inventory.includes(role) && (
                    <Link to="/admin/transactions/inventory" className={`d-block py-1 ${isActive("/admin/transactions/inventory") ? "fw-bold text-dark" : "text-muted"}`}>
                      Inventory
                    </Link>
                  )}
                </div>
              )}
            </li>
          )}

          {canAccess.archived.includes(role) && (
            <li className="nav-item mb-2">
              <Link
                to="/admin/archived"
                className={`nav-link fw-medium d-flex align-items-center gap-2 ${isActive("/admin/archived") ? "active" : ""}`}
                style={{ fontSize: "14px" }}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Archived</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

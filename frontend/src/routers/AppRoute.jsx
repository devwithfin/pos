import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// private-route
import PrivateRoute from "./PrivateRoute.jsx";
// login-page
import LoginPage from "../pages/LoginPage.jsx";
// layout
import AdminLayout from "../layouts/AdminLayout.jsx";
// dashboard page
import DashboardAdmin from "../pages/Dashboard.jsx";
// data pages
import CategoriesData from "../pages/CategoriesData.jsx";
import ProductsData from "../pages/ProductsData.jsx";
import CustomersData from "../pages/CustomersData.jsx";
import RolesData from "../pages/RolesData.jsx";
import SupplierData from "../pages/SuppliersData.jsx";
import UsersData from "../pages/UsersData.jsx";
// transactions pages
import TransactionsPurchase from "../pages/TransactionsPurchase.jsx";
import HistoryPurchases from "../pages/HistoryPurchases.jsx";
import TransactionsSale from "../pages/TransactionsSale.jsx";
import HistorySales from "../pages/HistorySales.jsx";
import InventoryTransactions from "../pages/InventoryTransactions.jsx";
// profile page
import Profile from "../pages/Profile.jsx";
// archives page
import Archived from "../pages/Archived.jsx";

const AppRoute = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/" element={<LoginPage />} />

    {/* Superadmin */}
    <Route element={<PrivateRoute allowedRoles={["Superadmin", "Cashier", "Purchasing", "Sales", "Inventory Manager"]} />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
         <Route
          path="/admin/transactions/inventory"
          element={<InventoryTransactions />}
        />
       
        <Route path="/admin/profile" element={<Profile />} />
      </Route>
    </Route>

    <Route element={<PrivateRoute allowedRoles={["Superadmin","Purchasing","Inventory Manager"]} />}>
     <Route element={<AdminLayout />}>
        <Route path="/admin/data/categories" element={<CategoriesData />} />
        <Route path="/admin/data/products" element={<ProductsData />} />
        <Route path="/admin/data/suppliers" element={<SupplierData />} />
         <Route
          path="/admin/transactions/purchase"
          element={<TransactionsPurchase />}
        />
        <Route
          path="/admin/transactions/purchases/history"
          element={<HistoryPurchases />}
        />
    </Route>
    </Route>

    <Route element={<PrivateRoute allowedRoles={["Superadmin","Inventory Manager"]} />}>
     <Route element={<AdminLayout />}>
       <Route path="/admin/data/customers" element={<CustomersData />} />
    </Route>
    </Route>
   
    <Route element={<PrivateRoute allowedRoles={["Superadmin"]} />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/data/roles" element={<RolesData />} />
       <Route path="/admin/data/users" element={<UsersData />} />
        <Route path="/admin/archived" element={<Archived />} />
    </Route>
    </Route>
       
      <Route element={<PrivateRoute allowedRoles={["Superadmin","Sales","Inventory Manager", "Cashier"]} />}>
      <Route element={<AdminLayout />}>
       <Route path="/admin/transactions/sale" element={<TransactionsSale />} />
       <Route
          path="/admin/transactions/sales/history"
          element={<HistorySales />}
        />
      </Route>
      </Route>

    {/* Catch All */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoute;

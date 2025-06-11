import React from "react";
import SummaryCards from "../components/SummaryCard";
import SalesChart from "../components/chart/SalesChart";
import RevenueChart from "../components/chart/PurchasesChart";

function Dashboard() {
  return (
    <div className="p-4" style={{ backgroundColor: "#F8F9FC" }}>
      <h1 className="h3 mb-4 fw-normal">Dashboard</h1>
      <SummaryCards />

      <div className="row">
        <div className="col-md-6 mb-4">
          <RevenueChart />
        </div>

        <div className="col-md-6 mb-4">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

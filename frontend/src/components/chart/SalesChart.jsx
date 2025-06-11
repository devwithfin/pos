import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";

import useWeeklySales from "../../hooks/useWeeklySales";
import { getLast7DaysLabels } from "../../utils/formatDate";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

export default function SalesChart() {
  const chartData = useWeeklySales();

  const data = {
    labels: getLast7DaysLabels(),
    datasets: [
      {
        label: "Sales",
        data: chartData,
        borderColor: "#476CD9",
        backgroundColor: "#F6F8FD",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#476CD9",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#476CD9",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Rp ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false, drawBorder: false } },
      y: { grid: { display: false, drawBorder: false } },
    },
  };

  return (
    <div className="card shadow-lg border-0" style={{ height: "300px" }}>
      <div
        className="card-header text-white py-3 px-3"
        style={{ backgroundColor: "#F8F9FC" }}
      >
        <h6 className="mb-0 fw-semibold" style={{ color: "#446AD7" }}>
          Weekly Sales Chart
        </h6>
      </div>
      <div className="card-body p-3" style={{ height: "calc(100% - 56px)" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

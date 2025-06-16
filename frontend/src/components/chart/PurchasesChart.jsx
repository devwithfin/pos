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
import {useWeeklyPurchases} from "../../hooks/useTransaction";
import { getLast7DaysLabels } from "../../utils/formatDate";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

export default function PurchasesChart() {
  const chartData = useWeeklyPurchases();
  const labels = getLast7DaysLabels();

  const data = {
    labels,
    datasets: [
      {
        label: "Purchases",
        data: chartData,
        borderColor: "#36B9CC",
        backgroundColor: "#F6F8FD",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#36B9CC",
      },
    ],
  };

  const defaultOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => context.parsed.y.toLocaleString(),
        },
        backgroundColor: "#fff",
        titleColor: "#446AD7",
        bodyColor: "#000",
        borderColor: "#446AD7",
        borderWidth: 1,
        padding: 8,
      },
    },
    scales: {
      x: { grid: { display: false, drawBorder: false } },
      y: { grid: { display: false, drawBorder: false } },
    },
  };

  return (
    <div
      className="card shadow-lg border-0"
      style={{ height: "300px", overflow: "hidden" }}
    >
      <div
        className="card-header text-white py-3 px-3"
        style={{ backgroundColor: "#F8F9FC" }}
      >
        <h6 className="mb-0 fw-semibold" style={{ color: "#446AD7" }}>
          Weekly Purchases Chart
        </h6>
      </div>
      <div
        className="card-body p-3"
        style={{
          height: "calc(100% - 56px)",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Line
          data={data}
          options={defaultOptions}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

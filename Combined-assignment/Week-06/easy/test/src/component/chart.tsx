import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// 📈 Large realistic stock-like growth dataset
const data = [
  { month: "Jan", blue: 20, orange: 55, green: 60 },
  { month: "Feb", blue: 35, orange: 52, green: 58 },
  { month: "Mar", blue: -40, orange: -10, green: -5 },
  { month: "Apr", blue: -120, orange: -90, green: -80 },
  { month: "May", blue: -60, orange: -40, green: -30 },
  { month: "Jun", blue: -10, orange: -5, green: 0 },
  { month: "Jul", blue: 25, orange: 15, green: 18 },
  { month: "Aug", blue: 50, orange: 40, green: 42 },
  { month: "Sep", blue: 80, orange: 60, green: 58 },
  { month: "Oct", blue: 120, orange: 90, green: 85 },
  { month: "Nov", blue: 160, orange: 130, green: 125 },
  { month: "Dec", blue: 210, orange: 170, green: 160 },

  { month: "Jan2", blue: 260, orange: 200, green: 195 },
  { month: "Feb2", blue: 320, orange: 240, green: 225 },
  { month: "Mar2", blue: 390, orange: 280, green: 260 },
  { month: "Apr2", blue: 450, orange: 320, green: 300 },
  { month: "May2", blue: 520, orange: 360, green: 340 },
  { month: "Jun2", blue: 600, orange: 410, green: 390 },
  { month: "Jul2", blue: 480, orange: 340, green: 320 },
  { month: "Aug2", blue: 420, orange: 290, green: 280 },
  { month: "Sep2", blue: 510, orange: 360, green: 340 },
  { month: "Oct2", blue: 640, orange: 430, green: 410 },
  { month: "Nov2", blue: 590, orange: 400, green: 380 },
  { month: "Dec2", blue: 700, orange: 470, green: 450 },

  { month: "Jan3", blue: 760, orange: 520, green: 500 },
  { month: "Feb3", blue: 840, orange: 580, green: 560 },
  { month: "Mar3", blue: 920, orange: 640, green: 610 },
  { month: "Apr3", blue: 980, orange: 700, green: 660 },
  { month: "May3", blue: 1100, orange: 760, green: 710 },
  { month: "Jun3", blue: 1250, orange: 830, green: 780 },
  { month: "Jul3", blue: 1320, orange: 890, green: 840 },
  { month: "Aug3", blue: 1450, orange: 960, green: 900 },
  { month: "Sep3", blue: 1380, orange: 910, green: 860 },
  { month: "Oct3", blue: 1520, orange: 980, green: 930 },
  { month: "Nov3", blue: 1610, orange: 1040, green: 980 },
  { month: "Dec3", blue: 1490, orange: 990, green: 940 },

  { month: "Jan4", blue: 1350, orange: 930, green: 890 },
  { month: "Feb4", blue: 1480, orange: 1010, green: 970 },
  { month: "Mar4", blue: 1580, orange: 1080, green: 1030 },
];

export default function Step2() {
  return (
    <div
      style={{
        width: "50%",
        height: "500px",
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        border : "3px solid black"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Legend verticalAlign="top" align="right" />

          {/* 🔵 Main explosive growth line */}
          <Line
            type="monotone"
            dataKey="blue"
            stroke="#2563eb"
            strokeWidth={4}
            dot={false}
            name="+494.99%"
          />

          {/* 🟠 Medium growth */}
          <Line
            type="monotone"
            dataKey="orange"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            name="+261.12%"
          />

          {/* 🟢 Stable growth */}
          <Line
            type="monotone"
            dataKey="green"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={false}
            name="+70.05%"
          />

          <RechartsDevtools />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
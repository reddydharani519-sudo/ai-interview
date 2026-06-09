"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 80 },
  { day: "Fri", score: 75 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 92 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl">
        <p className="text-white/60 text-xs">{label}</p>
        <p className="text-violet-400 font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export const PerformanceChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass p-6 rounded-2xl h-full"
    >
      <h3 className="text-white font-bold text-lg mb-6">
        Performance Trend
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="day"
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceChart;
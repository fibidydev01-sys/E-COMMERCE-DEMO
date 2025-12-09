"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/lib/utils";

const data = [
  { name: "Sen", sales: 4000000 },
  { name: "Sel", sales: 3000000 },
  { name: "Rab", sales: 5000000 },
  { name: "Kam", sales: 2780000 },
  { name: "Jum", sales: 1890000 },
  { name: "Sab", sales: 6390000 },
  { name: "Min", sales: 3490000 },
];

export function SalesChart() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <h3 className="font-semibold mb-4">Penjualan Minggu Ini</h3>
      <div className="h-[300px] w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(v) => `${v / 1000000}jt`}
            />
            <Tooltip formatter={(value: number) => formatPrice(value)} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
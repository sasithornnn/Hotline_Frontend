"use client"

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const COLORS = ["#f97316", "#3b82f6", "#22c55e"]

interface Props {
  data: { name: string; value: number }[]
}

export default function TicketStatusPie({ data }: Props) {
  return (
    <PieChart width={320} height={320}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={110}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

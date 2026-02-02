"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
// import { getDashboardData } from "@/Action/dashboardAction"
import { getDashboardData } from "@/action/dashboardAction"
import { DashboardData } from "@/types/dashboard/dashboardtypes"
import TicketStatusPie from "@/components/dashboard/TicketStatusPie"

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [startDate, setStartDate] = useState("2026-01-01")
  const [endDate, setEndDate] = useState("2026-01-31")

  const loadData = async () => {
    const res = await getDashboardData(startDate, endDate)
    setData(res)
  }

  useEffect(() => {
    loadData()
  }, [])

  if (!data) return <p className="p-6">กำลังโหลดข้อมูล...</p>

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard ภาพรวมงาน
        </h1>

        {/* เลือกช่วงวันที่ */}
        <div className="flex gap-2 mb-6">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-4 rounded"
          >
            ดูข้อมูล
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">งานทั้งหมด: {data.kpi.total}</div>
          <div className="bg-white p-4 rounded shadow">รอดำเนินการ: {data.kpi.open}</div>
          <div className="bg-white p-4 rounded shadow">กำลังทำ: {data.kpi.in_progress}</div>
          <div className="bg-white p-4 rounded shadow">เสร็จแล้ว: {data.kpi.done}</div>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded shadow w-fit">
          <TicketStatusPie data={data.chartStatus} />
        </div>
      </main>
    </div>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { Search, Eye, Trash2, Download } from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Ticket } from "@/types/ticket/ticket"
import { getTickets } from "@/action/ticketsAction"
import CreateTicketDialog from "@/components/tickets/CreateTicketDialog"

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets()
        setTickets(data)
      } catch (error) {
        console.error("Failed to fetch tickets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const refreshTickets = async () => {
    const data = await getTickets()
    setTickets(data)
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Ticket Management
            </h1>
            <p className="text-slate-500 text-sm">
              ระบบจัดการแจ้งปัญหาและคำขอจากลูกค้า
            </p>
          </div>

          {/* ปุ่มเปิด Popup */}
          <CreateTicketDialog onCreated={refreshTickets} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-slate-400 font-medium">
            กำลังโหลดข้อมูล...
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Tickets", count: tickets.length },
                {
                  label: "Open",
                  count: tickets.filter(t => t.status === "Open").length,
                },
                {
                  label: "In Progress",
                  count: tickets.filter(t => t.status === "In Progress").length,
                },
                {
                  label: "Resolved",
                  count: tickets.filter(t => t.status === "Resolved").length,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
                >
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-1 text-slate-800">
                    {stat.count}
                  </p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  placeholder="ค้นหา Ticket ID, ชื่อลูกค้า, หัวข้อ..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 outline-none">
                <option>สถานะทั้งหมด</option>
              </select>

              <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 outline-none">
                <option>ความสำคัญทั้งหมด</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase font-bold">
                      <th className="px-6 py-4">Ticket ID</th>
                      <th className="px-6 py-4">หัวข้อ</th>
                      <th className="px-6 py-4">ลูกค้า</th>
                      <th className="px-6 py-4">ความสำคัญ</th>
                      <th className="px-6 py-4 text-center">สถานะ</th>
                      <th className="px-6 py-4">ผู้รับผิดชอบ</th>
                      <th className="px-6 py-4 text-center">จัดการ</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    {tickets.map(ticket => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-blue-600 text-sm">
                          {ticket.id}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {ticket.title}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {ticket.customerCompany}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {ticket.customerName}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-green-50 text-green-500 border-green-100">
                            {ticket.priority}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {ticket.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-xs text-slate-500">
                          {ticket.assignee || "ยังไม่มอบหมาย"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 text-red-400 hover:bg-red-50 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-50 flex justify-between items-center bg-white">
                <p className="text-xs text-slate-400">
                  แสดง {tickets.length} รายการ
                </p>

                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                  <Download size={14} />
                  Export to Excel
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
import { getTickets } from "@/services/ticket.service"
import { DashboardData } from "@/types/dashboard/dashboardtypes"

export async function getDashboardData(
  startDate: string,
  endDate: string
): Promise<DashboardData> {
  const tickets = await getTickets()

  const kpi = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    in_progress: tickets.filter(t => t.status === "in_progress").length,
    done: tickets.filter(t => t.status === "done").length,
  }

  return {
    kpi,
    chartStatus: [
      { name: "รอดำเนินการ", value: kpi.open },
      { name: "กำลังทำ", value: kpi.in_progress },
      { name: "เสร็จแล้ว", value: kpi.done },
    ],
    pendingTickets: tickets.filter(t => t.status !== "done"),
  }
}

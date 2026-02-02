export type TicketStatus = "open" | "in_progress" | "done"

export interface Ticket {
  id: number
  title: string
  status: TicketStatus
  createdAt: string
  assignee: string
}

export interface DashboardKpi {
  total: number
  open: number
  in_progress: number
  done: number
}

export interface ChartItem {
  name: string
  value: number
}

export interface DashboardData {
  kpi: DashboardKpi
  chartStatus: ChartItem[]
  pendingTickets: Ticket[]
}

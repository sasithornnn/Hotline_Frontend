export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical"

export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved"

export interface Ticket {
  id: string
  title: string
  customerCompany: string
  customerName: string
  machineModel?: string
  serialNumber?: string
  description?: string
  priority: TicketPriority
  status: TicketStatus
  assignee?: string
  createdAt: string
}

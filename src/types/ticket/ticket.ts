// types/ticket/ticket.ts

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed"
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent"
export type TicketCategory = "Technical" | "Sales" | "Inquiry" | "Complaint" | "Feedback"
export type Department = "IT Support" | "Sales" | "Customer Service" | "Technical" | "Finance"

export interface Ticket {
  id: string
  title: string
  customer: string
  contactPerson: string
  email: string
  phone: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  department: Department
  assignedTo: string
  createdDate: string
  updatedDate: string
  description: string
}

export interface TicketFormData {
  title: string
  customer: string
  contactPerson: string
  email: string
  phone: string
  category: TicketCategory
  priority: TicketPriority
  department: Department
  description: string
}

export interface TicketStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  closed?: number
}

export interface TicketFilters {
  searchTerm: string
  filterStatus: string
  filterPriority: string
}
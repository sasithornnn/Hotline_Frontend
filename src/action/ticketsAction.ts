import { Ticket, TicketPriority } from "@/types/ticket/ticket"

let mockTickets: Ticket[] = []

export async function getTickets(): Promise<Ticket[]> {
  return mockTickets
}

export async function createTicket(payload: {
  customerCompany: string
  customerName: string
  machineModel: string
  serialNumber: string
  title: string
  description: string
  priority: TicketPriority
}): Promise<Ticket> {
  const newTicket: Ticket = {
    id: `T-${Date.now()}`,
    customerCompany: payload.customerCompany,
    customerName: payload.customerName,
    machineModel: payload.machineModel,
    serialNumber: payload.serialNumber,
    title: payload.title,
    description: payload.description,
    priority: payload.priority,
    status: "Open",
    assignee: undefined,
    createdAt: new Date().toISOString(),
  }

  mockTickets = [newTicket, ...mockTickets]
  return newTicket
}

export async function deleteTicket(id: string) {
  mockTickets = mockTickets.filter(t => t.id !== id)
}

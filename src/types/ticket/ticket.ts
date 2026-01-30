export interface Ticket {
  id: string;
  title: string;
  customerName: string;
  customerCompany: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignee?: string;
  createdAt: string;
}
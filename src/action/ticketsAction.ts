import { Ticket } from "@/types/ticket/ticket";

const MOCK_TICKETS: Ticket[] = [
  { id: 'TCK-001', title: 'ระบบ Login ไม่สามารถเข้าสู่ระบบได้', customerCompany: 'บริษัท ABC จำกัด', customerName: 'คุณสมชาย ใจดี', category: 'Technical', priority: 'High', status: 'In Progress', assignee: 'Somsak Jaidee', createdAt: '2026-01-28' },
  { id: 'TCK-002', title: 'ขอใบเสนอราคาสินค้า Model XYZ-100', customerCompany: 'ห้างหุ้นส่วนจำกัด DEF', customerName: 'คุณสมหญิง รักสวย', category: 'Sales', priority: 'Medium', status: 'Open', assignee: undefined, createdAt: '2026-01-29' },
  { id: 'TCK-003', title: 'เครื่องพิมพ์เสีย ไม่สามารถพิมพ์เอกสาร...', customerCompany: 'บริษัท GHI จำกัด (มหาชน)', customerName: 'คุณประยุทธ ทำดี', category: 'Technical', priority: 'High', status: 'Resolved', assignee: 'Somsak Jaidee', createdAt: '2026-01-25' },
];

export const getTickets = async (): Promise<Ticket[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_TICKETS), 500));
};
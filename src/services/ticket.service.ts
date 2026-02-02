import { Ticket } from "@/types/dashboard/dashboardtypes"

export async function getTickets(): Promise<Ticket[]> {
  return [
    {
      id: 1,
      title: "เข้าระบบไม่ได้",
      status: "open",
      createdAt: "2026-01-01",
      assignee: "IT",
    },
    {
      id: 2,
      title: "ลืมรหัสผ่าน",
      status: "done",
      createdAt: "2026-01-02",
      assignee: "IT",
    },
    {
      id: 3,
      title: "ระบบช้า",
      status: "in_progress",
      createdAt: "2026-01-03",
      assignee: "Dev",
    },
    {
      id: 4,
      title: "แก้ไขข้อมูลไม่ได้",
      status: "open",
      createdAt: "2026-01-04",
      assignee: "Admin",
    },
  ]
}

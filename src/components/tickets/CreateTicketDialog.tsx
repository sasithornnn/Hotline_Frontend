"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createTicket } from "@/action/ticketsAction"
import { TicketPriority } from "@/types/ticket/ticket"

export default function CreateTicketDialog({
  onCreated,
}: {
  onCreated: () => void
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    customerCompany: "",
    customerName: "",
    machineModel: "",
    serialNumber: "",
    title: "",
    description: "",
    priority: "Medium" as TicketPriority,
  })

  const submit = async () => {
    if (!form.title || !form.customerCompany) return

    setLoading(true)
    await createTicket(form)
    setLoading(false)

    setOpen(false)
    onCreated()

    setForm({
      customerCompany: "",
      customerName: "",
      machineModel: "",
      serialNumber: "",
      title: "",
      description: "",
      priority: "Medium",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <Plus size={18} />
          สร้าง Ticket ใหม่
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>แจ้งปัญหาเครื่องลูกค้า</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* ข้อมูลลูกค้า & เครื่อง */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold border-b pb-2">
              ข้อมูลลูกค้า & เครื่อง
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>บริษัทลูกค้า</Label>
                <Input
                  value={form.customerCompany}
                  onChange={e =>
                    setForm({ ...form, customerCompany: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>ผู้ติดต่อ</Label>
                <Input
                  value={form.customerName}
                  onChange={e =>
                    setForm({ ...form, customerName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>รุ่นเครื่อง</Label>
                <Input
                  value={form.machineModel}
                  onChange={e =>
                    setForm({ ...form, machineModel: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Serial Number</Label>
                <Input
                  value={form.serialNumber}
                  onChange={e =>
                    setForm({ ...form, serialNumber: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          {/* รายละเอียดปัญหา */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold border-b pb-2">
              รายละเอียดปัญหา
            </h3>

            <div>
              <Label>หัวข้อปัญหา</Label>
              <Input
                value={form.title}
                onChange={e =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>อาการ / รายละเอียดเพิ่มเติม</Label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={e =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </section>

          {/* ความเร่งด่วน */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold border-b pb-2">
              ความเร่งด่วน
            </h3>

            <Select
              value={form.priority}
              onValueChange={v =>
                setForm({ ...form, priority: v as TicketPriority })
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low – ไม่เร่งด่วน</SelectItem>
                <SelectItem value="Medium">Medium – ใช้งานติดขัด</SelectItem>
                <SelectItem value="High">High – ใช้งานไม่ได้</SelectItem>
                <SelectItem value="Critical">Critical – ระบบหยุด</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={submit} disabled={loading}>
              {loading ? "กำลังบันทึก..." : "บันทึก Ticket"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
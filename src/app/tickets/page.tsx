"use client"

import { useState, useEffect } from "react"
import { 
  Search, Plus, Filter, Calendar, User, Tag, 
  Clock, CheckCircle2, AlertCircle, XCircle, 
  MoreVertical, Eye, Edit, Trash2, MessageSquare,
  Download, RefreshCw, ArrowUpDown
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Data
const initialTickets = [
  {
    id: "TCK-001",
    title: "ระบบ Login ไม่สามารถเข้าสู่ระบบได้",
    customer: "บริษัท ABC จำกัด",
    contactPerson: "คุณสมชาย ใจดี",
    email: "somchai@abc.com",
    phone: "081-234-5678",
    category: "Technical",
    priority: "High",
    status: "In Progress",
    department: "IT Support",
    assignedTo: "Somsak Jaidee",
    createdDate: "2026-01-28 09:30",
    updatedDate: "2026-01-30 14:20",
    description: "ไม่สามารถ Login เข้าระบบได้ หลังจาก Update Version ล่าสุด แสดง Error: Authentication Failed",
  },
  {
    id: "TCK-002",
    title: "ขอใบเสนอราคาสินค้า Model XYZ-100",
    customer: "ห้างหุ้นส่วนจำกัด DEF",
    contactPerson: "คุณสมหญิง รักสวย",
    email: "somying@def.com",
    phone: "082-345-6789",
    category: "Sales",
    priority: "Medium",
    status: "Open",
    department: "Sales",
    assignedTo: "Unassigned",
    createdDate: "2026-01-29 10:15",
    updatedDate: "2026-01-29 10:15",
    description: "ต้องการขอใบเสนอราคาสินค้า Model XYZ-100 จำนวน 50 ชิ้น พร้อมเงื่อนไขการชำระเงิน",
  },
  {
    id: "TCK-003",
    title: "เครื่องพิมพ์เสีย ไม่สามารถพิมพ์เอกสารได้",
    customer: "บริษัท GHI จำกัด (มหาชน)",
    contactPerson: "คุณประยุทธ ทำดี",
    email: "prayut@ghi.com",
    phone: "083-456-7890",
    category: "Technical",
    priority: "High",
    status: "Resolved",
    department: "IT Support",
    assignedTo: "Somsak Jaidee",
    createdDate: "2026-01-25 11:20",
    updatedDate: "2026-01-27 16:45",
    description: "เครื่องพิมพ์ในห้องประชุม ไม่สามารถพิมพ์เอกสารได้ มีข้อความ Error: Paper Jam",
  },
  {
    id: "TCK-004",
    title: "สอบถามรายละเอียดสินค้าและบริการ",
    customer: "ร้าน JKL Shop",
    contactPerson: "คุณวิไล สวยงาม",
    email: "wilai@jkl.com",
    phone: "084-567-8901",
    category: "Inquiry",
    priority: "Low",
    status: "Open",
    department: "Customer Service",
    assignedTo: "Unassigned",
    createdDate: "2026-01-30 08:00",
    updatedDate: "2026-01-30 08:00",
    description: "ต้องการสอบถามรายละเอียดเกี่ยวกับสินค้าและบริการที่บริษัทมีให้",
  },
  {
    id: "TCK-005",
    title: "แจ้งปัญหาการใช้งานระบบ Mobile App",
    customer: "บริษัท MNO จำกัด",
    contactPerson: "คุณอนุชา มั่งคั่ง",
    email: "anucha@mno.com",
    phone: "085-678-9012",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    department: "IT Support",
    assignedTo: "Somsri Sukjai",
    createdDate: "2026-01-28 14:30",
    updatedDate: "2026-01-30 10:15",
    description: "Mobile App ค้างบ่อย และ Crash เมื่อกดปุ่ม Submit Form",
  },
]

const statusColors = {
  "Open": "bg-blue-100 text-blue-700 border-blue-200",
  "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Resolved": "bg-green-100 text-green-700 border-green-200",
  "Closed": "bg-gray-100 text-gray-700 border-gray-200",
}

const priorityColors = {
  "Low": "bg-slate-100 text-slate-600",
  "Medium": "bg-orange-100 text-orange-600",
  "High": "bg-red-100 text-red-600",
  "Urgent": "bg-purple-100 text-purple-600",
}

const statusIcons = {
  "Open": AlertCircle,
  "In Progress": Clock,
  "Resolved": CheckCircle2,
  "Closed": XCircle,
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       ticket.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "All" || ticket.status === filterStatus
    const matchPriority = filterPriority === "All" || ticket.priority === filterPriority
    
    return matchSearch && matchStatus && matchPriority
  })

  // Statistics
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    resolved: tickets.filter(t => t.status === "Resolved").length,
  }

  const handleViewDetail = (ticket) => {
    setSelectedTicket(ticket)
    setShowDetailModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Ticket Management
              </h1>
              <p className="text-slate-600 mt-1">ระบบจัดการแจ้งปัญหาและคำขอจากลูกค้า</p>
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Plus size={20} />
              <span className="font-semibold">สร้าง Ticket ใหม่</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tickets"
            value={stats.total}
            icon={MessageSquare}
            color="from-blue-500 to-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Open"
            value={stats.open}
            icon={AlertCircle}
            color="from-orange-500 to-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            color="from-yellow-500 to-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle2}
            color="from-green-500 to-green-600"
            bgColor="bg-green-50"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหา Ticket ID, ชื่อลูกค้า, หัวข้อ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="All">สถานะทั้งหมด</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="All">ความสำคัญทั้งหมด</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Active Filters Info */}
          {(filterStatus !== "All" || filterPriority !== "All" || searchTerm) && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Filter size={16} />
              <span>แสดงผล {filteredTickets.length} จาก {tickets.length} รายการ</span>
              <button
                onClick={() => {
                  setFilterStatus("All")
                  setFilterPriority("All")
                  setSearchTerm("")
                }}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Ticket ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">หัวข้อ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">ลูกค้า</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">หมวดหมู่</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">ความสำคัญ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">สถานะ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">ผู้รับผิดชอบ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">วันที่สร้าง</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center text-slate-500">
                      <AlertCircle className="mx-auto mb-2 text-slate-400" size={48} />
                      <p className="text-lg font-medium">ไม่พบข้อมูล Ticket</p>
                      <p className="text-sm mt-1">ลองเปลี่ยนเงื่อนไขการค้นหาใหม่</p>
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => {
                    const StatusIcon = statusIcons[ticket.status]
                    return (
                      <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono font-semibold text-blue-600">{ticket.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900 line-clamp-1">{ticket.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{ticket.customer}</p>
                            <p className="text-xs text-slate-500">{ticket.contactPerson}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                            <Tag size={12} />
                            {ticket.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex px-3 py-1 rounded-full text-xs font-semibold",
                            priorityColors[ticket.priority]
                          )}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                            statusColors[ticket.status]
                          )}>
                            <StatusIcon size={12} />
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {ticket.assignedTo !== "Unassigned" ? (
                              <>
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold">
                                  {ticket.assignedTo.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm text-slate-700">{ticket.assignedTo}</span>
                              </>
                            ) : (
                              <span className="text-sm text-slate-400 italic">ยังไม่ได้มอบหมาย</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Calendar size={14} />
                            {ticket.createdDate.split(' ')[0]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewDetail(ticket)}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              title="ดูรายละเอียด"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                              title="แก้ไข"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                              title="ลบ"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            แสดง {filteredTickets.length} รายการจากทั้งหมด {tickets.length} รายการ
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700">
            <Download size={18} />
            <span className="font-medium">Export to Excel</span>
          </button>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {showDetailModal && selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedTicket(null)
          }}
        />
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal onClose={() => setShowNewTicketModal(false)} />
      )}
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={cn("p-4 rounded-xl", bgColor)}>
          <Icon className={cn("w-8 h-8 bg-gradient-to-br bg-clip-text text-transparent", color)} strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}

// Ticket Detail Modal
function TicketDetailModal({ ticket, onClose }) {
  const StatusIcon = statusIcons[ticket.status]
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{ticket.title}</h2>
            <p className="text-sm text-slate-600 mt-1">Ticket ID: <span className="font-mono font-semibold text-blue-600">{ticket.id}</span></p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XCircle size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Status & Priority */}
          <div className="flex gap-4">
            <span className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border",
              statusColors[ticket.status]
            )}>
              <StatusIcon size={16} />
              {ticket.status}
            </span>
            <span className={cn(
              "inline-flex px-4 py-2 rounded-xl text-sm font-semibold",
              priorityColors[ticket.priority]
            )}>
              Priority: {ticket.priority}
            </span>
          </div>

          {/* Customer Information */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              ข้อมูลลูกค้า
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">บริษัท</p>
                <p className="font-semibold text-slate-900">{ticket.customer}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">ผู้ติดต่อ</p>
                <p className="font-semibold text-slate-900">{ticket.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">อีเมล</p>
                <p className="font-semibold text-slate-900">{ticket.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">เบอร์โทร</p>
                <p className="font-semibold text-slate-900">{ticket.phone}</p>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">รายละเอียดปัญหา</h3>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-slate-700 leading-relaxed">{ticket.description}</p>
            </div>
          </div>

          {/* Assignment & Category */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">หมวดหมู่</h3>
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-xl">
                <Tag size={18} className="text-slate-600" />
                <span className="font-semibold text-slate-900">{ticket.category}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">แผนก</h3>
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-xl">
                <MessageSquare size={18} className="text-slate-600" />
                <span className="font-semibold text-slate-900">{ticket.department}</span>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">ผู้รับผิดชอบ</h3>
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {ticket.assignedTo !== "Unassigned" 
                  ? ticket.assignedTo.split(' ').map(n => n[0]).join('')
                  : "?"
                }
              </div>
              <span className="font-semibold text-slate-900">
                {ticket.assignedTo !== "Unassigned" ? ticket.assignedTo : "ยังไม่ได้มอบหมาย"}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-slate-600">สร้างเมื่อ:</span>
                <span className="font-semibold text-slate-900">{ticket.createdDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw size={16} className="text-slate-400" />
                <span className="text-slate-600">อัพเดทล่าสุด:</span>
                <span className="font-semibold text-slate-900">{ticket.updatedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 px-8 py-6 flex gap-3">
          <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
            เปลี่ยนสถานะ
          </button>
          <button className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors">
            แก้ไขข้อมูล
          </button>
          <button className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-colors">
            ลบ Ticket
          </button>
        </div>
      </div>
    </div>
  )
}

// New Ticket Modal
function NewTicketModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    customer: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Technical",
    priority: "Medium",
    department: "IT Support",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("สร้าง Ticket สำเร็จ! (ฟังก์ชันนี้จะเชื่อมต่อกับ Backend จริง)")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900">สร้าง Ticket ใหม่</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XCircle size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              หัวข้อ / ชื่อปัญหา *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="เช่น ระบบ Login ไม่สามารถเข้าสู่ระบบได้"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                บริษัท / ชื่อลูกค้า *
              </label>
              <input
                type="text"
                required
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                placeholder="บริษัท ABC จำกัด"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ชื่อผู้ติดต่อ *
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                placeholder="คุณสมชาย ใจดี"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                อีเมล *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="somchai@abc.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                เบอร์โทร *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="081-234-5678"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                หมวดหมู่ *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Technical">Technical</option>
                <option value="Sales">Sales</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Complaint">Complaint</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ความสำคัญ *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                แผนกรับผิดชอบ *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="IT Support">IT Support</option>
                <option value="Sales">Sales</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Technical">Technical</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              รายละเอียดปัญหา *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="กรุณาอธิบายปัญหาหรือคำขอของคุณโดยละเอียด..."
              rows="6"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
            >
              สร้าง Ticket
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
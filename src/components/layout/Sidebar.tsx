"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, Users, Settings, Search, Star, 
  ChevronRight, ClipboardList, MessageSquare, 
  Building2, History, BarChart3, LogOut, UserPlus 
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { group: "", items: [{ name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }] },
  { group: "Ticket Management", items: [
    { name: "รายการแจ้งปัญหา", icon: ClipboardList, href: "/tickets" },
    { name: "จัดการหมวดหมู่", icon: MessageSquare, href: "/categories" },
    { name: "ประวัติการแจ้งเรื่อง", icon: History, href: "/history" },
  ]},
  { group: "Organization", items: [
    { name: "แผนก", icon: Building2, href: "/departments" },
    { name: "ผู้ใช้งาน", icon: Users, href: "/users" },
  ]},
  { group: "Administration", items: [
    { name: "ลงทะเบียนพนักงาน", icon: UserPlus, href: "/register" },
    { name: "รายงานสถิติ", icon: BarChart3, href: "/reports" },
    { name: "ตั้งค่าระบบ", icon: Settings, href: "/settings" },
  ]}
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  // ✅ สร้าง State ไว้เก็บชื่อ Admin ที่ Login มาจริง
  const [user, setUser] = useState({ name: "Loading...", email: "" })

  useEffect(() => {
    // ✅ อ่านข้อมูลจาก localStorage ตอนหน้าจอโหลด
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser") // ล้าง Session
    router.push("/")
  }

  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col sticky top-0 font-sans">
      <div className="p-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <input placeholder="ค้นหาข้อมูล..." className="w-full pl-8 pr-4 py-2 bg-slate-50 rounded-md text-sm outline-none" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.group && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                <Star size={10} className="text-blue-500 fill-blue-500" /> {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                  isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50"
                )}>
                  <div className="flex items-center gap-3">
                    <item.icon size={18} /> {item.name}
                  </div>
                  <ChevronRight size={14} className={cn(isActive && "rotate-90")} />
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-2">
        {/* ✅ แสดงชื่อตามที่ดึงมาได้จริงจาก state user */}
        <div className="flex items-center gap-3 px-3 py-2">
           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
             {user.name.substring(0, 2)}
           </div>
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
             <p className="text-xs text-slate-400 truncate">{user.email}</p>
           </div>
        </div>
        
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  )
}
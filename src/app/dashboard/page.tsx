import { Sidebar } from "@/components/layout/Sidebar"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50/30">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500">ยินดีต้อนรับเข้าสู่ระบบจัดการ Hotline</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-40 bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <span className="text-slate-400 text-xs font-bold uppercase">Total Users</span>
                <p className="text-3xl font-bold text-slate-800 mt-2">1,240</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
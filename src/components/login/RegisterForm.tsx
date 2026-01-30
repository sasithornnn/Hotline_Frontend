"use client"

import { useState } from "react"
// import { handleRegister } from "@/action/loginAction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const data = Object.fromEntries(formData)
    
    // const result = await handleRegister(data)
    
    // if (result.success) {
    //   alert(result.message)
    //   formElement.reset() // ✅ ล้างข้อมูลในช่องกรอก เพื่อให้ Admin คีย์คนต่อไปได้ทันที
    // } else {
    //   alert(result.message)
    // }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-[600px] border-none shadow-lg bg-white mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-600">ลงทะเบียนพนักงานใหม่</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input name="username" required placeholder="user123" />
            </div>
            <div className="space-y-2">
              <Label>ชื่อ-นามสกุล *</Label>
              <Input name="fullname" required placeholder="ชื่อ นามสกุล" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>อีเมลพนักงาน (Zoho) *</Label>
            <Input name="email" type="email" required placeholder="name@zoho.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>กำหนด Password *</Label>
              <Input name="password" type="password" required minLength={6} />
            </div>
            <div className="space-y-2">
              <Label>ยืนยัน Password *</Label>
              <Input name="confirmPassword" type="password" required />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11">
            {loading ? "กำลังบันทึก..." : "ยืนยันการลงทะเบียน"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { handleLogin } from "@/action/loginAction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      username: formData.get("username"),
      password: formData.get("password")
    }
    
    const result = await handleLogin(data)
    
    if (result.success) {
      localStorage.setItem("currentUser", JSON.stringify(result.user))
      router.push("/dashboard")
    } else {
      alert(result.message)
      setLoading(false)
    }
  }

  return (
    <Card className="w-[400px] border-none shadow-lg bg-white">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Username</Label>
            <Input name="username" placeholder="username" className="h-11" required />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input name="password" type="password" placeholder="Enter your password" className="h-11" required />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
            {loading ? "กำลังตรวจสอบ..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


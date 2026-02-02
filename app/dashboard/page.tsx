"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bus, LogOut, Plus, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import BusPassCard from "@/components/bus-pass-card"

interface User {
  name?: string
  phone?: string
  isAuthenticated: boolean
  hasPass: boolean
}

interface BusPass {
  id: string
  type: "Ordinary" | "Luxury"
  passType: "General" | "Route"
  routes?: string[]
  validFrom: string
  validTo: string
  price: number
}

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [busPass, setBusPass] = useState<BusPass | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData) as User
    setUser(parsedUser)

    // If user has a pass, fetch it (simulated)
    if (parsedUser.hasPass) {
      // Simulate API call to get pass details
      setTimeout(() => {
        const mockPass: BusPass = {
          id: "TSRTC" + Math.floor(Math.random() * 10000000),
          type: Math.random() > 0.5 ? "Ordinary" : "Luxury",
          passType: Math.random() > 0.5 ? "General" : "Route",
          validFrom: new Date().toISOString().split("T")[0],
          validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          price: Math.random() > 0.5 ? 800 : 1200,
        }

        if (mockPass.passType === "Route") {
          mockPass.routes = ["Ameerpet", "Kukatpally", "Kokapet"]
        }

        setBusPass(mockPass)
        setIsLoading(false)
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="sticky top-0 z-10 bg-red-600 text-white shadow">
        <div className="container flex h-16 max-w-screen-md items-center justify-between px-4">
          <div className="flex items-center">
            <Bus className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-bold">Telangana Bus Pass</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-red-700">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container max-w-screen-md mx-auto p-4 flex-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome, {user?.name || user?.phone}</CardTitle>
            <CardDescription>Manage your bus pass here</CardDescription>
          </CardHeader>
        </Card>

        {busPass ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Active Bus Pass</h2>
            <BusPassCard pass={busPass} />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Active Bus Pass</CardTitle>
              <CardDescription>You don't have an active bus pass. Purchase one now!</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => router.push("/buy-pass")}>
                <Plus className="h-4 w-4 mr-2" />
                Buy New Pass
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Ticket className="h-6 w-6 text-red-600" />
                </div>
                <Link href="/buy-pass" className="text-sm font-medium">
                  Buy New Pass
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Bus className="h-6 w-6 text-red-600" />
                </div>
                <Link href="/routes" className="text-sm font-medium">
                  View Routes
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

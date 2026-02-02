"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bus } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-red-600 p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <Bus className="h-16 w-16" />
            </div>
            <h1 className="text-2xl font-bold">Telangana Bus Pass</h1>
            <p className="text-white/80 mt-1">Telangana State Road Transport Corporation</p>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-center text-gray-600">
              Welcome to the official Telangana Bus Pass application. Login or sign up to manage your bus passes.
            </p>

            <div className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => router.push("/login")}>
                Login
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
            © 2025 Telangana State Road Transport Corporation
          </div>
        </div>
      </div>
    </div>
  )
}

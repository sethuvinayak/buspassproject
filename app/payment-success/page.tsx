"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusPassCard from "@/components/bus-pass-card"

interface BusPass {
  id: string
  type: "Ordinary" | "Luxury"
  passType: "General" | "Route"
  routes?: string[]
  validFrom: string
  validTo: string
  price: number
}

export default function PaymentSuccess() {
  const router = useRouter()
  const [busPass, setBusPass] = useState<BusPass | null>(null)

  useEffect(() => {
    // Get bus pass from localStorage
    const passData = localStorage.getItem("busPass")
    if (passData) {
      setBusPass(JSON.parse(passData))
    } else {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="container max-w-screen-md mx-auto p-4 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">Your bus pass has been issued successfully</p>
          </div>

          {busPass && (
            <div className="mb-8">
              <BusPassCard pass={busPass} />
            </div>
          )}

          <div className="space-y-4">
            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>

            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => {
                // Simulate download functionality
                alert("Pass downloaded successfully!")
              }}
            >
              Download Pass
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function BuyPass() {
  const router = useRouter()
  const { toast } = useToast()
  const [passType, setPassType] = useState<"Ordinary" | "Luxury">("Ordinary")
  const [routeType, setRouteType] = useState<"General" | "Route">("General")

  const handleContinue = () => {
    // Store selection in localStorage
    localStorage.setItem(
      "passSelection",
      JSON.stringify({
        passType,
        routeType,
      }),
    )

    if (routeType === "Route") {
      router.push("/select-routes")
    } else {
      router.push("/payment")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="sticky top-0 z-10 bg-white shadow">
        <div className="container flex h-14 max-w-screen-md items-center">
          <Link href="/dashboard" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container max-w-screen-md mx-auto p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Buy New Bus Pass</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Pass Type</CardTitle>
              <CardDescription>Choose between Ordinary and Luxury bus pass</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={passType}
                onValueChange={(value) => setPassType(value as "Ordinary" | "Luxury")}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="Ordinary" id="ordinary" className="peer sr-only" />
                  <Label
                    htmlFor="ordinary"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                  >
                    <div className="mb-3 rounded-full bg-red-100 p-2">
                      <Check className={`h-5 w-5 ${passType === "Ordinary" ? "text-red-600" : "text-transparent"}`} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Ordinary</p>
                      <p className="text-sm text-gray-500">Regular bus service</p>
                      <p className="mt-2 font-semibold">₹800</p>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="Luxury" id="luxury" className="peer sr-only" />
                  <Label
                    htmlFor="luxury"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                  >
                    <div className="mb-3 rounded-full bg-red-100 p-2">
                      <Check className={`h-5 w-5 ${passType === "Luxury" ? "text-red-600" : "text-transparent"}`} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Luxury</p>
                      <p className="text-sm text-gray-500">Premium bus service</p>
                      <p className="mt-2 font-semibold">₹1200</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Pass Coverage</CardTitle>
              <CardDescription>Choose between General or Route-specific pass</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={routeType}
                onValueChange={(value) => setRouteType(value as "General" | "Route")}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="General" id="general" className="peer sr-only" />
                  <Label
                    htmlFor="general"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                  >
                    <div className="mb-3 rounded-full bg-red-100 p-2">
                      <Check className={`h-5 w-5 ${routeType === "General" ? "text-red-600" : "text-transparent"}`} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">General Pass</p>
                      <p className="text-sm text-gray-500">Valid for all routes</p>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="Route" id="route" className="peer sr-only" />
                  <Label
                    htmlFor="route"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                  >
                    <div className="mb-3 rounded-full bg-red-100 p-2">
                      <Check className={`h-5 w-5 ${routeType === "Route" ? "text-red-600" : "text-transparent"}`} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Route Pass</p>
                      <p className="text-sm text-gray-500">Select specific routes</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// List of available routes in Hyderabad
const hyderabadRoutes = [
  "Ameerpet",
  "Kukatpally",
  "Kokapet",
  "Secunderabad",
  "Hitech City",
  "Gachibowli",
  "LB Nagar",
  "Dilsukhnagar",
  "Mehdipatnam",
  "Uppal",
  "Miyapur",
  "Lingampally",
  "Koti",
  "Charminar",
  "Jubilee Hills",
  "Banjara Hills",
]

export default function SelectRoutes() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [passSelection, setPassSelection] = useState<any>(null)

  useEffect(() => {
    // Get pass selection from localStorage
    const selection = localStorage.getItem("passSelection")
    if (selection) {
      setPassSelection(JSON.parse(selection))
    } else {
      router.push("/buy-pass")
    }
  }, [router])

  const handleRouteToggle = (route: string) => {
    setSelectedRoutes((prev) => {
      if (prev.includes(route)) {
        return prev.filter((r) => r !== route)
      } else {
        if (prev.length >= 5) {
          toast({
            title: "Maximum routes selected",
            description: "You can select up to 5 routes only",
            variant: "destructive",
          })
          return prev
        }
        return [...prev, route]
      }
    })
  }

  const handleContinue = () => {
    if (selectedRoutes.length === 0) {
      toast({
        title: "No routes selected",
        description: "Please select at least one route",
        variant: "destructive",
      })
      return
    }

    // Store selected routes in localStorage
    localStorage.setItem("selectedRoutes", JSON.stringify(selectedRoutes))
    router.push("/payment")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="sticky top-0 z-10 bg-white shadow">
        <div className="container flex h-14 max-w-screen-md items-center">
          <Link href="/buy-pass" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pass Selection
          </Link>
        </div>
      </div>

      <div className="container max-w-screen-md mx-auto p-4 flex-1">
        <h1 className="text-2xl font-bold mb-2">Select Routes</h1>
        <p className="text-gray-600 mb-6">Choose up to 5 routes for your pass</p>

        <Card>
          <CardHeader>
            <CardTitle>Available Routes in Hyderabad</CardTitle>
            <CardDescription>Selected: {selectedRoutes.length}/5 routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hyderabadRoutes.map((route) => (
                <div key={route} className="flex items-center space-x-2">
                  <Checkbox
                    id={route}
                    checked={selectedRoutes.includes(route)}
                    onCheckedChange={() => handleRouteToggle(route)}
                  />
                  <Label htmlFor={route} className="cursor-pointer">
                    {route}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleContinue}>
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}

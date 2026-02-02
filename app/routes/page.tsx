"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bus, MapPin, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// List of available routes in Hyderabad with bus numbers
const routeData = [
  { from: "Ameerpet", to: "Kukatpally", busNumbers: ["219", "225", "229"] },
  { from: "Ameerpet", to: "Secunderabad", busNumbers: ["10H", "10K", "5K"] },
  { from: "Kukatpally", to: "Hitech City", busNumbers: ["216", "217", "218"] },
  { from: "Secunderabad", to: "LB Nagar", busNumbers: ["X5", "5", "5M"] },
  { from: "Mehdipatnam", to: "Charminar", busNumbers: ["7Z", "7", "8"] },
  { from: "Uppal", to: "Dilsukhnagar", busNumbers: ["X49", "49M", "49"] },
  { from: "Miyapur", to: "Lingampally", busNumbers: ["230", "230D", "230K"] },
  { from: "Koti", to: "Charminar", busNumbers: ["9X", "9M", "9K"] },
  { from: "Jubilee Hills", to: "Banjara Hills", busNumbers: ["127K", "127", "127J"] },
  { from: "Kokapet", to: "Gachibowli", busNumbers: ["177K", "177", "177X"] },
]

export default function Routes() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRoutes = routeData.filter(
    (route) =>
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <h1 className="text-2xl font-bold mb-6">Available Routes</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search routes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {route.from} to {route.to}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p>
                        {route.from} → {route.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Bus className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Bus Numbers</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {route.busNumbers.map((busNumber) => (
                          <span
                            key={busNumber}
                            className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {busNumber}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No routes found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

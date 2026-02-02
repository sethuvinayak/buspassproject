import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Calendar, MapPin } from "lucide-react"

interface BusPass {
  id: string
  type: "Ordinary" | "Luxury"
  passType: "General" | "Route"
  routes?: string[]
  validFrom: string
  validTo: string
  price: number
}

interface BusPassCardProps {
  pass: BusPass
}

export default function BusPassCard({ pass }: BusPassCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-red-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bus className="h-5 w-5 mr-2" />
            <h3 className="font-bold">TSRTC Bus Pass</h3>
          </div>
          <Badge variant="outline" className="text-white border-white">
            {pass.type}
          </Badge>
        </div>
        <p className="text-xs mt-1 text-white/80">ID: {pass.id}</p>
      </div>

      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pass Type</p>
              <p className="font-medium">{pass.passType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-medium">₹{pass.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm">
                Valid from <span className="font-medium">{pass.validFrom}</span> to{" "}
                <span className="font-medium">{pass.validTo}</span>
              </p>
            </div>
          </div>

          {pass.passType === "Route" && pass.routes && (
            <div className="border-t pt-3">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Routes</p>
                  <div className="flex flex-wrap gap-2">
                    {pass.routes.map((route) => (
                      <Badge key={route} variant="secondary">
                        {route}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 border-t">
        <div className="w-full text-center">
          <p className="text-sm text-gray-500">Scan this pass when boarding the bus</p>
        </div>
      </CardFooter>
    </Card>
  )
}

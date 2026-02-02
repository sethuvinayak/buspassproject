"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function Payment() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [passSelection, setPassSelection] = useState<any>(null)
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [totalAmount, setTotalAmount] = useState(0)

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    // Get pass selection from localStorage
    const selection = localStorage.getItem("passSelection")
    const routes = localStorage.getItem("selectedRoutes")

    if (selection) {
      const parsedSelection = JSON.parse(selection)
      setPassSelection(parsedSelection)

      // Calculate total amount
      let amount = parsedSelection.passType === "Ordinary" ? 800 : 1200

      if (parsedSelection.routeType === "Route" && routes) {
        const parsedRoutes = JSON.parse(routes)
        setSelectedRoutes(parsedRoutes)
        // Add 50 rupees per route
        amount += parsedRoutes.length * 50
      }

      setTotalAmount(amount)
    } else {
      router.push("/buy-pass")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)

      // Create a new pass in localStorage
      const user = localStorage.getItem("user")
      if (user) {
        const parsedUser = JSON.parse(user)
        parsedUser.hasPass = true
        localStorage.setItem("user", JSON.stringify(parsedUser))

        // Create pass details
        const newPass = {
          id: "TSRTC" + Math.floor(Math.random() * 10000000),
          type: passSelection.passType,
          passType: passSelection.routeType,
          routes: passSelection.routeType === "Route" ? selectedRoutes : undefined,
          validFrom: new Date().toISOString().split("T")[0],
          validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          price: totalAmount,
        }

        localStorage.setItem("busPass", JSON.stringify(newPass))

        toast({
          title: "Payment successful",
          description: "Your bus pass has been issued successfully",
        })

        router.push("/payment-success")
      }
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <div className="sticky top-0 z-10 bg-white shadow">
        <div className="container flex h-14 max-w-screen-md items-center">
          <Link
            href={passSelection?.routeType === "Route" ? "/select-routes" : "/buy-pass"}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </div>
      </div>

      <div className="container max-w-screen-md mx-auto p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {passSelection && (
                <>
                  <div className="flex justify-between">
                    <span>Pass Type:</span>
                    <span className="font-medium">{passSelection.passType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-medium">{passSelection.routeType}</span>
                  </div>
                  {passSelection.routeType === "Route" && (
                    <div className="flex justify-between">
                      <span>Selected Routes:</span>
                      <span className="font-medium">{selectedRoutes.length}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking">Net Banking</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "upi" && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" required />
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "netbanking" && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <select
                    id="bank"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <>Pay ₹{totalAmount.toFixed(2)}</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

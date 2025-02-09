"use client"

import { useState } from "react"
import { CalendarIcon, CheckIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

// Phone country codes data
const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  // Add more country codes as needed
]

export default function ReservationForm() {
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const [countryCode, setCountryCode] = useState("+1")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 max-w-md">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 1 ? "bg-primary text-white" : "bg-muted"}`}
            >
              1
            </div>
            <div className="text-sm">Contact Details</div>
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 2 ? "bg-primary text-white" : "bg-muted"}`}
            >
              2
            </div>
            <div className="text-sm">Activity Details</div>
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 3 ? "bg-primary text-white" : "bg-muted"}`}
            >
              3
            </div>
            <div className="text-sm">Payment</div>
          </div>

          <Card className="border-0 min-w-xl w-full">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Enter your full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} {country.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input id="phone" className="pl-10" placeholder="Enter phone number" required />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">We'll send booking confirmation via SMS</p>
                </div>

                <Button type="submit" className="w-full">
                  Continue to Activity Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Trip Summary */}
        <Card className="w-full md:w-1/2 max-w-md h-fit">
          <CardHeader>
            <CardTitle>Trip Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL || ""}/placeholder.svg?height=120&width=120`}
                alt="Activity"
                className="w-[120px] h-[120px] object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">Private Shopping Adventure in the Souks</h3>
                <div className="text-sm text-muted-foreground">Marrakech Guided Experience</div>
                <div className="mt-2 inline-flex items-center text-sm bg-primary/10 text-primary rounded-full px-2 py-1">
                  <CheckIcon className="w-3 h-3 mr-1" />
                  Private Tour
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-b py-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Date
                </span>
                <span className="font-medium">{date ? format(date, "PP") : "Select a date"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Time</span>
                <span className="font-medium">09:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Guests</span>
                <span className="font-medium">2 adults</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span>Free cancellation until 24h before</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span>Instant confirmation</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Price per person</span>
                <span>$24.39</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>$48.78</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


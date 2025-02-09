"use client"

import { useState } from "react"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PhoneInput } from "@/components/ui/phoneInput";

import { ReservationsSchema, ReservationsFormValues } from "@/lib/schema"

export default function ReservationForm() {
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ReservationsFormValues | null>(null)

  const form = useForm<ReservationsFormValues>({
    resolver: zodResolver(ReservationsSchema),
  })

  function onSubmit(values: ReservationsFormValues) {
    try {
      setFormData(values)
      setStep(3) // Move to the recap step
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-8">
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? "bg-primary text-white" : "bg-muted"}`}>1</div>
            <div className="text-sm">Contact Information</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? "bg-primary text-white" : "bg-muted"}`}>2</div>
            <div className="text-sm">Payment</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? "bg-primary text-white" : "bg-muted"}`}>3</div>
            <div className="text-sm">Confirmation</div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Contact Information"}
                {step === 2 && "Payment"}
                {step === 3 && "Reservation Summary"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl className="w-full">
                              <PhoneInput
                                placeholder="Enter your phone number"
                                {...field}
                                defaultCountry="GB"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <div className="text-center">
                      <p>Payment information will be added here</p>
                    </div>
                  )}

                  {step === 3 && formData && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Contact Information</h3>
                        <p>Phone: {formData.phoneNumber}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Reservation Details</h3>
                        <p>Adults: {formData.adults}</p>
                        <p>Kids: {formData.kids || 0}</p>
                        <p>Pickup: {formData.isPickup ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={handlePrevious}>
                        Previous
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">Confirm Reservation</Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Summary */}
        <Card className="w-[400px] h-fit">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL || ""}/placeholder.svg?height=100&width=100`}
                  alt="Activity"
                  className="w-[100px] h-[100px] object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">Marrakech: Exclusive Private Shopping Adventure in the Souks</h3>
                  <div className="text-sm text-muted-foreground">Marrakech Guided Experience</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{date ? format(date, "PP") : "Select a date"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span>09:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers</span>
                  <span>2 adults</span>
                </div>
              </div>

              <div className="text-sm">Free cancellation before 09:00 on March 10th (local tour time)</div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>48.78€</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Book with Confidence</h4>
                <div className="flex items-center gap-2 text-sm">
                  <CheckIcon className="w-4 h-4" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

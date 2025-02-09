"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { tripFormSchema, type TripFormValues } from "@/lib/schema"
import { AddTrip } from "@/server/Admin"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

export function AddTripDialog() {
    const [open, setOpen] = useState(false)

    const form = useForm<TripFormValues>({
        resolver: zodResolver(tripFormSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            pricePrivate: "",
            priceShuttle: "",
            image: "",
            overview: "",
            includes: "",
            excludes: "",
            itinerary: [""],
            options: [{
                title: "",
                price: "",
                canPickup: false,
                isPrivate: false,
                description: ""
            }]
        },
    })

    async function onSubmit(data: TripFormValues) {
        try {
            const res = await AddTrip(data)
            if (res.error) {
                toast.error(res.error)
                return
            }

            toast.success("Activity added successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to add activity")
        } finally {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add New Trip</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Trip</DialogTitle>
                    <DialogDescription>Fill in the details for the new trip. Click save when you&apos;re done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 pr-6 pb-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Trip title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Trip subtitle" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="pricePrivate"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Private Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Private price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priceShuttle"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Shuttle Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Shuttle price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Image URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="overview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overview</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Trip overview" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="includes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Includes</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="What's included" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="excludes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Excludes</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="What's excluded" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="options"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Options</FormLabel>
                                        <FormDescription>Add the available options for the trips.</FormDescription>
                                        {form.watch("options").map((_, index) => (
                                            <FormField
                                                key={index}
                                                control={form.control}
                                                name={`options.${index}`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="flex flex-col space-y-2 p-4 border rounded-lg bg-muted/50">
                                                                <div className="flex items-center space-x-2">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`options.${index}.title`}
                                                                        render={({ field }) => (
                                                                            <Input
                                                                                placeholder="Option title"
                                                                                {...field}
                                                                            />
                                                                        )}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => {
                                                                            const currentOptions = form.getValues("options")
                                                                            if (currentOptions.length > 1) {
                                                                                const newOptions = [...currentOptions]
                                                                                newOptions.splice(index, 1)
                                                                                form.setValue("options", newOptions)
                                                                            }
                                                                        }}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`options.${index}.price`}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            placeholder="Option price"
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`options.${index}.description`}
                                                                    render={({ field }) => (
                                                                        <Textarea
                                                                            placeholder="Option description"
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`options.${index}.time`}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            placeholder="Type the time"
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                <div className="flex space-y-4 flex-col py-2 w-full">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`options.${index}.canPickup`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white rounded-md border p-4">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value}
                                                                                        onCheckedChange={field.onChange}
                                                                                    />
                                                                                </FormControl>
                                                                                <div className="space-y-1 leading-none">
                                                                                    <FormLabel>Can Pickup</FormLabel>
                                                                                    <FormDescription>
                                                                                        Check if this activity offers pickup service
                                                                                    </FormDescription>
                                                                                </div>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`options.${index}.isPrivate`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white rounded-md border p-4">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value}
                                                                                        onCheckedChange={field.onChange}
                                                                                    />
                                                                                </FormControl>
                                                                                <div className="space-y-1 leading-none">
                                                                                    <FormLabel>
                                                                                        Is Private
                                                                                    </FormLabel>
                                                                                    <FormDescription>
                                                                                        Check if this option is private
                                                                                    </FormDescription>
                                                                                </div>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => {
                                                form.setValue("options", [
                                                    ...form.getValues("options"),
                                                    {
                                                        title: "",
                                                        price: "",
                                                        canPickup: false,
                                                        isPrivate: false,
                                                        description: ""
                                                    }
                                                ])
                                            }}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Option
                                        </Button>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="itinerary"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Itinerary</FormLabel>
                                        <FormDescription>Add the itinerary items for the trip.</FormDescription>
                                        {form.watch("itinerary").map((_, index) => (
                                            <FormField
                                                key={index}
                                                control={form.control}
                                                name={`itinerary.${index}`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="flex items-center space-x-2">
                                                                <Input {...field} />
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => {
                                                                        const currentItinerary = form.getValues("itinerary")
                                                                        if (currentItinerary.length > 1) {
                                                                            const newItinerary = [...currentItinerary]
                                                                            newItinerary.splice(index, 1)
                                                                            form.setValue("itinerary", newItinerary)
                                                                        }
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => {
                                                form.setValue("itinerary", [...form.getValues("itinerary"), ""])
                                            }}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Itinerary Item
                                        </Button>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="">
                            <Button type="submit">Save Trip</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


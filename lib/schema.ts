import * as z from "zod"

export const tripFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    pricePrivate: z.string().min(1, "Private price is required"),
    priceShuttle: z.string().min(1, "Shuttle price is required"),
    image: z.string().url("Must be a valid URL").optional(),
    overview: z.string().optional(),
    includes: z.string().optional(),
    excludes: z.string().optional(),
    canPickup: z.boolean().optional(),
    duration: z.string().optional(),
    options: z.array(z.string()),
    itinerary: z.array(z.string()).min(1, "At least one itinerary item is required"),

})

export type TripFormValues = z.infer<typeof tripFormSchema>

export const activityFormSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    pricePrivate: z.string().optional(),
    priceShuttle: z.string().optional(),
    image: z.string().optional(),
    overview: z.string().optional(),
    includes: z.string().optional(),
    excludes: z.string().optional(),
    canPickup: z.boolean().optional(),
    duration: z.string().optional(),
    options: z.array(z.string()),
    itinerary: z.array(z.string()).min(1, "At least one itinerary item is required"),
})

export type ActivityFormValues = z.infer<typeof activityFormSchema>
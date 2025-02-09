import { Reservations } from '@prisma/client';
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
    duration: z.string().optional(),
    itinerary: z.array(z.string()).min(1, "At least one itinerary item is required"),
    options: z.array(z.object({
        title: z.string().optional(),
        time: z.string().optional(),
        price: z.string().optional(),
        canPickup: z.boolean().optional(),
        isPrivate: z.boolean().optional(),
        description: z.string().optional()
    }))
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
    duration: z.string().optional(),
    itinerary: z.array(z.string()).min(1, "At least one itinerary item is required"),
    options: z.array(z.object({
        title: z.string().optional(),
        price: z.string().optional(),
        time: z.string().optional(),
        canPickup: z.boolean().optional(),
        isPrivate: z.boolean().optional(),
        description: z.string().optional()
    }))
})

export type ActivityFormValues = z.infer<typeof activityFormSchema>


export const ReservationsSchema = z.object({
    tripId: z.string().optional(),
    activityId: z.string().optional(),
    dateTo: z.string(),
    adults: z.number().min(1, "At least one adult is required"),
    kids: z.number().optional(),
    isPaid: z.boolean(),
    isPickup: z.boolean(),
    pickUpPlace: z.string().optional(),
    status: z.string().optional(),
 
    phoneNumber: z.string().optional(),
    optionID: z.string().optional()
})

export type ReservationsFormValues = z.infer<typeof ReservationsSchema>
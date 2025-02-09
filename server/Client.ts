"use server"
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ReservationsFormValues, ReservationsSchema } from '@/lib/schema'
import { Prisma } from '@prisma/client'
 import { headers } from 'next/headers'



type Activities = Prisma.ActivitiesGetPayload<{
    include: {
        options: true
    }
}>;

type Trips = Prisma.TripsGetPayload<{
    include: {
        options: true
    }
}>;

export async function GetTrips(): Promise<{ error: string | undefined, data: Trips[] | null }> {

    try {
        const trips = await prisma.trips.findMany({
            include: {
                options: true
            }
        })
        return {
            error: undefined,
            data: trips
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.stack,
                data: null
            }
        }
        return {
            error: "An error occurred",
            data: null
        }

    }
}

export async function GetActivities(): Promise<{ error: string | undefined, data: Activities[] | null }> {

    try {
        const activities = await prisma.activities.findMany({
            include: {
                options: true
            }
        })
        return {
            error: undefined,
            data: activities
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.stack,
                data: null
            }
        }
        return {
            error: "An error occurred",
            data: null
        }

    }
}


interface Reservation {
    data: ReservationsFormValues
}

export async function Reserver({ data }: Reservation): Promise<{ error: string | undefined, message: string | null }> {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            message: null
        }
    }

    try {
        const reservation = ReservationsSchema.safeParse(data)

        if (!reservation.success) {
            return {
                error: reservation.error.errors[0].message,
                message: null
            }
        }

        // TODO: check if the trip or activity got paid by paypal

        await prisma.reservations.create({
            data: {
                tripId: reservation.data.tripId ?? null,
                activityId: reservation.data.activityId ?? null,
                dateTo: reservation.data.dateTo,
                adults: reservation.data.adults,
                kids: reservation.data.kids,
                isPaid: reservation.data.isPaid,
                isPickup: reservation.data.isPickup,
                pickUpPlace: reservation.data.pickUpPlace,
                status: reservation.data.status,
                userId: session.user.id,
                optionsId: reservation.data.optionID ?? null,
                email: session.user.email,
                name: session.user.name,
            },
            
        })
        return {
            error: undefined,
            message: "Reservation successful"
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.stack,
                message: null
            }
        }
        return {
            error: "An error occurred",
            message: null
        }

    }
}
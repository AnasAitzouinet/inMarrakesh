"use server"
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { tripFormSchema, TripFormValues, activityFormSchema, ActivityFormValues } from '@/lib/schema'
import { Activities, Prisma, Reservations, Trips } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'


/**
 * Adds a new trip to the database after validating the input data and checking user authentication.
 * 
 * @param   The trip data to be added, which should include:
 *   - title: string (required)
 *   - subtitle: string (optional)
 *   - pricePrivate: string (required)
 *   - priceShuttle: string (required)
 *   - image: string (optional, must be valid URL)
 *   - overview: string (optional)
 *   - includes: string (optional)
 *   - excludes: string (optional)
 *   - itinerary: string[] (required, at least one item)
 * 
 * @returns  An object containing:
 *   - error: string | null - Error message if operation fails, null if successful
 *   - data: any - The created trip data if successful, null if failed
 */
export async function AddTrip(data: TripFormValues) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const validatedData = tripFormSchema.safeParse(data)
        if (!validatedData.success) {
            return {
                error: "Invalid data",
                data: null
            }
        }

        const response = await prisma.trips.create({
            data: {
                ...validatedData.data,
            }
        })
        revalidatePath("/Admin/trips")

        return {
            error: null,
            data: response
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


export async function GetTrips(): Promise<{ error: string | undefined, data: Trips[] | null }> {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }
    try {
        const trips = await prisma.trips.findMany()
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

export async function DeleteTrip(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const trip = await prisma.trips.delete({
            where: {
                id: id
            }
        })

        revalidatePath("/Admin/trips")

        return {
            error: null,
            data: 'Trip deleted'
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


export async function UpdateTrip(id: string, data: TripFormValues) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const validatedData = tripFormSchema.safeParse(data)
        if (!validatedData.success) {
            return {
                error: "Invalid data",
                data: null
            }
        }

        const response = await prisma.trips.update({
            where: {
                id: id
            },
            data: {
                ...validatedData.data,
            }
        })

        revalidatePath("/Admin/trips")

        return {
            error: null,
            data: response
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











export async function AddActivity(data: ActivityFormValues) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const validatedData = activityFormSchema.safeParse(data)
        if (!validatedData.success) {
            return {
                error: "Invalid data",
                data: null
            }
        }

        const response = await prisma.activities.create({
            data: {
                ...validatedData.data,
            }
        })

        revalidatePath("/Admin/activities")

        return {
            error: null,
            data: response
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
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }
    try {
        const activities = await prisma.activities.findMany()
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


export async function DeleteActivity(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const activity = await prisma.activities.delete({
            where: {
                id: id
            }
        })

        revalidatePath("/Admin/activities")

        return {
            error: null,
            data: 'Activity deleted'
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

export async function UpdateActivity(id: string, data: ActivityFormValues) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }

    try {
        const validatedData = activityFormSchema.safeParse(data)
        if (!validatedData.success) {
            return {
                error: "Invalid data",
                data: null
            }
        }

        const response = await prisma.activities.update({
            where: {
                id: id
            },
            data: {
                ...validatedData.data,
            }
        })

        revalidatePath("/Admin/activities")

        return {
            error: null,
            data: response
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

type ReservationData = Prisma.ReservationsGetPayload<({
    include: {
        Trips: true,
        Activities: true
    }
})>

export async function GetReservations(): Promise<{ error: string | undefined, data: ReservationData[] | null }> {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return {
            error: "You are not logged in",
            data: null
        }
    }
    try {
        const reservations = await prisma.reservations.findMany({
            include: {
                Trips: true,
                Activities: true
            }
        })
        return {
            error: undefined,
            data: reservations
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
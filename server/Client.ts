"use server"
import { prisma } from '@/lib/prisma'
import { Activities, Trips } from '@prisma/client'

export async function GetTrips(): Promise<{ error: string | undefined, data: Trips[] | null }> {

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

export async function GetActivities(): Promise<{ error: string | undefined, data: Activities[] | null }> {

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
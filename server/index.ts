"use server"
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { tripFormSchema, TripFormValues, activityFormSchema, ActivityFormValues } from '@/lib/schema'
import { Activities, Prisma, Reservations, Trips } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'



export async function GetUser(): Promise<{
    error: string | undefined, data: Prisma.UserGetPayload<{
        include: {
            reservations: {
                include: {
                    Trips: true
                    Activities: true
                }
            }
        }
    }> | null
}> {
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

        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                reservations: {
                    include: {
                        Trips: true,
                        Activities: true
                    }
                }
            }
        })

        return {
            error: undefined,
            data: user
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
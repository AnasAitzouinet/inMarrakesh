"use server";
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function AddWishList(destinationId: string) {
    const session = await auth.api.getSession({ headers: await headers() })


    if (!session) {
        return { status: 401, message: 'You are not logged in' };
    }

    try {
        const [trip, activity] = await Promise.all([
            prisma.trips.findUnique({ where: { id: destinationId } }),
            prisma.activities.findUnique({ where: { id: destinationId } })
        ]);

        const destination = trip || activity;
        if (!destination) {
            return { status: 404, message: 'Destination not found' };
        }

        // Check if item already exists in wishlist
        const existingWishlist = await prisma.wishlist.findFirst({
            where: {
                OR: [
                    { tripId: destination.id, userId: session.user.id },
                    { activityId: destination.id, userId: session.user.id }
                ]
            }
        });

        if (existingWishlist) {
            return { status: 400, message: 'Item already in wishlist' };
        }

        const wishlistData = {
            userId: session.user.id,
            ...(trip ? { tripId: destination.id } : { activityId: destination.id })
        };

        await prisma.wishlist.create({ data: wishlistData });

        return { status: 200, message: 'Added to wishlist successfully' };
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return { status: 500, message: 'An error occurred while adding to wishlist' };
    }
}
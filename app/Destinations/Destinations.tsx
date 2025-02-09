"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DestinationItems from '@/components/DestinationItems';
import DestinationNavbar from '@/components/DestinationNavbar';
import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { useWishList } from '@/hooks/useWishList';


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

interface Destination {
    tripList: Trips[]
    activitiesList: Activities[]
}


export default function Destinations({
    tripList,
    activitiesList
}: Destination) {
    const router = useRouter();
    const { wishList } = useWishList();
    const [active, setActive] = useState<"trips" | "activities" | 'WishList'>('trips');
    const [trips, setTrips] = useState<Trips[]>(tripList);
    const [activities, setActivities] = useState<Activities[]>(activitiesList);
    const [destinations, setDestinations] = useState<Activities[] | Trips[]>([]);
 
    // Update destinations whenever active tab or wishList changes
    useEffect(() => {
        if (active === 'trips') {
            setDestinations(trips);
        } else if (active === 'activities') {
            setDestinations(activities);
        } else if (active === 'WishList') {
            setDestinations(wishList);
        }
    }, [active, wishList, trips, activities]);

    return (
        <main className='w-screen h-screen lg:relative'>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(255,224,178,.5)_100%)]"></div>
            <div className='lg:w-[35%] h-[25%] lg:fixed top-0 left-0'>
                <div className='p-5 h-full w-full'>
                    <div className='h-full w-full relative'>
                        <img src="/Home.jpg" alt="Home" className='w-full h-full object-cover rounded-3xl absolute' />
                        <h1 className='text-white text-3xl font-black bottom-0 left-0 absolute p-5'>
                            Destinations
                        </h1>
                        <DestinationNavbar
                            setActive={setActive}
                        />
                    </div>
                    <div className='lg:my-[10rem] hidden lg:block'>
                        {['trips', 'activities', 'WishList'].map((item) => (
                            <div
                                key={item}
                                onClick={() => setActive(item as "trips" | "activities" | "WishList")}
                                className='flex justify-start items-center gap-x-2 cursor-pointer w-fit'
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: active === item ? '5rem' : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='w-[5rem] h-0.5 bg-orange-600 rounded-full'
                                />
                                <h1 className='text-4xl font-bold capitalize'>{item}</h1>
                            </div>
                        ))}
                        <div className='mt-20'>
                            <div
                                onClick={() => router.push('/')}
                                className='flex justify-start items-center gap-x-2 cursor-pointer w-fit'
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='w-[5rem] h-0.5 bg-blue-600 rounded-full'
                                />
                                <h1 className='text-4xl font-bold'>Home</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:w-[65%] lg:h-screen top-0 right-0 lg:fixed overflow-auto'>
                <div className='p-5 w-full h-full'>
                    <div className='flex flex-col gap-5 pb-5'>
                        {
                            getDestinations({ active, destinations })
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}


const getDestinations = ({ active, destinations }: {
    active: string,
    destinations: Trips[] | Activities[]
}) => {
    switch (active) {
        case 'trips':

            if (destinations.length === 0) {
                return (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">
                            No trips available at the moment
                        </p>
                    </div>
                )
            }

            return destinations.map((destination) => (
                <DestinationItems key={destination.id} _={destination} />
            ))
        case 'activities':
            if (destinations.length === 0) {
                return (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">
                            No activities available at the moment
                        </p>
                    </div>
                )
            }
            return destinations.map((destination) => (
                <DestinationItems key={destination.id} _={destination} />
            ))
        case 'WishList':
            if (destinations.length === 0) {
                return (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">
                            No items in your wishlist, reload
                            the page to see your wishlist items
                        </p>
                    </div>
                )
            }
            return destinations.map((destination) => (
                <DestinationItems key={destination.id} _={destination} />
            ))
        default:
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-xl">
                        Choose a category to view destinations
                    </p>
                </div>
            )
    }
};
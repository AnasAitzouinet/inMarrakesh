"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DestinationItems from '@/components/DestinationItems';
import DestinationNavbar from '@/components/DestinationNavbar';
 import DestinationLoader from '@/components/DestinationLoader';
import { useRouter } from 'next/navigation';

interface Destination {
    id: string;
    title: string | null;
    subtitle: string | null;
    pricePrivate: string | null;
    priceShuttle: string | null;
    image: string | null;
    Video: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function Destinations() {
    const [active, setActive] = useState('Trips');
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setLoading(true);
         const mockData = [
            {
                id: '1',
                title: 'Santorini Getaway',
                subtitle: 'Explore the white-washed beauty',
                pricePrivate: '$1200',
                priceShuttle: '$800',
                image: 'https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg',
                Video: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '2',
                title: 'Safari Adventure',
                subtitle: 'Wildlife experience in Kenya',
                pricePrivate: '$1500',
                priceShuttle: '$1000',
                image: 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg',
                Video: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        if (['Trips', 'Activities'].includes(active)) {
            setDestinations(mockData);
        } else {
            setDestinations([]);
        }
        setLoading(false);
    }, [active]);

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
                        <DestinationNavbar />
                    </div>
                    <div className='lg:my-[10rem] hidden lg:block'>
                        {['Trips', 'Activities', 'WishList', 'Airports'].map((item) => (
                            <div
                                key={item}
                                onClick={() => setActive(item)}
                                className='flex justify-start items-center gap-x-2 cursor-pointer w-fit'
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: active === item ? '5rem' : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='w-[5rem] h-0.5 bg-orange-600 rounded-full'
                                />
                                <h1 className='text-4xl font-bold'>{item}</h1>
                            </div>
                        ))}
                        <div className='mt-20'>
                            <div
                                onClick={() => router.push('/')}
                                className='flex justify-start items-center gap-x-2 cursor-pointer w-fit'
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: active === '' ? '5rem' : 0 }}
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
                    <div className='flex flex-col gap-5'>

                        {
                            loading ? (
                                Array.from({ length: 2 }).map((_, i) => <DestinationLoader key={i} />)
                            ) : destinations.map((destination) => (
                                <DestinationItems key={destination.id} _={destination} type={active} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

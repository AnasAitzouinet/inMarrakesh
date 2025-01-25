"use client";

import React from 'react';
import { Separator } from './ui/separator';
import { Toggle } from './ui/toggle';
import { Ban, Heart } from 'lucide-react';
import { Button } from './ui/button';
import WhatIsOn from './WhatIsOn';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { DateRange } from "react-day-picker";
import Reserver from './Reserver';

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

export default function DestinationItems({ _, type }: { _: Destination, type: string }) {

    // const handleReserve = async (destination: Destination, date: DateRange | undefined) => {
    //     if (['Trips', 'Activities'].includes(type)) {
    //         console.log('Book now' + destination.id);
    //         try {
    //             const reserve = await AddReservations(destination.id, type, date);
    //             if (!reserve) return toast.error('An error occurred while adding the reservation');
    //             if (reserve.status === 401) {
    //                 document.getElementById('close')?.click();
    //                 return toast.error(<div className='gap-x-2 w-full flex justify-start items-center '>
    //                     <Ban />
    //                     <h1 className='font-semibold '>
    //                         You are not logged in! <a href="/SignIn" className='cursor-pointer text-blue-500 italic'>Login Now</a>
    //                     </h1>

    //                 </div>);
    //             }
    //             return toast.success('Reservation added successfully');
    //         } catch (error) {
    //             return toast.error('An error occurred while adding the reservation');
    //         }
    //     } else {
    //         return null;
    //     }
    // };

    return (
        <div className='w-full h-[33rem] rounded-3xl relative overflow-hidden'>
            <img src={_.image!} alt="" className='w-full h-full object-cover rounded-3xl absolute' />
            <Toggle
                variant="outline"
                size={"sm"}
                className='absolute z-50 top-2 md:hidden left-2 rounded-full h-10 w-10 bg-white text-red-500 group hover:text-red-500
                            data-[state=on]:bg-red-500 data-[state=on]:text-white border-0 transition-colors ease-in-out duration-700'
            >
                <Heart className='group-hover:scale-125 transition-all duration-500 ease-in-out' />
            </Toggle>
            <div className='absolute bottom-10 px-5 lg:px-8 left-0 z-20 w-full'>
                <h1 className='lg:text-5xl text-2xl text-white font-bold'>{_.title}</h1>
                <p className='lg:text-xl text-gray-400 font-semibold'>{_.subtitle}</p>
                <p className='lg:text-xl text-blue-300 font-semibold'>14$ / night</p>
                <Separator className='w-full mb-5 mt-7 bg-gray-400/40' />
                <div className='flex justify-start gap-2 items-center w-full'>
                    <Toggle
                        variant="outline"
                        size={"sm"}
                        className='hidden md:block rounded-full h-10 w-10 bg-white text-red-500 group hover:text-red-500
                            data-[state=on]:bg-red-500 data-[state=on]:text-white border-0 transition-colors ease-in-out duration-700'
                    >
                        <Heart className='group-hover:scale-125 transition-all duration-500 ease-in-out' />
                    </Toggle>
                    <Reserver
                        onReserve={(date) => {}}
                    >
                        <Button
                            variant={"ghost"}
                            className='text-white rounded-full border px-5 py-2 hover:bg-white hover:text-black transition-colors ease-in-out duration-700'
                        >
                            Book now
                        </Button>
                    </Reserver>
                </div>
            </div>
            <WhatIsOn>
                <Button
                    variant={"ghost"}
                    className='text-white absolute bottom-10 right-0 mx-8 z-20 w-2/4 
                    rounded-full border px-5 py-2 hover:bg-white hover:text-black transition-colors ease-in-out duration-700'
                >
                    What is on the trip?
                </Button>
            </WhatIsOn>
            <div className='w-full h-full absolute bg-gradient-to-b from-transparent to-black/70'></div>
        </div>
    );
}

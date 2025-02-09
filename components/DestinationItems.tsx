"use client";

import React from 'react';
import WhatIsOn from './WhatIsOn';
import { Activities, Prisma, Trips } from '@prisma/client';
import { useWishList } from '@/hooks/useWishList';
import { Button } from './ui/button';



export default function DestinationItems({ _ }: {
    _: Prisma.TripsGetPayload<{
        include: {
            options: true
        }
    }> | Prisma.ActivitiesGetPayload<{
        include: {
            options: true
        }
    }>
}) {
    const { addToWishList, removeFromWishList, isInWishList } = useWishList();

    console.log(_)
    return (
        <WhatIsOn
            image={_.image}
            _={_}

        >
            <div className='w-full h-[33rem] rounded-3xl relative overflow-hidden'>
                <img src={_.image!} alt="" className='w-full h-full object-cover rounded-3xl absolute' />
                <Button
                    onClick={() => {
                        console.log('clicked')
                        if (isInWishList(_.id)) {
                            console.log('remove')
                            removeFromWishList(_.id);
                        } else {
                            addToWishList(_);
                        }
                    }}
                    asChild
                >


                </Button>

                <div className='absolute bottom-10 px-5 lg:px-8 left-0 z-50 w-full'>
                    <h1 className='lg:text-5xl text-2xl text-white font-bold'>{_.title}</h1>
                    <p className='lg:text-xl text-gray-200 font-semibold'>{_.subtitle}</p>
                    <p className='lg:text-xl text-orange-300 font-semibold'>From {' '}
                        <span className=' font-black'>
                            {_.priceShuttle}$
                        </span>{' '}
                        per person</p>
                </div>

                <div className='w-full h-full absolute bg-gradient-to-b from-transparent to-black/70'></div>
            </div>
        </WhatIsOn>

    );
}

"use client";

import React from 'react';
import WhatIsOn from './WhatIsOn';
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { Activities, Trips } from '@prisma/client';
import { useWishList } from '@/hooks/useWishList';
import { Button } from './ui/button';



export default function DestinationItems({ _ }: { _: Trips | Activities }) {
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
                    <p className='lg:text-xl text-blue-300 font-semibold'>{_.pricePrivate}/ </p>
                    {
                    /* 
                    <Separator className='w-full mb-5 mt-7 bg-gray-400/40' />
                    
                    <div className='flex justify-start gap-2 items-center w-full'>
                        <label
                            className={cn(
                                badgeVariants({ variant: "default" }),
                                "cursor-pointer hover:bg-primary/80 has-[[data-state=unchecked]]:bg-muted has-[[data-state=unchecked]]:text-muted-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                            )}
                        >
                            <div className="flex items-center gap-1 px-5 py-2 ">
                                <Checkbox
                                    id="badge-selectable"
                                    className="peer sr-only after:absolute after:inset-0"
                                    defaultChecked
                                />
                                <Check
                                    size={12}
                                    strokeWidth={2}
                                    className="hidden peer-data-[state=checked]:block"
                                    aria-hidden="true"
                                />
                                <span className="select-none">Wishlist</span>
                            </div>
                        </label>

                        <Reserver
                            onReserve={(date) => { }}
                        >
                            <Button
                                variant={"ghost"}
                                className='text-white rounded-full border px-5 py-2 hover:bg-white hover:text-black transition-colors ease-in-out duration-700'
                            >
                                Book now
                            </Button>
                        </Reserver>
                    </div> */}
                </div>

                <div className='w-full h-full absolute bg-gradient-to-b from-transparent to-black/70'></div>
            </div>
        </WhatIsOn>

    );
}

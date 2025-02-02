"use client";

import React from 'react'


import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,

    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphine-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Reserver from './Reserver';
import { Button } from './ui/button';
import { Check, Heart } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { badgeVariants } from './ui/badge';
import { useWishList } from '@/hooks/useWishList';
import { Activities, Trips } from '@prisma/client';



interface WhatIsOnProps {
    children: React.ReactNode
    image: string | null;
    _: Trips | Activities
}

export default function WhatIsOn({ children, image, _ }: WhatIsOnProps) {
    const { addToWishList, removeFromWishList, isInWishList } = useWishList();

    return (
        <MorphingDialog
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 24,
            }}

        >
            <MorphingDialogTrigger
                className='size-full'

            >
                {children}
            </MorphingDialogTrigger>
            <MorphingDialogContainer

            >
                <MorphingDialogContent
                    style={{
                        borderRadius: '12px',
                    }}

                    className='relative h-auto w-[90vw] border border-gray-100 bg-white'
                >
                    <ScrollArea className='h-[90vh] flex flex-col items-center px-20' type='scroll'>
                        <div className='size-full flex flex-col items-center p-5'>
                            <img src={image!} alt="" className='h-[33rem] rounded-3xl object-cover w-full' />
                        </div>
                        <div className='size-full flex flex-col items-start px-8 py-3 space-y-8'>
                            <div className='flex items-center justify-start  flex-row-reverse gap-x-5 w-full'>
                                <div
                                    className={cn(
                                        badgeVariants({ variant: "default" }),
                                        "cursor-pointer hover:bg-primary/80 border-neutral-900/40 has-[[data-state=unchecked]]:bg-muted has-[[data-state=unchecked]]:text-muted-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('clicked');
                                        if (isInWishList(_.id)) {
                                            console.log('remove');
                                            removeFromWishList(_.id);
                                        } else {
                                            addToWishList(_);
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-2 px-5 py-2.5">
                                        <Checkbox
                                            id="badge-selectable"
                                            className="peer sr-only after:absolute after:inset-0"
                                            checked={!isInWishList(_.id)}
                                        />
                                        <Heart
                                            size={20}
                                            strokeWidth={2}
                                            className="hidden peer-data-[state=checked]:block"
                                            aria-hidden="true"
                                        />
                                        <span className="select-none">Wishlist</span>
                                    </div>
                                </div>

                                <Reserver
                                    onReserve={(date) => { }}
                                >
                                    <Button
                                        className='rounded-full w-1/5'
                                    >
                                        Book now
                                    </Button>
                                </Reserver>
                            </div>

                            <h1 className='text-5xl font-bold'>
                                Overview
                            </h1>
                            <p className='text-lg  text-neutral-700 font-semibold'>
                                Watch the sun rise over red dust, palm groves, and majestic open landscapes from a hot air balloon. Flying with a small group of travelers and live commentary from your veteran pilot, soak up the sights as you glide through the air, then refuel with an authentic Berber breakfast in a Moroccan tent. For ease, your tour includes door-to-door round-trip transfers.
                                Read more about - Hot Air Balloon Flight over Marrakech with Traditional Breakfast</p>

                            <h2 className='text-4xl font-bold'>
                                What&apos;s Included
                            </h2>

                            <ol>
                                <li>Food and Drinks</li>
                                <li>Breakfast</li>
                                <li>Beverages (coffee, tea, soft drinks)</li>
                            </ol>
                        </div>
                    </ScrollArea>
                    <MorphingDialogClose className='text-zinc-500' />
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>

    )
}

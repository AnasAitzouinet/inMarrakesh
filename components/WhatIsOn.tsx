"use client";

import React, { useState } from 'react'


import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,

    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphine-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Reserver from './Reserver';
import { Calendar, Check, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWishList } from '@/hooks/useWishList';
import { Activities, Trips } from '@prisma/client';
import { cn } from '@/lib/utils';



interface WhatIsOnProps {
    children: React.ReactNode
    image: string | null;
    _: Trips | Activities
}



interface TourOption {
    id: string
    title: string
    pickup: string
    price: number
    time: string
}

const tourOptions: TourOption[] = [
    {
        id: "1",
        title: "Atlas Mountain Sunrise Hot Air Balloon Ride From Marrakech",
        pickup: "Pickup included",
        price: 134.12,
        time: "6:30 AM",
    },
    {
        id: "2",
        title: "Atlas Mountain Sunset Hot Air Balloon Ride From Marrakech",
        pickup: "Pickup included",
        price: 144.12,
        time: "3:30 PM",
    },
]


export default function WhatIsOn({ children, image, _ }: WhatIsOnProps) {
    const { addToWishList, removeFromWishList, isInWishList } = useWishList();
    const [selectedOption, setSelectedOption] = useState<string>(tourOptions[0].id)
    const [travelers, setTravelers] = useState(2)

    const selectedTour = tourOptions.find((option) => option.id === selectedOption)
    const total = selectedTour ? selectedTour.price * travelers : 0

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
                    <ScrollArea className='h-[90vh] flex flex-col items-center  px-10' type='scroll'>
                        <div className='size-full flex flex-col items-center p-5'>
                            <img src={image!} alt="" className='h-[33rem] rounded-3xl object-cover w-full' />
                        </div>
                        <div className='size-full grid grid-cols-3 gap-4  relative'>
                            <div className='flex flex-col items-start px-8 py-3 space-y-8 col-span-2'>

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
                            <Card className="w-full max-w-md mb-2  top-0 right-0">
                                <CardHeader className="pb-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">From</p>
                                        <p className="text-3xl font-bold">${selectedTour?.price.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">per adult</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Date and Travelers Selection */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Select date and travelers</h3>
                                        <div className="flex items-center justify-center gap-x-2 w-full">
                                            <Button variant="outline" className="w-3/4 justify-start">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                Monday, February 3, 2025
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size={"icon"}
                                                className="w-1/4 justify-center"
                                                onClick={() => setTravelers((prev) => Math.min(prev + 1, 10))}
                                            >
                                                <Users className="mr- h-4 w-4" />
                                                {travelers}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Available Options */}
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-4">{tourOptions.length} options available for 2/3</p>

                                        <div className="space-y-3">
                                            {tourOptions.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className={cn(
                                                        "border rounded-lg p-4 space-y-4 cursor-pointer transition-colors",
                                                        selectedOption === option.id && "border-primary bg-primary/5",
                                                    )}
                                                    onClick={() => setSelectedOption(option.id)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-semibold">{option.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{option.pickup}</p>
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                "h-4 w-4 rounded-full border-2",
                                                                selectedOption === option.id ? "border-primary bg-primary" : "border-muted",
                                                            )}
                                                        >
                                                            {selectedOption === option.id && <Check className="h-3 w-3 text-primary-foreground" />}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>
                                                                {travelers} Adults x ${option.price.toFixed(2)}
                                                            </span>
                                                            <span>${(option.price * travelers).toFixed(2)}</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">(Price includes taxes and booking fees)</p>
                                                    </div>

                                                    <Button
                                                        variant={selectedOption === option.id ? "default" : "outline"}
                                                        className="w-full justify-center"
                                                    >
                                                        {option.time}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reserve Button */}
                                    <Button
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                                        onClick={() => {
                                            // Handle reservation
                                            console.log("Reserved:", {
                                                option: selectedTour,
                                                travelers,
                                                total,
                                            })
                                        }}
                                    >
                                        Reserve Now
                                    </Button>

                                    {/* Cancellation Policy */}
                                    <div className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
                                            ?
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Not sure? You can cancel this reservation up to 24 hours in advance for a full refund.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                    <MorphingDialogClose className='text-zinc-500' />
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>

    )
}

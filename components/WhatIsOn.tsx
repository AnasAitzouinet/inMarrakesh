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
import { Calendar, Check, MapPin, Users, X } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWishList } from '@/hooks/useWishList';
import { Activities, Prisma, Trips } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Reserver } from '@/server/Client';

interface WhatIsOnProps {
    children: React.ReactNode
    image: string | null;
    _: Prisma.TripsGetPayload<{
        include: {
            options: true
        }
    }> | Prisma.ActivitiesGetPayload<{
        include: {
            options: true
        }
    }>
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
            <MorphingDialogTrigger className='size-full'>
                {children}
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent
                    style={{ borderRadius: '12px' }}
                    className='relative h-auto w-[90vw] md:w-[80vw] lg:w-[70vw] border border-gray-100 bg-white'
                >
                    <ScrollArea className='h-[90vh] flex flex-col items-center px-4 md:px-10' type='scroll'>
                        <div className='size-full flex flex-col items-center p-2 md:p-5'>
                            <img src={image!} alt="" className='h-[20rem] md:h-[33rem] rounded-3xl object-cover w-full' />
                        </div>
                        <div className='size-full grid grid-cols-1 lg:grid-cols-3 gap-4 relative'>
                            <div className='flex flex-col items-start px-4 md:px-8 py-3 space-y-4 md:space-y-8 lg:col-span-2'>
                                <h1 className='text-3xl md:text-5xl font-bold'>
                                    Overview
                                </h1>
                                <p className='text-base md:text-lg text-neutral-700 font-semibold'>
                                    {_.overview}
                                </p>

                                <h2 className='text-2xl md:text-4xl font-bold'>
                                    What&apos;s Included
                                </h2>

                                <ol className='space-y-2'>
                                    {_.includes?.split('\n').map((item, index) => (
                                        <li key={index} className='flex items-center gap-2'>
                                            <Check className='text-orange-500' size={20} />
                                            <p>{item}</p>
                                        </li>
                                    ))}
                                </ol>

                                <h2 className='text-2xl md:text-4xl font-bold'>
                                    What&apos;s Excluded
                                </h2>
                                <ol className='space-y-2'>
                                    {_.excludes?.split('\n').map((item, index) => (
                                        <li key={index} className='flex items-center gap-2'>
                                            <X className='text-orange-500' size={20} />
                                            <p>{item}</p>
                                        </li>
                                    ))}
                                </ol>
                                <div>
                                    <div className="pt-6">
                                        <h2 className='text-2xl md:text-4xl font-bold mb-8'>Itinerary</h2>
                                        <div className="space-y-0">
                                            {_.itinerary.map((item, index) => (
                                                <div key={index} className="flex">
                                                    <div className="mr-4 relative">
                                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
                                                            <MapPin className="text-white" size={20} />
                                                        </div>
                                                        {index < _.itinerary.length - 1 && (
                                                            <div className="absolute top-10 left-1/2 bottom-0 w-0.5 bg-orange-300 -ml-px"></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 pb-8">
                                                        <h3 className="text-xl font-semibold flex items-center">{item}</h3>
                                                        <p>{item}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Card className="w-full h-fit max-w-md mb-2 lg:top-0 lg:right-0">
                                <CardHeader className="pb-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">From</p>
                                        <p className="text-3xl font-bold">
                                            ${_.priceShuttle ? parseFloat(_.priceShuttle).toFixed(2) : '0.00'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">per adult</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
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

                                    <div>
                                        <p className="text-sm text-muted-foreground mb-4">{_.options.length} options available for 2/3</p>

                                        <div className="space-y-3">
                                            {_.options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className={cn(
                                                        "border rounded-lg p-4 space-y-4 cursor-pointer transition-colors",
                                                        selectedOption === option.id && "bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(255,224,178,.5)_100%)] ",
                                                    )}
                                                    onClick={() => setSelectedOption(option.id)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-semibold">{option.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{option.canPickup}</p>
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
                                                                {travelers} Adults x ${(parseFloat(option?.price || '0')).toFixed(2)}
                                                            </span>
                                                            <span>${(parseFloat(option?.price || '0') * travelers).toFixed(2)}</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">(Price includes taxes and booking fees)</p>
                                                    </div>

                                                    <Button
                                                        variant={selectedOption === option.id ? "default" : "outline"}
                                                        onClick={() => setSelectedOption(option.id)}
                                                        className="w-full justify-center"
                                                    >
                                                        {option.time}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                                        onClick={async () => {
                                            await Reserver({
                                                data: {
                                                    adults: travelers,
                                                    kids: 0,
                                                    dateTo: new Date().toISOString(),
                                                    isPickup: true,
                                                    pickUpPlace: selectedTour?.pickup || '',
                                                    isPaid: false,
                                                    status: 'pending',
                                                    tripId: "null",
                                                    activityId: _.id,
                                                    optionID: selectedOption,
                                                    phoneNumber: '0777794814',
                                                }
                                            }).then((res) => {
                                                if (!res.error) {
                                                    console.log('Reservation success')
                                                } else {
                                                    console.log('Reservation failed')
                                                }
                                            })
                                        }}
                                    >
                                        Reserve Now
                                    </Button>

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

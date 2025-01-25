"use client";

import React, { use } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { AirVentIcon, Car, Hotel, MapPin, Timer, Users2, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import useMediaQuery from '@/hooks/useMediaQuery';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



interface WhatIsOnProps {
    children: React.ReactNode

}

export default function WhatIsOn({ children }: WhatIsOnProps) {
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='p-0 overflow-hidden'>
                <video src="https://www.youtube.com/watch?v=TmTYzvQO5K0"
                    controls
                    autoPlay
                    className='w-full h-full'
                />
            </DialogContent>
        </Dialog >
    )
}

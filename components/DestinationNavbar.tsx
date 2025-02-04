"use client";
import { ListEnd, Menu, X } from 'lucide-react';
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


interface DestinationNavbarProps {
    setActive: React.Dispatch<React.SetStateAction<"trips" | "activities" | "WishList">>   
}
export default function DestinationNavbar({  setActive }: DestinationNavbarProps) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter();
    return (
        <div className='relative right-0 top-0 lg:hidden h-full w-full'>
            <motion.div
                onClick={() => setOpen(!open)}
                initial={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer' }}
                animate={{ width: open ? '35%' : '3.5rem', height: open ? '90%' : '3.5rem' }}
                transition={{ duration: 0.7 , type:'spring'}}
                className='absolute top-2 right-2 flex justify-center items-center border text-white border-gray-300/40 backdrop-blur-xl rounded-2xl'>
                <AnimatePresence >
                    {
                        open ? 
                        <motion.div
                        key={1}
                        initial={{ rotate: 0 , opacity: 0}}
                        animate={{ rotate: 180 , opacity: 1}}
                        transition={{ duration: 0.5 , type:'spring' }}
                        exit={{  rotate: 0 , opacity: 0}}
                        className='w-8 h-8 absolute top-2 right-2'>
                            <X className=' w-full h-full ' /> 
                        </motion.div> :
                        <div className='w-8 h-8'>
                            <Menu className='w-full h-full' />
                        </div>
                    }
                </AnimatePresence>
                {
                    open && <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='absolute left-0 top-0 font-bold text-md   p-5 rounded-2xl shadow-lg'>
                        <ul>
                            <li 
                                onClick={() => router.push('/')}
                            className='hover:text-sky-500 transition-colors duration-300 ease-in-out'>Home</li>
                            <li
                                onClick={() => setActive('trips')}
                            >Trips</li>
                            <li
                                onClick={() => setActive('activities')}
                            >Activities</li>
                            <li
                                onClick={() => setActive('WishList')}
                            >Wishlist</li>
                        </ul>
                    </motion.div>
                }

            </motion.div>
        </div>
    )
}

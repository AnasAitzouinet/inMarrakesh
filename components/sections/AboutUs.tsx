"use client";
import React from 'react'
import { Button } from '../ui/button';
import { motion, useInView } from 'framer-motion';

export default function AboutUs() {

    const pRef = React.useRef(null)
    const pInView = useInView(pRef)

    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 md:px-12 lg:px-20 my-20 md:my-32 lg:my-40 max-w-[1440px] mx-auto'>
            <div className='flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 space-y-2'>
                <motion.span
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : -100 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className='text-orange-500 font-bold text-center sm:text-left'>About Us</motion.span>
                <motion.h1
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : -100 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className='text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left leading-tight'>
                    Unforgettable Trips in Marrakesh
                </motion.h1>
                <motion.p
                    ref={pRef}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : -100 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className='text-neutral-500 py-3 text-center sm:text-left text-sm sm:text-base max-w-[600px]'>
                    Discover Marrakesh with our premier tourism agency. With 20+ years of transport expertise, we&apos;ve evolved into a full-service provider offering seamless travel experiences across Morocco. From vibrant cities to stunning landscapes, we ensure your journey is unforgettable.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : -100 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className='flex justify-center sm:justify-start'
                >
                    <Button
                        className='bg-orange-500 text-white rounded-full hover:bg-orange-600 w-[10rem] h-[3rem] text-sm sm:text-base'
                    >Join us</Button>
                </motion.div>
            </div>

            <motion.div className='grid grid-cols-2 gap-2 mt-8 lg:mt-0 max-w-[600px] lg:max-w-none mx-auto lg:mx-0'>
                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : 100 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    src='/bg.jpg' className='w-full h-full object-cover rounded-tl-[1.5rem] sm:rounded-tl-[2rem] lg:rounded-tl-[4rem]'></motion.img>
                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : 100 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    src='/bg.jpg' className='w-full h-full object-cover rounded-tr-[1.5rem] sm:rounded-tr-[2rem] lg:rounded-tr-[4rem]'></motion.img>
                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : 100 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    src='/bg.jpg' className='w-full h-full object-cover rounded-bl-[1.5rem] sm:rounded-bl-[2rem] lg:rounded-bl-[4rem]'></motion.img>
                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: pInView ? 1 : 0, x: pInView ? 0 : 100 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    src='/bg.jpg' className='w-full h-full object-cover rounded-br-[1.5rem] sm:rounded-br-[2rem] lg:rounded-br-[4rem]'></motion.img>
            </motion.div>
        </div>
    )
}

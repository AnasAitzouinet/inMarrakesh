import React, { useRef } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { Heart } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { motion, useInView } from 'framer-motion';

export function Trending() {
    const refPx = useRef(null)
    const InViewPref = useInView(refPx)
    return (
        <div className="flex flex-col justify-center items-center my-33 space-y-3">
            <motion.p
                ref={refPx}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: InViewPref ? 1 : 0, x: InViewPref ? 0 : 100 }}
                transition={{ duration: 0.5, delay: 0.3 }}

                className="font-bold text-orange-500">The Perfect Trips</motion.p>
            <motion.h1
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: InViewPref ? 1 : 0, x: InViewPref ? 0 : 100 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl font-black">Trending Destinations</motion.h1>
            <BentoGrid className="max-w-7xl mx-auto pt-12">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
const imageUrl = "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Skeleton = ({ index }: { index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index* 0.3 }}
        onClick={() => {
            window.location.href = '/Destinations'
        }}
        className="flex cursor-pointer relative w-full h-full min-h-[6rem] overflow-hidden rounded-3xl">
        <DirectionAwareHover imageUrl={imageUrl}>
            <div className="flex justify- w-full items-center gap-5">
                <div>
                    <p className="font-bold text-xl">In the mountains</p>
                    <p className="font-normal text-sm">$1299 / night</p>
                </div>
                <Toggle
                    variant="outline"
                    size={"sm"}
                    className='rounded-full h-10 w-10 bg-white text-red-500 group   hover:text-red-500 data-[state=on]:bg-red-500 data-[state=on]:text-white border-0 transition-colors ease-in-out duration-700'
                >
                    <Heart className='group-hover:scale-125 transition-all duration-500 ease-in-out ' />
                </Toggle>
            </div>
        </DirectionAwareHover>
    </motion.div>
);
const items = [
    {
        title: "The Dawn of Innovation",
        description: "Explore the birth of groundbreaking ideas and inventions.",
        header: <Skeleton index={1}/>,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton index={2}/>,
    },
    {
        title: "The Art of Design",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton index={3}/>,
    },
    {
        title: "The Power of Communication",
        description:
            "Understand the impact of effective communication in our lives.",
        header: <Skeleton index={4}/>,
    },


];

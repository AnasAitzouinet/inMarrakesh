"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";



const logos = [
    "https://kissko.ma/wp-content/uploads/2024/04/KissKo-png-04.png",
    "https://www.aglioeolio.ma/img/logo.svg",
    "https://www.aglioeolio.ma/img/logo.svg",
    "https://www.aglioeolio.ma/img/logo.svg",
    "https://www.aglioeolio.ma/img/logo.svg",
    "https://www.aglioeolio.ma/img/logo.svg",
    "https://static.wixstatic.com/media/a352ca_04b3ae2fad7347b78c7dde07ad1052cd~mv2.png/v1/fill/w_355,h_133,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20terrasse.png",
    "https://ugc.production.linktr.ee/DlgWsaZqQmu2Yu9P0wVA_rtU4LFu8zv3mx5Dz?io=true&size=avatar-v3_0",
    "https://kissko.ma/wp-content/uploads/2024/04/KissKo-png-04.png",
    "https://kissko.ma/wp-content/uploads/2024/04/KissKo-png-04.png",

]

export const Partners = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 4000);
    }, [api, current]);

    return (
        <div className="w-full pt-20 lg:pt-33">
            <div className="container mx-auto">
                <div className="flex flex-col  gap-10">
                    <h2 className="text-xl text-orange-500 font-bold md:text-5xl tracking-tighter lg:max-w-2xl font-regular text-left">
                        Our Partners
                    </h2>
                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {logos.map((_, index) => (
                                <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                                    <div className="flex rounded-md aspect-square overflow-hidden relative items-center justify-center p-6">
 
                                        <img src={_} alt="" className="object-cover  " />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

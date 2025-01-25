"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const toursData = [
  {
    image: "https://lp-cms-production.imgix.net/2019-06/f783cd0dc03d54d1dfe23eaf8c40549d-jardin-majorelle.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
    title: "Jardin Majorelle",
    description: "A stunning botanical garden with vibrant blue architecture"
  },
  {
    image: "https://images.pexels.com/photos/1239161/pexels-photo-1239161.jpeg",
    title: "Saadian Tombs",
    description: "Historic royal burial site with intricate architecture"
  },
  {
    image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
    title: "Bahia Palace",
    description: "19th-century palace showcasing Moroccan architecture"
  },
  {
    image: "https://images.pexels.com/photos/1239159/pexels-photo-1239159.jpeg",
    title: "Koutoubia Mosque",
    description: "Iconic 12th-century mosque and city landmark"
  },
  {
    image: "https://images.pexels.com/photos/1239158/pexels-photo-1239158.jpeg",
    title: "Medersa Ben Youssef",
    description: "Historic Islamic college with stunning architecture"
  }
];

export const Tours = () => {
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
    }, 6000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-orange-500 font-bold text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
            Trending activities
          </h2>
          <Carousel setApi={setApi} className="w-full ">
            <CarouselContent>
              {toursData.map((tour, index) => (
                <CarouselItem className="lg:basis-1/2 py-4 " key={index}>
                  <div className="bg-muted rounded-md shadow bg-white h-full aspect-video flex flex-col overflow-hidden">
                    <div className="w-full h-[300px] overflow-hidden">
                      <img 
                        src={tour.image}
                        alt={tour.title}  
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 max-w-xs  text-base">
                      <h3 className="text-xl font-bold tracking-tight mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-muted-foreground text-base">
                        {tour.description}
                      </p>
                    </div>
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

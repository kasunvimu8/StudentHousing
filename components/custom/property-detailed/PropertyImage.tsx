"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";

const PropertyImage = ({ images }: { images: string[] }) => {
  const getImages = () => {
    return [
      {
        src: "/images/single_room.jpg",
        alt: "Image 1",
        id: "1",
      },
      {
        src: "/images/double_room.jpg",
        alt: "Image 2",
        id: "2",
      },
    ];
  };
  const imageData = getImages();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="py-1 w-full">
      <Carousel>
        <CarouselContent>
          {imageData.map((image) => {
            return (
              <CarouselItem key={image.id}>
                <div className="relative h-[250px] sm:h-[350px] md:h-[500px]">
                  {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center h-[250px] sm:h-[350px] md:h-[500px]">
                      <div className="flex items-center justify-center w-full h-full">
                        <LuLoader2 className="primary-font-color animate-spin z-10 w-8 h-8" />
                      </div>
                    </div>
                  )}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill={true}
                    onLoad={() => setLoaded(true)}
                    className="rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PropertyImage;

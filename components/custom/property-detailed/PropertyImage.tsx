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
        src: "/images/sample_bed.jpg",
        alt: "Image 1",
        id: "1",
      },
      {
        src: "/images/sample_bed_not_found.png",
        alt: "Image 1",
        id: "2",
      },
    ];
  };
  const imageData = getImages();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="py-1 w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="flex items-center justify-center w-full h-full">
            <LuLoader2 className="primary-font-color animate-spin z-10 w-8 h-8" />
          </div>
        </div>
      )}
      <Carousel>
        <CarouselContent>
          {imageData.map((image) => {
            return (
              <CarouselItem key={image.id}>
                <div className="relative h-[200px] sm:h-[300px] md:h-[500px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill={true}
                    onLoad={() => setLoaded(true)}
                    className="rounded-xl object-cover"
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

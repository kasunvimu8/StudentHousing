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
import { IoMdImages } from "react-icons/io";

const PropertyImage = ({ images }: { images: string[] }) => {
  // TODO: Change here after the storage service is available
  const getImages = (images: string[]) => {
    return images.map((file: string, index: number) => {
      const fileName = file.split("/").pop();
      return {
        src: `/images/sample/${fileName}`,
        alt: `${fileName}-${index}`,
        id: `${index}`,
      };
    });
  };
  const imageData =
    images.length > 0
      ? getImages(images)
      : [
          {
            src: "/images/sample_bed_not_found.png",
            alt: "sample_bed_not_found",
            id: "image_bed_not_found",
          },
        ];

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
        <div className="absolute bottom-0 right-2 md:bottom-4 md:right-8 m-4 text-xl text-white primary-background-color p-2 rounded flex items-center">
          <span className="font-normal text-sm">{imageData.length} Photos</span>
          <IoMdImages className="ml-1" />
        </div>
      </Carousel>
    </div>
  );
};

export default PropertyImage;

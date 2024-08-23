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
  const getImages = (images: string[]) => {
    let filteredImages = [];

    images?.forEach((file: string) => {
      if (file && file !== "") {
        const fileName = file.split("/").pop();
        filteredImages.push({
          src: file,
          alt: `${fileName}`,
          id: `${fileName}`,
        });
      }
    });

    if (filteredImages.length === 0) {
      filteredImages.push({
        src: "/images/not_found.jpg",
        alt: "property_detailed_image_not_found",
        id: "property_detailed_image_not_found",
      });
    }
    return filteredImages;
  };

  const imageData = getImages(images);

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

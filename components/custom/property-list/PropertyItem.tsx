import { formatDateTime } from "@/lib/utils";
import { Property } from "@/types";
import React from "react";
import {
  LuEuro,
  LuMoveRight,
  LuSofa,
  LuBedSingle,
  LuBoxSelect,
} from "react-icons/lu";
import { Button } from "../../ui/button";
import Image from "next/image";

const PropertyItem = ({ property }: { property: Property }) => {
  const rentType =
    property.warm_rent && property.warm_rent !== 0
      ? "Warm"
      : property.cold_rent && property.cold_rent !== 0
      ? "Cold"
      : "";
  const rent =
    rentType === "Warm"
      ? property.warm_rent
      : rentType === "Cold"
      ? property.cold_rent
      : "";
  const bedsDisplayText = property.beds
    ? property.beds === 1
      ? "1 Bed"
      : `${property.beds} Beds`
    : "";
  const src =
    property.property_type === "single_room"
      ? "/images/single_room.jpg"
      : "/images/double_room.jpg";
  return (
    <div className="flex">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="relative max-w-[380px] h-[250px]">
          <img className="rounded-t-lg" src="/images/sample_bed.jpg" alt="" />
          <Image
            src={src}
            alt={property.property_id}
            fill={true}
            className="rounded-t-lg object-cover"
          />
          <div className="absolute top-2 right-2 font-normal text-base px-[8px] py-[2px] primary-background-color secondary-font-color max-w-[80px] text-center rounded-lg">
            {property.property_id}
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <h2 className="col-span-2 text-lg font-medium">
              {property?.title}
            </h2>
            <div className="col-span-1 text-2xl justify-self-end">
              <div className="grid grid-row gap-1 ">
                <div className="flex items-center">
                  <LuEuro
                    className="text-2xl font-semibold hightlight-font-color"
                    strokeWidth={3}
                  />
                  <h2 className="text-2xl font-semibold hightlight-font-color">
                    {rent}
                  </h2>
                </div>
                <h3 className="text-sm font-medium justify-self-center hightlight-light-font-color">
                  {rentType}
                </h3>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-medium primary-light-font-color">
            {property?.address}
          </h3>
          <h3 className="text-sm font-medium primary-light-font-color mb-4">
            {`${formatDateTime(property.from).simpleDate}  -  ${
              property.to ? formatDateTime(property.to).simpleDate : "Unlimited"
            }`}
          </h3>

          <div className="grid grid-cols-10 gap-2 mb-2">
            <div className="col-span-3">
              <div className="grid grid-row gap-1 font-medium">
                <div className="flex items-center justify-self-center">
                  <LuSofa className="text-xl" />
                </div>
                <div className="flex items-center justify-self-center text-center text-xs primary-light-font-color">
                  {property?.type}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-row gap-1 font-medium">
                <div className="flex items-center justify-self-center">
                  <LuBedSingle className="text-xl" />
                </div>
                <div className="flex items-center justify-self-center text-xs primary-light-font-color">
                  {bedsDisplayText}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-row gap-1 font-medium">
                <div className="flex items-center justify-self-center">
                  <LuBoxSelect className="text-xl" />
                </div>
                <div className="flex items-center justify-self-center text-xs primary-light-font-color">
                  {property?.size} m<sup>2</sup>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex justify-end">
                <a href={`property/${property._id}`}>
                  <Button
                    className="section-highlight-background-color"
                    size="sm"
                  >
                    <LuMoveRight
                      className="h-5 w-5 text-xl secondary-font-color"
                      strokeWidth={3}
                    />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;

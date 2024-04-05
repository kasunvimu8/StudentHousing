import { Property } from "@/types";
import React from "react";
import { LuBedSingle, LuBoxSelect, LuEuro, LuSofa } from "react-icons/lu";

const PropertySummary = ({ property }: { property: Property }) => {
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

  return (
    <div className="flex items-center justify-center p-2">
      <div className="grid grid-cols-4 items-center justify-center gap-2 md:gap-4 section-light-background-color p-2 rounded-lg">
        <div className="grid grid-row gap-1 font-medium">
          <div className="flex items-center justify-self-center">
            <LuSofa className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-xs primary-light-font-color">
            {property?.type}
          </div>
        </div>
        <div className="grid grid-row gap-1 font-medium">
          <div className="flex items-center justify-self-center">
            <LuBedSingle className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-xs primary-light-font-color">
            {bedsDisplayText}
          </div>
        </div>
        <div className="grid grid-row gap-1 font-medium">
          <div className="flex items-center justify-self-center">
            <LuBoxSelect className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-xs primary-light-font-color">
            {property?.size} m<sup>2</sup>
          </div>
        </div>
        <div className="grid grid-row gap-1 font-medium">
          <div className="flex items-center justify-self-center">
            <LuEuro className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-xs primary-light-font-color">
            {rent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySummary;

import { furnishing } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Property } from "@/types";
import React from "react";
import {
  LuBuilding,
  LuBoxSelect,
  LuEuro,
  LuSofa,
  LuCalendarDays,
} from "react-icons/lu";

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
  const floorDisplayText = property.floor ? `${property.floor} Floor` : "";

  const propertType = furnishing?.find(
    (item: { id: string; description: string }) => item.id === property?.type
  );

  return (
    <div className="flex items-center justify-center relative mt-2 md:mt-0 md:-top-10">
      <div className="grid grid-flow-col items-center justify-center bg-white p-4 md:px-4 rounded-lg shadow-section gap-5 md:gap-8">
        <div className="grid gap-1">
          <div className="flex items-center justify-self-center primary-light-font-color">
            <LuSofa className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-sm lg:text-lg font-semibold primary-font-color">
            {propertType?.description}
          </div>
        </div>
        <div className="grid gap-1">
          <div className="flex items-center justify-self-center primary-light-font-color">
            <LuBuilding className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-sm lg:text-lg font-semibold primary-font-color">
            {floorDisplayText || ""}
          </div>
        </div>
        <div className="grid gap-1">
          <div className="flex items-center justify-self-center primary-light-font-color">
            <LuBoxSelect className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-sm lg:text-lg font-semibold primary-font-color">
            {property?.size} m<sup>2</sup>
          </div>
        </div>
        <div className="grid gap-1">
          <div className="flex items-center justify-self-center primary-light-font-color">
            <LuEuro className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-sm lg:text-lg font-semibold primary-font-color">
            {rent}
          </div>
        </div>
        <div className="hidden md:grid gap-1">
          <div className="flex items-center justify-self-center primary-light-font-color">
            <LuCalendarDays className="text-xl" />
          </div>
          <div className="flex items-center justify-self-center text-center text-sm lg:text-lg font-semibold primary-font-color">
            {formatDateTime(property.from).simpleDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySummary;

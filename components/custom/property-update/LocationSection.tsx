"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Input } from "@/components/ui/input";
import { PropertySectionProps } from "@/types";
import React from "react";
import "leaflet/dist/leaflet.css";
import { campusLatitude, campusLongitude } from "@/constants";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skelton";

const LocationSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
  updateLocalMapState,
}) => {
  const DefaultMap = dynamic(() => import("@/components/shared/DefaultMap"), {
    ssr: false,
    loading: () => (
      <Skeleton className="h-[250px] sm:h-[300px] py-5 rounded-lg section-light-background-color" />
    ),
  });

  const longitude: number = propertyState.longitude
    ? propertyState.longitude
    : campusLongitude;
  const latitude: number = propertyState.latitude
    ? propertyState.latitude
    : campusLatitude;
  return (
    <div className="pt-3">
      <SectionTitle title="Location" />
      <div className="w-full gap-1 py-5">
        <div className="text-sm font-normal">
          <div className="h-[300px] sm:h-[350px] py-2 rounded-lg">
            <DefaultMap
              longitude={longitude}
              latitude={latitude}
              markerUpdate={true}
              updateLocalState={updateLocalMapState}
            />
          </div>
        </div>
        <div className="w-full gap-2 grid grid-cols-2">
          <div className="grid grid-cols-4 gap-2 pt-2 col-span-2 md:col-span-1">
            <div className="text-sm font-normal primary-light-font-color col-span-1 flex items-center md:col-span-1">
              Longitude
            </div>
            <div className="text-sm font-normal col-span-4 md:col-span-3">
              <Input
                value={propertyState.longitude}
                className="bg-white max-w-[250px]"
                type="number"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  updateLocalState("longitude", e.currentTarget.value);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2 col-span-2 md:col-span-1">
            <div className="text-sm font-normal primary-light-font-color col-span-1 flex items-center md:col-span-1">
              Latitude
            </div>
            <div className="text-sm font-normal col-span-4 md:col-span-3">
              <Input
                value={propertyState.latitude}
                className="bg-white max-w-[250px]"
                type="number"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  updateLocalState("latitude", e.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;

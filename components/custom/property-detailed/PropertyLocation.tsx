"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import "leaflet/dist/leaflet.css";
import DefaultMap from "@/components/shared/DefaultMap";

const PropertyLocation = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  return (
    <div className="w-full">
      <SectionTitle title="Location" />
      <div className="h-[300px] sm:h-[350px] py-5 rounded-lg">
        <DefaultMap
          longitude={longitude}
          latitude={latitude}
          markerUpdate={false}
        />
      </div>
    </div>
  );
};

export default PropertyLocation;

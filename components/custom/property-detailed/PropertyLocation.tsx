"use client";

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SectionTitle from "@/components/shared/SectionTitle";
import { GeistSans } from "geist/font/sans";
import "leaflet/dist/leaflet.css";

const PropertyLocation = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  const createCustomIcon = function (type: string) {
    return new L.Icon({
      iconUrl:
        type === "placeholder"
          ? "/images/placeholder.png"
          : "/images/university.png",
      iconSize: [28, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
    });
  };
  return (
    <div className="w-full">
      <SectionTitle title="Location" />
      <div className="h-[300px] sm:h-[350px] py-5 rounded-lg">
        <MapContainer
          center={[longitude, latitude]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[longitude, latitude]}
            icon={createCustomIcon("placeholder")}
          ></Marker>
          <Marker
            position={[48.17237, 12.83196]}
            icon={createCustomIcon("uni")}
          >
            <Popup>
              <div
                className={`text-base	font-medium primary-font-color ${GeistSans.className}`}
              >
                TH Rosenheim, Burghausen
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyLocation;

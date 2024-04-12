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
    const url =
      type === "uni"
        ? "/images/uni.png"
        : type === "lab"
        ? "/images/lab.png"
        : "/images/placeholder.png";

    return new L.Icon({
      iconUrl: url,
      iconSize: type === "uni" || type === "lab" ? [35, 35] : [30, 32],
      iconAnchor: [0, 0],
      popupAnchor: [15, 0],
      tooltipAnchor: [16, -28],
    });
  };

  return (
    <div className="w-full">
      <SectionTitle title="Location" />
      <div className="h-[300px] sm:h-[350px] py-5 rounded-lg">
        <MapContainer
          center={[longitude, latitude]}
          zoom={16}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
          <Marker
            position={[48.175576560590315, 12.838649438427224]}
            icon={createCustomIcon("lab")}
          >
            <Popup>
              <div
                className={`text-base	font-medium primary-font-color ${GeistSans.className}`}
              >
                Campus Burghausen Laboratories
              </div>
            </Popup>
          </Marker>
          <Marker
            position={[longitude, latitude]}
            icon={createCustomIcon("placeholder")}
          ></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyLocation;

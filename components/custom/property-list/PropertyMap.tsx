"use client";

import { Fragment } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { GeistSans } from "geist/font/sans";
import { MarkerType, Property } from "@/types";
import { campusLatitude, campusLongitude } from "@/constants";
import "leaflet/dist/leaflet.css";
import { Button } from "../../ui/button";
import { LuMoveRight } from "react-icons/lu";

interface CustomCluster extends L.Marker {
  getChildCount(): number;
}

const createClusterCustomIcon = function (cluster: CustomCluster) {
  return L.divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: [33, 33],
  });
};

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

const getMarkers = (properties: Property[]) => {
  let markers: MarkerType[] = [];

  properties?.forEach((property) => {
    markers.push({
      id: property._id,
      geocode: [property.longitude, property.latitude],
      popUp: (
        <Fragment>
          <div
            className={`text-base	font-medium primary-font-color ${GeistSans.className}`}
          >
            {property.title} - {property.property_id}
          </div>
          <div
            className={`text-sm primary-font-color flex justify-center items-center ${GeistSans.className} hidden md:block`}
          >
            {property.address}
          </div>
          <div
            className={`text-sm primary-font-color pt-2 ${GeistSans.className}`}
          >
            <a
              href={`property/${property._id}`}
              className="flex items-center justify-center text-sm gap-2"
            >
              <Button className="section-highlight-background-color flex items-center justify-center gap-2">
                <span className="secondary-font-color hidden md:block">
                  More Details
                </span>
                <LuMoveRight
                  strokeWidth={3}
                  className="w-5 h-5 secondary-font-color"
                />
              </Button>
            </a>
          </div>
        </Fragment>
      ),
    });
  });

  return markers;
};

const PropertyMap = ({ properties }: { properties: Property[] }) => {
  const markers: MarkerType[] = getMarkers(properties);
  return (
    <div className="leaflet-container">
      <MapContainer
        center={[campusLongitude, campusLatitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.geocode}
              icon={createCustomIcon("placeholder")}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Marker position={[48.17237, 12.83196]} icon={createCustomIcon("uni")}>
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
  );
};

export default PropertyMap;

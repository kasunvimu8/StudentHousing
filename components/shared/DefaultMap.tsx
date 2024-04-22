"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GeistSans } from "geist/font/sans";
import "leaflet/dist/leaflet.css";
import { createCustomIcon } from "@/lib/map";
import {
  campusLatitude,
  campusLongitude,
  labLatitude,
  labLongitude,
} from "@/constants";
import { isFunction } from "@/lib/utils";

const DefaultMap = ({
  longitude,
  latitude,
  markerUpdate,
  updateLocalState,
}: {
  longitude: number;
  latitude: number;
  markerUpdate: boolean;
  updateLocalState?: (location: {
    longitude: number;
    latitude: number;
  }) => void;
}) => {
  const markerRef = useRef(null);
  const [position, setPosition] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude,
    latitude,
  });
  const [zoomLevel, setZoomLevel] = useState(13);
  // const map = useMap();

  const handleMarkerDragEnd = useCallback(() => {
    const marker: any = markerRef.current;
    if (marker != null) {
      const latLng = marker.getLatLng();
      if (latLng) {
        setPosition({
          longitude: latLng.lat,
          latitude: latLng.lng,
        });

        if (markerUpdate && isFunction(updateLocalState) && updateLocalState) {
          updateLocalState({ longitude: latLng.lat, latitude: latLng.lng });
          // setZoomLevel(map.getZoom());
        }
      }
    }
  }, [updateLocalState, markerUpdate, position]);

  const eventHandlers = useMemo(
    () => ({ dragend: handleMarkerDragEnd }),
    [handleMarkerDragEnd]
  );

  return (
    <MapContainer
      center={[campusLongitude, campusLatitude]}
      zoom={zoomLevel}
      zoomControl={true}
      scrollWheelZoom={true}
      className="w-full h-full"
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[campusLongitude, campusLatitude]}
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
        position={[labLongitude, labLatitude]}
        icon={createCustomIcon("lab")}
      >
        <Popup>
          <div
            className={`text-base font-medium primary-font-color ${GeistSans.className}`}
          >
            Campus Burghausen Laboratories
          </div>
        </Popup>
      </Marker>
      <Marker
        draggable={markerUpdate}
        position={[position.longitude, position.latitude]}
        icon={createCustomIcon("placeholder")}
        eventHandlers={eventHandlers}
        ref={markerRef}
      ></Marker>
    </MapContainer>
  );
};

export default DefaultMap;

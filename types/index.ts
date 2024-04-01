// ------------------ Type Definitions ---------------- //

import { LatLngExpression } from "leaflet";
import { ReactNode } from "react";

// ------------------------SCHDCN UI Types----------------------------------------
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

// ------------------------ Property Types ---------------------------------------

export type Property = {
  _id : string,
  title: string,
  address: string,
  from: Date,
  to: Date,
  beds: number,
  size: number,
  type: string,
  cold_rent: number,
  incidential_cost: number,
  one_time_cost: number,
  warm_rent: number,
  deposit: number,
  longitude: number,
  latitude: number,
  created_at: Date,
  updated_at: Date,
  created_by: string,
  updated_by: string,
  equipments: [string],
  documents: [string],
  images: [string],
}

// ------------------------ Map Marker Types --------------------------------

export type MarkerType = {
  id: string;
  geocode: LatLngExpression;
  popUp: ReactNode;
};
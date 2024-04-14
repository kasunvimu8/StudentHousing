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
  _id: string;
  title: string;
  address: string;
  from: Date;
  to?: Date;
  beds: number;
  size: number;
  type: string;
  cold_rent?: number;
  incidential_cost: number;
  one_time_cost: number;
  warm_rent?: number;
  deposit: number;
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  equipments: string[];
  documents: string[];
  images: string[];
  status: string;
  city: string;
  rooms: number;
  property_type: string;
  floor: number;
  additional_information: string;
  property_id: string;
  room_id: string;
};

export type PropertyDetailsType = {
  id: string;
  title: string;
  inputType: string;
  optionId?: string;
};

export type PropertyEquipmentType = {
  id: string;
  title: string;
  icon: string;
};

export type PropertyDataTableType = {
  _id: string;
  property_id: string;
  property_type: string;
  status: string;
  address: string;
  rent: number;
  from: string;
  tanent: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
};

// ------------------------ Map Marker Types --------------------------------

export type MarkerType = {
  id: string;
  geocode: LatLngExpression;
  popUp: ReactNode;
};

// -------------------------- Input Types --------------------------------

export type OptionType = {
  id: string;
  description: string;
};

export type SliderProps = {
  inputKey: string;
  className?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[];
  onValueChange?: (values: number[]) => void;
};

export type ComboContentType = {
  id: string;
  value: string;
  label: string;
};

export type FilterParamTypes = {
  page?: string;
  city?: string;
  property_type?: string;
  from?: string;
  rooms?: string;
  size?: string;
  rent?: string;
  sort?: string;
};

export type SortOption = { [key: string]: 1 | -1 };

// -------------------------- Nav Types --------------------------------------

export type NavType = {
  title: string;
  href: string;
  icon: string;
  id: string;
};

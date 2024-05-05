// ------------------ Type Definitions ---------------- //

import { ColumnDef } from "@tanstack/react-table";
import { LatLngExpression } from "leaflet";
import { ReactNode } from "react";

// ------------------ Intefaces ------------------------//
export interface PropertySectionProps {
  propertyState: Record<string, any>;
  updateLocalState: (key: string, value: any) => void;
  updateLocalMapState?: (location: {
    longitude: number;
    latitude: number;
  }) => void;
  isCreate?: boolean;
}

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

export type PropertyDeafultType = {
  property_id: string;
  room_id: string;
  title: string;
  address: string;
  from: Date | undefined;
  status: string;
  city: string;
  property_type: string;
  beds: number;
  size: number;
  type: string;
  longitude: number;
  latitude: number;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  created_by: string;
  updated_by: string;
  equipments: string[];
  documents: string[];
  images: string[];
  rooms?: number;
  floor?: number;
  to?: Date | undefined;
  additional_information?: string;
  cold_rent?: number;
  incidential_cost?: number;
  one_time_cost?: number;
  warm_rent?: number;
  deposit?: number;
  notice_period?: number;
};

export type Property = PropertyDeafultType & {
  _id: string;
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
  room_id: string;
  property_type: string;
  status: string;
  address: string;
  rent: number;
  from: string;
  to: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
};

export type ExtendedColumnDef = ColumnDef<PropertyDataTableType> & {
  columnTitle?: string;
  customData?: any;
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
  id?: string;
  page?: string;
  city?: string;
  property_type?: string;
  from?: string;
  to?: string;
  rooms?: string;
  size?: string;
  rent?: string;
  sort?: string;
  property_id?: string;
  room_id?: string;
  reservation_id?: string;
  user_id?: string;
  status?: string;
};

export type SortOption = { [key: string]: 1 | -1 };

// -------------------------- Nav Types --------------------------------------

export type NavType = {
  title: string;
  href: string;
  icon: string;
  id: string;
};

// -------------------------- My Reservation Types --------------------------------------
export type reservationPayload = {
  property_ref_id: string;
  user_id: string;
};

export type ReservationType = {
  _id: string;
  status: string;
  user_id: string;
  created_at: string;
  property_ref_id: string;
  property_id: string;
  room_id: string;
  updated_at?: string;
  updated_by?: string;
  signed_documents?: string[];
  admin_comment?: string;
  user_comment?: string;
  from: string;
  to?: string;
};

// ----------------------------- User Profile -----------------------------

export type userProfileType = {
  user_email: string;
  user_id: string;
  user_name: string;
  enrollment_id: string;
  created_at: string;
  updated_at?: string;
  totalQuota?: number;
  usedQuota?: number;
};

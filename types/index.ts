// ------------------ Type Definitions ---------------- //

import { ColumnDef } from "@tanstack/react-table";
import { LatLngExpression } from "leaflet";
import { ReactNode } from "react";
import { NextApiRequest } from "next";

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
  document_submission_deadline?: string;
  role?: string;
};

export type SortOption = { [key: string]: 1 | -1 };

// -------------------------- Nav Types --------------------------------------

export type NavType = {
  title: string;
  href: string;
  icon: string;
  id: string;
};

export type NavLinkData = {
  label: string;
  route: string;
  id: string;
  isAdminRoute: boolean;
};

export type HeaderNavItem = {
  id: string;
  title: string;
  route: string;
  description: string;
};

export type HeaderNav = {
  id: string;
  label: string;
  components: HeaderNavItem[];
};

// -------------------------- My Reservation Types --------------------------------------
export type reservationPayload = {
  property_ref_id: string;
  user_id: string;
  desired_semesters_stay: string;
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
  document_submission_deadline: string;
  from: string;
  to?: string;
  desired_semesters_stay: string;
  notice_period: number;
  days_to_end_rental: number;
  rental_end: {
    email_sent_count: number;
    last_email_sent_date: string;
    tenant_confirmation_status: boolean;
    property_dispatch: boolean;
  };
  rental_end_email_sent_count: number;
  rental_end_last_email_sent_date: string;
  rental_end_tenant_confirmation_status: boolean;
  rental_end_property_dispatch: boolean;
};

// ----------------------------- User Profile -----------------------------

export type userProfileType = {
  user_email: string;
  user_id: string;
  user_name: string;
  // enrollment_id: string;
  created_at: string;
  updated_at?: string;
  total_quota?: number;
  used_quota?: number;
  address?: string;
  country?: string;
  passport: string;
  phone?: Mobile;
  gender?: string;
  dob?: Date | undefined;
};

export type ProfileUpdateErrors = {
  user_name: string;
  dob: string;
  gender: string;
  country: string;
  phone: string;
};

export type userDetailsCompProps = {
  userState: userProfileType;
  errors: ProfileUpdateErrors;
  setErrors: React.Dispatch<React.SetStateAction<ProfileUpdateErrors>>;
  updateLocalState: (key: any, value: any) => void;
  isAdmin?: boolean;
};

export type userProfileExtended = userProfileType & {
  role: string;
};

export type RegisterErrors = {
  email: string;
  password: string;
  user_id: string;
  name: string;
  dob: string;
  gender: string;
  country: string;
  phone: string;
  passport: string;
};

export type Mobile = {
  number: string;
  countryCode: string;
};

// ----------------------------- Erros  -----------------------------
export type FileType = {
  id: string;
  data: File;
};

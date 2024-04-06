// ------ Main Menu Links ------- //

import { PropertyDetailsType } from "@/types";

export const headerLinks = [
  {
    label: "Properties",
    route: "/properties",
    id: "properties",
  },
  {
    label: "Contacts",
    route: "/contacts",
    id: "contacts",
  },
  {
    label: "Information",
    route: "/information",
    id: "information",
  },
];

// ------ Side Menu Links shows in the profile section ------- //

export const normalUserNavMenu = [
  {
    title: "My Reservation",
    href: "/reservations",
    icon: "LuHome",
    id: "reservations",
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: "LuUserCog2",
    id: "profile",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "LuLogOut",
    id: "logout",
  },
];

//--------------------- Pagination configurations ---------------------------------//

export const numberOfPropertiesInPage = 6;
export const numberPagesDisplayInPagination = 3;

// --------------------- Map configurations -----------------------------------//

export const campusLongitude = 48.17222349291457;
export const campusLatitude = 12.831968304732202;

// --------------------- Property configurations -----------------------------------//

export const propertyTypes = [
  {
    id: "apartment",
    description: "Apartment",
  },
  {
    id: "house",
    description: "House",
  },
  {
    id: "shared",
    description: "Shared Apartment",
  },
];

export const furnishing = [
  {
    id: "furnished",
    description: "Furnished",
  },
  {
    id: "not_furnished",
    description: "Not Furnished",
  },
];

export const numberOfRooms = [
  {
    id: "1",
    description: "From 1 room",
  },
  {
    id: "1.5",
    description: "From 1.5 rooms",
  },
  {
    id: "2",
    description: "From 2 rooms",
  },
  {
    id: "3",
    description: "From 3 rooms",
  },
  {
    id: "4",
    description: "More than 4 rooms",
  },
];

export const sortOptions = [
  {
    id: "newest",
    description: "Newest First",
  },
  {
    id: "highest",
    description: "Highest Rent",
  },
  {
    id: "lowest",
    description: "Lowest Rent",
  },
];

export const propertyDetailConfig = [
  {
    id: "type",
    title: "Furnishing",
    inputType: "dropdown",
    optionId: "furnishing",
  },
  {
    id: "rooms",
    title: "Rooms",
    inputType: "number",
  },
  {
    id: "from",
    title: "From Date",
    inputType: "date",
  },
  {
    id: "property_type",
    title: "Property Type",
    inputType: "dropdown",
    optionId: "propertyTypes",
  },
  {
    id: "size",
    title: "Area",
    inputType: "number",
  },
  {
    id: "to",
    title: "To Date",
    inputType: "date",
  },
  {
    id: "floor",
    title: "Floor",
    inputType: "string",
  },
  {
    id: "room_id",
    title: "Room Number",
    inputType: "string",
  },
];

// ----------------------- Filter Constants ----------------------- //

export const availableStatus = "available";

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
    id: "single_room",
    description: "Single Room",
  },
  {
    id: "shared_2_bed",
    description: "2 Beds Shared Room",
  },
  {
    id: "shared_3_bed",
    description: "3 Beds Shared Room",
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
    id: "property_type",
    title: "Property Type",
    inputType: "dropdown",
    optionId: "propertyTypes",
  },
  {
    id: "rooms",
    title: "Rooms",
    inputType: "number",
  },
  {
    id: "floor",
    title: "Floor",
    inputType: "string",
  },
  {
    id: "beds",
    title: "Beds",
    inputType: "number",
  },
  {
    id: "size",
    title: "Area",
    inputType: "number",
  },
  {
    id: "from",
    title: "Move in Date",
    inputType: "date",
  },
  {
    id: "to",
    title: "Move out Date",
    inputType: "date",
  },
  {
    id: "room_id",
    title: "Room Number",
    inputType: "string",
  },
];

export const propertyToolTips = {
  onetimeCost:
    "One-time costs may include expenses such as furniture purchases etc.",
  deposit:
    "The security deposit, paid by the tenant to the landlord at the start of the tenancy, serves to safeguard the landlord against any damages resulting from the tenant's occupancy.",
  warm: "The warm rent for this property is the inclusive monthly cost covering utilities and services (Cold rent + Incidental costs)",
};

export const equipmentsConfig = [
  {
    id: "washing-machine",
    title: "Washing Machine",
    icon: "CgSmartHomeWashMachine",
  },
  {
    id: "dryer",
    title: "Dryer",
    icon: "TbWashDry3",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    icon: "TbToolsKitchen2",
  },
  {
    id: "bath-tub",
    title: "BathTub",
    icon: "MdOutlineBathtub",
  },
  {
    id: "shower",
    title: "Shower",
    icon: "LuShowerHead",
  },
  {
    id: "dish-washer",
    title: "Dishwasher",
    icon: "LuWalletCards",
  },
  {
    id: "guest-toilet",
    title: "Guest Toilet",
    icon: "PiToilet",
  },
  {
    id: "balcony",
    title: "Balcony",
    icon: "MdBalcony",
  },
  {
    id: "garden",
    title: "Garden",
    icon: "TbHomeEco",
  },
  {
    id: "terrace",
    title: "Terrace",
    icon: "PiPark",
  },

  {
    id: "garage",
    title: "Garage",
    icon: "GiHomeGarage",
  },
  {
    id: "elevator",
    title: "Elevator",
    icon: "PiElevator",
  },
  {
    id: "common-room",
    title: "Common Room",
    icon: "RiHomeSmileLine",
  },
  {
    id: "wifi",
    title: "Wifi",
    icon: "LuWifi",
  },
  {
    id: "smoking",
    title: "Smoking",
    icon: "MdOutlineSmokingRooms",
  },
  {
    id: "parking",
    title: "Parking",
    icon: "LuParkingCircle",
  },
  {
    id: "pet",
    title: "Pets",
    icon: "LuDog",
  },
  {
    id: "bicycle",
    title: "Bicycle Celler",
    icon: "PiBicycle",
  },
  {
    id: "handycap-adopted",
    title: "Handycap Adopted",
    icon: "TbDisabled",
  },
  {
    id: "breakfast",
    title: "Breakfast Included",
    icon: "MdOutlineFreeBreakfast",
  },
];

// ----------------------- Filter Constants ----------------------- //

export const availableStatus = "available";

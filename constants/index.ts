// ------ Main Menu Links ------- //

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
    description: "Two Beds Shared Room",
  },
  {
    id: "shared_3_bed",
    description: "Three Beds Shared Room",
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

// ----------------------- Filter Constants ----------------------- //

export const availableStatus = "available";

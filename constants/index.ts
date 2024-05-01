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
    href: "/my-reservations",
    icon: "LuHome",
    id: "reservations",
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: "LuUser2",
    id: "profile",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "LuLogOut",
    id: "logout",
  },
];

export const adminUsernavigation = [
  {
    title: "Manage Properties",
    href: "/manage-properties",
    icon: "BsHouseGear",
    id: "manageProperties",
  },
  {
    title: "Manage Reservations",
    href: "/manage-reservations",
    icon: "TbHomeShield",
    id: "manageReservations",
  },
  {
    title: "Manage Users",
    href: "/manage-users",
    icon: "LuUserCog2",
    id: "manageUsers",
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
export const numberOfPropertiesInDataTable = 4;

// --------------------- Map configurations -----------------------------------//

export const campusLongitude = 48.17222349291457;
export const campusLatitude = 12.831968304732202;
export const labLongitude = 48.175576560590315;
export const labLatitude = 12.838649438427224;

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
    description: "1 Bed in a 2 Beds Shared Room",
  },
  {
    id: "shared_3_bed",
    description: "1 Bed in a 3 Beds Shared Room",
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
  // {
  //   id: "beds",
  //   title: "Beds",
  //   inputType: "number",
  // },
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

export const propertyStatuses = [
  {
    id: "available",
    description: "Available",
  },
  {
    id: "reserved",
    description: "Reserved",
  },
];

export const adminsortOptions = [
  {
    id: "newest",
    description: "Newest First",
  },
  {
    id: "recent-update",
    description: "Most Recent Update",
  },
  {
    id: "room-asc",
    description: "Room Number ASC",
  },
  {
    id: "room-decs",
    description: "Room Number DECS",
  },
];

export const reservationStatuses = [
  {
    id: "available",
    description: "Available",
    workflowNumber: 1,
    workflowDispaly: true,
    actionDescription: "",
    showInDropdown: false,
  },
  {
    id: "document_submission",
    description: "Document Submission",
    workflowNumber: 2,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription:
      "Action Required!. Please Submit the Signed Contract Documents ",
  },
  {
    id: "document_review",
    description: "Document Review",
    workflowNumber: 3,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription:
      "No Action Required. Wait for the Contract Document approval",
  },
  {
    id: "rented",
    description: "Rented",
    workflowNumber: 4,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription: "Congratulations! The Living place is now yours",
  },
  {
    id: "reservation_canceled",
    description: "Reservation Cancelled",
    workflowNumber: -1,
    workflowDispaly: false,
    showInDropdown: true,
    actionDescription:
      "Unfortunately your reservation has been cancelled by the administation",
  },
];

// ----------------------- Filter Constants ----------------------- //

export const availableStatus = "available";

// ----------------------- Data Table Config ------------------------- //

export const managePropertyInitialVisibility = {
  _id: false,
  property_id: true,
  room_id: true,
  property_type: true,
  status: true,
  address: true,
  rent: true,
  from: true,
  to: false,
  created_at: false,
  created_by: false,
  updated_at: false,
  updated_by: false,
};
export const initialVisibilityMyReservations = {
  _id: false,
  property_ref_id: false,
  status: true,
  property_id: true,
  created_at: true,
  updated_at: false,
  address: true,
  avaialble_date: true,
};

export const initialVisibilityManageReservations = {
  _id: false,
  property_ref_id: false,
  status: true,
  property_id: true,
  room_id: false,
  created_at: true,
  updated_at: false,
  address: true,
  from: false,
};

// ----------------------- Toaster Config ------------------------- //
export const duration = 10000;

// ----------------------- Reservation Specific Config ------------------------- //
export const expirationDuration = 7;
export const documentSubmission = "document_submission";
export const documentReview = "document_review";
export const reservationCancelled = "reservation_canceled";
export const reservationCompleted = "rented";

export const cancelledRequestedEntities = [
  {
    id: "user",
    description: "Tanent",
  },
  {
    id: "admin",
    description: "Admin",
  },
];

// ------ Main Menu Links ------- //

export const headerLinks = [
  {
    label: "Dashboard",
    route: "/dashboard",
    id: "dashboard",
    isAdminRoute: true,
  },
  {
    label: "Properties",
    route: "/properties",
    id: "properties",
    isAdminRoute: false,
  },
  {
    label: "Contacts",
    route: "/contacts",
    id: "contacts",
    isAdminRoute: false,
  },
  {
    label: "Information",
    route: "/information",
    id: "information",
    isAdminRoute: false,
  },
];

// ------ Side Menu Links shows in the profile section ------- //

export const normalUserNavMenu = [
  {
    title: "My Reservations",
    href: "/my-reservations",
    icon: "LuHome",
    id: "my-reservations",
  },
  {
    title: "My Profile",
    href: "/my-profile",
    icon: "LuUser2",
    id: "my-profile",
  },
];

export const adminUsernavigation = [
  {
    title: "Manage Properties",
    href: "/manage-properties",
    icon: "BsHouseGear",
    id: "manage-properties",
  },
  {
    title: "Manage Reservations",
    href: "/manage-reservations",
    icon: "TbHomeShield",
    id: "manage-reservations",
  },
  {
    title: "Manage Rentals",
    href: "/manage-rentals",
    icon: "BsHouseDown",
    id: "manage-rentals",
  },
  {
    title: "Manage Users",
    href: "/manage-users",
    icon: "LuUserCog2",
    id: "manage-users",
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
  {
    id: "notice_period",
    title: "Notice Period (Months)",
    inputType: "number",
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

export const adminUserSortOptions = [
  {
    id: "newest",
    description: "Newly Joined",
  },
  {
    id: "recent-update",
    description: "Most Recent Update",
  },
];

export const reservationStatuses = [
  {
    id: "available",
    description: "Available",
    workflowNumber: 1,
    workflowDispaly: true,
    actionDescription: "",
    adminActionDescription: "",
    showInDropdown: false,
  },
  {
    id: "document_submission",
    description: "Document Submission",
    workflowNumber: 2,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription:
      "Action Required!. Please submit the required documents ",
    adminActionDescription:
      "No Action Required. Please wait until tenant submit the documents",
  },
  {
    id: "document_review",
    description: "Document Review",
    workflowNumber: 3,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription:
      "No Action Required. Wait for the contract document approval",
    adminActionDescription:
      "Action Required!. Please check the submitted documents and approve, reject, or cancel the reservation.",
  },
  {
    id: "rented",
    description: "Rented",
    workflowNumber: 4,
    workflowDispaly: true,
    showInDropdown: true,
    actionDescription: "Congratulations! The living place is now yours",
    adminActionDescription: "The Reservation has been completed succesfully",
  },
  {
    id: "reservation_canceled",
    description: "Reservation Cancelled",
    workflowNumber: -1,
    workflowDispaly: false,
    showInDropdown: true,
    actionDescription:
      "Unfortunately your reservation has been cancelled by the administation",
    adminActionDescription: "The Reservation has been cancelled",
  },
];

export const genders = [
  {
    id: "male",
    description: "Male",
  },
  {
    id: "female",
    description: "Female",
  },
  {
    id: "diverse",
    description: "Diverse",
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
  created_at: false,
  updated_at: false,
  address: true,
  from: true,
  to: false,
  desired_semesters_stay: true,
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
  to: false,
  document_submission_deadline: false,
  desired_semesters_stay: false,
};

export const initialVisibilityManageRentals = {
  _id: false,
  property_ref_id: false,
  property_id: true,
  user_id: true,
  address: false,
  from: false,
  to: true,
  notice_period: true,
  days_to_end_rental : true,
  rental_end_email_sent_count: true,
  rental_end_last_email_sent_date: true,
  rental_end_tenant_confirmation_status: true,
  rental_end_property_dispatch: true,
  updated_at: false,
};

export const initialVisibilityManageUsers = {
  _id: false,
  user_name: true,
  user_email: true,
  user_id: true,
  role: true,
  // enrollment_id: true,
  created_at: false,
  updated_at: false,
};

// ----------------------- Toaster Config ------------------------- //
export const duration = 7000;

// ----------------------- Reservation Specific Config ------------------------- //
export const expirationDuration = 5;
export const documentSubmission = "document_submission";
export const documentReview = "document_review";
export const reservationCancelled = "reservation_canceled";
export const reservationCompleted = "rented";

export const userRoles = [
  {
    id: "user",
    description: "Tenant",
  },
  {
    id: "admin",
    description: "Admin",
  },
];

export const reservationPeriods = [
  {
    id: "1",
    description: "One semester",
  },
  {
    id: "2",
    description: "Two semesters",
  },
  {
    id: "3",
    description: "Three semesters",
  },
  {
    id: "4",
    description: "Four semesters",
  },
];

export const defaultUserReservationQuota = 2;
export const defaultNoticePeriod = 3;

// ----------------------- Authentication Specific Config ------------------------- //
export const sessionPeriodMinutes = 60;
export const resetLinkValidation = 60;
export const adminType = "admin";

// ----------------------- Information Configuration -------------------- //

export const accountInfromation = [
  {
    id: "create-account",
    question: "How do I create an account on the student housing platform ?",
    answer: `To create an account, click on the "Register" button on the login page or directly visit the registration page.
      Fill in your personal details such as first name & last name, user id (enrollment number), email, and password.
      Then confirm that the information provided is accurate and click on "Create Account." You will receive a confirmation email with a link to activate your account.
      After clicking on it, your account will be activated, and you can log in with the credentials provided. Please fill your rest of the profile information by visiting the my profile page.`,
  },
  {
    id: "forget-password",
    question: "What should I do if I forget my password?",
    answer: `If you forget your password, click on the "Forgot Password" link on the login page. Enter your registered email address, and you will receive a email with a link to reset your password.
      You should reset your password within 1 hour, as the link will expire after that.`,
  },
  {
    id: "update-details",
    question: "Can I update my account details after registration?",
    answer: `Except for email and enrollment ID you can update other details at any time by visiting "My Profile page".`,
  },
  {
    id: "account-exists",
    question: `Why I get alert saying "Acount already exists for your credentials" ?`,
    answer: `If you attempt to create an account using an existing email or enrollment ID, you will receive an error.
      You should not attempt to create a second account.`,
  },
];

export const propertiesInfromation = [
  {
    id: "property-serach",
    question: "How can I search for properties on the platform ?",
    answer: `You can search for properties by entering keywords related to location, property type, price, date or space in the filter section in the property listing page.`,
  },
  {
    id: "detailed-properties",
    question: "How can find more information about listed property?",
    answer: `You can click on the arrow displays on a listed property item and it will redirected you to porperty detailed page for more information.`,
  },
  {
    id: "notice-period",
    question: "What is the notice period means ?",
    answer: `The notice period is the time frame required to inform administration of your intention to end an agreement, typically stipulated in a contract.`,
  },
  {
    id: "warm-rent",
    question: "What is the warm rent means ?",
    answer: `Properties can have cold rent, incidental costs, and/or warm rent. Warm rent is the final monthly rent you have to pay to your landlord.`,
  },
  {
    id: "onetime-deposit",
    question: "What is the One Time Cost and Deposit means ?",
    answer: `One-time costs may include expenses such as furniture purchases, etc. The security deposit, paid by the tenant to the landlord at the start of the tenancy,
      serves to safeguard the landlord against any damages resulting from the tenant’s occupancy. If no values are provided in the respective sections,
      means you do not have to pay a deposit or any one-time costs. `,
  },
  {
    id: "reserved-property",
    question: "How can get the property details of a reserved property ?",
    answer: `You can visit the "My Reservations" page to find your reservation. Click on the three dots under the Actions column, where you will find
    a link to the property page.`,
  },
];

export const reservationInfromation = [
  {
    id: "how-to-reserve",
    question: "How do I make a reservation for a property ?",
    answer: `Once you find a property you like, click on the "Reserve" button on the property listing page. Then confirm that you understand details related to
    the reservation and then again click "Reserve".`,
  },
  {
    id: "quota",
    question: `What is reservation quota ?`,
    answer: `By default, you will only have two opportunities to make a reservation using our system. You can check your used quota by visiting the "My Profile" page. `,
  },
  {
    id: "multiple-reservations",
    question: `I cannot make reservation.  I received an alert saying "You currently have an active reservation. Please note that only one reservation can be held at a time"?`,
    answer: `You can only make one reservation at a time. If you have an active reservation, you will not be able to make a second reservation.`,
  },
  {
    id: "quota-limit",
    question: `I cannot make reservation.  I received an alert saying "your reservation quota limit. No further reservations can be made"?`,
    answer: `By detault you will only have 2 chances to make reservation using our system. You can find used quota by visiting "My Profile" page `,
  },
  {
    id: "rename",
    question: `I cannot make reservation. I am getting an alert saying "One or more documents have been incorrectly named. Kindly adhere to the document naming guidelines"`,
    answer: `You need to double-check the uploaded file names to ensure they adhere to the guidelines. You can copy the file names directly from the page.`,
  },
  {
    id: "reservation-success",
    question: "What should I do after a successfull reservation ?",
    answer: `After your temporary reservation, you need to submit the signed contract document, enrollment ID, and passport ID (or NIC) to permanently
     allocate the property under your name for the specified period. You will have 5 days from the reservation date to submit these documents.
     Failure to do so will result in the cancellation of the reservation and a decrement in your quota..`,
  },
  {
    id: "where-to-upload-doc",
    question: "How can I upload my documents  ?",
    answer: `You can visit the "My Reservations" page to find your reservation. Click on the three dots under the Actions column, where you will find
      a link to the reservation details page. On this page, you will find all the information regarding document submission.`,
  },
  {
    id: "reserve-for-other",
    question:
      "Can my colleague and I both reserve a shared room together with single reservation ?",
    answer: `No. You and your colleague must both book the property using your own accounts to secure the shared room. This is the only way to ensure the
      shared room with your colleague. Additionally, you can add a comment when you reserve the property indicating that you want to make the reservation 
      together with your colleague.`,
  },
  {
    id: "additional-comment",
    question: "What should I type in the additional comment ?",
    answer: `You can leave this input blank by default. However, if you want to send additional information to the administration regarding your reservation,
      you can add it here.`,
  },
  {
    id: "update-documents",
    question: "Can I change the documents after I submit them  ?",
    answer: `No. you can not change the documents after the submission`,
  },
  {
    id: "resubmit-comment",
    question: `I submitted the documents earlier. However, the reservation details page is still showing the "Document Submission" status. Why is that ?`,
    answer: `Because your previous document submission was rejected by the admin. You should be able to see the reason along with the admin's comments.
      You should be correct the issues with the document and submit the documents again with in the deadline. If you need more clarifiction, you may contact the admin.`,
  },
  {
    id: "review",
    question: `What does the status "Document Review" mean? Do I need to do anything?`,
    answer: `No, you do not need to do anything. "Document Review" means the stage where admins check your submitted documents.`,
  },
  {
    id: "cancelled",
    question: `What does the status "Cancelled" means?`,
    answer: `Your reservation has been cancelled by the administators due to the mentioned reason. You may contact the administrators for more
    detailed information if neccessary`,
  },
  {
    id: "rented",
    question: `What does the status "Rented" mean?`,
    answer: `The property is permenently allocated for you for the mentioned duration.`,
  },
];

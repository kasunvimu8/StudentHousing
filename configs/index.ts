const headerConfigs = {
  // configuration settings for user navigation
  user: [
    {
      id: "properties",
      label: "Properties",
      components: [
        {
          id: "properties",
          title: "Properties",
          description: "List of all available properties to reserve.",
          route: "/properties",
        },
      ],
    },
    {
      id: "reservations",
      label: "Reservations",
      components: [
        {
          title: "My Reservations",
          description: "My previous reservations details",
          route: "/my-reservations",
          id: "my-reservations",
        },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      components: [
        {
          title: "Contacts",
          description: "Contacts details of the administration",
          route: "/contacts",
          id: "contacts",
        },
      ],
    },
    {
      id: "information",
      label: "Information",
      components: [
        {
          title: "Information",
          description: "Information regarding usage of the platform",
          route: "/information",
          id: "information",
        },
      ],
    },
  ],

  admin: [
    {
      id: "home",
      label: "Home",
      components: [
        {
          id: "dahsboard",
          title: "Dahsboard",
          description:
            "Dashboard of the properties, reservations, rentals, and users.",
          route: "/dashboard",
        },
        {
          id: "properties",
          title: "Properties",
          description: "List of all available properties to reserve.",
          route: "/properties",
        },
      ],
    },
    {
      id: "admin",
      label: "Administration",
      components: [
        {
          id: "manage-properties",
          title: "Manage Properties",
          description: "Manage and configure property listings",
          route: "/manage-properties",
        },
        {
          id: "manage-reservations",
          title: "Manage Reservations",
          description: "Manage users reservations",
          route: "/manage-reservations",
        },
        {
          id: "manage-rentals",
          title: "Manage Rentals",
          description: "Manage rental end and relisting properties",
          route: "/manage-rentals",
        },
        {
          id: "manage-users",
          title: "Manage Users",
          description: "Manage user accounts and details",
          route: "/manage-users",
        },
        {
          id: "manage-waiting-list",
          title: "Manage Waiting List",
          description:
            "Manage waiting list and matching against vacant properties",
          route: "/manage-waiting-list",
        },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      components: [
        {
          title: "Contacts",
          description: "Contacts details of the administration",
          route: "/contacts",
          id: "",
        },
      ],
    },
    {
      id: "information",
      label: "Information",
      components: [
        {
          title: "Information",
          description: "Information regarding usage of the platform",
          route: "/information",
          id: "information",
        },
      ],
    },
  ],
};

export default headerConfigs;

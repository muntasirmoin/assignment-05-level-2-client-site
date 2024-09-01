import React from "react";
import AdminDashboard from "../dashboard/AdminDashboard";

import ViewUserBookings from "../pages/adminPages/userManagment/ViewUserBookings";
import UserManagementTable from "../pages/adminPages/userManagment/UserManagement";
import CreateSlotsServices from "../pages/adminPages/slot Management/CreateSlotsServices";
import ServiceDataTable from "../pages/adminPages/serviceManagement/ServiceDataTable";

export const adminRoutePaths = [
  {
    name: "Dashboards",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  // {
  //   name: "Booking",

  //   path: "create",
  //   element: <ServiceDataTable></ServiceDataTable>,
  // },

  {
    name: "Service Management",
    children: [
      {
        name: "Create Service",
        path: "create-service",
        element: <ServiceDataTable></ServiceDataTable>,
      },
    ],
  },

  {
    name: "User Management",
    // path: "create-academic-semester",
    // element: <CheckCheck />,
    children: [
      {
        name: "User Booking",
        path: "view-user-booking",
        element: <ViewUserBookings></ViewUserBookings>,
      },
      {
        name: "User List Edit",
        path: "user-management",
        element: <UserManagementTable></UserManagementTable>,
      },
    ],
  },

  {
    name: "Slot Management",
    children: [
      {
        name: "Create Slots Services",
        path: "create-slots-services",
        element: <CreateSlotsServices></CreateSlotsServices>,
      },
    ],
  },
];

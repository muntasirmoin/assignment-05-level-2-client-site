import React from "react";

import AccountInformation from "../pages/userPages/accountInformation/AccountInformation";
import UserDashboard from "../dashboard/UserDashboard";

import PastBooking from "../pages/userPages/booking/PastBooking";
import UpcomingBookings from "../pages/userPages/booking/UpcomingBookings";

export const userRoutePaths = [
  {
    name: "DashBoard",
    path: "dashboard",
    element: <UserDashboard />,
  },

  {
    name: "Account Information",
    children: [
      {
        name: "My Information",
        path: "my-information",
        element: <AccountInformation></AccountInformation>,
      },
    ],
  },

  {
    name: "Booking",
    children: [
      {
        name: "Past Booking",
        path: "my-past-booking",
        element: <PastBooking></PastBooking>,
      },

      {
        name: "Upcoming Booking",
        path: "my-upcoming-booking",
        element: <UpcomingBookings />,
      },
    ],
  },
];

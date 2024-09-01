import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/publicPages/Home";
import Reviews from "../pages/publicPages/homePage/Reviews/Reviews";
import SignUpPage from "../components/authPages/SignUpPage";
import LoginPage from "../components/authPages/LoginPage";
import ServicesPage from "../pages/publicPages/userAuthenticationPages/servicesPage/ServicesPage";
import ServiceDetailsPage from "../pages/publicPages/userAuthenticationPages/servicesPage/ServiceDetailsPage";
import BookingPageFeatures from "../pages/publicPages/userAuthenticationPages/bookingPage/BookingPageFeatures";

import { adminRoutePaths } from "./admin.route";
import { routeGenerator } from "../utils/routeGenerator";
import DashboardLayout from "../components/layout/DashboardLayout";
import { userRoutePaths } from "./user.route";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
      },
      {
        path: "/services",
        element: <ServicesPage></ServicesPage>,
      },
      {
        path: "/service-details/:serviceId",
        element: <ServiceDetailsPage></ServiceDetailsPage>,
      },
      {
        path: "/bookingPageFeatures",
        element: <BookingPageFeatures></BookingPageFeatures>,
      },
    ],
  },
  // admin route

  {
    path: "/admin",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(adminRoutePaths),
  },
  // user route
  {
    path: "/user",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(userRoutePaths),
  },
  //
  {
    path: "/signUp",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
]);

export default router;

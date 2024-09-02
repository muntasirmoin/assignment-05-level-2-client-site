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
import About from "../pages/publicPages/About";
import ErrorPage from "../ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/services",
        element: <ServicesPage></ServicesPage>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/service-details/:serviceId",
        element: <ServiceDetailsPage></ServiceDetailsPage>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/bookingPageFeatures",
        element: <BookingPageFeatures></BookingPageFeatures>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/about",
        element: <About></About>,
        errorElement: <ErrorPage></ErrorPage>,
      },
    ],
  },
  // admin route

  {
    path: "/admin",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(adminRoutePaths),
    errorElement: <ErrorPage></ErrorPage>,
  },
  // user route
  {
    path: "/user",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(userRoutePaths),
    errorElement: <ErrorPage></ErrorPage>,
  },
  //
  {
    path: "/signUp",
    element: <SignUpPage></SignUpPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);

export default router;

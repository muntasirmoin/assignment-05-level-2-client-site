import React from "react";

import { Outlet } from "react-router-dom";
import App from "../../App";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* <App></App> */}
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

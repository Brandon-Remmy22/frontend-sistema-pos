import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/layout/Header";
import Sidebar from "../components/common/layout/Sidebar";
import AppWrapper from "../components/common/layout/AppWrapper";

const LayoutAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AppWrapper>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="z-50" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main className="px-4 mt-3 pt-2 border-t-2">
            <Outlet />
          </main>
        </div>
      </div >
    </AppWrapper>


  );
};

export default LayoutAdmin;
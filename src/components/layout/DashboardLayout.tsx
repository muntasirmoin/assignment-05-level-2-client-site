import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// import { logout } from "../../redux/features/auth/authSlice";

const DashboardLayout = () => {
  //   const dispatch = useAppDispatch();

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-[#0f3e2a] text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Outlet */}
            <Outlet />
          </div>
        </main>

        {/* Footer (Optional) */}
        <footer className="bg-[#0f3e2a] text-white text-center py-4">
          <p>&copy; 2024 WheelsWash. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;

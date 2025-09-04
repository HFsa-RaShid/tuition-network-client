import React, { useState, useContext } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { VscGitStashApply } from "react-icons/vsc";
import {
  FaUser,FaEnvelope,FaBookOpen,FaHistory,FaUsers,FaCog,FaTachometerAlt,FaHourglassHalf,
} from "react-icons/fa";
import logo from "../../assets/TuitionNetwork_logo1.png";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useCurrentUser from "../../hooks/useCurrentUser";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);

  if (isLoading) {
     return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Parent Routes (visible to Parent & Admin)
  const StudentRoutes = [
    {
      path: "dashboard",
      icon: <FaTachometerAlt />,
      label: "DashBoard",
    },
    {
      path: "profile-details",
      icon: <FaUser />,
      label: "Profile Details",
    },
    {
      path: "tutor-request",
      icon: <FaUsers />,
      label: "Tutor Request",
    },
    {
      path: "posted-jobs",
      icon: <FaBookOpen />,
      label: "Posted Jobs",
    },
    {
      path: "hired-tutors",
      icon: <FaBookOpen />,
      label: "Hired Tutors",
    },
   
    {
      path: "settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];

  // Tutor Routes (visible to Tutor & Admin)
  const tutorRoutes = [
    {
      path: "dashboard",
      icon: <FaTachometerAlt />,
      label: "DashBoard",
    },
    {
      path: "profile-details",
      icon: <FaUser />,
      label: "Profile Details",
    },
  
    
    {
      path: "myApplications",
      icon: <VscGitStashApply />,
      label: "My Applications",
    },
    {
      path: "payment-history",
      icon: <FaHistory />,
      label: "Payment History",
    },
    {
      path: "/settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];

  // Admin Routes (visible to Admin only)

  const adminRoutes = [
    {
      path: "dashboard",
      icon: <FaTachometerAlt />,
      label: "DashBoard",
    },
    {
      path: "profile-details",
      icon: <FaUser />,
      label: "Profile Details",
    },
    {
      path: "users",
      icon: <FaEnvelope />,
      label: "Users",
    },
    {
      path: "chat",
      icon: <FaEnvelope />,
      label: "Chat",
    },
    {
      path: "pending-request",
      icon: <FaHourglassHalf />,
      label: "Pending Request",
    },
    {
      path: "settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];

  const renderNavLink = (route) => (
    <NavLink
      key={route.path}
      to={route.path}
      className={({ isActive }) =>
        isActive
          ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3 text-black"
          : "p-1 rounded-lg flex items-center space-x-3"
      }
    >
      {route.icon}
      {isSidebarOpen && <span>{route.label}</span>}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen transition-all duration-300 font-serif ">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-1/5" : "w-20"
        } bg-[#082755] text-white p-5 flex flex-col items-center space-y-4 relative transition-all duration-300`}
      >
        {/* Logo */}
        <NavLink to="/">
          <div className="flex items-center space-x-2 mb-4 mt-2">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 bg-slate-100 rounded-md"
            />
            {isSidebarOpen && (
              <h1 className="text-2xl font-bold">
                Tu<span className="text-[#DAA520]">T</span>oria
              </h1>
            )}
          </div>
        </NavLink>

        {/* Sidebar Navigation */}
        <div className="flex flex-col space-y-2 w-full">
          {currentUser?.role === "student" && StudentRoutes.map(renderNavLink)}

          {currentUser?.role === "tutor" && tutorRoutes.map(renderNavLink)}

          {currentUser?.role === "admin" && adminRoutes.map(renderNavLink)}
        </div>

        {/* Toggle Button */}
        <button
          className="absolute bottom-5 -right-4 bg-yellow-500 text-[#082755] p-2 rounded-full transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <RiArrowLeftDoubleLine size={22} />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight size={22} />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div
  className={`transition-all duration-300 ${
    isSidebarOpen ? "w-4/5" : "w-full"
  } bg-base-200 p-6 overflow-y-auto h-screen`}
>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;



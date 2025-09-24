
import React, { useState, useContext } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { VscGitStashApply } from "react-icons/vsc";
import {
  FaUser,
  FaEnvelope,
  FaBookOpen,
  FaHistory,
  FaUsers,
  FaCog,
FaUserCheck,
  FaTachometerAlt,
  FaHourglassHalf,
  FaHandshake,
} from "react-icons/fa";
import logo from "../../assets/open-book.png";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useCurrentUser from "../../hooks/useCurrentUser";
import DashBoardNav from "./DashBoardNav/DashBoardnav";

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

  // Parent Routes
  const StudentRoutes = [
    { path: "dashboard", icon: <FaTachometerAlt />, label: "DashBoard" },
    { path: "profile-details", icon: <FaUser />, label: "Profile Details" },
    { path: "tutor-request", icon: <FaUsers />, label: "Tutor Request" },
    { path: "posted-jobs", icon: <FaBookOpen />, label: "Posted Jobs" },
    { path: "hired-tutors", icon: <FaHandshake />, label: "Hired Tutors" },
    { path: "pay-history", icon: <FaHistory />, label: "Payment History" },
    { path: "settings", icon: <FaCog />, label: "Settings" },
  ];

  // Tutor Routes
  const tutorRoutes = [
    { path: "dashboard", icon: <FaTachometerAlt />, label: "DashBoard" },
    { path: "profile-details", icon: <FaUser />, label: "Profile Details" },
    { path: "myApplications", icon: <VscGitStashApply />, label: "My Applications" },
    { path: "payment-history", icon: <FaHistory />, label: "Payment History" },
    { path: "settings", icon: <FaCog />, label: "Settings" },
  ];

  // Admin Routes
  const adminRoutes = [
    { path: "dashboard", icon: <FaTachometerAlt />, label: "DashBoard" },
    { path: "profile-details", icon: <FaUser />, label: "Profile Details" },
    { path: "users", icon: <FaEnvelope />, label: "All User" },
    { path: "pending-request", icon: <FaHourglassHalf />, label: "Pending Request" },
    { path: "verify-user", icon: <FaUserCheck />, label: "Verify User" },
    { path: "settings", icon: <FaCog />, label: "Settings" },
  ];

  // Render NavLink with tooltip
  const renderNavLink = (route) => (
    <NavLink
      key={route.path}
      to={route.path}
      className={({ isActive }) =>
        isActive
          ? "relative group bg-yellow-500 p-1 rounded-lg flex items-center space-x-3 text-black"
          : "relative group p-2 rounded-lg flex items-center space-x-3"
      }
    >
      {/* Icon */}
      {route.icon}

      {/* Label - show only when sidebar open */}
      {isSidebarOpen && <span>{route.label}</span>}

      {/* Tooltip - show only when sidebar closed */}
      {!isSidebarOpen && (
        <span className="absolute left-full  px-2 py-1 rounded bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          {route.label}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen transition-all duration-300 font-serif ">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-1/5" : "w-20"
        } text-white bg-gradient-to-t from-gray-950 via-gray-600 to-gray-400
        p-5 flex flex-col items-start space-y-4 relative transition-all duration-300`}
      >
        <NavLink to="/">
          <div className="mb-4 mt-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-md" />
          </div>
        </NavLink>

        {/* Routes */}
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
        } bg-base-200 pt-20 pr-10 overflow-y-auto h-screen`}
      >
        <DashBoardNav isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;

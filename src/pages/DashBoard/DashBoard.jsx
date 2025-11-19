

import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
  FaCreditCard,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useCurrentUser from "../../hooks/useCurrentUser";
import DashBoardNav from "./DashBoardNav/DashBoardnav";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Student Routes
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
    {
      path: "myApplications",
      icon: <VscGitStashApply />,
      label: "My Applications",
    },
    { path: "payment-history", icon: <FaHistory />, label: "Payment History" },
    { path: "settings", icon: <FaCog />, label: "Settings" },
  ];

  // Admin Routes
  const adminRoutes = [
    { path: "dashboard", icon: <FaTachometerAlt />, label: "DashBoard" },
    { path: "profile-details", icon: <FaUser />, label: "Profile Details" },
    { path: "users", icon: <FaEnvelope />, label: "All User" },
    {
      path: "pending-request",
      icon: <FaHourglassHalf />,
      label: "Pending Request",
    },
    // { path: "verify-user", icon: <FaUserCheck />, label: "Verify User" },
    { path: "allPayment", icon: <FaCreditCard />, label: "Payments" },
  ];

  const allRoutes = [...StudentRoutes, ...tutorRoutes, ...adminRoutes];
  const currentRoute = allRoutes.find((route) =>
    location.pathname.includes(route.path)
  );
  const pageTitle = currentRoute?.label || "Dashboard";

  // Render NavLink
  const renderNavLink = (route) => (
    <NavLink
      key={route.path}
      to={route.path}
      className={({ isActive }) =>
        isActive
          ? "relative group bg-blue-200 py-1 rounded-lg flex items-center pl-3  space-x-3 text-black"
          : "relative group p-2 rounded-lg flex items-center space-x-3"
      }
    >
      {route.icon}
      {isSidebarOpen && <span>{route.label}</span>}
      {!isSidebarOpen && (
        <span className="absolute left-full px-2 py-1 rounded bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          {route.label}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen transition-all duration-300 font-serif  mx-auto">
      <Helmet>
        <title>{pageTitle} | TuToria</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-1/5" : "w-20"} bg-[#EDEDF4]
        p-5 flex flex-col items-start space-y-4 relative transition-all duration-300`}
      >
        <NavLink to="/">
          <div className="mb-4 mt-2">
            <img src={logo} alt="Logo" className="w-9 h-9 rounded-md" />
          </div>
        </NavLink>

        <div className="flex flex-col space-y-2 w-full">
          {currentUser?.role === "student" && StudentRoutes.map(renderNavLink)}
          {currentUser?.role === "tutor" && tutorRoutes.map(renderNavLink)}
          {currentUser?.role === "admin" && adminRoutes.map(renderNavLink)}
        </div>

        {/* Sidebar Toggle (only lg+) */}
        <button
          className="absolute bottom-5 -right-4 bg-blue-200 text-[#082755] p-2 rounded-full transition-all duration-300 hidden lg:block"
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
        } bg-white pt-20 pr-10 overflow-y-auto h-screen`}
      >
        <DashBoardNav isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import {
  FaUser,
  FaEnvelope,
  FaBookOpen,
  FaTags,
  FaHistory,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import logo from "../../../assets/TuitionNetwork_logo1.png";
import { NavLink, Outlet } from "react-router-dom";

const ParentDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-1/5" : "w-20"
        } bg-[#082755] text-white p-5  flex flex-col items-center space-y-4 relative transition-all duration-300 `}
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
                Tuition<span className="text-[#DAA520]">N</span>etwork
              </h1>
            )}
          </div>
        </NavLink>

        {/* Sidebar Buttons with Icons */}
        <div className="flex flex-col space-y-2 w-full ">
          <NavLink
            to="/parentDashBoard/dashBoardPage"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaUser />
            {isSidebarOpen && <span>DashBoard</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/profile-details"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3 text-black"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaUser />
            {isSidebarOpen && <span>Profile Details</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/tutor-request"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaUsers />
            {isSidebarOpen && <span>Tutor Request</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/posted-jobs"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaBookOpen />
            {isSidebarOpen && <span>Posted Jobs</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/chat"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaEnvelope />
            {isSidebarOpen && <span>Chat</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/payment-history"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaHistory />
            {isSidebarOpen && <span>Payment History</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/tuition-exchange"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaTags />
            {isSidebarOpen && <span>Tuition Exchange Community</span>}
          </NavLink>
          <NavLink
            to="/parentDashBoard/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 p-1 rounded-lg flex items-center space-x-3"
                : "p-1 rounded-lg flex items-center space-x-3"
            }
          >
            <FaCog />
            {isSidebarOpen && <span>Settings</span>}
          </NavLink>
        </div>

        {/* Toggle Button (On Sidebar Side) */}
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

      {/* Main Dashboard Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-4/5" : "w-full"
        } bg-gray-100 p-6`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ParentDashBoard;

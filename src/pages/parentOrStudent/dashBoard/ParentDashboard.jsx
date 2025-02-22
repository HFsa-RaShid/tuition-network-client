
import React, { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { FaUser, FaEnvelope, FaBookOpen, FaTags, FaHistory, FaUsers, FaCog } from "react-icons/fa";
import logo from '../../../assets/TuitionNetwork_logo1.png';
import { NavLink } from "react-router-dom";

const ParentDashBoard = () => {
  const [activeSection, setActiveSection] = useState("Profile Details");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Profile Details", icon: <FaUser /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "My Tuitions", icon: <FaBookOpen /> },
    { name: "Offers", icon: <FaTags /> },
    { name: "Payment History", icon: <FaHistory /> },
    { name: "Tuition Exchange Community", icon: <FaUsers /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-1/5" : "w-16"
        } bg-[#082755] text-white p-5 flex flex-col items-start space-y-4 relative transition-all duration-300`}
      >
        {/* Logo */}
       
        <NavLink to="/">
            <div className="flex items-center space-x-2 mb-8 mt-2">
            {isSidebarOpen && <img src={logo} alt="Logo" className="w-10 h-10 bg-slate-100 rounded-md" />}
            <h1 className="text-2xl font-bold ">
                Tuition<span className="text-[#DAA520]">N</span>etwork
              </h1>
            </div>
          </NavLink>

        {/* Sidebar Buttons with Icons */}
        <div className="flex flex-col space-y-2 w-full">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-all duration-300 ${
                activeSection === item.name ? "bg-yellow-500 text-[#071c3b]" : ""
              } ${!isSidebarOpen ? "justify-center px-2" : ""}`}
              onClick={() => setActiveSection(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </div>

        {/* Toggle Button (On Sidebar Side) */}
        <button
          className="absolute bottom-5 -right-4 bg-yellow-500 text-[#071c3b] p-2 rounded-full transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <RiArrowLeftDoubleLine size={20} /> : <MdOutlineKeyboardDoubleArrowRight size={20} />}
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-4/5" : "w-full"
        } bg-gray-100 p-6`}
      >
        <h1 className="text-2xl font-bold">{activeSection}</h1>
      </div>
    </div>
  );
};

export default ParentDashBoard;

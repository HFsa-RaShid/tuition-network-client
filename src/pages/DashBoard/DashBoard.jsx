
import React, { useEffect, useState, useContext } from "react";
import {
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
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
import logo from "../../assets/TuitionNetwork_logo1.png";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null); // for storing role
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setUserRole(res.data.role); 
      });
    }
  }, [user?.email, axiosPublic]);

  // Parent Routes (visible to Parent & Admin)
  const parentRoutes = [
    {
      path: "dashBoardPage",
      icon: <FaUser />,
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
        path: "chat",
        icon: <FaEnvelope />,
        label: "Chat",
      },
      {
        path: "payment-history",
        icon: <FaHistory />,
        label: "Payment History",
      },
      {
        path: "tuition-exchange",
        icon: <FaTags />,
        label: "Tuition Exchange Community",
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
      path: "/parentDashBoard/chat",
      icon: <FaEnvelope />,
      label: "Chat",
    },
    {
      path: "/parentDashBoard/payment-history",
      icon: <FaHistory />,
      label: "Payment History",
    },
    {
      path: "/parentDashBoard/tuition-exchange",
      icon: <FaTags />,
      label: "Tuition Exchange Community",
    },
    {
      path: "/parentDashBoard/settings",
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
    <div className="flex h-screen transition-all duration-300">
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
                Tuition<span className="text-[#DAA520]">N</span>etwork
              </h1>
            )}
          </div>
        </NavLink>

        {/* Sidebar Navigation */}
        <div className="flex flex-col space-y-2 w-full">
          {(userRole === "student" || userRole === "admin") &&
            parentRoutes.map(renderNavLink)}

          {(userRole === "tutor" || userRole === "admin") &&
            tutorRoutes.map(renderNavLink)}
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
        } bg-gray-100 p-6`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;

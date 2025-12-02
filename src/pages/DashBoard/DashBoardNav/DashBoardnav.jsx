import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";

import { IoChevronDownSharp } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashBoardNav = ({ isSidebarOpen }) => {
  const { user } = useContext(AuthContext);
  const { currentUser, refetch } = useCurrentUser(user?.email);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`bg-gray-100/90  shadow-md backdrop-blur font-serif text-black fixed top-0 z-50 transition-all duration-300 
        ${isSidebarOpen ? "w-4/5" : "w-full"}`}
    >
      <div className="navbar px-14">
        <div className="navbar-start flex items-center gap-1 ">
          <h1 className="text-xl md:text-2xl font-bold">
            Tu
            <span className="bg-gradient-to-r from-blue-300  to-blue-800 bg-clip-text text-transparent">
              T
            </span>
            oria
          </h1>

          <div className="relative">
            <button onClick={toggleDropdown}>
              <IoChevronDownSharp className="text-[18px] mt-3 cursor-pointer" />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
              <div className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
                <ul className="text-sm">
                  {/* Free Option */}
                  <li className="px-4 py-2 hover:bg-gray-100/90 flex justify-between cursor-pointer">
                    Free
                    {currentUser?.profileStatus === "Free" && (
                      <span className="text-green-600 font-bold">✔</span>
                    )}
                  </li>

                  {/* Premium Option */}
                  <li
                    className="px-4 py-2 hover:bg-gray-100/90 cursor-pointer"
                    onClick={() => {
                      navigate("get-premium");
                      setIsOpen(false);
                    }}
                  >
                    Premium
                    {currentUser?.profileStatus === "Premium" && (
                      <span className="text-green-600 font-bold pl-14">✔</span>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-end pr-8">
          <div className="tooltip tooltip-bottom " data-tip={user?.displayName}>
            <label tabIndex={0}>
              <div className="w-8 h-8 rounded-full border border-black overflow-hidden flex items-center justify-center ">
                <img
                  src={currentUser?.photoURL}
                  alt="User"
                  className="w-full h-full object-cover p-[2px]"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNav;

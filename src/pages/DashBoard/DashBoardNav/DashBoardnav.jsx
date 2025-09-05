import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useCurrentUser from "../../../hooks/useCurrentUser";

const DashBoardNav = ({ isSidebarOpen }) => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  return (
    <div
      className={`bg-white/80 shadow-md backdrop-blur font-serif text-black fixed top-0 z-50 transition-all duration-300 
        ${isSidebarOpen ? "w-4/5" : "w-full"}`}
    >
      <div className="navbar px-12">
        <div className="navbar-start">
          <h1 className="text-2xl font-bold ">
            Tu<span className="text-[#DAA520]">T</span>oria
          </h1>
        </div>

        <div className="navbar-end">
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

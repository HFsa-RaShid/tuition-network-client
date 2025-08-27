import React from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import useAllTutors from "../../../../hooks/useAllTutors";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const MatchTutors = () => {
  


  return (
    <div>
      <Navbar />

       <Outlet />
    </div>
  );
};

export default MatchTutors;

import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { PiCloudSunFill } from "react-icons/pi";
import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/TuitionNetwork_logo1.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "device") {
      const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.setAttribute("data-theme", deviceTheme);
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white text-black w-full fixed top-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 font-semibold text-[18px] animate__animated animate__fadeInDown text-black bg-white">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#123d7e]" : " "
                  }
                  to="/"
                >
                  Tutors
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-black bg-white " : " "
                  }
                  to="/rooms"
                >
                  Job Boards
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-10" />
              <h1 className="text-3xl font-bold ">
                Tuition<span className="text-[#DAA520]">N</span>etwork
              </h1>
            </div>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-[18px]">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-[#123d7e]" : " ")}
                to="/"
              >
                Tutors
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-black bg-white " : " "
                }
                to="/rooms"
              >
                Job Boards
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="m-1 "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {theme === "light" && <BsSunFill className="text-2xl mr-3" />}
              {theme === "dark" && <BiSolidMoon className="text-2xl mr-3" />}
              {theme === "device" && (
                <PiCloudSunFill className="text-2xl mr-3" />
              )}
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-content bg-slate-100 rounded-box z-10 w-32 p-2 shadow-2xl">
                <li
                  onClick={() => handleThemeChange("light")}
                  className="flex items-center gap-1 hover:bg-slate-300 hover:rounded-xl py-1 font-semibold "
                >
                  <BsSunFill className="text-2xl pl-2" />
                  <button>Light</button>
                </li>
                <li
                  onClick={() => handleThemeChange("dark")}
                  className="flex items-center gap-1 hover:bg-slate-300 hover:rounded-xl py-1 font-semibold "
                >
                  <BiSolidMoon className="text-2xl pl-2" />
                  <button>Dark</button>
                </li>
                <li
                  onClick={() => handleThemeChange("device")}
                  className="flex items-center gap-1 hover:bg-slate-300 hover:rounded-xl py-1 font-semibold"
                >
                  <PiCloudSunFill className="text-2xl pl-2" />
                  <button>Device</button>
                </li>
              </ul>
            )}
          </div>

          {user ? (
            <>
              {/* <img src={profileImage} className="rounded-full h-[42px] w-[42px] mr-4" key={profileImage} /> */}
              <button
                onClick={handleSignOut}
                className="bg-[#123d7e] py-[10px] px-6 rounded-3xl text-white shadow-md shadow-blue-900 font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavLink to="/signIn">
              <button className="bg-[#123d7e] py-[10px] px-6 rounded-3xl text-white shadow-md shadow-blue-900 font-semibold">
                Sign Up
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { PiCloudSunFill } from "react-icons/pi";
import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/open-book.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);

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
<div className="bg-white/80 shadow-md backdrop-blur font-serif text-black fixed top-0 left-0 right-0 z-50 overflow-x-hidden">
  <div className="navbar container mx-auto px-4">
    <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="https://www.w3.org/2000/svg"
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
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-black bg-white " : " "
                  }
                  to="/tutors"
                >
                  Tutors
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-black bg-white " : " "
                  }
                  to="/tuitions"
                >
                  Tuitions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-[#123d7e] underline" : " "
                  }
                  to="/search-by-map"
                >
                  Find on Map
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-10" />
              <h1 className="text-3xl font-bold ">
                Tu<span className="text-[#DAA520]">T</span>oria
              </h1>
            </div>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-[18px]">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#123d7e] underline" : " "
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-[#123d7e] underline" : " "
                }
                to="/tutors"
              >
                Tutors
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-[#123d7e] underline" : " "
                }
                to="/tuitions"
              >
                Tuitions
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-[#123d7e] underline" : " "
                }
                to="/search-by-map"
              >
                Find on Map
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
            <div className="relative dropdown dropdown-end">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName}
              >
                <label tabIndex={0}>
                  <div className="w-10 h-10 rounded-full border border-black overflow-hidden flex items-center justify-center">
                    <img
                      src={currentUser?.photoURL}
                      alt="User"
                      className="w-full h-full object-cover p-[2px]"
                    />
                  </div>
                </label>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    to={`/${currentUser?.role}/dashboard`}
                    className={({ isActive }) =>
                      isActive ? "text-[#123d7e] bg-slate-300" : " "
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="hover:bg-slate-300 text-left w-full"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/signIn">
              <button className="bg-blue-200 mb-2 mt-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 font-semibold shadow-sm">
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

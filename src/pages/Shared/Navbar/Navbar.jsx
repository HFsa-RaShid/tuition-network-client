import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { PiCloudSunFill } from "react-icons/pi";

// Context & Hooks
import { AuthContext } from "../../../provider/AuthProvider";
import useCurrentUser from "../../../hooks/useCurrentUser";

// Assets
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser(user?.email);

  const themeRef = useRef();
  const userRef = useRef();
  const mobileRef = useRef();

  const handleSignOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsThemeDropdownOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target))
        setIsThemeDropdownOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setIsUserDropdownOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg backdrop-blur font-serif text-black py-2">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4 h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 justify-center">
          <img src={logo} alt="logo" className="h-9" />
          
          <h1 className="text-2xl sm:text-3xl font-bold pt-1">
            Tu
            <span className="bg-gradient-to-r from-blue-300  to-blue-800 bg-clip-text text-transparent">
              T
            </span>
            oria
          </h1>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 font-semibold text-[18px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#5282ca] underline" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutors"
              className={({ isActive }) =>
                isActive ? "text-[#5282ca] underline" : ""
              }
            >
              Tutors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tuitions"
              className={({ isActive }) =>
                isActive ? "text-[#5282ca] underline" : ""
              }
            >
              Tuitions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search-by-map"
              className={({ isActive }) =>
                isActive ? "text-[#5282ca] underline" : ""
              }
            >
              Find on Map
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            >
              {theme === "light" && <BsSunFill className="text-xl" />}
              {theme === "dark" && <BiSolidMoon className="text-xl" />}
              {theme === "device" && <PiCloudSunFill className="text-xl" />}
            </button>
            {isThemeDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-slate-100 rounded-lg shadow-lg z-50">
                <li
                  onClick={() => handleThemeChange("light")}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-slate-300 cursor-pointer"
                >
                  <BsSunFill /> Light
                </li>
                <li
                  onClick={() => handleThemeChange("dark")}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-slate-300 cursor-pointer"
                >
                  <BiSolidMoon /> Dark
                </li>
                <li
                  onClick={() => handleThemeChange("device")}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-slate-300 cursor-pointer"
                >
                  <PiCloudSunFill /> Device
                </li>
              </ul>
            )}
          </div>

          {/* User Dropdown */}
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="bg-white w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center"
              >
                <img
                  src={currentUser?.photoURL}
                  alt="User"
                  title={currentUser?.name}
                  className="w-full h-full object-cover"
                />
              </button>
              {isUserDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-slate-100 text-black rounded-lg shadow-lg z-50">
                  <li>
                    <NavLink
                      to={`/${currentUser?.role}/dashboard`}
                      className="block px-4 py-2 hover:bg-slate-300"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-slate-300"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink to="/signIn">
              <button className="btn-primary">Sign Up</button>
            </NavLink>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden relative" ref={mobileRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isMobileMenuOpen && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-lg z-50 flex flex-col text-base font-medium">
                <li className="border-b px-4 py-2 hover:bg-gray-100/90">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="border-b px-4 py-2 hover:bg-gray-100/90">
                  <NavLink to="/tutors">Tutors</NavLink>
                </li>
                <li className="border-b px-4 py-2 hover:bg-gray-100/90">
                  <NavLink to="/tuitions">Tuitions</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100/90">
                  <NavLink to="/search-by-map">Find on Map</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

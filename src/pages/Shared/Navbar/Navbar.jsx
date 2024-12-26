import React from 'react';
import logo from '../../../assets/TuitionNetwork_logo1.png'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 container mx-auto">
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Tutors</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <NavLink>
      <div className='flex items-center gap-2'>
      <img src={logo} alt="logo" className="h-14" />
      <h1 className='text-3xl font-bold'>Tuition<span className='text-[#DAA520]'>N</span>etwork</h1>

      </div>
    </NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <navLink><a>Tutors</a></navLink>
      <navLink><a>Tutors</a></navLink>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <NavLink>
      <button className='bg-[#0065ff] bg-opacity-80 py-[10px] px-6 rounded-3xl text-white shadow-md shadow-blue-900 font-semibold'>Sign Up</button>
    </NavLink>
  </div>
</div>
  );
};

export default Navbar;
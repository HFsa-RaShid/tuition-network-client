import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import logo from "../../../assets/logo.png"; 
import img1 from "../../../assets/class (1).png";
import img2 from "../../../assets/class (2).png";
import img3 from "../../../assets/class (3).png";

const PressKit = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16 mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          TuToria Press Kit
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Everything you need to write about or feature TuToria.
        </p>

        {/* Logo Section */}
        <div className="bg-white p-6 rounded-lg shadow text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Official Logo</h3>
          <img
            src={logo}
            alt="TuToria Logo"
            className="mx-auto h-32 w-auto mb-4"
          />
          <a
            href={logo} // for download
            download="TuToria_Logo.png"
            className="inline-block btn-primary text-white px-4 py-2 rounded "
          >
            Download Logo
          </a>
        </div>

        {/* Brand Colors */}
        <div className="bg-white p-6 rounded-lg shadow text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Brand Colors</h3>
          <div className="flex justify-center flex-wrap gap-4">
            <div className="w-24 h-24 rounded flex items-center justify-center text-white font-semibold bg-blue-500">
              #1D4ED8
            </div>
            <div className="w-24 h-24 rounded flex items-center justify-center text-white font-semibold bg-blue-300">
              #60A5FA
            </div>
            <div className="w-24 h-24 rounded flex items-center justify-center text-black font-semibold bg-[#F4F5F7]">
              #F4F5F7
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white p-6 rounded-lg shadow text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Company Info</h3>
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> TuToria Ltd
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> tutoria.official.bd@gmail.com
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> +880 1838 551941
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> Barishal, Bangladesh
          </p>
        </div>

        {/* Downloadable Assets Section */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-4">Other Assets</h3>
          <p className="text-gray-600 mb-4">
            Download press images, screenshots, and brand resources.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a
              href={img1}
              download
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Screenshot 1
            </a>
            <a
              href={img2}
              download
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Screenshot 2
            </a>
            <a
              href={img3}
              download
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Brand Guide
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PressKit;

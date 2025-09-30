import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../../../assets/teachers.png";
import yellowCircle from "../../../../assets/yellowCircle.png";
import grayCircle from "../../../../assets/grayCircle.png";
import blueCircle from "../../../../assets/blueCircle.png";
import yellowShape from "../../../../assets/yellowShape.png";
import blueShape from "../../../../assets/blueShape.png";
import wireShape from "../../../../assets/Highlight 26.png";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";

const Banner = () => {
  const [className, setClassName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/tutors", { state: { className, district, city } });
  };

  const classes = [
    "Play",
    "Nursery",
    "KG",
    ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
    "Class 11",
    "Class 12",
    "BSc/Honours",
    "MSc/Masters",
  ];

  return (
    <div className="bg-base-100 py-16 mt-20">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-10 lg:gap-28 justify-between px-14">
          {/* ---------- LEFT SIDE ---------- */}
          <div className="w-full lg:w-[55%] mt-8">
            <p className="text-[#DAA520] font-bold">
              100% SATISFACTION GUARANTEE
            </p>
            <div className="my-4 font-bold">
              <h1 className="text-4xl md:text-3xl">Find Your</h1>
              <h1 className="text-4xl md:text-3xl py-4">
                Perfect{" "}
                <span className="inline-flex items-center relative">
                  Tutor
                  <span className="absolute bottom-0 top-6 left-0 w-full">
                    <svg
                      width="120"
                      height="57"
                      viewBox="0 0 513 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 49C85.2556 24.5985 292.813 -14.4606 505 24.5152"
                        stroke="#F9D045"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="absolute bottom-8 left-[118px] w-full">
                    <svg
                      width="40"
                      height="35"
                      viewBox="0 0 256 222"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.57951 166.787C6.95283 123.003 5.72063 35.4108 21.8054 35.3182C41.9113 35.2025 66.7846 121.96 64.7991 143.575C62.8136 165.191 88.6879 28.8063 117.55 10.0993C146.412 -8.60783 119.285 134.878 109.071 151.382C98.8577 167.885 210.559 83.2433 243.267 94.502C275.974 105.761 132.489 236.051 69.469 210.295"
                        stroke="#0065ff"
                        strokeWidth="15"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            <p className="font-medium text-gray-500">
              Personalized one-on-one instruction tailored to your needs,
              delivered by a highly qualified instructor of your choice.
              Sessions can be conducted online or in person.
            </p>

            {/* ---------- SEARCH FORM ---------- */}
            <div className="mt-10 flex flex-wrap gap-4 ">
              {/* Class Input */}
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 
                ${!className ? "text-gray-400" : "text-black"}`}
              >
                <option value="" disabled>
                  Class
                </option>
                {classes.map((cls, idx) => (
                  <option key={idx} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>

              {/* District Dropdown */}
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setCity("");
                }}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28
                ${!district ? "text-gray-400" : "text-black"}`}
              >
                <option value="" disabled>
                  District
                </option>
                {bdDistricts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>

              {/* City Dropdown */}
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!district}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 
                ${!city ? "text-gray-400" : "text-black"}`}
              >
                <option value="" disabled>
                  Location
                </option>
                {district &&
                  cityAreaMap[district]?.map((ct, idx) => (
                    <option key={idx} value={ct}>
                      {ct}
                    </option>
                  ))}
              </select>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-blue-200 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 shadow"
              >
                Search
              </button>
            </div>
          </div>

          {/* ---------- RIGHT SIDE IMAGE ---------- */}
          <div className="w-full lg:w-[45%] flex justify-center  lg:justify-end mr-20">
            <div className="relative w-[280px] md:w-[350px] lg:w-[400px]">
              <img
                src={banner}
                alt="Banner"
                className="h-[280px] md:h-[350px] lg:h-[400px] relative z-10 w-full"
              />
              <img
                src={yellowCircle}
                className="absolute top-[-30px] -right-12 z-0 opacity-50"
              />
              <img
                src={blueShape}
                className="absolute top-[-20px] -right-16 z-0 h-[40px]"
              />
              <img
                src={grayCircle}
                className="absolute top-[150px] -right-18 z-0 opacity-50"
              />
              <img
                src={yellowShape}
                className="absolute top-[132px] -right-8 z-0 h-[40px]"
              />
              <img
                src={blueCircle}
                className="absolute bottom-[-30px] -left-8 z-0 opacity-50"
              />
              <img
                src={wireShape}
                className="absolute bottom-0 -left-16 z-0 h-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

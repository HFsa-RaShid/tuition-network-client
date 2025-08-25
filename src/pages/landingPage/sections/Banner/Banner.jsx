import React, { useState } from "react";

import banner from "../../../../assets/teachers.png";
import yellowCircle from "../../../../assets/yellowCircle.png";
import grayCircle from "../../../../assets/grayCircle.png";
import blueCircle from "../../../../assets/blueCircle.png";
import yellowShape from "../../../../assets/yellowShape.png";
import blueShape from "../../../../assets/blueShape.png";
import wireShape from "../../../../assets/Highlight 26.png";
import { NavLink, useNavigate } from "react-router-dom";
const Banner = () => {
   const [className, setClassName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/matchTutors", { state: { className, location } });
  };
  return (
    <div className="h-[560px] bg-base-100 py-16 mt-20 ">
      <div className="container mx-auto">
        <div className="flex gap-32 justify-between px-20 ">
          <div className="w-[55%] mt-8">
            <p className="text-[#DAA520] font-bold">
              100% SATISFACTION GUARANTEE
            </p>
            <div className="my-4 font-bold">
              <h1 className="text-5xl">Find Your</h1>
              <h1 className="text-5xl py-4">
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
                        stroke-width="16"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                  {/* flower line */}
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
                        stroke-width="15"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            <p className=" font-medium text-gray-500">
              Personalized one-on-one instruction tailored to your needs,
              delivered by a highly qualified instructor of your choice.
              Sessions can be conducted online or in person.
            </p>
             {/* ---------- SEARCH FORM ---------- */}
       
            <div className="mt-10 flex items-center gap-4">
              <input
                type="text"
                placeholder="Your Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border-b-2 border-gray-300 focus:outline-none px-2 py-1 w-40"
              />
              <input
                type="text"
                placeholder="Your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-b-2 border-gray-300 focus:outline-none px-2 py-1 w-40"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-200 mb-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 shadow"
              >
                Search Tutor
              </button>
            </div>
          </div>

          <div className=" w-[45%] mr-2">
        
            <div className="relative w-[400px]">
            <img
              src={banner}
              alt="Banner"
              className="h-[400px] relative z-10  w-full"
            />
          
            <img src={yellowCircle}  className="absolute top-[-30px] -right-12 z-0 opacity-50"></img>
            <img src={blueShape}  className="absolute top-[-20px] -right-16 z-0 h-[40px]"/>
            <img src={grayCircle}  className="absolute top-[150px] -right-20 z-0 opacity-50 "></img>
            <img src={yellowShape}  className="absolute top-[132px] -right-16 z-0 h-[40px]"/>
            <img src={blueCircle}  className="absolute bottom-[-30px] -left-8 z-0 opacity-50 "></img>
            <img src={wireShape}  className="absolute bottom-0 -left-16 z-0 h-[20px]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

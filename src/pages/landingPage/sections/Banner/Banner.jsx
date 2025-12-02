import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgPic from "../../../../assets/bgPic.png";

// Utils
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";

// AOS for animations
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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
    // <div className="relative bg-gray-100/90 py-28 mt-12 overflow-hidden">
    <div
      className="relative py-28 mt-12 overflow-hidden "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),url(${bgPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    
      {/*  Content */}
      <div className="relative z-10 container mx-auto text-white text-center px-6 md:px-16">
        <p className="text-[#DAA520] font-bold mb-3">
          100% SATISFACTION GUARANTEE
        </p>

        <h1
          className="text-5xl font-bold  mb-6 leading-tight"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          Find Your <br />
          <span className="relative inline-flex items-center">
            Perfect Tutor
            <span className="absolute bottom-[-28px] left-0 w-full">
              <svg
                width="160"
                height="57"
                viewBox="0 0 513 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 49C85.2556 24.5985 292.813 -14.4606 505 24.5152"
                  stroke="#7BA0F1FF"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p className="font-medium  max-w-2xl mx-auto py-4">
          Personalized one-on-one instruction tailored to your needs, delivered
          by a highly qualified instructor of your choice. Sessions can be
          conducted online or in person.
        </p>

        {/* 🔍 Search Form */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 ">
          {/* Class Input */}
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className={`border-b-2 border-r-2 border-white bg-transparent focus:outline-none px-2 py-1 w-32 text-center rounded
            ${!className ? "text-white" : "text-white"}`}
          >
            <option value="" disabled>
              Class
            </option>
            {classes.map((cls, idx) => (
              <option key={idx} value={cls} className="text-black">
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
            className={`border-b-2 border-r-2 border-white bg-transparent focus:outline-none px-2 py-1 w-32 text-center rounded
            ${!district ? "text-white" : "text-white"}`}
          >
            <option value="" disabled>
              District
            </option>
            {bdDistricts.map((dist, idx) => (
              <option key={idx} value={dist} className="text-black">
                {dist}
              </option>
            ))}
          </select>

          {/* City Dropdown */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!district}
            className={`border-b-2 border-r-2 border-white bg-transparent focus:outline-none px-2 py-1 w-32 text-center rounded
            ${!city ? "text-white" : "text-white"}`}
          >
            <option value="" disabled>
              Location
            </option>
            {district &&
              cityAreaMap[district]?.map((ct, idx) => (
                <option key={idx} value={ct} className="text-black">
                  {ct}
                </option>
              ))}
          </select>

          {/* Search Button */}
          <button onClick={handleSearch} className="btn-primary">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

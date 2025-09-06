import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import useAllTutors from "../../../../hooks/useAllTutors";
import Footer from "../../../Shared/Footer/Footer";
import Navbar from "../Navbar";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";
import { MdLocationOn } from "react-icons/md";

const Tutors = () => {
  const { allTutors, isLoading, isError } = useAllTutors();
  const location = useLocation();

  // Banner থেকে আসা data
  const { className, district, city } = location.state || {};

  // Filter States (default Banner data)
  const [selectedCity, setSelectedCity] = useState(district || "All");
  const [selectedArea, setSelectedArea] = useState(city || "All");
  const [selectedMedium, setSelectedMedium] = useState("All");
  const [selectedClass, setSelectedClass] = useState(className || "All");
  const [selectedTuitionType, setSelectedTuitionType] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedReligion, setSelectedReligion] = useState("All");

  // Banner state change হলে filters আপডেট হবে
  useEffect(() => {
    if (district) setSelectedCity(district);
    if (city) setSelectedArea(city);
    if (className) setSelectedClass(className);
  }, [district, city, className]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  

  if (!allTutors || allTutors.length === 0) {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container mx-auto p-4 mt-20">
        <p className="text-center text-red-500 font-medium">
          No tutors available right now.
        </p>
      </div>
      </div>
    );
  }

  // Filtering tutors
  const filteredTutors = allTutors.filter((tutor) => {
    // City match
    const cityMatch =
      selectedCity === "All" ||
      tutor.city?.toLowerCase() === selectedCity.toLowerCase();

    // Area match (preferredLocations থেকে)
    const preferredLocations = tutor.preferredLocations
      ? tutor.preferredLocations
          .split(",")
          .map((loc) => loc.trim().toLowerCase())
      : [];

    const areaMatch =
      selectedArea === "All" ||
      preferredLocations.includes(selectedArea.toLowerCase());

    // Medium match
    const categories = tutor.preferredCategories
      ? tutor.preferredCategories.split(",").map((c) => c.trim().toLowerCase())
      : [];

    const mediumMatch =
      selectedMedium === "All" ||
      categories.includes(selectedMedium.toLowerCase());

    // Class match (preferredClass থেকে)
    const preferredClasses = tutor.preferredClass
      ? tutor.preferredClass.split(",").map((cls) => cls.trim().toLowerCase())
      : [];

    const classMatch =
      selectedClass === "All" ||
      preferredClasses.includes(selectedClass.toLowerCase());

    // Tuition type match
    const tuitionMatch =
      selectedTuitionType === "All" ||
      tutor.tuitionPreference === selectedTuitionType ||
      tutor.tuitionPreference === "Both";

    // Gender match
    const genderMatch =
      selectedGender === "All" ||
      tutor.gender?.toLowerCase() === selectedGender.toLowerCase();

    // Religion match
    const religionMatch =
      selectedReligion === "All" ||
      tutor.religion?.toLowerCase() === selectedReligion.toLowerCase();

    return (
      cityMatch &&
      areaMatch &&
      mediumMatch &&
      classMatch &&
      tuitionMatch &&
      genderMatch &&
      religionMatch
    );
  });

  return (
    <div className="font-serif">
      <Navbar />
      <div className="bg-base-200">
        <div className="container mx-auto p-4   min-h-screen flex gap-6">
          {/* Sidebar Filter */}
          <div className="w-[30%] bg-white/80 mt-28 border p-4 rounded-md shadow-md">
            <h2 className="font-bold mb-3 text-lg text-blue-600">
              Advance Filter
            </h2>

            {/* District */}
            <label className="block mb-2">Select District</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedArea("All"); // reset city when district changes
              }}
            >
              <option value="All">All</option>
              {bdDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* Area */}
            <label className="block mb-2">Select Area</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="All">All</option>
              {selectedCity !== "All" &&
                cityAreaMap[selectedCity]?.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>

            {/* Medium */}
            <label className="block mb-2">Select Medium</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Bangla Medium">Bangla Medium</option>
              <option value="English Medium">English Medium</option>
              <option value="English Version">English Version</option>
              <option value="Madrasha">Madrasha</option>
            </select>

            {/* Class */}
            <label className="block mb-2">Select Class</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="All">All</option>
              {[
                "Class 1",
                "Class 2",
                "Class 3",
                "Class 4",
                "Class 5",
                "Class 6",
                "Class 7",
                "Class 8",
                "Class 9",
                "Class 10",
                "Class 11",
                "Class 12",
                "Honours",
              ].map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            {/* Tuition Type */}
            <label className="block mb-2">Tuition Type</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedTuitionType}
              onChange={(e) => setSelectedTuitionType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Home">Home Tuition</option>
              <option value="Online">Online Tuition</option>
              <option value="Both">Both</option>
            </select>

            {/* Gender */}
            <label className="block mb-2">Gender</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Religion */}
            <label className="block mb-2">Religion</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedReligion}
              onChange={(e) => setSelectedReligion(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Christianity">Christianity</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Tutor List */}
          <div className="w-[70%]  mt-28">
            <ul className="list bg-white/80 rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-base-200">
                Showing Tutors ({filteredTutors.length})
              </li>

              {filteredTutors
                .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
                .map((tutor) => (
                  <li
                    key={tutor._id}
                    className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-base-300 transition rounded-md border-b border-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-md object-cover bg-white"
                        src={
                          tutor.photoURL ||
                          "https://i.ibb.co/7n4R8Rt/default-avatar.png"
                        }
                        alt={tutor.name}
                      />
                      <div>
                        <div className="text-black font-medium text-lg">
                          {tutor.name}
                        </div>
                       
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          <MdLocationOn className="text-blue-400" />
                          <span>{tutor.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <NavLink to={`/tutors/tutor-profile/${tutor.customId}`}>
                        <button className="bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition">
                          <ImProfile className="text-base text-blue-600" />
                        </button>
                      </NavLink>
                      <button className="bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition">
                        <IoBookmarksOutline className="text-base text-blue-700" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Tutors;

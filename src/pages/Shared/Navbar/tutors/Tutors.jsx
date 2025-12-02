import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MdLocationOn,
  MdOutlineFilterAlt,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdVerified,
} from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

// Components
import Footer from "../../../Shared/Footer/Footer";
import Navbar from "../Navbar";

// Hooks
import useAllTutors from "../../../../hooks/useAllTutors";

// Utils
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";

const quickDistricts = [
  "All",
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Gazipur",
  "Narayanganj",
  "Sylhet",
  "Cumilla",
  "Barishal",
  "Rajshahi",
  "Rangpur",
  "Mymensingh",
];

const Tutors = () => {
  const { allTutors, isLoading } = useAllTutors();
  const location = useLocation();
  const navigate = useNavigate();
  const { className, district, city } = location.state || {};
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(district || "All");
  const [selectedArea, setSelectedArea] = useState(city || "All");
  const [selectedMedium, setSelectedMedium] = useState("All");
  const [selectedClass, setSelectedClass] = useState(className || "All");
  const [selectedTuitionType, setSelectedTuitionType] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedReligion, setSelectedReligion] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Small rating stars renderer (read-only) reused from Profile view
  const RatingStars = ({ rating, totalRatings = 0, name }) => {
    if (!rating || totalRatings === 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="rating rating-sm rating-half">
            {[...Array(10)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`${name}-no-rating`}
                className={`mask mask-star-2 ${
                  i % 2 === 0 ? "mask-half-1" : "mask-half-2"
                } bg-gray-300`}
                readOnly
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="rating rating-sm rating-half">
          <input
            type="radio"
            name={`${name}-avg-rating`}
            className="rating-hidden"
            readOnly
          />
          {[...Array(10)].map((_, i) => {
            const value = (i + 1) / 2;
            return (
              <input
                key={i}
                type="radio"
                name={`${name}-avg-rating`}
                className={`mask mask-star-2 ${
                  i % 2 === 0 ? "mask-half-1" : "mask-half-2"
                } bg-yellow-400`}
                aria-label={`${value} star`}
                checked={rating >= value}
                readOnly
              />
            );
          })}
        </div>
        <span className="text-sm text-gray-600">
          {rating?.toFixed ? rating.toFixed(1) : rating}
        </span>
      </div>
    );
  };

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

  // Filter out students - only show tutors with role === "tutor"
  const tutorsOnly = allTutors?.filter((tutor) => tutor.role === "tutor") || [];

  if (!allTutors || tutorsOnly.length === 0) {
    return (
      <div className="bg-[#f6f8ff] min-h-screen font-serif">
        <Navbar />
        <div className="container mx-auto px-4 pt-32">
          <div className="  p-10 text-center ">
            <div className="mx-auto w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <FaEyeSlash className="text-3xl text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              No tutors available right now.
            </p>
           
          </div>
        </div>
      </div>
    );
  }

  const filteredTutors = tutorsOnly.filter((tutor) => {
    const cityMatch =
      selectedCity === "All" ||
      tutor.city?.toLowerCase() === selectedCity.toLowerCase();

    const preferredLocations = tutor.preferredLocations
      ? tutor.preferredLocations
          .split(",")
          .map((loc) => loc.trim().toLowerCase())
      : [];

    const areaMatch =
      selectedArea === "All" ||
      preferredLocations.includes(selectedArea.toLowerCase());

    const categories = tutor.preferredCategories
      ? tutor.preferredCategories.split(",").map((c) => c.trim().toLowerCase())
      : [];

    const mediumMatch =
      selectedMedium === "All" ||
      categories.includes(selectedMedium.toLowerCase());

    const preferredClasses = tutor.preferredClass
      ? tutor.preferredClass.split(",").map((cls) => cls.trim().toLowerCase())
      : [];

    const classMatch =
      selectedClass === "All" ||
      preferredClasses.includes(selectedClass.toLowerCase());

    const tuitionMatch =
      selectedTuitionType === "All" ||
      tutor.tuitionPreference === selectedTuitionType ||
      tutor.tuitionPreference === "Both";

    const genderMatch =
      selectedGender === "All" ||
      tutor.gender?.toLowerCase() === selectedGender.toLowerCase();

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

  const totalPages = Math.max(1, Math.ceil(filteredTutors.length / pageSize));
  const pagedTutors = filteredTutors
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (p) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleQuickDistrict = (district) => {
    setSelectedCity(district === "All" ? "All" : district);
    setSelectedArea("All");
    setPage(1);
  };

  const showingFrom =
    filteredTutors.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, filteredTutors.length);

  return (
    <div className="font-serif bg-white min-h-screen">
      <Helmet>
        <title>Tutors | TuToria</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 md:px-12 pt-24 pb-16 mt-14">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#DAA520]">
              Showing {selectedClass === "All" ? "All" : selectedClass} Tutors
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 py-2">
              {selectedClass === "All"
                ? "Find the perfect tutor"
                : `Showing ${selectedClass} Tutors`}
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              জেলা, মাধ্যম বা ক্লাস অনুযায়ী ফিল্টার করে সহজেই প্রোফাইল দেখুন।
              উন্নত ফিল্টার খুলে আরো নির্দিষ্ট করে খুঁজুন।
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-1 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:border-gray-500"
            >
              Go Back
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <MdOutlineFilterAlt /> Filter
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {quickDistricts.map((district) => {
            const active =
              (district === "All" && selectedCity === "All") ||
              selectedCity === district;
            return (
              <button
                key={district}
                onClick={() => handleQuickDistrict(district)}
                className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${
                  active
                    ? "bg-[#111827] text-white border-[#111827]"
                    : "bg-[#f6f8ff] text-gray-600 border-gray-200 hover:border-[#5c6ac4]"
                }`}
              >
                <input type="checkbox" checked={active} readOnly />
                {district}
              </button>
            );
          })}
        </div>

        {filteredTutors.length === 0 ? (
          <div className="bg-[#f6f8ff] rounded-3xl p-10 mt-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">
              No tutors matched your filters
            </p>
            <p className="text-gray-600 mt-2">
              অন্য district বা class নির্বাচন করে দেখতে চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pagedTutors.map((tutor, idx) => {
                    const profileId = tutor?.customId;
                    return (
                      <article
                        key={tutor._id}
                        className="bg-[#f6f8ff] rounded-xl p-6 shadow-md border border-gray-200 flex flex-col gap-4 animate-fade-in animate-card-hover"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          tutor.photoURL ||
                          "https://i.ibb.co/7n4R8Rt/default-avatar.png"
                        }
                        alt={tutor.name}
                        className="w-14 h-14 object-cover rounded-2xl bg-gray-100/90"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                          {tutor.name}
                          {tutor.verificationStatus === "approved" && (
                            <MdVerified className="text-blue-500" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {tutor.institute || "Tutor"}
                        </p>
                        <div className="mt-2">
                          <RatingStars
                            rating={tutor.averageRating}
                            totalRatings={tutor.ratings?.length}
                            name={`tutor-${tutor._id}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <MdLocationOn className="text-[#5c6ac4]" />
                      {tutor.city || "Anywhere"}
                      {tutor.preferredLocations && (
                        <span className="text-xs px-2 py-1 bg-[#f6f8ff] rounded-full">
                          {tutor.preferredLocations.split(",")[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(tutor.preferredClass || "")
                        .split(",")
                        .slice(0, 3)
                        .map((cls) => (
                          <span
                            key={cls}
                            className="text-xs font-medium px-3 py-1 bg-[#f6f8ff] rounded-full text-gray-600"
                          >
                            {cls.trim()}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <NavLink to={`/tutors/tutor-profile/${profileId}`}>
                        <button className="btn-primary flex items-center gap-2 text-sm">
                          <ImProfile className="text-base" />
                          See
                        </button>
                      </NavLink>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-10 text-sm text-gray-600">
              <span>
                Showing {showingFrom} - {showingTo} of {filteredTutors.length}{" "}
                tutors
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-full border border-gray-300 disabled:opacity-50 flex items-center gap-1"
                >
                  <MdOutlineNavigateBefore /> Prev
                </button>
                <span className="px-3 py-2 bg-white rounded-full border border-gray-200">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-full border border-gray-300 disabled:opacity-50 flex items-center gap-1"
                >
                  Next <MdOutlineNavigateNext />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">🔍 Advanced Filter</h2>
              <button onClick={() => setIsFilterOpen(false)}>✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">
                  Select District
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedArea("All");
                  }}
                >
                  <option value="All">All</option>
                  {bdDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Select Area</label>
                <select
                  className="w-full border p-2 rounded"
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
              </div>

              <div>
                <label className="block mb-2 font-medium">Select Medium</label>
                <select
                  className="w-full border p-2 rounded"
                  value={selectedMedium}
                  onChange={(e) => setSelectedMedium(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Bangla Medium">Bangla Medium</option>
                  <option value="English Medium">English Medium</option>
                  <option value="English Version">English Version</option>
                  <option value="Madrasha">Madrasha</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Select Class</label>
                <select
                  className="w-full border p-2 rounded"
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
              </div>

              <div>
                <label className="block mb-2 font-medium">Tuition Type</label>
                <select
                  className="w-full border p-2 rounded"
                  value={selectedTuitionType}
                  onChange={(e) => setSelectedTuitionType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Home">Home Tuition</option>
                  <option value="Online">Online Tuition</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Gender</label>
                <select
                  className="w-full border p-2 rounded"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Religion</label>
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
            </div>
          </div>
        </div>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Tutors;

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import useAllTutors from "../../../../hooks/useAllTutors";
import Footer from "../../../Shared/Footer/Footer";

const MatchedTutorsList = () => {
  const { allTutors, isLoading, isError } = useAllTutors();
  const { state } = useLocation();
  const { className = "", location = "" } = state || {};

  if (isLoading) return <p>Loading tutors...</p>;
  if (isError) return <p>Something went wrong while fetching tutors.</p>;
  if (!allTutors || allTutors.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4 mt-20">
          <p className="text-center text-red-500 font-medium">
            No tutors available right now.
          </p>
        </div>
      </div>
    );
  }

  const hasSearchQuery = className.trim() !== "" || location.trim() !== "";

  const matchedTutors = hasSearchQuery
    ? allTutors
        .filter(
          (tutor) =>
            tutor.preferredClass
              ?.toLowerCase()
              .includes(className.toLowerCase()) &&
            tutor.preferredLocations
              ?.toLowerCase()
              .includes(location.toLowerCase())
        )
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)) // ⭐ Sort by rating
    : [];

  return (
    <div>
        <div className="container mx-auto p-4 mt-28 font-serif min-h-screen">
      {matchedTutors.length > 0 ? (
        <ul className="list  rounded-box shadow-md w-2/3 mx-auto">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-base-200">
            Matched Tutors for Class:{" "}
            <span className="text-blue-600">{className || "N/A"}</span>,
            Location: <span className="text-blue-600">{location || "N/A"}</span>
          </li>

          {matchedTutors.map((tutor) => {
            const avgRating = tutor.averageRating || 0;

            return (
              <li
                key={tutor._id}
                className="flex items-center justify-between gap-4 px-4 py-3  hover:bg-base-300 transition rounded-md border-b border-gray-300"
              >
                {/* Left Side: Image + Info */}
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
                    <div className="text-blue-600 font-medium text-lg">
                      {tutor.name}
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      <div className="rating rating-sm rating-half">
                        {(() => {
                          const stars = [];
                          let remaining = avgRating;

                          for (let i = 0; i < 5; i++) {
                            if (remaining >= 1) {
                              stars.push(
                                <input
                                  key={i * 2 + 1}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-1 bg-[#EFBF04]"
                                  aria-label={`${i + 0.5} star`}
                                  defaultChecked
                                  readOnly
                                />,
                                <input
                                  key={i * 2 + 2}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-2 bg-[#EFBF04]"
                                  aria-label={`${i + 1} star`}
                                  defaultChecked
                                  readOnly
                                />
                              );
                              remaining -= 1;
                            } else if (remaining === 0.5) {
                              stars.push(
                                <input
                                  key={i * 2 + 1}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-1 bg-[#EFBF04]"
                                  aria-label={`${i + 0.5} star`}
                                  defaultChecked
                                  readOnly
                                />,
                                <input
                                  key={i * 2 + 2}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-2 bg-gray-300"
                                  aria-label={`${i + 1} star`}
                                  readOnly
                                />
                              );
                              remaining = 0;
                            } else {
                              stars.push(
                                <input
                                  key={i * 2 + 1}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-1 bg-gray-300"
                                  aria-label={`${i + 0.5} star`}
                                  readOnly
                                />,
                                <input
                                  key={i * 2 + 2}
                                  type="radio"
                                  name={`rating-${tutor._id}`}
                                  className="mask mask-star-2 mask-half-2 bg-gray-300"
                                  aria-label={`${i + 1} star`}
                                  readOnly
                                />
                              );
                            }
                          }

                          return stars;
                        })()}
                      </div>
                      {/* <span className="text-xs opacity-70 ml-2">
                           ({avgRating.toFixed(1)})
                         </span> */}
                    </div>
                  </div>
                </div>

                {/* Right Side: Buttons */}
                <div className="flex items-center gap-2">
                  <NavLink
                    to="tutor-profile"
                    state={{ tutorEmail: tutor.email }}
                  >
                    <button className="bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition">
                      <ImProfile className="text-base text-blue-700" />
                    </button>
                  </NavLink>

                  <button className="bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition">
                    <IoBookmarksOutline className="text-base text-blue-700" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-red-500 font-medium">
          No tutors found matching your search.
        </p>
      )}
    </div>
        <Footer></Footer>
    </div>
  );
};

export default MatchedTutorsList;

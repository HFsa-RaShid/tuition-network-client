import React from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import useAllTutors from "../../../../hooks/useAllTutors";
import { useLocation } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdSendToMobile } from "react-icons/md";

const MatchTutors = () => {
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
    ? allTutors.filter(
        (tutor) =>
          tutor.preferredClass
            ?.toLowerCase()
            .includes(className.toLowerCase()) &&
          tutor.preferredLocations
            ?.toLowerCase()
            .includes(location.toLowerCase())
      )
    : [];

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4 mt-28 font-serif ">
        {matchedTutors.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md w-2/3 mx-auto ">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide ">
              Matched Tutors for Class:{" "}
              <span className="text-blue-600">{className || "N/A"}</span>,
              Location:{" "}
              <span className="text-blue-600">{location || "N/A"}</span>
            </li>

            {matchedTutors.map((tutor) => (
              <li
                key={tutor._id}
                className="flex items-center justify-between gap-4 px-4 py-3 bg-base-200 hover:bg-base-300 transition rounded-lg"
              >
                {/* Left Side: Image + Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-md object-cover bg-white"
                    src={
                      tutor.photoURL ||
                      "https://i.ibb.co/7n4R8Rt/default-avatar.png"
                    }
                    alt={tutor.name}
                  />
                  <div>
                    <div className="text-blue-600 font-medium">
                      {tutor.name}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      📍 {tutor.location}
                    </div>
                  </div>
                </div>

                {/* Right Side: Buttons */}
                <div className="flex items-center gap-2">
                  <button className="btn btn-square btn-ghost">
                    <MdSendToMobile className="text-xl" />
                  </button>

                  <button className="btn btn-square btn-ghost">
                    <IoBookmarksOutline className="text-xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500 font-medium">
            No tutors found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchTutors;

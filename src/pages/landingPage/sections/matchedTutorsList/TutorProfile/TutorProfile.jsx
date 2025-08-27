
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";


const TutorProfile = () => {
  const { state } = useLocation();
  const { tutorEmail } = state || {};
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tuition");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (tutorEmail) {
      axiosPublic
        .get(`/tutors/${tutorEmail}`)
        .then((res) => {
          setTutor(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [tutorEmail]);

  if (loading) return <p className="mt-24 text-center">Loading...</p>;
  if (!tutor) return <p className="mt-24 text-center text-red-500">Tutor not found.</p>;


 const InfoRow = ({ title, value }) => (
  <div className="grid grid-cols-12 text-md px-2 py-1">
    <p className="col-span-3 font-semibold">{title}</p>
    <p className="col-span-3 text-center">:</p>
    <p className="col-span-6 break-words">{value || "N/A"}</p>
  </div>
);


  return (
    <div className="bg-base-200 min-h-screen">
      <div className="flex p-6 gap-6 container mx-auto">
        
        {/* Left Side - Profile Card */}
        <div className="w-1/4 mt-24 bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={tutor.photoURL || "https://i.ibb.co/7n4R8Rt/default-avatar.png"}
            alt={tutor.name}
            className="w-32 h-32 rounded-full border mx-auto"
          />

          {/* Name + Rating */}
          <h2 className="text-xl text-center font-bold mt-2">{tutor.name}</h2>
          <p className="text-yellow-500">
            ⭐ {tutor.averageRating || 0} ({tutor.rating} Reviews)
          </p>

          {/* CV Format Info */}
          <div className="mt-4 w-full space-y-2 text-gray-700">
            <InfoRow title="ID#" value={tutor._id} />
            <InfoRow title="Gender" value={tutor.gender} />
            <InfoRow title="Education" value={tutor.education} />
            <InfoRow title="Institute" value={tutor.institute} />
            <InfoRow title="Location" value={`${tutor.city}, ${tutor.location}`} />
          </div>
        </div>

        {/* Middle Section - Tabs */}
        <div className="w-2/4 mt-24 bg-white shadow-md rounded-xl p-4">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab("tuition")}
              className={`px-4 py-2 ${
                activeTab === "tuition"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Tuition Info
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 ${
                activeTab === "education"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Educational Qualification
            </button>
            <button
              onClick={() => setActiveTab("ratings")}
              className={`px-4 py-2 ${
                activeTab === "ratings"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Ratings & Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-2 text-gray-700">
            {activeTab === "tuition" && (
              <div className="space-y-2">
                <InfoRow title="Expected Salary" value={`${tutor.expectedSalary} Tk/Month`} />
                <InfoRow title="Status" value={tutor.tutorStatus} />
                <InfoRow title="Tuition Preference" value={tutor.tuitionPreference} />
                <InfoRow title="Preferred Categories" value={tutor.preferredCategories} />
                <InfoRow title="Preferred Classes" value={tutor.preferredClass} />
                <InfoRow title="Preferred Subjects" value={tutor.preferredSubjects} />
                <InfoRow title="Preferred Locations" value={tutor.preferredLocations} />
                <InfoRow title="Available Days" value={tutor.availableDays?.join(", ")} />
                <InfoRow title="Available Times" value={tutor.availableTimes?.join(", ")} />
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-2">
                <InfoRow title="Institute" value={tutor.institute} />
                <InfoRow title="Department" value={tutor.department} />
                <InfoRow title="Passing Year" value={tutor.passingYear} />
                <InfoRow title="GPA" value={tutor.gpa} />
              </div>
            )}

            {activeTab === "ratings" && (
              <div className="space-y-2">
                <InfoRow title="Average Rating" value={`⭐ ${tutor.averageRating}`} />
                <InfoRow title="Total Ratings" value={tutor.ratings?.length} />
                <InfoRow title="Given Ratings" value={tutor.ratings?.join(", ")} />
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Contact Card */}
        <div className="w-1/4 mt-24 bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">Contact with this tutor</h2>
          <div className="space-y-2">
            <InfoRow title="Email" value={tutor.email} />
            <InfoRow title="Phone" value={tutor.phone} />
            <InfoRow title="Location" value={`${tutor.city}, ${tutor.location}`} />
            <InfoRow title="Religion" value={tutor.religion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
import Footer from "../../Footer/Footer";
import Navbar from "../Navbar";
import useAxisTutorByID from "../../../../hooks/useAxisTutorByID";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import toast from "react-hot-toast";

const ProfileTutor = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("tuition");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
    const { user } = useContext(AuthContext);
  const { currentUser, refetch,  } = useCurrentUser(user?.email);
  const { tutorProfile: tutor, isLoading, isError } = useAxisTutorByID(id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    details: "",
  });


  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!tutor)
    return <p className="mt-24 text-center text-red-500">Tutor not found.</p>;

  const InfoRow = ({ title, value }) => {
    // Add dynamic color for Status
    let valueClass = "break-words";
    if (title === "Status") {
      valueClass +=
        value === "available"
          ? " text-green-600 font-semibold"
          : value === "unavailable"
          ? " text-red-600 font-semibold"
          : " text-gray-700";
    }

    return (
      <div className="grid grid-cols-12 text-md px-2 py-1">
        <p className="col-span-3 font-semibold">{title}</p>
        <p className="col-span-3 text-center">:</p>
        <p className={`col-span-6 ${valueClass}`}>{value || "N/A"}</p>
      </div>
    );
  };

 const RatingStars = ({ rating, totalRatings = 0, name }) => {
  
  if (!rating || totalRatings === 0) {
    return (
      <div className="space-y-2 text-center">
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
        <p className="text-gray-500 text-sm">No Ratings Yet</p>
      </div>
    );
  }

 
  return (
    <div className="space-y-2 text-center">
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
              } bg-yellow-500`}
              aria-label={`${value} star`}
              checked={rating >= value}
              readOnly
            />
          );
        })}
      </div>
    </div>
  );
};


// -------- Contact + Payment Function ----------
const handlePaymentAndContact = async (
  jobId,
  tutorId,
  tutorName,
  tutorEmail,
  amount,
  tutorAmount,
  tuToriaAmount,
  studentName,
  studentEmail,
  role,
  studentPhone,
  message
) => {
  try {
    const paymentResponse = await axiosSecure.post("/paymentBkash", {
      jobId,
      tutorId,
      name: tutorName,
      email: tutorEmail,
      amount,
      tutorAmount,
      tuToriaAmount,
      source: "contactTutor",
      studentName,
      studentEmail,
      role,
    });

    if (paymentResponse.data.url) {
      window.location.href = paymentResponse.data.url;
    }

    await axiosSecure.post("/contact", {
      tutorName,
      studentName,
      tutorEmail,
      studentEmail,
      studentPhone,
      message,
    });

    toast.success("Email sent to the tutor successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Payment or email sending failed!");
  }
};


// -------- Form Submit Handler ----------
const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.details) {
    toast.error("Please fill all fields!");
    return;
  }

  if (!user) {
    navigate("/login", { state: { from: location } });
    return;
  }

  handlePaymentAndContact(
   tutor._id,              // jobId
  tutor.customId,         // tutorId
  tutor.name,             // tutorName
  tutor.email,            // tutorEmail
  100,                    // amount
  0,                      // tutorAmount
  100,                    // tuToriaAmount
  formData.name,          // studentName
  currentUser?.email,     // studentEmail 
  currentUser?.role,      // role
  formData.phone,         // studentPhone
  formData.details        // message
  );
};


  // Main Return

  return (
    <div>
        <Navbar></Navbar>
      <div className="bg-base-200 min-h-screen">
        <div className="flex p-6 gap-6 container mx-auto">
          {/* Left Side - Profile Card */}
          <div className="w-[28%] mt-20 bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
            {/* Profile Picture */}
            <img
              src={
                tutor.photoURL || "https://i.ibb.co/7n4R8Rt/default-avatar.png"
              }
              alt={tutor.name}
              className="w-32 h-32 rounded-lg border mx-auto"
            />

            {/* Name + Rating */}
            <h2 className="text-xl text-center font-bold mt-2">{tutor.name}</h2>

            <RatingStars
              rating={tutor.averageRating}
              totalRatings={tutor.ratings?.length}
              name="profile"
             
            />

            {/* CV Format Info */}
            <div className="mt-4 w-full  text-gray-700">
              <InfoRow title="Status" value={tutor.tutorStatus} />
              <InfoRow title="ID#" value={tutor.customId} />
              <InfoRow title="Gender" value={tutor.gender} />
              <InfoRow title="Religion" value={tutor.religion} />

              <InfoRow title="Type/Role" value={tutor.tutorType} />
              <InfoRow
                title="Location"
                value={`${tutor.location}, ${tutor.city}`}
              />
            </div>
          </div>

          {/* Middle Section - Tabs */}
          <div className="w-[52%] mt-20 bg-white shadow-md rounded-xl p-4">
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
                  <InfoRow
                    title="Expected Salary"
                    value={`${tutor.expectedSalary} Tk/Month`}
                  />
                  <InfoRow title="Status" value={tutor.tutorStatus} />
                  <InfoRow
                    title="Tuition Preference"
                    value={tutor.tuitionPreference}
                  />
                  <InfoRow
                    title="Preferred Categories"
                    value={tutor.preferredCategories}
                  />
                  <InfoRow
                    title="Preferred Classes"
                    value={tutor.preferredClass}
                  />
                  <InfoRow
                    title="Preferred Subjects"
                    value={tutor.preferredSubjects}
                  />
                  <InfoRow
                    title="Preferred Locations"
                    value={tutor.preferredLocations}
                  />
                  <InfoRow
                    title="Available Days"
                    value={tutor.availableDays?.join(", ")}
                  />
                  <InfoRow
                    title="Available Times"
                    value={tutor.availableTimes?.join(", ")}
                  />
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-2">
                  <InfoRow title="Institute" value={tutor.institute} />
                  <InfoRow title="Department" value={tutor.department} />
                  <InfoRow title="Degree" value={tutor.education} />
                  <InfoRow title="Passing Year" value={tutor.passingYear} />
                  <InfoRow title="GPA/CGPA" value={tutor.gpa} />
                  <InfoRow
                    title="Teacher ID/ Student ID/ NID"
                    value={
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        Verified <MdVerified className="text-blue-500" />
                      </span>
                    }
                  />
                </div>
              )}

              {activeTab === "ratings" && (
                <div className="space-y-6 px-10 mt-10">
                  {/* Left side summary */}
                  <div className="flex  gap-10 items-center ">
                    <div className="text-center w-[35%]">
                      <h3 className="font-bold">Student Reviews</h3>

                      {/* ⭐ Average Rating (Readonly) */}
                      <RatingStars
                        rating={tutor.averageRating}
                        totalRatings={tutor.ratings?.length}
                        name="ratingsTab"
                      />

                      <p className="text-lg font-semibold">
                        {tutor.averageRating?.toFixed(1) || 0} Out of 5
                      </p>
                      <p className="text-gray-500">
                        ({tutor.ratings?.length || 0} Ratings)
                      </p>
                    </div>

                    {/* Right side breakdown */}
                    <div className="flex-1 space-y-2 w-[55%]">
                      {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((star) => {
                        const total = tutor.ratings?.length || 0;
                        const count =
                          tutor.ratings?.filter((r) => r === star).length || 0;
                        const percent = total
                          ? ((count / total) * 100).toFixed(2)
                          : 0;

                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-16 text-sm">{star} star</span>
                            <progress
                              className="progress progress-success flex-1"
                              value={percent}
                              max="100"
                            ></progress>
                            <span className="w-12 text-right text-sm mb-1">
                              {percent}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Contact Card */}
          <div className="w-[25%] mt-20 bg-white shadow-md rounded-xl p-4">
            <h2 className="text-[18px] font-bold mb-4">Tuition Request to this Tutor</h2>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Your email address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div> */}
              <div>
  <label className="block text-sm font-medium">Phone</label>
  <input
    type="tel"
    className="input input-bordered w-full"
    placeholder="Your phone number"
    required
    value={formData.phone}
    onChange={(e) =>
      setFormData({ ...formData, phone: e.target.value })
    }
  />
</div>


              <div>
                <label className="block text-sm font-medium">Details</label>
                <textarea
                  className="textarea textarea-bordered w-full min-h-[160px]"
                  placeholder="Briefly describe your requirements..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn bg-blue-200 w-full text-blue-800 hover:bg-blue-300"
              >
                Submit & Pay
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProfileTutor;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAppliedTutor from "../../../../hooks/useAppliedTutor";
// import { IoArrowBack } from "react-icons/io5";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const AppliedTutorProfile = () => {
//   const location = useLocation();
//   const email = location.state?.email;
//   const { appliedTutor: tutor, isLoading } = useAppliedTutor(email);
//   const navigate = useNavigate();

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center mt-20">
//         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );

//   if (!tutor) return <div className="text-center mt-10">Tutor not found</div>;

//   // Function to render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     rating = Number(rating) || 0; // ensure rating is number

//     for (let i = 1; i <= 5; i++) {
//       if (rating >= i) {
//         stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
//       } else if (rating >= i - 0.5) {
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline" />);
//       } else {
//         stars.push(<FaRegStar key={i} className="text-gray-400 inline" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-blue-600 hover:underline mb-8"
//       >
//         <IoArrowBack className="text-2xl" />
//         <span className="text-lg font-medium ml-2">Back</span>
//       </button>

//       {/* Tutor Info */}
//       <div className="flex items-center gap-8 mb-6">
//         <img
//           src={tutor.photoURL}
//           alt={tutor.name}
//           className="w-28 h-28 rounded-full object-cover border"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{tutor.name}</h2>
//           <p className="text-gray-600 capitalize">{tutor.customId}</p>
//           <p className="text-gray-600">Tutor: {tutor.tutorType}</p>

//           <p className="text-gray-600 flex items-center gap-1">
//             Rating: {renderStars(tutor.averageRating)}
           
//           </p>
//         </div>
//       </div>

//       {/* Academic & Location Info */}
//       <div className="grid grid-cols-2 gap-4">
//         <p><strong>Gender:</strong> {tutor.gender}</p>
//         <p><strong>Department:</strong> {tutor.department}</p>
//         <p><strong>Education:</strong> {tutor.education}</p>
//         <p><strong>Institute:</strong> {tutor.institute}</p>
//         <p><strong>CGPA/GPA:</strong> {tutor.gpa}</p>
//         <p><strong>Passing Year:</strong> {tutor.passingYear}</p>
//         <p><strong>City:</strong> {tutor.city}</p>
//         <p><strong>Location:</strong> {tutor.location}</p>
//         <p><strong>Religion:</strong> {tutor.religion}</p>
//         <p><strong>Expected Salary:</strong> {tutor.expectedSalary} Tk</p>
//         <p><strong>Preferred Classes:</strong> {tutor.preferredClass}</p>
//         <p><strong>Preferred Subjects:</strong> {tutor.preferredSubjects}</p>
//         <p><strong>Preferred Categories:</strong> {tutor.preferredCategories}</p>
//         <p><strong>Preferred Locations:</strong> {tutor.preferredLocations}</p>
//         <p><strong>Tuition Preference:</strong> {tutor.tuitionPreference}</p>
//       </div>

//       {/* Available Days */}
//       <div className="mt-6">
//         <strong>Available Days:</strong>
//         <div className="flex flex-wrap gap-2 mt-2 text-sm">
//           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//             <span
//               key={day}
//               className={`px-3 py-1 rounded-full border ${
//                 tutor.availableDays?.includes(day)
//                   ? "bg-blue-100 text-blue-700 border-blue-300"
//                   : "bg-gray-100 text-gray-500 border-gray-300"
//               }`}
//             >
//               {day}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Available Times */}
//       <div className="mt-4">
//         <strong>Available Times:</strong>
//         <div className="flex flex-wrap gap-2 mt-2 text-sm">
//           {[
//             "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
//             "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
//             "6 PM", "7 PM", "8 PM", "9 PM", "10 PM",
//           ].map((time) => (
//             <span
//               key={time}
//               className={`px-3 py-1 rounded-full border ${
//                 tutor.availableTimes?.includes(time)
//                   ? "bg-green-100 text-green-700 border-green-300"
//                   : "bg-gray-100 text-gray-500 border-gray-300"
//               }`}
//             >
//               {time}
//             </span>
//           ))}
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default AppliedTutorProfile;


import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";

const HiredTutors = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { paidJobsById } = useJobIdpayment(jobId);

  const { paidJobs, isLoading, isError } = useAllHiredByAStudent(
    currentUser?.email
  );
  const axiosSecure = useAxiosSecure();

  // modal control
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewInfoTutor, setViewInfoTutor] = useState(null);

  // ✅ Trial Class Payment
  const handleTrialClassPayment = async (jobId, tutorId) => {
    try {
      const paymentData = {
        jobId,
        name: currentUser?.name,
        email: currentUser?.email,
        tutorId,
        amount: 250,
        source: "trialClassPayment",
      };
      const response = await axiosSecure.post("/paymentBkash", paymentData);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Payment initiation failed.");
    }
  };

  // ✅ Advance Salary Payment
  const handleAdvanceSalaryPayment = async (jobId, tutor, salary) => {
    try {
      const paymentData = {
        jobId,
        name: tutor?.name,
        email: tutor?.email,
        tutorId: tutor?.tutorId,
        amount: salary,
        source: "advanceSalary",
        studentName: currentUser?.name,
        studentEmail: currentUser?.email,
      };

      const response = await axiosSecure.post("/paymentBkash", paymentData);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Advance salary payment initiation failed.");
    }
  };

  // ✅ Rating Submit
  const handleSubmitRating = async () => {
    if (!rating) {
      toast.error("Please select a rating!");
      return;
    }
    try {
      const res = await axiosSecure.put(`/tutors/${selectedTutor?.tutorEmail}`, {
        rating: parseFloat(rating),
      });

      if (res.modifiedCount > 0 || res.upsertedCount > 0) {
        toast.success("Thanks for your rating!");
      } else {
        toast.success("Rating submitted!");
      }

      setSelectedTutor(null);
      setRating(0);
    } catch (err) {
      console.error(err);
      toast.error("Rating failed!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center py-4">
        Failed to load hired tutors.
      </p>
    );
  }

  const studentPaidJobs = paidJobs?.filter(
    (p) =>
      p.studentEmail === currentUser?.email && p.source === "myApplications"
  );

  if (!studentPaidJobs?.length) {
    return (
      <p className="text-center text-gray-500 py-4">No hired tutors found.</p>
    );
  }

  const hasPaidTrial = (jobId, tutorEmail) =>
    studentPaidJobs.some(
      (p) =>
        p.jobId === jobId &&
        p.email === tutorEmail &&
        p.source === "trialClassPayment" &&
        p.paidStatus
    );

  // ✅ Check advance salary paid
  const hasAdvanceSalaryPaid = (jobId) =>
    paidJobsById?.some(
      (p) =>
        p.jobId === jobId && p.source === "advanceSalary" && p.paidStatus === true
    );

  return (
    <div className="p-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-orange-100">
          Hired Tutors
        </li>
        {studentPaidJobs.map((payment) => {
          const tutorEmail = payment.email;
          const tutorName = payment.name;
          const jobId = payment.jobId;

          return (
            <li
              key={tutorEmail + jobId}
              className="list-row flex items-center justify-between p-4 border-b"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    payment.jobDetails?.tutorPhotoURL ||
                    "https://i.ibb.co/7n4R8Rt/default-avatar.png"
                  }
                  alt={tutorName}
                />
                <div>
                  <div className="font-semibold">{tutorName}</div>
                  <div className="text-xs opacity-60">
                    {payment.jobDetails?.subjects?.join(", ") || "No subjects"}
                  </div>
                  <div className="text-xs opacity-60">
                    {payment.jobDetails?.location || ""}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  {hasAdvanceSalaryPaid(jobId) ? (
                    <button
                      onClick={() =>
                        setViewInfoTutor({
                          name: tutorName,
                          email: tutorEmail,
                          phone: payment.jobDetails?.phone,
                          studentIdImage: payment.jobDetails?.studentIdImage,
                        })
                      }
                      className="bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1"
                    >
                      View Info
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleAdvanceSalaryPayment(
                          jobId,
                          { name: tutorName, email: tutorEmail, tutorId: payment.tutorId },
                          payment.jobDetails?.salary
                        )
                      }
                      className="bg-blue-200 text-blue-700 text-center px-2 py-1 rounded hover:bg-blue-300 flex items-center gap-1"
                    >
                      Pay Advance
                    </button>
                  )}

                  <button
                    onClick={() => handleTrialClassPayment(jobId, payment.tutorId)}
                    disabled={hasPaidTrial(jobId, tutorEmail)}
                    className={`bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300 flex items-center gap-1 ${
                      hasPaidTrial(jobId, tutorEmail)
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    Book Trial Class
                  </button>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setSelectedTutor({ tutorEmail, tutorName, jobId })
                    }
                    className="btn btn-ghost"
                  >
                    Rating
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Rating Modal */}
      {selectedTutor && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Rate {selectedTutor.tutorName}
            </h3>
            <div
              className="rating rating-lg rating-half"
              onChange={(e) => setRating(e.target.value)}
            >
              <input type="radio" name="rating" value="0.5" className="mask mask-star-2 mask-half-1 bg-yellow-500" />
              <input type="radio" name="rating" value="1" className="mask mask-star-2 mask-half-2 bg-yellow-500" />
              <input type="radio" name="rating" value="1.5" className="mask mask-star-2 mask-half-1 bg-yellow-500" />
              <input type="radio" name="rating" value="2" className="mask mask-star-2 mask-half-2 bg-yellow-500" />
              <input type="radio" name="rating" value="2.5" className="mask mask-star-2 mask-half-1 bg-yellow-500" />
              <input type="radio" name="rating" value="3" className="mask mask-star-2 mask-half-2 bg-yellow-500" />
              <input type="radio" name="rating" value="3.5" className="mask mask-star-2 mask-half-1 bg-yellow-500" />
              <input type="radio" name="rating" value="4" className="mask mask-star-2 mask-half-2 bg-yellow-500" />
              <input type="radio" name="rating" value="4.5" className="mask mask-star-2 mask-half-1 bg-yellow-500" />
              <input type="radio" name="rating" value="5" className="mask mask-star-2 mask-half-2 bg-yellow-500" />
            </div>
            <div className="modal-action">
              <button onClick={handleSubmitRating} className="btn btn-success">
                Send
              </button>
              <button
                onClick={() => setSelectedTutor(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* View Info Modal */}
      {viewInfoTutor && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Tutor Information
            </h3>
            <p><strong>Name:</strong> {viewInfoTutor.name}</p>
            <p><strong>Email:</strong> {viewInfoTutor.email}</p>
            <p><strong>Phone:</strong> {viewInfoTutor.phone || "N/A"}</p>
            {viewInfoTutor.studentIdImage && (
              <img
                src={viewInfoTutor.studentIdImage}
                alt="Student ID"
                className="mt-3 w-48 rounded-lg shadow"
              />
            )}
            <div className="modal-action">
              <button
                onClick={() => setViewInfoTutor(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HiredTutors;

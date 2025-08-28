

import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const HiredTutors = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  const { paidJobs, isLoading, isError } = useAllHiredByAStudent(
    currentUser?.email
  );
  const axiosSecure = useAxiosSecure();

  // modal control
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [rating, setRating] = useState(0);

  const handleTrialClassPayment = async (jobId,tutorId) => {
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

  //Rating Submit
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
                  <button
                    onClick={() => console.log("Open chat with", tutorEmail)}
                    className="bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300 flex items-center gap-1"
                  >
                    💬Chat TuToria
                  </button>

                  <button
                    onClick={() => handleTrialClassPayment(jobId,payment.tutorId)}
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

            {/* ✅ rating select */}
            <div
              className="rating rating-lg rating-half"
              onChange={(e) => setRating(e.target.value)}
            >
              <input type="radio" name="rating" value="0.5" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating" value="1" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating" value="1.5" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating" value="2" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating" value="2.5" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating" value="3" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating" value="3.5" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating" value="4" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating" value="4.5" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating" value="5" className="mask mask-star-2 mask-half-2 bg-green-500" />
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
    </div>
  );
};

export default HiredTutors;


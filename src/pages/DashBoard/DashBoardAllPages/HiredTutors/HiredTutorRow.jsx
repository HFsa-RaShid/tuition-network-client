// HiredTutorRow.jsx
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";
import { toast } from "react-hot-toast";

const HiredTutorRow = ({ payment, currentUser }) => {
  const axiosSecure = useAxiosSecure();
  const { paidJobsById } = useJobIdpayment(payment.jobId); // ✅ safe hook usage

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [viewInfoTutor, setViewInfoTutor] = useState(null);
  const [rating, setRating] = useState(0);

  const hasPaidTrial = (jobId, tutorEmail) =>
    paidJobsById?.some(
      (p) =>
        p.jobId === jobId &&
        p.email === tutorEmail &&
        p.source === "trialClassPayment" &&
        p.paidStatus
    );

  const hasAdvanceSalaryPaid = (jobId) =>
    paidJobsById?.some(
      (p) =>
        p.jobId === jobId &&
        p.source === "advanceSalary" &&
        p.paidStatus === true
    );

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
      if (response.data.url) window.location.href = response.data.url;
    } catch (error) {
      toast.error("Payment initiation failed.");
    }
  };

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
      if (response.data.url) window.location.href = response.data.url;
    } catch (error) {
      toast.error("Advance salary payment initiation failed.");
    }
  };

  const handleSubmitRating = async () => {
    if (!rating) return toast.error("Please select a rating!");
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
      toast.error("Rating failed!");
    }
  };

  const tutorEmail = payment.email;
  const tutorName = payment.name;
  const jobId = payment.jobId;

  return (
    <li className="list-row flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src={payment.jobDetails?.tutorPhotoURL || "https://i.ibb.co/7n4R8Rt/default-avatar.png"}
          alt={tutorName}
        />
        <div>
          <div className="font-semibold">{tutorName}</div>
          <div className="text-xs opacity-60">
            {payment.jobDetails?.subjects?.join(", ") || "No subjects"}
          </div>
          <div className="text-xs opacity-60">{payment.jobDetails?.location || ""}</div>
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
              hasPaidTrial(jobId, tutorEmail) ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Book Trial Class
          </button>
        </div>

        <div className="flex items-center">
          <button onClick={() => setSelectedTutor({ tutorEmail, tutorName, jobId })} className="btn btn-ghost">
            Rating
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      {/* Rating Modal */}
{selectedTutor && (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">
        Rate {selectedTutor.tutorName}
      </h3>
      <div className="rating rating-lg rating-half">
        <input
          type="radio"
          name="rating"
          value="0.5"
          className="mask mask-star-2 mask-half-1 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="1"
          className="mask mask-star-2 mask-half-2 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="1.5"
          className="mask mask-star-2 mask-half-1 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="2"
          className="mask mask-star-2 mask-half-2 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="2.5"
          className="mask mask-star-2 mask-half-1 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="3"
          className="mask mask-star-2 mask-half-2 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="3.5"
          className="mask mask-star-2 mask-half-1 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="4"
          className="mask mask-star-2 mask-half-2 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="4.5"
          className="mask mask-star-2 mask-half-1 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="radio"
          name="rating"
          value="5"
          className="mask mask-star-2 mask-half-2 bg-yellow-500"
          onChange={(e) => setRating(e.target.value)}
        />
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
            <h3 className="font-bold text-lg mb-4">Tutor Information</h3>
            <p><strong>Name:</strong> {viewInfoTutor.name}</p>
            <p><strong>Email:</strong> {viewInfoTutor.email}</p>
            <p><strong>Phone:</strong> {viewInfoTutor.phone || "N/A"}</p>
            {viewInfoTutor.studentIdImage && (
              <img src={viewInfoTutor.studentIdImage} alt="Student ID" className="mt-3 w-48 rounded-lg shadow" />
            )}
            <div className="modal-action">
              <button onClick={() => setViewInfoTutor(null)} className="btn btn-outline">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </li>
  );
};

export default HiredTutorRow;

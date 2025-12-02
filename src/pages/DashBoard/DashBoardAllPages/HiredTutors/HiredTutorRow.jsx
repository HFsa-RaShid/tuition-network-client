import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";
import { toast } from "react-hot-toast";
import useAxisTutorByID from "../../../../hooks/useAxisTutorByID";

const HiredTutorRow = ({ payment, currentUser }) => {
  const axiosSecure = useAxiosSecure();
  const { paidJobsById, isLoading } = useJobIdpayment(payment.jobId);

  const { tutorProfile: tutor, refetch } = useAxisTutorByID(payment.tutorId);

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [viewInfoTutor, setViewInfoTutor] = useState(null);
  const [rating, setRating] = useState(0);

  // Check if trial class already paid
  const hasPaidTrial = () =>
    paidJobsById?.some(
      (p) =>
        p.jobId === payment.jobId &&
        p.source === "trialClassPayment" &&
        p.paidStatus
    );

  // Check if advance salary already paid
  const hasAdvanceSalaryPaid = () =>
    paidJobsById?.some(
      (p) =>
        p.jobId === payment.jobId &&
        p.source === "advanceSalary" &&
        p.paidStatus
    );

  const handleTrialClassPayment = async (
    jobId,
    tutorId,
    email,
    name,
    amount,
    tutorAmount,
    tuToriaAmount
  ) => {
    try {
      const paymentData = {
        jobId,
        name,
        email,
        tutorId,
        amount,
        tutorAmount,
        tuToriaAmount,
        source: "trialClassPayment",
        studentName: currentUser?.name,
        studentEmail: currentUser?.email,
        role: currentUser?.role,
      };
      const response = await axiosSecure.post("/paymentBkash", paymentData);
      if (response.data.url) window.location.href = response.data.url;
    } catch (error) {
      toast.error("Payment initiation failed.");
    }
  };

  const handleAdvanceSalaryPayment = async (
    jobId,
    tutor,
    amount,
    tutorAmount,
    tuToriaAmount
  ) => {
    try {
      const paymentData = {
        jobId,
        name: tutor?.name,
        email: tutor?.email,
        tutorId: tutor?.customId,
        amount,
        tutorAmount,
        tuToriaAmount,
        source: "advanceSalary",
        studentName: currentUser?.name,
        studentEmail: currentUser?.email,
        role: currentUser?.role,
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
      const res = await axiosSecure.put(
        `/tutors/${selectedTutor?.tutorEmail}`,
        {
          rating: parseFloat(rating),
        }
      );
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <li className="list-row flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border-b">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-md"
          src={tutor?.photoURL || "https://i.ibb.co/7n4R8Rt/default-avatar.png"}
          alt={tutor?.name || "Tutor"}
        />
        <div>
          <div className="font-semibold">{tutor?.name}</div>
          <div className="text-[12px] text-gray-500">{tutor?.customId}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-end w-full md:w-auto">
        <div className="flex flex-col sm:flex-row gap-2 sm:flex-wrap w-full md:w-auto">
        
          {hasPaidTrial() || hasAdvanceSalaryPaid() ? (
            <button
              onClick={() =>
                setViewInfoTutor({
                  name: tutor?.name,
                  email: tutor?.email,
                  phone: tutor?.phone,
                  studentIdImage: tutor?.studentIdImage,
                })
              }
              className="bg-green-200 text-green-700 px-2 py-2 rounded hover:bg-green-300 flex items-center justify-center gap-1 w-full sm:w-auto"
            >
              View Info
            </button>
          ) : (
            <button
              onClick={() => {
                const salary = Number(payment.jobDetails?.salary || 0); 
                const extraFee = +(salary * 0.06).toFixed(2); // 6% fee
                const totalAmount = +(salary + extraFee).toFixed(2); // total to pay

                handleAdvanceSalaryPayment(
                  payment.jobId,
                  tutor,
                  totalAmount,
                  salary,
                  extraFee
                );
              }}
              className="bg-blue-200 text-blue-700 px-2 py-2 rounded hover:bg-blue-300 flex items-center justify-center gap-1 w-full sm:w-auto"
            >
              Pay Advance
            </button>
          )}

          {/* Book Trial Class Button */}
          <button
            onClick={() =>
              handleTrialClassPayment(
                payment.jobId,
                tutor?.customId,
                tutor?.email,
                tutor?.name,
                payment.jobDetails?.salary * 0.08,
                payment.jobDetails?.salary * 0.05,
                payment.jobDetails?.salary * 0.03
              )
            }
            disabled={hasPaidTrial() || hasAdvanceSalaryPaid()}
            className={`bg-blue-200 text-blue-700 px-2 py-2 rounded hover:bg-blue-300 flex items-center justify-center gap-1 w-full sm:w-auto ${
              hasPaidTrial() || hasAdvanceSalaryPaid()
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
              setSelectedTutor({
                tutorEmail: tutor?.email,
                tutorName: tutor?.name,
                jobId: payment.jobId,
              })
            }
            className="btn btn-ghost w-full md:w-auto"
          >
            Rating
          </button>
        </div>
      </div>

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
              <button onClick={handleSubmitRating} className="btn-primary">
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
            <p>
              <strong>Name:</strong> {viewInfoTutor.name}
            </p>
            <p>
              <strong>Email:</strong> {viewInfoTutor.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewInfoTutor.phone || "N/A"}
            </p>
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
    </li>
  );
};

export default HiredTutorRow;

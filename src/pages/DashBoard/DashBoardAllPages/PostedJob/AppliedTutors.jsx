import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";

const AppliedTutors = () => {
  const { state } = useLocation();
  const appliedTutorsFromState = state?.appliedTutors || [];
  const jobId = state?.jobId;

  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const axiosPublic = useAxiosPublic();

  const [confirmedTutorEmail, setConfirmedTutorEmail] = useState(null);
  const [localTutors, setLocalTutors] = useState(appliedTutorsFromState);

  // Use payment hook with enabled flag
  const { paidJobsById: paidData = [], refetch } = useJobIdpayment(jobId);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;
  const totalPages = Math.ceil(localTutors.length / tutorsPerPage);
  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = localTutors.slice(
    startIndex,
    startIndex + tutorsPerPage
  );

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Avoid unnecessary state updates on appliedTutors change
  useEffect(() => {
    const confirmed = appliedTutorsFromState.find(
      (t) => t.confirmationStatus === "confirmed"
    );
    if (confirmed && confirmed.email !== confirmedTutorEmail) {
      setConfirmedTutorEmail(confirmed.email);
    }

    // Only update if different (simple check by JSON stringify)
    const currentTutorsJSON = JSON.stringify(localTutors);
    const newTutorsJSON = JSON.stringify(appliedTutorsFromState);
    if (currentTutorsJSON !== newTutorsJSON) {
      setLocalTutors(appliedTutorsFromState);
      setCurrentPage(1); // reset page when data changes
    }
  }, [appliedTutorsFromState, confirmedTutorEmail, localTutors]);

  // Handle confirmation
  const handleConfirm = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.put(`/tutorRequests/${jobId}`, {
            confirmedTutorEmail: email,
          });
          if (res.data.message) {
            Swal.fire({
              title: "Confirmed!",
              text: res.data.message,
              icon: "success",
            });
            setConfirmedTutorEmail(email);

            // Update local status
            const updated = localTutors.map((tutor) =>
              tutor.email === email
                ? { ...tutor, confirmationStatus: "confirmed" }
                : { ...tutor, confirmationStatus: undefined }
            );
            setLocalTutors(updated);

            // Refetch payment data
            refetch();
          }
        } catch {
          toast.error("Failed to confirm tutor.");
        }
      }
    });
  };

  // Cancel confirmation
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the confirmation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.put(`/tutorRequests/${jobId}`, {
            cancelConfirmation: true,
          });
          if (res.data.message) {
            toast.success(res.data.message);
            setConfirmedTutorEmail(null);
            const updated = localTutors.map(
              ({ confirmationStatus, ...rest }) => rest
            );
            setLocalTutors(updated);
            refetch();
          }
        } catch {
          toast.error("Failed to cancel confirmation.");
        }
      }
    });
  };

  // Handle trial class payment
  const handleTrialClassPayment = async () => {
    try {
      const paymentData = {
        jobId: jobId,
        name: currentUser?.name,
        email: currentUser?.email,
        amount: 250,
        source: "appliedTutors",
      };

      const response = await axiosPublic.post("/paymentBkash", paymentData);

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Payment initiation failed.");
    }
  };

  // Show a message if no tutors applied
  if (localTutors.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>
        <p>No tutors have applied for this job yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full border border-gray-300 text-center">
          <thead className="bg-gray-200 text-[16px]">
            <tr>
              <th>Name</th>
              <th></th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTutors.map((tutor, index) => {
              const isConfirmed = confirmedTutorEmail === tutor.email;
              const isDisabled = confirmedTutorEmail && !isConfirmed;

              const hasPaid = paidData.some(
                (p) => p.email === tutor.email && p.paidStatus === true
              );

              return (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-center py-2 ">{tutor.name}</td>
                  <td className="py-2 text-center">
                    <NavLink
                      to={`/${currentUser?.role}/posted-jobs/applied-tutors/appliedTutor-profile`}
                      state={{ email: tutor.email }}
                      className="text-blue-700 text-[20px]"
                      title="View Profile"
                    >
                      <MdSendToMobile className="cursor-pointer" />
                    </NavLink>
                  </td>
                  <td>
                    {new Date(tutor.appliedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="flex justify-center gap-2">
                    {isConfirmed ? (
                      hasPaid ? (
                        <div className="">
                          <button
                            onClick={() =>
                              console.log("Open chat with", tutor.email)
                            }
                            className="bg-blue-200 mb-2 text-blue-700 px-2 py-1 rounded hover:bg-blue-300 flex items-center gap-1"
                          >
                            💬Chat TuToria
                          </button>

                          
                          <div
                            className="tooltip"
                            data-tip="Pay 200 BDT and get trial class"
                          >
                            <button
                              onClick={handleTrialClassPayment}
                              disabled={hasPaid} 
                              className={`px-2 py-1 rounded flex items-center gap-1 mb-2 
      ${
        hasPaid
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-200 text-blue-700 hover:bg-blue-300"
      }`}
                            >
                              Book Trial Class
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleCancel}
                          className="bg-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-300 flex items-center gap-1"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleConfirm(tutor.email)}
                        disabled={isDisabled}
                        className="bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaCheck />
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 items-center gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            &lt; Prev
          </button>

          <span className="font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;

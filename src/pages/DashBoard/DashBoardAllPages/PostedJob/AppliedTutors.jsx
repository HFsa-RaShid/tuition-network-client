import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";
import useAppliedTutorForJobID from "../../../../hooks/useAppliedTutorForJobID";
import { IoArrowBack } from "react-icons/io5";

const AppliedTutors = () => {
  const { state } = useLocation();
  let jobId = state?.jobId;

  useEffect(() => {
    if (jobId) {
      localStorage.setItem("appliedTutorsJobId", jobId);
    }
  }, [jobId]);

  if (!jobId) {
    jobId = localStorage.getItem("appliedTutorsJobId");
  }

  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    appliedTutorForJobId: appliedTutorsFromAPI = [],
    refetch: refetchTutors,
    isLoading,
    isError,
  } = useAppliedTutorForJobID(jobId);

  const { paidJobsById: paidData = [], refetch: refetchPayments } =
    useJobIdpayment(jobId);

  const [confirmedTutorEmail, setConfirmedTutorEmail] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;

  const totalPages =
    Array.isArray(appliedTutorsFromAPI) && appliedTutorsFromAPI.length > 0
      ? Math.ceil(appliedTutorsFromAPI.length / tutorsPerPage)
      : 1;

  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = Array.isArray(appliedTutorsFromAPI)
    ? appliedTutorsFromAPI.slice(startIndex, startIndex + tutorsPerPage)
    : [];

  // Update confirmed tutor email when applied tutors data changes
  useEffect(() => {
    if (!Array.isArray(appliedTutorsFromAPI)) return;

    const confirmed = appliedTutorsFromAPI.find(
      (t) => t.confirmationStatus === "confirmed"
    );
    setConfirmedTutorEmail(confirmed ? confirmed.email : null);
    setCurrentPage(1); // Reset to first page when data changes
  }, [appliedTutorsFromAPI]);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Confirm tutor handler
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
            refetchTutors();
            refetchPayments();
          }
        } catch {
          toast.error("Failed to confirm tutor.");
        }
      }
    });
  };

  // Cancel confirmation handler
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
            refetchTutors();
            refetchPayments();
          }
        } catch {
          toast.error("Failed to cancel confirmation.");
        }
      }
    });
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }


  if (
    !Array.isArray(appliedTutorsFromAPI) ||
    appliedTutorsFromAPI.length === 0
  ) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>
        <p>No tutors have applied for this job yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-1"
      >
        <IoArrowBack className="text-2xl" />

        <span className="text-lg font-medium">Back</span>
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Applied Tutors</h2>

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

              const hasPaidJob = paidData.some(
                (p) =>
                  p.jobId === jobId &&
                  p.email === tutor.email &&
                  p.paidStatus === true &&
                  p.source === "myApplications"
              );

              return (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-center py-2">{tutor.name}</td>
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
                      <button
                        onClick={handleCancel}
                        disabled={hasPaidJob} // disable if paid
                        className={`px-2 py-1 rounded flex items-center gap-1 ${
                          hasPaidJob
                            ? "bg-red-200 text-red-400 cursor-not-allowed"
                            : "bg-red-200 text-red-700 hover:bg-red-300"
                        }`}
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConfirm(tutor.email)}
                        disabled={isDisabled}
                        className={`px-2 py-1 rounded flex items-center gap-1 ${
                          isDisabled
                            ? "bg-green-200 text-green-400 cursor-not-allowed"
                            : "bg-green-200 text-green-700 hover:bg-green-300"
                        }`}
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

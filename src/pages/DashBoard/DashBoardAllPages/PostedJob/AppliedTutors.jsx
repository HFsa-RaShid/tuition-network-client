
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AppliedTutors = () => {
  const { state } = useLocation();

  const appliedTutors = state?.appliedTutors || [];
  const jobId = state?.jobId; 

  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const axiosPublic = useAxiosPublic();

  const [confirmedTutorEmail, setConfirmedTutorEmail] = useState(null);
  const [localTutors, setLocalTutors] = useState(appliedTutors);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;
  const totalPages = Math.ceil(localTutors.length / tutorsPerPage);
  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = localTutors.slice(startIndex, startIndex + tutorsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
        }
      } catch (error) {
        toast.error("Failed to confirm tutor.");
      }
    }
  });
};


  // Cancel confirmation with SweetAlert2 confirmation modal
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

            // Remove confirmationStatus locally
            const updated = localTutors.map(({ confirmationStatus, ...rest }) => rest);
            setLocalTutors(updated);
          }
        } catch (error) {
          toast.error("Failed to cancel confirmation.");
        }
      }
    });
  };

  useEffect(() => {
    const confirmed = appliedTutors.find((t) => t.confirmationStatus === "confirmed");
    if (confirmed) {
      setConfirmedTutorEmail(confirmed.email);
    }
    setLocalTutors(appliedTutors); // Ensure local tutors updated if appliedTutors changes
  }, [appliedTutors]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full border border-gray-300 text-center ">
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

              return (
                <tr key={index} className="border-t">
                  <td className="flex items-center justify-center py-3">{tutor.name}</td>
                  <td className="py-3 text-center">
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
                        className="bg-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-300 flex items-center gap-1"
                      >
                        <FaTimes />
                        Cancel
                      </button>
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

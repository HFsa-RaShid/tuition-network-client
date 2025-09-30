import React from "react";

import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAllJobs from "../../../../hooks/useAllJobs";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";

const PendingRequest = () => {
  const { allJobs, refetch, isLoading } = useAllJobs();
  const axiosSecure = useAxiosSecure();

  // Filter pending requests from all jobs
  const pendingRequests = allJobs?.filter((job) => job.status === "pending");
  const approvedRequests = allJobs?.filter((job) => job.status === "approved");

  const approveRequest = (request) => {
    axiosSecure
      .put(`/tutorRequests/${request._id}`, {
        status: "approved",
      })
      .then(() => {
        toast.success("Approved!The request has been approved.");

        refetch();
      })
      .catch((error) => {
        console.error("Approval error:", error);
        toast.error("Error!", "Failed to approve the tutor request.", "error");
      });
  };

  const handleReject = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tutorRequests/${jobId}`);
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          } else {
            Swal.fire("Failed!", "Job could not be deleted.", "error");
          }
        } catch (error) {
          console.error("Error deleting job:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
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

    


  return (
    <div className=" container mx-auto">
      {pendingRequests?.length === 0 ? (
        <div>
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaEyeSlash className="w-8 h-8 text-gray-500" />
            </div>
          <p className="text-center mt-4">No pending requests found.</p>
        </div>
      ) : (
        <div className="my-4 ml-6 grid grid-cols-1 lg:grid-cols-2  gap-10 px-1">
          {pendingRequests.map((request) => (
            <div key={request._id} className="card shadow-xl">
              <div className="card-body ">
                <div className="flex gap-10">
                  <p className="text-gray-500">
                    Tuition ID: {request.tuitionId}
                  </p>

                  <p className="text-gray-500">
                    📍 {request.city}, {request.location}
                  </p>
                </div>
                <h2 className="text-xl text-black font-bold mt-1">
                  Tuition for {request.classCourse}
                </h2>
                <div className="flex gap-2 ">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                    {request.tuitionType}
                  </span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    ⏰ {request.duration}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 justify-between gap-2 text-black">
                  <p>
                    <strong>👨‍🏫 No. of Students:</strong> {request.noOfStudents}
                  </p>
                  <p>
                    <strong>🏫 Medium:</strong> {request.category}
                  </p>
                  <p>
                    <strong>📚 Class:</strong> {request.classCourse}
                  </p>
                  <p>
                    <strong>📅 Tutoring Days:</strong> {request.daysPerWeek}
                  </p>
                  <p>
                    <strong>👤 Preferred Tutor:</strong>{" "}
                    {request.tutorGenderPreference}
                  </p>
                  <p>
                    <strong>👧 Student Gender:</strong> {request.studentGender}
                  </p>
                </div>

                <div className="mt-1 text-black">
                  <strong>📖 Subjects:</strong>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {request.subjects?.map((subj, idx) => (
                      <span
                        key={idx}
                        className="bg-green-300 text-sm px-2 py-1 rounded"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-1 text-black">
                  <strong>💰 Salary:</strong>{" "}
                  <span className="text-blue-700 font-bold">
                    {request.salary} TK
                  </span>
                  /Month
                </p>
                {/* <p className="text-gray-500  text-sm">
                  Posted by: {request.userName} ({request.userEmail})
                </p> */}
                <p className="text-gray-500  text-sm">
                  Posted Date:{" "}
                  {new Date(request.postedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="px-4 py-2 border border-blue-400 hover:bg-green-600"
                    onClick={() => approveRequest(request)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 border border-red-400 hover:bg-red-500"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequest;

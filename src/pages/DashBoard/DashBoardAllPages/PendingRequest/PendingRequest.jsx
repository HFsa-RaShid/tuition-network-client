import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAllJobs from "../../../../hooks/useAllJobs";

const PendingRequest = () => {
  const { allJobs, refetch, isLoading } = useAllJobs();
  const axiosSecure = useAxiosSecure();

  // Filter pending requests from all jobs
  const pendingRequests = allJobs?.filter((job) => job.status === "pending");
  const approvedRequests = allJobs?.filter((job) => job.status === "approved");

  const approveRequest = (request) => {
    axiosSecure
      .put(`/tutorRequests/${request._id}`, {
        tutorDetails: request.tutorDetails,
      })
      .then(() => {
        Swal.fire(
          "Approved!",
          "The tutor request has been approved.",
          "success"
        );
        refetch();
      })
      .catch((error) => {
        console.error("Approval error:", error);
        Swal.fire("Error!", "Failed to approve the tutor request.", "error");
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
    return <p className="text-center mt-20">Loading pending requests...</p>;
  }

  return (
    <div className="min-h-screen">
      
          {pendingRequests?.length === 0 ? (
            <p className="text-center mt-4">No pending requests found.</p>
          ) : (
            <div className="my-6 grid grid-cols-1 lg:grid-cols-2  gap-10 px-1">
              {pendingRequests.map((request) => (
                <div key={request._id} className="card shadow-xl">
                  <div className="card-body ">
                    <p className="text-gray-500">
                      📍 {request.city}, {request.location}
                    </p>
                    <h2 className="text-xl text-black font-bold mt-2">
                      Tuition for {request.classCourse}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                        {request.tuitionType}
                      </span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        ⏰ {request.duration}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 justify-between gap-2 text-black">
                      <p>
                        <strong>👨‍🏫 No. of Students:</strong>{" "}
                        {request.noOfStudents}
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
                        <strong>👧 Student Gender:</strong>{" "}
                        {request.studentGender}
                      </p>
                    </div>

                    <div className="mt-2 text-black">
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

                    <p className="mt-3 text-black">
                      <strong>💰 Salary:</strong>{" "}
                      <span className="text-blue-700 font-bold">
                        {request.salary} TK
                      </span>
                      /Month
                    </p>
                    <p className="text-gray-500 mt-2 text-sm">
                      Posted by: {request.userName} ({request.userEmail})
                    </p>

                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-outline hover:bg-green-600"
                        onClick={() => approveRequest(request)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline btn-error"
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

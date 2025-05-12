import { useEffect, useState, useContext } from "react";
import useAllJobs from "../../../../hooks/useAllJobs";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PostedJobs = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { allJobs, refetch, isLoading } = useAllJobs();
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (allJobs && user?.email) {
      const userPostedJobs = allJobs.filter(
        (job) => job.userEmail === user.email && job.status === "approved"
      );
      setJobs(userPostedJobs);
    }
  }, [allJobs, user?.email]);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading your posted jobs...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="p-6 gap-4">
        <div className="w-full space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-slate-100 shadow-md rounded-lg p-6 relative "
            >
              <p className="text-gray-500">
                📍 {job.city}, {job.location}
              </p>
              <h2 className="text-xl text-black font-bold mt-2">
                Tuition for {job.classCourse}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                  {job.tuitionType}
                </span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  ⏰ {job.duration}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 justify-between gap-2 text-black">
                <p>
                  <strong>👨‍🏫 No. of Students:</strong> {job.noOfStudents}
                </p>
                <p>
                  <strong>🏫 Medium:</strong> {job.category}
                </p>
                <p>
                  <strong>📚 Class:</strong> {job.classCourse}
                </p>
                <p>
                  <strong>📅 Tutoring Days:</strong> {job.daysPerWeek}
                </p>
                <p>
                  <strong>👤 Preferred Tutor:</strong>{" "}
                  {job.tutorGenderPreference}
                </p>
                <p>
                  <strong>👧 Student Gender:</strong> {job.studentGender}
                </p>
              </div>

              <div className="mt-2 text-black">
                <strong>📖 Subjects:</strong>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {job.subjects?.map((subj, idx) => (
                    <span
                      key={idx}
                      className="bg-green-300 text-sm px-2 py-1 rounded"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="mt-3 text-black">
                <strong>💰 Salary:</strong>{" "}
                <span className="text-blue-700 font-bold">{job.salary} TK</span>
                /Month
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Posted by: {job.userName} ({job.userEmail})
              </p>
                </div>

              <div className="mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const selectedStatus = e.target.tutorStatus.value;

                    axiosSecure
                      .put(`/tutorRequests/${job._id}`, {
                        tutorStatus: selectedStatus,
                      })
                      .then((res) => {
                        if (res.data.modifiedCount > 0) {
                          refetch(); 
                        }
                      })
                      .catch((err) => {
                        console.error(
                          "Failed to update status:",
                          err.response ? err.response.data : err.message
                        );
                      });
                  }}
                >
                  
                  <div className="flex gap-4 items-center mb-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="tutorStatus"
                        value="none"
                        defaultChecked={job.tutorStatus === "none"}
                      />
                      No Need
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="tutorStatus"
                        value="selected"
                        defaultChecked={job.tutorStatus === "selected"}
                      />
                      Selected
                    </label>

                     <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update Status
                  </button>
                  </div>
                 
                </form>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;

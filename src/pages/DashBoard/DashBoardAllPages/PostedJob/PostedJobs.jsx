import { useEffect, useState, useContext } from "react";
import useAllJobs from "../../../../hooks/useAllJobs";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { allJobs, refetch, isLoading } = useAllJobs();
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const [jobs, setJobs] = useState([]);
  const { role } = useParams();

  useEffect(() => {
    if (allJobs && user?.email) {
      const userPostedJobs = allJobs.filter(
        (job) => job.userEmail === user.email && job.status === "approved"
      );
      setJobs(userPostedJobs);
    }
  }, [allJobs, user?.email]);

  const handleToggleStatus = (job) => {
    const newStatus =
      job.tutorStatus === "Not Available" ? "" : "Not Available";

    axiosSecure
      .put(`/tutorRequests/${job._id}`, {
        tutorStatus: newStatus,
      })
      .then((res) => {
        if (res.data.message === "Tutor status updated successfully.") {
          refetch();
        }
      })
      .catch((err) => {
        console.error(
          "Failed to toggle status:",
          err.response?.data || err.message
        );
      });
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="p-6 gap-4">
        <div className="w-full space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-slate-100 shadow-md rounded-lg p-6 relative "
            >
              <NavLink
                to={`/${role}/posted-jobs/applied-tutors`}
                state={{ appliedTutors: job.appliedTutors }}
                className="tooltip tooltip-left absolute top-4 right-4 z-10"
                data-tip="Applied Tutors List"
              >
                <FaListUl className="text-gray-600 text-xl cursor-pointer hover:text-black transition duration-200" />
              </NavLink>

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
                    <span className="text-blue-700 font-bold">
                      {job.salary} TK
                    </span>
                    /Month
                  </p>

                  <p className="text-gray-500 mt-2 text-sm">
                    Posted Date:{" "}
                    {new Date(job.postedAt).toLocaleString("en-US", {
                      timeZone: "Asia/Dhaka",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="mt-4">
                  <label
                    className="flex items-center gap-2 cursor-pointer  text-blue-700 hover:text-red-600 transition"
                    onClick={() => handleToggleStatus(job)}
                  >
                    <input
                      type="checkbox"
                      checked={job.tutorStatus === "Not Available"}
                      readOnly
                    />
                    {job.tutorStatus === "Not Available"
                      ? "Unset 'Not Available'"
                      : "Set as 'Not Available'"}
                  </label>
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

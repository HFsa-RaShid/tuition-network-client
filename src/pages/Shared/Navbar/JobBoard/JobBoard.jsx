import { useEffect, useState, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import useAllJobs from "../../../../hooks/useAllJobs";
import Navbar from "../Navbar";
import ContactSection from "../../../landingPage/sections/contact/ContactSection";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JobBoard = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { allJobs, refetch, isLoading } = useAllJobs();
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    tutoringType: "",
    gender: "",
    medium: "",
    city: "",
    area: "",
    classCourse: "",
    selectedDate: null,
  });

  useEffect(() => {
    if (allJobs) {
      setJobs(allJobs);
    }
  }, [allJobs]);

  useEffect(() => {
    if (allJobs) {
      const approvedJobs = allJobs.filter((job) => job.status === "approved");
      setJobs(approvedJobs);
    }
  }, [allJobs]);

  const classes = [
    "Play",
    "Nursery",
    "KG",
    ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
    "Class 12",
    "Honours",
    "Masters",
  ];

 const handleApply = (jobId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, apply for this request!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .put(`/tutorRequests/${jobId}`, {
          email: user.email,
          name: currentUser?.name || user?.displayName, // ✅ send tutor name too
        })
        .then((res) => {
          if (res.data?.message === "Applied successfully.") {
            Swal.fire(
              "Applied!",
              "You have successfully applied for this tutor request.",
              "success"
            );
          } else {
            Swal.fire(
              "Note",
              res.data?.message || "Something happened.",
              "info"
            );
          }
          refetch();
        })
        .catch((error) => {
          console.error("Apply error:", error);
          Swal.fire(
            "Error!",
            "Failed to apply for the tutor request.",
            "error"
          );
        });
    }
  });
};

  const handleDelete = (jobId) => {
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
          const res = await axiosPublic.delete(`/tutorRequests/${jobId}`);
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

  // When city changes, reset area
  const handleCityChange = (city) => {
    setFilter((prev) => ({
      ...prev,
      city,
      area: "",
    }));
  };

  let filteredJobs = jobs.filter((job) => {
    const jobDate = new Date(job.postedAt).toISOString().split("T")[0];
    const selectedDate = filter.selectedDate
      ? filter.selectedDate.toISOString().split("T")[0]
      : null;

    return (
      (!filter.tutoringType || job.tuitionType === filter.tutoringType) &&
      (!filter.gender || job.tutorGenderPreference === filter.gender) &&
      (!filter.medium || job.category === filter.medium) &&
      (!filter.city || job.city === filter.city) &&
      (!filter.area || job.location === filter.area) &&
      (!filter.classCourse || job.classCourse === filter.classCourse) &&
      (!selectedDate || jobDate === selectedDate)
    );
  });

  // Show a message if no jobs match the filter
  {
    filteredJobs.length === 0 && (
      <p className="text-center text-gray-500">No matching jobs found.</p>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ContactSection />

      <div className="container mx-auto mt-6">
        <div className="flex p-6 gap-4">
          {/* Left Sidebar (Filters) */}
          <div className="w-[30%] bg-slate-100 shadow-md rounded-lg p-4 text-black">
            <h2 className="text-[24px] font-semibold mb-4">
              🔍 Advanced Filter
            </h2>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Tuition Type</label>
              <select
                className="w-full border p-2 rounded bg-white"
                onChange={(e) =>
                  setFilter({ ...filter, tutoringType: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Home Tutoring">Home Tutoring</option>
                <option value="Online Tutoring">Online Tutoring</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Preferred Tutor
              </label>
              <select
                className="w-full border p-2 rounded bg-white"
                onChange={(e) =>
                  setFilter({ ...filter, gender: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Preferred Medium
              </label>
              <select
                className="w-full border p-2 rounded bg-white"
                onChange={(e) =>
                  setFilter({ ...filter, medium: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Preferred City</label>
              <select
                className="w-full border p-2 rounded bg-white"
                value={filter.city}
                onChange={(e) => handleCityChange(e.target.value)}
              >
                <option value="">All</option>
                {bdDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Preferred Area</label>
              <select
                className="w-full border p-2 rounded bg-white"
                value={filter.area}
                onChange={(e) => setFilter({ ...filter, area: e.target.value })}
                disabled={!filter.city}
              >
                <option value="">All</option>
                {filter.city &&
                  cityAreaMap[filter.city]?.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </select>
            </div>

            {/* Preferred Class */}

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Preferred Class
              </label>
              <select
                className="w-full border p-2 rounded bg-white"
                value={filter.classCourse}
                onChange={(e) =>
                  setFilter({ ...filter, classCourse: e.target.value })
                }
              >
                <option value="">All</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Search by Date */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Search by Date</label>
              <DatePicker
                selected={filter.selectedDate}
                onChange={(date) =>
                  setFilter({ ...filter, selectedDate: date })
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd 📅"
                className="w-full border p-2 rounded bg-white"
                isClearable
              />
            </div>
          </div>

          {/* Right Content (Job Cards) */}
          <div className="w-[70%] space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-slate-100 shadow-md rounded-lg p-6 relative"
              >
                {job.tutorStatus === "selected" && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Selected
                  </div>
                )}
                {job.tutorStatus === "Not Available" && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Not Available
                  </div>
                )}

                {/* 🔧 Admin Edit/Delete Buttons */}
                {currentUser?.role === "admin" && (
                  <div className="absolute bottom-4 right-10 flex gap-3">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash size={24} />
                    </button>
                  </div>
                )}

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

                {currentUser?.role === "tutor" &&
                  job.tutorStatus !== "selected" &&
                  job.tutorStatus !== "Not Available" && (
                    <button
                      onClick={() => handleApply(job._id)}
                      disabled={job.appliedTutors?.some(
                        (tutor) => tutor.email === user.email
                      )}
                      className={`absolute bottom-4 right-4 px-4 py-2 rounded font-medium ${
                        job.appliedTutors?.some(
                          (tutor) => tutor.email === user.email
                        )
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#f9d045] hover:bg-[#f9d045]"
                      }`}
                    >
                      {job.appliedTutors?.some(
                        (tutor) => tutor.email === user.email
                      )
                        ? "Already Applied"
                        : "Apply Now"}
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;

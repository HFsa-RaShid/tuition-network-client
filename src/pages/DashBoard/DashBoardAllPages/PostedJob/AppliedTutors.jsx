import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const { state } = useLocation(); // job data passed via state
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
  } = useAppliedTutorForJobID(jobId);

  const { paidJobsById: paidData = [], refetch: refetchPayments } =
    useJobIdpayment(jobId);

  const [confirmedTutorEmail, setConfirmedTutorEmail] = useState(null);
  const [bestMatchedTutor, setBestMatchedTutor] = useState(null);

  // ---- MATCH SCORE FUNCTION ----
  const calculateMatchScore = (job, tutor) => {
    let score = 0;

    // 1. City / Location
    if (tutor.city === job.city) score += 30;
    if (
      tutor.preferredLocations
        ?.toLowerCase()
        .includes(job.location?.toLowerCase())
    ) {
      score += 20;
    }

    // 2. Category / Class / Subject
    if (
      tutor.preferredCategories
        ?.toLowerCase()
        .includes(job.category?.toLowerCase())
    ) {
      score += 20;
    }
    if (
      tutor.preferredClass?.toLowerCase().includes(job.classCourse?.toLowerCase())
    ) {
      score += 20;
    }

    const jobSubjects = job.subjects?.map((s) => s.toLowerCase()) || [];
    const tutorSubjects =
      tutor.preferredSubjects?.toLowerCase().split(",") || [];
    if (jobSubjects.some((sub) => tutorSubjects.includes(sub))) {
      score += 30;
    }

    // 3. Salary
    if (parseInt(tutor.expectedSalary) <= parseInt(job.salary)) {
      score += 10;
    }

    // 4. Gender Preference
    if (
      job.tutorGenderPreference === "Any" ||
      job.tutorGenderPreference?.toLowerCase() ===
        tutor.gender?.toLowerCase()
    ) {
      score += 10;
    }

    return score;
  };

  // ---- FETCH APPLIED TUTORS WITH PROFILE ----
  const [appliedTutorsWithProfile, setAppliedTutorsWithProfile] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!Array.isArray(appliedTutorsFromAPI)) return;
      try {
        const profiles = await Promise.all(
          appliedTutorsFromAPI.map(async (t) => {
            const res = await axiosPublic.get(`/tutors/${t.tutorId}`);
            return { ...t, profile: res.data };
          })
        );
        setAppliedTutorsWithProfile(profiles);
      } catch {
        toast.error("Failed to fetch tutor profiles");
      }
    };
    fetchProfiles();
  }, [appliedTutorsFromAPI, axiosPublic]);

  // ---- FIND BEST MATCHED ----
  useEffect(() => {
    if (!state || appliedTutorsWithProfile.length === 0) return;

    const tutorsWithScore = appliedTutorsWithProfile.map((t) => {
      const score = calculateMatchScore(state, t.profile);
      return { ...t, matchScore: score };
    });

    tutorsWithScore.sort((a, b) => b.matchScore - a.matchScore);
    setBestMatchedTutor(tutorsWithScore[0] || null);
  }, [state, appliedTutorsWithProfile]);

  // Confirmed tutor effect
  useEffect(() => {
    if (!Array.isArray(appliedTutorsFromAPI)) return;
    const confirmed = appliedTutorsFromAPI.find(
      (t) => t.confirmationStatus === "confirmed"
    );
    setConfirmedTutorEmail(confirmed ? confirmed.email : null);
  }, [appliedTutorsFromAPI]);

  // ---- Confirm tutor ----
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
            Swal.fire("Confirmed!", res.data.message, "success");
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

  // ---- Cancel confirm ----
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

  // ---- LOADING ----
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // ---- NO APPLIED ----
  if (!appliedTutorsFromAPI.length) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>
        <p>No tutors have applied for this job yet.</p>
      </div>
    );
  }

  // ---- MAIN UI ----
  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:underline"
        >
          <IoArrowBack className="text-2xl" />
          <span className="text-lg font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Applied Tutors</h2>

      {/* Best Match Section */}
      {bestMatchedTutor && (
        <div className="mb-6 p-4 border-2 border-green-400 rounded-lg bg-green-50 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Best Matched Tutor
          </h3>
          <p><strong>Name:</strong> {bestMatchedTutor.name}</p>
          <p><strong>Email:</strong> {bestMatchedTutor.email}</p>
          <p><strong>Match Score:</strong> {bestMatchedTutor.matchScore}%</p>
          <p><strong>Expected Salary:</strong> {bestMatchedTutor.profile?.expectedSalary}</p>
          <NavLink
            to={`/${currentUser?.role}/posted-jobs/applied-tutors/appliedTutor-profile`}
            state={{ email: bestMatchedTutor.email }}
            className="text-blue-600 underline mt-2 inline-block"
          >
            View Profile
          </NavLink>
        </div>
      )}

      {/* Applied Tutors Table */}
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
            {appliedTutorsFromAPI.map((tutor, index) => {
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
                        disabled={hasPaidJob}
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
    </div>
  );
};

export default AppliedTutors;

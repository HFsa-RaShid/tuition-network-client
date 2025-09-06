import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAppliedTutorForJobID from "../../../../hooks/useAppliedTutorForJobID";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useJobIdpayment from "../../../../hooks/useJobIdpayment";
import { AuthContext } from "../../../../provider/AuthProvider";

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
  } = useAppliedTutorForJobID(jobId);

  


  const { paidJobsById: paidData = [], refetch: refetchPayments } =
    useJobIdpayment(jobId);


  const [confirmedTutorEmail, setConfirmedTutorEmail] = useState(null);
  const [topMatchedTutors, setTopMatchedTutors] = useState([]);
  const [showTopMatches, setShowTopMatches] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [appliedTutorsWithProfile, setAppliedTutorsWithProfile] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleToggleAndRefresh = async () => {
    if (currentUser?.profileStatus !== "Premium") {
      toast.error("You need to purchase Premium to use this feature!");
      navigate(`/${currentUser.role}/premium`);
      return;
    }

    if (!showTopMatches) {
      setIsRefreshing(true);

      try {
        setAppliedTutorsWithProfile([]);
        setTopMatchedTutors([]);

        const { data: refreshedData } = await refetchTutors();

        // Force immediate profile fetch with refreshed data
        if (refreshedData && refreshedData.length > 0) {
          const profiles = await Promise.all(
            refreshedData.map(async (tutor) => {
              try {
                const res = await axiosPublic.get(`/tutors/${tutor.email}`);
                if (
                  res.data?.email?.toLowerCase() === tutor.email?.toLowerCase()
                ) {
                  return { ...tutor, profile: res.data };
                }
                return { ...tutor, profile: null };
              } catch (emailError) {
                try {
                  const res = await axiosPublic.get(
                    `/tutors/profile/${tutor.tutorId}`
                  );
                  if (
                    res.data?.email?.toLowerCase() ===
                    tutor.email?.toLowerCase()
                  ) {
                    return { ...tutor, profile: res.data };
                  }
                  return { ...tutor, profile: null };
                } catch (tutorIdError) {
                  return { ...tutor, profile: null };
                }
              }
            })
          );

          setAppliedTutorsWithProfile(profiles);

          if (jobData) {
            const tutorsWithScore = profiles
              .filter((tutor) => tutor.profile)
              .filter((tutor) => {
                if (!tutor.profile.city || !jobData.city) return false;
                return (
                  tutor.profile.city.toLowerCase().trim() ===
                  jobData.city.toLowerCase().trim()
                );
              })
              .map((tutor) => ({
                ...tutor,
                matchScore: calculateMatchScore(jobData, tutor.profile),
              }))
              .sort((a, b) => b.matchScore - a.matchScore)
              .slice(0, 5);

            setTopMatchedTutors(tutorsWithScore);
          }
        }
        setShowTopMatches(true);
      } catch (error) {
        console.error("Error refreshing data:", error);
        toast.error("Failed to refresh data");
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setShowTopMatches(false);
    }
  };

  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) return;

      try {
        const jobResponse = await axiosPublic.get(`/tutorRequests`);
        const job = jobResponse.data.find((job) => job._id === jobId);

        if (job) {
          setJobData(job);
        } else {
          toast.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error("Failed to fetch job details");
      }
    };

    fetchJobData();
  }, [jobId, axiosPublic]);

  // ---- MATCH SCORE FUNCTION ----
  const calculateMatchScore = (job, tutor) => {
    if (!job || !tutor) {
      return 0;
    }

    let score = 0;
    const maxScore = 100; // Total possible score

    // 1. City Match (25 points)
    if (tutor.city && job.city) {
      if (tutor.city.toLowerCase().trim() === job.city.toLowerCase().trim()) {
        score += 20;
      }
    }

    // 2. Location Match (15 points)
    if (tutor.preferredLocations && job.location) {
      const tutorLocations = tutor.preferredLocations
        .toLowerCase()
        .split(",")
        .map((loc) => loc.trim());

      const jobLocation = job.location.toLowerCase().trim();

      if (
        tutorLocations.some(
          (loc) => loc.includes(jobLocation) || jobLocation.includes(loc)
        )
      ) {
        score += 15;
      }
    }

    // 3. Category Match (15 points)
    if (tutor.preferredCategories && job.category) {
      const tutorCategories = tutor.preferredCategories
        .toLowerCase()
        .split(",")
        .map((cat) => cat.trim());

      const jobCategory = job.category.toLowerCase().trim();

      if (
        tutorCategories.some(
          (cat) => cat.includes(jobCategory) || jobCategory.includes(cat)
        )
      ) {
        score += 15;
      }
    }

    // 4. Class Match (15 points)
    if (tutor.preferredClass && job.classCourse) {
      const tutorClasses = tutor.preferredClass
        .toLowerCase()
        .split(",")
        .map((cls) => cls.trim());

      const jobClass = job.classCourse.toLowerCase().trim();

      if (
        tutorClasses.some(
          (cls) => cls.includes(jobClass) || jobClass.includes(cls)
        )
      ) {
        score += 15;
      }
    }

    // 5. Subject Match (15 points)
    if (
      job.subjects &&
      Array.isArray(job.subjects) &&
      tutor.preferredSubjects
    ) {
      const jobSubjects = job.subjects.map((s) => s.toLowerCase().trim());
      const tutorSubjects = tutor.preferredSubjects
        .toLowerCase()
        .split(",")
        .map((sub) => sub.trim());

      const hasMatch = jobSubjects.some((jobSub) =>
        tutorSubjects.some(
          (tutSub) => tutSub.includes(jobSub) || jobSub.includes(tutSub)
        )
      );

      if (hasMatch) {
        score += 15;
      }
    }

    // 6. Salary Match (5 points)
    if (tutor.expectedSalary && job.salary) {
      const tutorSalary = parseInt(tutor.expectedSalary);
      const jobSalary = parseInt(job.salary);

      if (
        !isNaN(tutorSalary) &&
        !isNaN(jobSalary) &&
        tutorSalary <= jobSalary
      ) {
        score += 5;
      }
    }

    //7. Tuition Type (home,online)(10 points)
    if (tutor.tuitionPreference && job.tuitionType) {
      const tuitionPreference = tutor.tuitionPreference
        .toLowerCase()
        .split(",")
        .map((cat) => cat.trim());

      const tuitionType = job.tuitionType.toLowerCase().trim();

      if (
        tuitionPreference.some(
          (cat) => cat.includes(tuitionType) || tuitionType.includes(cat)
        )
      ) {
        score += 10;
      }
    }

    // 8. Gender Match (5 points)
    if (job.tutorGenderPreference && tutor.gender) {
      if (
        job.tutorGenderPreference === "Any" ||
        job.tutorGenderPreference.toLowerCase() === tutor.gender.toLowerCase()
      ) {
        score += 5;
      }
    }

    return Math.min(score, maxScore); // Ensure score doesn't exceed 100
  };

  // Fetch applied tutors with profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      if (
        !Array.isArray(appliedTutorsFromAPI) ||
        appliedTutorsFromAPI.length === 0
      ) {
        setAppliedTutorsWithProfile([]);
        return;
      }

      // Skip if we're refreshing (data will be handled in handleToggleAndRefresh)
      if (isRefreshing) return;

      try {
        const profiles = await Promise.all(
          appliedTutorsFromAPI.map(async (tutor) => {
            try {
              // Try to fetch by email first
              const res = await axiosPublic.get(`/tutors/${tutor.email}`);
              if (
                res.data?.email?.toLowerCase() === tutor.email?.toLowerCase()
              ) {
                return { ...tutor, profile: res.data };
              }
              return { ...tutor, profile: null };
            } catch (emailError) {
              try {
                // Fallback to tutorId
                const res = await axiosPublic.get(
                  `/tutors/profile/${tutor.tutorId}`
                );
                if (
                  res.data?.email?.toLowerCase() === tutor.email?.toLowerCase()
                ) {
                  return { ...tutor, profile: res.data };
                }
                return { ...tutor, profile: null };
              } catch (tutorIdError) {
                console.warn(
                  `Could not fetch profile for tutor: ${tutor.email}`
                );
                return { ...tutor, profile: null };
              }
            }
          })
        );
        setAppliedTutorsWithProfile(profiles);
      } catch (error) {
        console.error("Error fetching tutor profiles:", error);
        toast.error("Failed to fetch tutor profiles");
      }
    };

    fetchProfiles();
  }, [appliedTutorsFromAPI, axiosPublic, isRefreshing]);

  // Calculate top 5 matched tutors (only when not refreshing manually)
  useEffect(() => {
    if (!jobData || !appliedTutorsWithProfile.length || isRefreshing) {
      if (!isRefreshing) setTopMatchedTutors([]);
      return;
    }

    const tutorsWithScore = appliedTutorsWithProfile
      .filter((tutor) => tutor.profile && tutor.profile.tutorStatus === "available") // Only include tutors with valid profiles
      .filter((tutor) => {
        // City matching requirement for best match
        if (!tutor.profile.city || !jobData.city) return false;
        return (
          tutor.profile.city.toLowerCase().trim() ===
          jobData.city.toLowerCase().trim()
        );
      })
      .map((tutor) => ({
        ...tutor,
        matchScore: calculateMatchScore(jobData, tutor.profile),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setTopMatchedTutors(tutorsWithScore);
  }, [jobData, appliedTutorsWithProfile, isRefreshing]);

  // Set confirmed tutor email
  useEffect(() => {
    if (!Array.isArray(appliedTutorsFromAPI)) return;

    const confirmed = appliedTutorsFromAPI.find(
      (tutor) => tutor.confirmationStatus === "confirmed"
    );
    setConfirmedTutorEmail(confirmed ? confirmed.email : null);
  }, [appliedTutorsFromAPI]);

  // Confirm tutor handler
  const handleConfirm = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.put(`/tutorRequests/${jobId}`, {
          confirmedTutorEmail: email,
        });

        if (res.data.message) {
          Swal.fire("Confirmed!", res.data.message, "success");
          setConfirmedTutorEmail(email);
          await refetchTutors();
          await refetchPayments();
        }
      } catch (error) {
        console.error("Error confirming tutor:", error);
        toast.error("Failed to confirm tutor.");
      }
    }
  };

  // Cancel confirmation handler
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the confirmation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.put(`/tutorRequests/${jobId}`, {
          cancelConfirmation: true,
        });

        if (res.data.message) {
          toast.success(res.data.message);
          setConfirmedTutorEmail(null);
          await refetchTutors();
          await refetchPayments();
        }
      } catch (error) {
        console.error("Error canceling confirmation:", error);
        toast.error("Failed to cancel confirmation.");
      }
    }
  };

  // Loading state
  if (isLoading) 
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  

  // No applied tutors state
  if (!appliedTutorsFromAPI.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Applied Tutors
          </h2>
          <p className="text-gray-600">
            No tutors have applied for this job yet.
          </p>
        </div>
      </div>
    );
  }

  // Sorting function
  const sortedTutors = [...appliedTutorsFromAPI].sort((a, b) => {
    const tutorA = appliedTutorsWithProfile.find((t) => t.email === a.email);
    const tutorB = appliedTutorsWithProfile.find((t) => t.email === b.email);

    // 1. Premium টিউটর সবসময় আগে আসবে
    const isPremiumA = tutorA?.profile?.profileStatus === "Premium";
    const isPremiumB = tutorB?.profile?.profileStatus === "Premium";

    if (isPremiumA && !isPremiumB) return -1;
    if (!isPremiumA && isPremiumB) return 1;

    // 2. এরপর appliedAt (descending = latest first)
    return new Date(b.appliedAt) - new Date(a.appliedAt);
  });

  // ---- MAIN UI ----
  return (
    <div className=" bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <IoArrowBack className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <div className="h-6 w-px"></div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showTopMatches
                ? "Best Matched Tutors"
                : `Applied Tutors (${appliedTutorsFromAPI.length})`}
            </h1>
          </div>

          <button
            onClick={handleToggleAndRefresh}
            disabled={isRefreshing}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isRefreshing
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isRefreshing ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
                {showTopMatches ? (
                  <FaEyeSlash className="w-4 h-4 mr-2" />
                ) : (
                  <FaEye className="w-4 h-4 mr-2" />
                )}
                {showTopMatches ? "Show All" : "Best Match"}
              </>
            )}
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          {showTopMatches ? (
            // Top 5 Matches View
            <div className="p-6">
              {topMatchedTutors.length === 0 ? (
                // Fallback message when no city-matched tutors found
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FaEyeSlash className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Compatible Tutors Found
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    No tutors from the same city have applied for this job yet.
                    City matching is required for the best match ranking.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tutor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Match Score
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary
                        </th>

                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topMatchedTutors.map((tutor, index) => {
                        const isConfirmed = confirmedTutorEmail === tutor.email;
                        const isDisabled = confirmedTutorEmail && !isConfirmed;
                        const hasPaidJob = paidData.some(
                          (p) =>
                            p.jobId === jobId &&
                            p.email === tutor.email &&
                            p.paidStatus === true
                        );

                        const rankColors = [
                          "text-yellow-600 bg-yellow-50",
                          "text-gray-600 bg-gray-50",
                          "text-orange-600 bg-orange-50",
                          "text-blue-600 bg-blue-50",
                          "text-purple-600 bg-purple-50",
                        ];

                        return (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${rankColors[index]}`}
                                >
                                  {index + 1}
                                </span>
                                {index === 0 && (
                                  <span className="text-lg">🏆</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {tutor.profile?.photoURL ? (
                                    <img
                                      className="h-10 w-10 rounded-md object-cover"
                                      src={tutor.profile.photoURL}
                                      alt={tutor.name}
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                          "flex";
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className={`h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-semibold ${
                                      tutor.profile?.photoURL
                                        ? "hidden"
                                        : "flex"
                                    }`}
                                  >
                                    {tutor.name.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {tutor.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(
                                      tutor.appliedAt
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all ${
                                      tutor.matchScore >= 80
                                        ? "bg-green-500"
                                        : tutor.matchScore >= 60
                                        ? "bg-yellow-500"
                                        : tutor.matchScore >= 40
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{ width: `${tutor.matchScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {tutor.matchScore}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              ৳{tutor.profile?.expectedSalary || "N/A"}
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <NavLink
                                  to={`/tutors/tutor-profile/${
                                    tutor.profile?.customId || tutor.tutorId
                                  }`}
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                  View
                                </NavLink>
                                {isConfirmed ? (
                                  <button
                                    onClick={handleCancel}
                                    disabled={hasPaidJob}
                                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                      hasPaidJob
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                    }`}
                                  >
                                    <FaTimes className="w-3 h-3 mr-1" />
                                    Cancel
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleConfirm(tutor.email)}
                                    disabled={isDisabled}
                                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                      isDisabled
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                                  >
                                    <FaCheck className="w-3 h-3 mr-1" />
                                    Confirm
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            // All Applied Tutors View
            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutor
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedTutors.map((tutor, index) => {
                      const isConfirmed = confirmedTutorEmail === tutor.email;
                      const isDisabled = confirmedTutorEmail && !isConfirmed;
                      const hasPaidJob = paidData.some(
                        (p) =>
                          p.jobId === jobId &&
                          p.email === tutor.email &&
                          p.paidStatus === true
                      );

                      const tutorWithProfile = appliedTutorsWithProfile.find(
                        (t) => t.email === tutor.email
                      );

                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {tutorWithProfile?.profile?.photoURL ? (
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={tutorWithProfile.profile.photoURL}
                                    alt={tutor.name}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                ) : null}
                                <div
                                  className={`h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-semibold ${
                                    tutorWithProfile?.profile?.photoURL
                                      ? "hidden"
                                      : "flex"
                                  }`}
                                >
                                  {tutor.name.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <p className="text-[16px] font-medium text-gray-900">
                                  {tutor.name}
                                </p>
                                <p className="text-[12px] text-gray-500">
                                  #ID: {tutor.tutorId}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500">
                            {new Date(tutor.appliedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <NavLink
                                to={`/tutors/tutor-profile/${
                                  tutorWithProfile?.profile?.customId ||
                                  tutor.tutorId
                                }`}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                View Profile
                              </NavLink>
                              {isConfirmed ? (
                                <button
                                  onClick={handleCancel}
                                  disabled={hasPaidJob}
                                  className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                    hasPaidJob
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-red-500 text-white hover:bg-red-600"
                                  }`}
                                >
                                  <FaTimes className="w-3 h-3 mr-1" />
                                  Cancel
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleConfirm(tutor.email)}
                                  disabled={isDisabled}
                                  className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                    isDisabled
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-green-500 text-white hover:bg-green-600"
                                  }`}
                                >
                                  <FaCheck className="w-3 h-3 mr-1" />
                                  Confirm
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedTutors;

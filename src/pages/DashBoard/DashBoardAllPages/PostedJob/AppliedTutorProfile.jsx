import React from "react";
import { useLocation } from "react-router-dom";
import useAppliedTutor from "../../../../hooks/useAppliedTutor";

const AppliedTutorProfile = () => {
  const location = useLocation();
  const email = location.state?.email;
  const { appliedTutor: tutor, isLoading, refetch } = useAppliedTutor(email);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!tutor) return <div className="text-center mt-10">Tutor not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow pl-20">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={tutor.photoURL}
          alt={tutor.name}
          className="w-28 h-28 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{tutor.name}</h2>
          {/* <p className="text-gray-600">{tutor.email}</p> */}
          <p className="text-gray-600">Tutor: {tutor.tutorType}</p>
          <p className="text-gray-600 capitalize">Gender: {tutor.gender}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p><strong>Department:</strong> {tutor.department}</p>
        <p><strong>Education:</strong> {tutor.education}</p>
        <p><strong>Institute:</strong> {tutor.institute}</p>
        <p><strong>GPA:</strong> {tutor.gpa}</p>
        <p><strong>Passing Year:</strong> {tutor.passingYear}</p>
        <p><strong>City:</strong> {tutor.city}</p>
        <p><strong>Location:</strong> {tutor.location}</p>
        <p><strong>Religion:</strong> {tutor.religion}</p>
        <p><strong>Expected Salary:</strong> {tutor.expectedSalary} Tk</p>
        <p><strong>Preferred Classes:</strong> {tutor.preferredClass}</p>
        <p><strong>Preferred Subjects:</strong> {tutor.preferredSubjects}</p>
        <p><strong>Tuition Preference:</strong> {tutor.tuitionPreference}</p>

        <p>
          <strong>Available Days:</strong>{" "}
          {Array.isArray(tutor.availableDays)
            ? tutor.availableDays.join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Available Times:</strong>{" "}
          {Array.isArray(tutor.availableTimes)
            ? tutor.availableTimes.join(", ")
            : "N/A"}
        </p>
      </div>

      <div className="mt-6">
        <p className="font-semibold">Student ID Image:</p>
        <img
          src={tutor.studentIdImage}
          alt="Student ID"
          className="w-52 mt-2 border"
        />
      </div>
    </div>
  );
};

export default AppliedTutorProfile;

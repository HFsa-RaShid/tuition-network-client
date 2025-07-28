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
      <div className="flex items-center gap-8 mb-6">
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
        <p>
          <strong>Department:</strong> {tutor.department}
        </p>
        <p>
          <strong>Education:</strong> {tutor.education}
        </p>
        <p>
          <strong>Institute:</strong> {tutor.institute}
        </p>
        <p>
          <strong>CGPA/GPA:</strong> {tutor.gpa}
        </p>
        <p>
          <strong>Passing Year:</strong> {tutor.passingYear}
        </p>
        <p>
          <strong>City:</strong> {tutor.city}
        </p>
        <p>
          <strong>Religion:</strong> {tutor.religion}
        </p>
        <p>
          <strong>Location:</strong> {tutor.location}
        </p>
        
        <p>
          <strong>Expected Salary:</strong> {tutor.expectedSalary} Tk
        </p>
        <p>
          <strong>Preferred Classes:</strong> {tutor.preferredClass}
        </p>
        <p>
          <strong>Preferred Subjects:</strong> {tutor.preferredSubjects}
        </p>
        <p>
          <strong>Tuition Preference:</strong> {tutor.tuitionPreference}
        </p>
      </div>
      <div className="mt-6">
        <strong>Available Days:</strong>
        <div className="flex flex-wrap gap-2 mt-3 text-sm">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span
              key={day}
              className={`px-3 py-1 rounded-full border ${
                tutor.availableDays?.includes(day)
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Available Times */}
      <div className="mt-4">
        <strong>Available Times:</strong>
        <div className="flex flex-wrap gap-2 mt-3 text-sm">
          {[
            "8 AM",
            "9 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "1 PM",
            "2 PM",
            "3 PM",
            "4 PM",
            "5 PM",
            "6 PM",
            "7 PM",
            "8 PM",
            "9 PM",
            "10 PM",
          ].map((time) => (
            <span
              key={time}
              className={`px-3 py-1 rounded-full border ${
                tutor.availableTimes?.includes(time)
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            >
              {time}
            </span>
          ))}
        </div>
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

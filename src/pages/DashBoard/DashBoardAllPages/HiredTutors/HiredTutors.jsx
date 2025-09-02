
// HiredTutors.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import HiredTutorRow from "./HiredTutorRow";

const HiredTutors = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { paidJobs, isLoading, isError } = useAllHiredByAStudent(currentUser?.email);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center py-4">Failed to load hired tutors.</p>
    );
  }

  const studentPaidJobs = paidJobs?.filter(
    (p) =>
      p.studentEmail === currentUser?.email &&
      p.paidStatus === true &&
      p.source === "myApplications"
  );

  if (!studentPaidJobs?.length) {
    return (
      <p className="text-center text-gray-500 py-4">No hired tutors found.</p>
    );
  }

  return (
    <div className="p-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-orange-100">
          Hired Tutors
        </li>
        {studentPaidJobs.map((payment) => (
          <HiredTutorRow
            key={payment._id}
            payment={payment}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default HiredTutors;


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import HiredTutorRow from "./HiredTutorRow";

const HiredTutors = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, refetch: refetchUser, isLoading: userLoading } = useCurrentUser(user?.email);
  const {
    paidJobs,
    isLoading: jobsLoading,
    isError,
    refetch: refetchJobs,
  } = useAllHiredByAStudent(currentUser?.email);

  const [studentPaidJobs, setStudentPaidJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refetch data when currentUser changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await refetchUser();
      await refetchJobs();
      setLoading(false);
    };

    if (currentUser?.email) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [currentUser?.email, refetchUser, refetchJobs]);

  // Filter paid jobs after data loaded
  useEffect(() => {
    if (paidJobs && currentUser) {
      const filtered = paidJobs.filter(
        (p) =>
          p.studentEmail === currentUser?.email &&
          p.paidStatus === true &&
          p.source === "myApplications"
      );
      setStudentPaidJobs(filtered);
    }
  }, [paidJobs, currentUser]);

  if (loading || userLoading || jobsLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center py-4">
        Failed to load hired tutors.
      </p>
    );
  }

  if (!studentPaidJobs?.length) {
    return (
      <p className="text-center text-gray-500 py-4">
        No hired tutors found.
      </p>
    );
  }

  return (
    <div className="p-4 pl-10">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-base-200">
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

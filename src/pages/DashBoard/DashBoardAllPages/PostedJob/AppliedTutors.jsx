import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdSendToMobile } from "react-icons/md";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const AppliedTutors = () => {
  const { state } = useLocation();
  const appliedTutors = state?.appliedTutors || [];
  const axiosSecure = useAxiosSecure();
  const [tutorInfos, setTutorInfos] = useState([]);
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;

  useEffect(() => {
    const fetchTutorNames = async () => {
      const emails = appliedTutors.map((t) => t.email);
      try {
        const res = await axiosSecure.post("/users/by-emails", { emails });
        setTutorInfos(res.data);
      } catch (err) {
        console.error("Failed to fetch tutor info:", err);
      }
    };

    if (appliedTutors.length) fetchTutorNames();
  }, [appliedTutors, axiosSecure]);

  const getTutorName = (email) =>
    tutorInfos.find((t) => t.email.toLowerCase() === email.toLowerCase())
      ?.name || email;

  // Pagination logic
  const totalPages = Math.ceil(appliedTutors.length / tutorsPerPage);
  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = appliedTutors.slice(
    startIndex,
    startIndex + tutorsPerPage
  );

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300 text-center">
          <thead className="bg-gray-200 text-[16px]">
            <tr>
              <th>Profile</th>
              <th></th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTutors.map((tutor, index) => (
              <tr key={index} className="border-t">
                <td className="flex items-center justify-center py-3">
                  {getTutorName(tutor.email)}
                </td>
                <td className="py-3 text-center">
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
                <td>Pending</td>
                <td className="flex justify-center gap-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1">
                    <FaCheck />
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Real Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 items-center gap-4">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              &lt; Prev
            </button>

            <span className="font-semibold">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedTutors;


import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const AppliedTutors = () => {
  const { state } = useLocation();
  const appliedTutors = state?.appliedTutors || [];
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;
  const totalPages = Math.ceil(appliedTutors.length / tutorsPerPage);
  const startIndex = (currentPage - 1) * tutorsPerPage;
  const currentTutors = appliedTutors.slice(startIndex, startIndex + tutorsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full border border-gray-300 text-center ">
          <thead className="bg-gray-200 text-[16px]">
            <tr>
              <th>Name</th>
              <th></th>
              <th>Applied On</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTutors.map((tutor, index) => (
              <tr key={index} className="border-t">
                <td className="flex items-center justify-center py-3">
                  {tutor.name}
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
                {/* <td>{tutor.ApplyStatus }</td> */}
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

        
      </div>
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
  );
};

export default AppliedTutors;


import { useContext, useState } from "react";
import moment from "moment";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAllJobs from "../../../../hooks/useAllJobs";
import { MdSendToMobile } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const MyApplications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { allJobs, isLoading } = useAllJobs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const appliedJobs =
    allJobs?.filter((job) =>
      job.appliedTutors?.some((t) => t.email === currentUser?.email)
    ) || [];

  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);
  const paginatedApps = appliedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full border border-gray-300 text-center">
          <thead className="bg-gray-200 text-center text-[16px]">
            <tr>
              <th>Profile</th>
              <th>Applied On</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.map((app, index) => {
              const appliedTutor = app.appliedTutors?.find(
                (t) => t.email === currentUser?.email
              );
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-[17px] text-center"
                >
                  <td>
                    Class: {app.classCourse}{" "}
                    <NavLink
                      to={`/${currentUser?.role}/myApplications/job-details/${app._id}`}
                      title="View Job Details"
                    >
                      <MdSendToMobile className="inline ml-2 text-blue-700 cursor-pointer text-[20px]" />
                    </NavLink>
                  </td>
                  <td>
                    {appliedTutor
                      ? moment(appliedTutor.appliedAt).format("DD MMM, YYYY")
                      : "N/A"}
                  </td>
                  <td className="flex items-center gap-2">
                    {app.tutorStatus === "selected"
                      ? "Selected"
                      : "Not selected"}
                    <FaRegQuestionCircle className="inline ml-2 text-blue-700 cursor-pointer text-xl" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {appliedJobs.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No applications found.
          </p>
        )}
      </div>

      {/* Prev / Next Pagination */}
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

      <Outlet />
    </div>
  );
};

export default MyApplications;

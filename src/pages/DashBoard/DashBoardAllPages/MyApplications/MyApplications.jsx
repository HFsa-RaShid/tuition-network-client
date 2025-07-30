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
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
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

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full">
          <thead className="bg-gray-100 text-center text-xl font-semibold">
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
                      title="View Application Details"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
      <Outlet></Outlet>
    </div>
  );
};

export default MyApplications;

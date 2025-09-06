import { useContext, useState } from "react";
import moment from "moment";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAllJobs from "../../../../hooks/useAllJobs";
import { MdSendToMobile } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import usePaidJobs from "../../../../hooks/usePaidJobs";
import useMultipleJobPayments from "../../../../hooks/useMultipleJobPayments";

const MyApplications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const itemsPerPage = 10;
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { allJobs, isLoading } = useAllJobs();
  const { paidJobs } = usePaidJobs(currentUser?.email);

  const appliedJobs =
    allJobs?.filter((job) =>
      job.appliedTutors?.some((t) => t.email === currentUser?.email)
    ) || [];

  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);
  const paginatedApps = appliedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const jobIds = paginatedApps.map((app) => app._id);
  const { paidJobsByJobIds, isLoading: paymentsLoading } =
    useMultipleJobPayments(jobIds);

  const handlePaymentBkash = (jobId, name, email,tutorId, amount,studentEmail,studentName,role) => {
    axiosSecure
      .post("/paymentBkash", {
        jobId,
        name,
        email,
        tutorId,
        amount,
        source: "myApplications",
        studentEmail,
        studentName,
        role
      })
      .then((result) => {
        window.location.replace(result.data.url);
      });
  };

  if (isLoading || paymentsLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
      <div className="overflow-visible rounded-lg shadow border">
        <table className="table w-full border border-gray-300 text-center">
          <thead className="bg-gray-200 text-center text-[16px]">
            <tr>
              <th>Profile</th>
              <th></th>
              <th>Applied On</th>
              <th>Application Status</th>
              <th></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.map((app, index) => {
              const appliedTutor = app.appliedTutors?.find(
                (t) => t.email === currentUser?.email
              );

              const paymentsForThisJob = paidJobsByJobIds.filter(
                (p) => p.jobId === app._id
              );

              const isTrialClassBooked = paymentsForThisJob.some(
                (p) => p.source === "trialClassPayment" && p.paidStatus === true
              );

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-[17px] text-center border-b-gray-300"
                >
                  <td>Class: {app.classCourse} </td>
                  <td>
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

                  <td className="relative text-center !overflow-visible">
                    <div className="flex justify-center items-center relative group">
                      {isTrialClassBooked ? (
                        <span className="text-green-700 font-semibold px-3 py-1 rounded-xl bg-green-200">
                          Booked for <br /> Trial Class
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl">
                          {appliedTutor?.confirmationStatus === "confirmed"
                            ? "Confirmed"
                            : "Applied"}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="relative group">
                      <FaRegQuestionCircle className="text-blue-700 cursor-pointer text-xl" />
                      <div className="absolute bottom-full transform -translate-x-1/2 -mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {appliedTutor?.confirmationStatus === "confirmed" ? (
                          <>
                            You got confirmation <br /> from Guardian.
                          </>
                        ) : (
                          <>
                            Your application has been <br />
                            shared with Guardian who may <br />
                            get in touch if they like it.
                          </>
                        )}
                      </div>
                    </div>
                  </td>

                  <td>
                    {appliedTutor?.confirmationStatus === "confirmed" &&
                      (paidJobs?.some((p) => p.jobId === app._id) ? (
                        <button
                          disabled
                          className="bg-blue-200 mb-2 text-blue-700 px-2 py-2 rounded hover:bg-blue-300 flex items-center gap-1"
                        >
                          Paid
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handlePaymentBkash(
                              app._id,
                              currentUser?.name,
                              currentUser?.email,
                              currentUser?.customId,
                              100,
                              app.userEmail, // student email
                              app.userName, // student name
                              currentUser?.role
                            )
                          }
                          className="bg-green-200 mb-2 text-green-700 font-medium px-2 py-2 rounded hover:bg-green-300 transition"
                        >
                          Pay Now
                        </button>
                      ))}
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

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

  const handlePaymentBkash = (
    jobId,
    name,
    email,
    tutorId,
    amount,
    tutorAmount,
    studentEmail,
    studentName,
    role
  ) => {
    axiosSecure
      .post("/paymentBkash", {
        jobId,
        name,
        email,
        tutorId,
        amount,
        tutorAmount,
        tuToriaAmount: amount,
        source: "myApplications",
        studentEmail,
        studentName,
        role,
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
    <div className="container mx-auto w-full px-4 mt-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
      {/* Mobile (cards) */}
      <div className="md:hidden space-y-3">
        {paginatedApps.map((app, index) => {
          const appliedTutor = app.appliedTutors?.find(
            (t) => t.email === currentUser?.email
          );

          const paymentsForThisJob = paidJobsByJobIds.filter(
            (p) => p.jobId === app._id
          );

          const isAdvanceSalary = paymentsForThisJob.some(
            (p) => p.source === "advanceSalary" && p.paidStatus === true
          );

          const isTrialClassBooked = paymentsForThisJob.some(
            (p) => p.source === "trialClassPayment" && p.paidStatus === true
          );

          return (
            <div key={index} className="border rounded-lg shadow p-3 bg-white">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Class: {app.classCourse}</div>
                <NavLink
                  to={`job-details/${app._id}`}
                  title="View Job Details"
                  end
                >
                  <MdSendToMobile className="text-blue-700 text-xl" />
                </NavLink>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Applied On:{" "}
                {appliedTutor
                  ? moment(appliedTutor.appliedAt).format("DD MMM, YYYY")
                  : "N/A"}
              </div>

              <div className="mt-2">
                {isTrialClassBooked ? (
                  <span className="text-green-700 px-2 py-1 rounded bg-green-200 text-xs">
                    Booked for Trial Class
                  </span>
                ) : isAdvanceSalary ? (
                  <span className="text-green-700 px-2 py-1 rounded bg-green-200 text-xs">
                    Advance Paid
                  </span>
                ) : (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {appliedTutor?.confirmationStatus === "confirmed"
                      ? "Confirmed"
                      : "Applied"}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-blue-700">
                  <FaRegQuestionCircle className="text-lg" />
                </div>
                <div>
                  {appliedTutor?.confirmationStatus === "confirmed" &&
                    (paidJobs?.some((p) => p.jobId === app._id) ? (
                      <button
                        disabled
                        className="bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm"
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
                            app.salary * 0.06,
                            0,
                            app.userEmail,
                            app.userName,
                            currentUser?.role
                          )
                        }
                        className="bg-green-200 text-green-700 font-medium px-3 py-1 rounded text-sm"
                      >
                        Pay Now
                      </button>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet (table) */}
      <div className="hidden md:block overflow-x-auto overflow-visible rounded-lg shadow border mt-3">
        <table className="min-w-full border border-gray-200 text-center">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="p-3 border">Profile</th>
              <th className="p-3 border"></th>
              <th className="p-3 border">Applied On</th>
              <th className="p-3 border">Application Status</th>
              <th className="p-3 border"></th>
              <th className="p-3 border">Action</th>
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

              const isAdvanceSalary = paymentsForThisJob.some(
                (p) => p.source === "advanceSalary" && p.paidStatus === true
              );

              const isTrialClassBooked = paymentsForThisJob.some(
                (p) => p.source === "trialClassPayment" && p.paidStatus === true
              );

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-[17px] text-center"
                >
                  <td className="p-3 border">Class: {app.classCourse} </td>
                  <td className="p-3 border">
                    <NavLink
                      to={`/${currentUser?.role}/myApplications/job-details/${app._id}`}
                      title="View Job Details"
                    >
                      <MdSendToMobile className="inline ml-2 text-blue-700 cursor-pointer text-[20px]" />
                    </NavLink>
                  </td>
                  <td className="p-3 border">
                    {appliedTutor
                      ? moment(appliedTutor.appliedAt).format("DD MMM, YYYY")
                      : "N/A"}
                  </td>

                  <td className="relative text-center !overflow-visible p-3 border">
                    <div className="flex justify-center items-center relative group">
                      {isTrialClassBooked ? (
                        <span className="text-green-700  px-3 py-1 rounded-md bg-green-200">
                          Booked for <br /> Trial Class
                        </span>
                      ) : (
                        <span>
                          {isAdvanceSalary ? (
                            <span className="text-green-700  px-3 py-1 rounded-md bg-green-200">
                              Advance Paid
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                              {appliedTutor?.confirmationStatus === "confirmed"
                                ? "Confirmed"
                                : "Applied"}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3 border">
                    <div className="relative group">
                      <FaRegQuestionCircle className="text-blue-700 cursor-pointer text-xl" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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

                  <td className="p-3 border">
                    <div className="flex justify-center items-center">
                      {appliedTutor?.confirmationStatus === "confirmed" &&
                        (paidJobs?.some((p) => p.jobId === app._id) ? (
                          <button
                            disabled
                            className="bg-blue-200 mb-2 text-blue-700 px-2 py-2 rounded hover:bg-blue-300 flex items-center gap-1"
                          >
                            Paid
                          </button>
                        ) : (
                          <div className="relative group inline-block">
                            <button
                              onClick={() =>
                                handlePaymentBkash(
                                  app._id,
                                  currentUser?.name,
                                  currentUser?.email,
                                  currentUser?.customId,
                                  app.salary * 0.06, // 6% of salary
                                  0,
                                  app.userEmail, // student email
                                  app.userName, // student name
                                  currentUser?.role
                                )
                              }
                              className="bg-green-200 mb-2 text-green-700 font-medium px-2 py-2 rounded hover:bg-green-300 transition"
                            >
                              Pay Now
                            </button>

                            {/* Tooltip */}
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                              Pay 6% of the salary
                            </span>
                          </div>
                        ))}
                    </div>
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

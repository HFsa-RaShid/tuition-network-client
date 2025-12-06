import React, { useState, useEffect } from "react";
import useAllPayment from "../../../../hooks/useAllPayment";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import EmptyState from "../../../../components/EmptyState";
import { FaCircle, FaPaperPlane, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllPaymentTabs = () => {
  const { allPayment, isLoading, isError, refetch } = useAllPayment();
  const [activeTab, setActiveTab] = useState("tutoria");
  const [tutorProfiles, setTutorProfiles] = useState({});
  const axiosPublic = useAxiosPublic();
  const [studentProfiles, setStudentProfiles] = useState({});
  const [tutorRequests, setTutorRequests] = useState([]);

  useEffect(() => {
    if (allPayment?.length > 0) {
      const tutorIds = [...new Set(allPayment.map((p) => p.tutorId))];
      const studentEmails = [...new Set(allPayment.map((p) => p.studentEmail))];

      // Fetch tutors
      Promise.all(
        tutorIds.map((id) =>
          axiosPublic
            .get(`/tutors/profile/${id}`)
            .then((res) => ({ id, profile: res.data }))
            .catch(() => ({ id, profile: null }))
        )
      ).then((results) => {
        const map = {};
        results.forEach((r) => (map[r.id] = r.profile));
        setTutorProfiles(map);
      });

      // Fetch students
      Promise.all(
        studentEmails.map((email) =>
          axiosPublic
            .get(`/users/${email}`)
            .then((res) => ({ email, profile: res.data }))
            .catch(() => ({ email, profile: null }))
        )
      ).then((results) => {
        const map = {};
        results.forEach((r) => (map[r.email] = r.profile));
        setStudentProfiles(map);
      });

      // FETCH TUTOR REQUESTS (TUITION LIST)
      axiosPublic.get("/tutorRequests").then((res) => {
        setTutorRequests(res.data);
      });
    }
  }, [allPayment, axiosPublic]);

  const getTuitionId = (jobId) => {
    const tr = tutorRequests.find((req) => req._id === jobId);
    return tr?.tuitionId || "N/A";
  };

  const sortedPayments = [...allPayment].sort(
    (a, b) => new Date(b.paymentTime) - new Date(a.paymentTime)
  );

  const tutoriaPayments = sortedPayments.filter((p) => p.tuToriaAmount > 0);
  const tutorPayments = sortedPayments.filter((p) => p.tutorAmount > 0);

  const totalTutoriaAmount = tutoriaPayments.reduce(
    (sum, p) => sum + p.tuToriaAmount,
    0
  );
  const totalTutorAmount = tutorPayments.reduce(
    (sum, p) => sum + p.tutorAmount,
    0
  );

  // Delete Payment
  const handleDeletePayment = (transactionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/payments/${transactionId}`);
          Swal.fire("Deleted!", "Payment has been deleted.", "success");
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete payment", "error");
        }
      }
    });
  };
  // Send to Tutor
  const handleSendToTutor = async (transactionId) => {
    try {
      await axiosPublic.put(`/payments/send-to-tutor/${transactionId}`);
      toast.success("Payment sent to tutor successfully!");

      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Send failed. Please try again.");
    }
  };

  // Loading and Error States

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="px-3 md:px-6 py-4 md:py-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-300">
        <button
          className={`px-4 py-2 text-sm md:text-base font-semibold transition-colors ${
            activeTab === "tutoria"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("tutoria")}
        >
          TuToria Payments
        </button>
        <button
          className={`px-4 py-2 text-sm md:text-base font-semibold transition-colors ${
            activeTab === "tutor"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("tutor")}
        >
          Tutor Payments
        </button>
      </div>

      {/* Total */}
      <div className="mb-4 font-semibold text-sm md:text-base">
        {activeTab === "tutoria"
          ? `Total TuToria Amount: ${totalTutoriaAmount} BDT`
          : `Total Tutor Amount: ${totalTutorAmount} BDT`}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-xl shadow border border-gray-200 mt-2">
        {activeTab === "tutoria" && (
          <>
            {tutoriaPayments.length === 0 ? (
              <EmptyState message="No TuToria payments found." />
            ) : (
              <>
                {/* Mobile: Cards */}
                <div className="md:hidden space-y-3 p-1 ">
                  {tutoriaPayments.map((p) => (
                    <div
                      key={p._id}
                      className="border border-gray-200 rounded-lg p-2 shadow-sm bg-white"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-500">Tuition ID</p>
                            <p className="text-sm font-semibold text-gray-800">
                              {getTuitionId(p.jobId)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Transaction ID
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              {p.transactionId}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {p.role}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-blue-600">{p.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Source</p>
                          <p className="text-sm text-gray-800">{p.source}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="text-base font-bold text-green-600">
                            {p.tuToriaAmount} BDT
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Time</p>
                          <p className="text-sm text-gray-800">
                            {new Date(p.paymentTime).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-xs md:text-sm table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100/90 text-center text-gray-700">
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Tuition ID
                        </th>

                        <th className="border px-3 py-2 whitespace-nowrap">
                          Transaction ID
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Email
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Role
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Source
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Amount
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Payment Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutoriaPayments.map((p) => (
                        <tr
                          key={p._id}
                          className="text-center text-gray-800 hover:bg-gray-50"
                        >
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {getTuitionId(p.jobId)}
                          </td>

                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.transactionId}
                          </td>
                          <td className="border px-2 py-3 text-blue-600 whitespace-nowrap">
                            {p.email}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.role}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.source}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap text-green-600 font-semibold">
                            {p.tuToriaAmount} BDT
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {new Date(p.paymentTime).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.source !== "getPremium" && (
                              <FaTrash
                                onClick={() =>
                                  handleDeletePayment(p.transactionId)
                                }
                                className="text-red-600 cursor-pointer inline-block text-sm hover:text-red-800"
                                title="Delete Payment"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "tutor" && (
          <>
            {tutorPayments.length === 0 ? (
              <EmptyState message="No tutor payments found." />
            ) : (
              <>
                {/* Mobile: Cards */}
                <div className="md:hidden space-y-3 p-4">
                  {tutorPayments.map((p) => (
                    <div
                      key={p._id}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-800">
                              <strong>Tuition ID:</strong>{" "}
                              {getTuitionId(p.jobId)}
                            </p>

                            <p className="text-xs text-gray-800">
                              <strong>Student Phone:</strong>{" "}
                              {studentProfiles[p.studentEmail]?.phone || "N/A"}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                            {p.source}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tutor ID</p>
                          <p className="text-sm text-gray-800">{p.tutorId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tutor Phone</p>
                          <p className="text-sm text-gray-800">
                            {tutorProfiles[p.tutorId]?.phone || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="text-base font-bold text-green-600">
                            {p.tutorAmount} BDT
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Time</p>
                          <p className="text-sm text-gray-800">
                            {new Date(p.paymentTime).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSendToTutor(p.transactionId)}
                          disabled={p.status === "sendToTutor"}
                          className={`px-2 py-1 rounded text-white ${
                            p.status === "sendToTutor"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700"
                          }`}
                        >
                          <FaPaperPlane />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-xs md:text-sm table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100/90 text-center text-gray-700">
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Tuition ID
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Student Phone
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Source
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Tutor ID
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Tutor Phone
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Tutor Amount
                        </th>
                        <th className="border px-3 py-2 whitespace-nowrap">
                          Payment Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorPayments.map((p) => (
                        <tr
                          key={p._id}
                          className="text-center text-gray-800 hover:bg-gray-50"
                        >
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {getTuitionId(p.jobId)}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {studentProfiles[p.studentEmail]?.phone || "N/A"}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.source}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {p.tutorId}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {tutorProfiles[p.tutorId]?.phone || "N/A"}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap text-green-600 font-semibold">
                            {p.tutorAmount} BDT
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            {new Date(p.paymentTime).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="border px-2 py-3 whitespace-nowrap">
                            <button
                              onClick={() => handleSendToTutor(p.transactionId)}
                              disabled={p.status === "sendToTutor"}
                              className={`px-2 py-1 rounded text-white ${
                                p.status === "sendToTutor"
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-700"
                              }`}
                              title={
                                p.status === "sendToTutor"
                                  ? "Already sent"
                                  : "Send to tutor"
                              }
                            >
                              <FaPaperPlane />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllPaymentTabs;

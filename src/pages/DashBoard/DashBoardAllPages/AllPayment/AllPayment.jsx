import React, { useState, useEffect } from "react";
import useAllPayment from "../../../../hooks/useAllPayment";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import EmptyState from "../../../../components/EmptyState";

const AllPaymentTabs = () => {
  const { allPayment, isLoading, isError } = useAllPayment();
  const [activeTab, setActiveTab] = useState("tutoria");
  const [tutorProfiles, setTutorProfiles] = useState({});
  const axiosPublic = useAxiosPublic();
  const [studentProfiles, setStudentProfiles] = useState({});

  useEffect(() => {
    if (allPayment?.length > 0) {
      const tutorIds = [
        ...new Set(allPayment.filter((p) => p.tutorId).map((p) => p.tutorId)),
      ];

      const studentEmails = [
        ...new Set(
          allPayment.filter((p) => p.studentEmail).map((p) => p.studentEmail)
        ),
      ];

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

      // Fetch students using your EXISTING USERS API
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
    }
  }, [allPayment, axiosPublic]);

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
                <div className="md:hidden space-y-3 p-4">
                  {tutoriaPayments.map((p) => (
                    <div
                      key={p._id}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
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
                            {new Date(p.paymentTime).toLocaleString()}
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
                            {new Date(p.paymentTime).toLocaleString()}
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
                            <p className="text-xs text-gray-500">
                              Student Phone
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
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
                            {new Date(p.paymentTime).toLocaleString()}
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
                            {new Date(p.paymentTime).toLocaleString()}
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

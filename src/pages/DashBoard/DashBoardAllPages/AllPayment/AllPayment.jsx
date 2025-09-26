
import React, { useState, useEffect } from "react";
import useAllPayment from "../../../../hooks/useAllPayment";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AllPaymentTabs = () => {
  const { allPayment, isLoading, isError } = useAllPayment();
  const [activeTab, setActiveTab] = useState("tutoria");
  const [tutorProfiles, setTutorProfiles] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (allPayment?.length > 0) {
      const tutorIds = [
        ...new Set(
          allPayment
            .filter((p) => p.role === "tutor" && p.tutorId)
            .map((p) => p.tutorId)
        ),
      ];

      Promise.all(
        tutorIds.map((id) =>
          axiosPublic
            .get(`/tutors/profile/${id}`)
            .then((res) => ({
              id,
              profile: res.data,
            }))
            .catch((err) => {
              return { id, profile: null };
            })
        )
      ).then((results) => {
        const profileMap = {};
        results.forEach((r) => {
          profileMap[r.id] = r.profile;
        });
        setTutorProfiles(profileMap);
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
    <div className="p-4 ml-6">
      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-300">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "tutoria" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("tutoria")}
        >
          TuToria Payments
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "tutor" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("tutor")}
        >
          Tutor Payments
        </button>
      </div>

      {/* Total */}
      <div className="mb-4 font-semibold">
        {activeTab === "tutoria"
          ? `Total TuToria Amount: ${totalTutoriaAmount} BDT`
          : `Total Tutor Amount: ${totalTutorAmount} BDT`}
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "tutoria" && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border px-3 py-2">Transaction ID</th>
                  <th className="border px-3 py-2">Email</th>
                  <th className="border px-3 py-2">Role</th>
                  <th className="border px-3 py-2">Source</th>
                  <th className="border px-3 py-2">Amount</th>
                  <th className="border px-3 py-2">Payment Time</th>
                </tr>
              </thead>
              <tbody>
                {tutoriaPayments.map((p) => (
                  <tr key={p._id} className="text-center">
                    <td className="border px-2 py-3">{p.transactionId}</td>
                    <td className="border px-2 py-3">{p.email}</td>
                    <td className="border px-2 py-3">{p.role}</td>
                    <td className="border px-2 py-3">{p.source}</td>
                    <td className="border px-2 py-3">{p.tuToriaAmount}</td>
                    <td className="border px-2 py-3">
                      {new Date(p.paymentTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "tutor" && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border px-3 py-2">Student Email</th>
                  <th className="border px-3 py-2">Source</th>
                  <th className="border px-3 py-2">Tutor ID</th>
                  <th className="border px-3 py-2">Tutor Phone</th>
                  <th className="border px-3 py-2">Tutor Amount</th>
                  <th className="border px-3 py-2">Payment Time</th>
                </tr>
              </thead>
              <tbody>
                {tutorPayments.map((p) => (
                  <tr key={p._id} className="text-center">
                    <td className="border px-2 py-3">{p.studentEmail}</td>
                    <td className="border px-2 py-3">{p.source}</td>
                    <td className="border px-2 py-3">{p.tutorId}</td>
                    <td className="border px-2 py-3">
                      {tutorProfiles[p.tutorId]?.phone || "N/A"}
                    </td>
                    <td className="border px-2 py-3">{p.tutorAmount}</td>
                    <td className="border px-2 py-3">
                      {new Date(p.paymentTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPaymentTabs;


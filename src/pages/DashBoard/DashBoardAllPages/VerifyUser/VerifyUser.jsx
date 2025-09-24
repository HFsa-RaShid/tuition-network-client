import React from "react";
import { NavLink } from "react-router-dom";
import { FaEyeSlash, FaTimes, FaCheck } from "react-icons/fa";
import useVerify from "../../../../hooks/useVerify";


const VerifyUser = () => {
  const { verification, isLoading, isError } = useVerify();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
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
    <div className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          {/* ---------- If no data ---------- */}
          {verification.length === 0 ? (
            <div className="p-6 text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaEyeSlash className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Verification Requests
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Currently, no tutors have submitted verification requests.
              </p>
            </div>
          ) : (
            // ---------- Data Table ----------
            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutor
                      </th>
                     
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {verification.map((tutor, index) => (
                      <tr
                        key={tutor._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {tutor.idImage ? (
                                <img
                                  src={tutor.idImage}
                                  alt={tutor.name}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                  {tutor.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-[16px] font-medium text-gray-900">
                                {tutor.name}
                              </p>
                              <p className="text-[12px] text-gray-500">
                                #{tutor.customId}
                              </p>
                              <p className="text-[12px] text-gray-500">
                                📞 {tutor.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                       
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {new Date(tutor.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <NavLink
                              to={`/tutors/tutor-profile/${tutor.customId}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View Profile
                            </NavLink>
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600">
                              <FaCheck className="w-3 h-3 mr-1" />
                              Approve
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600">
                              <FaTimes className="w-3 h-3 mr-1" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;

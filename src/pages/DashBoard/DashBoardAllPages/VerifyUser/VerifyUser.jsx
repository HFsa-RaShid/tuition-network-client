import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEyeSlash, FaTimes, FaCheck, FaDownload } from "react-icons/fa";
import useVerify from "../../../../hooks/useVerify";

const VerifyUser = () => {
  const { verification, isLoading, isError } = useVerify();
  const [selectedTutor, setSelectedTutor] = useState(null); 

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

  const handleDownload = (nidImage, name) => {
    const link = document.createElement("a");
    link.href = nidImage;
    link.download = `${name}_NID.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
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
                    {verification.map((tutor) => (
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
                            
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {new Date(tutor.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              onClick={() => setSelectedTutor(tutor)}
                            >
                              Identity
                            </button>

                            <NavLink
                              to={`/tutors/tutor-profile/${tutor.customId}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Details
                            </NavLink>
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600">
                              <FaCheck className="w-3 h-3 mr-1" /> Approve
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600">
                              <FaTimes className="w-3 h-3 mr-1" /> Reject
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

      {/* Modal */}
      {selectedTutor && (
        <dialog open className="modal w-full max-w-5xl p-0 md:ml-20">
          <div className="modal-box p-6 relative h-full flex flex-col">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedTutor(null)}
            >
              ✕
            </button>
            <h3 className="font-bold text-xl mb-4">Identity Info</h3>

            {/* Content Container */}
            <div className="flex flex-col gap-6 overflow-y-auto">
              {/* Top Side Info */}
              <div className="">
                <p className="text-lg">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedTutor.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedTutor.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedTutor.phone}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">ID:</span>{" "}
                  {selectedTutor.customId}
                </p>
              </div>

              {/* Bottom Side NID Image */}
              {selectedTutor.NidImage && (
                <div className="flex flex-col items-center">
                  <img
                    src={selectedTutor.NidImage}
                    alt="NID"
                    className="w-full max-h-[70vh] object-contain rounded-md border"
                  />
                  <button
                    onClick={() =>
                      handleDownload(selectedTutor.NidImage, selectedTutor.name)
                    }
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <FaDownload className="w-4 h-4 mr-2" /> Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default VerifyUser;

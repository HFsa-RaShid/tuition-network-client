
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEyeSlash, FaTimes, FaCheck, FaDownload } from "react-icons/fa";
import useVerify from "../../../../hooks/useVerify";

const VerifyUser = () => {
  const { verification, isLoading, isError } = useVerify();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [filterRole, setFilterRole] = useState("all"); // filter state

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

  const handleDownload = async (nidImage, name) => {
    try {
      const response = await fetch(nidImage, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}_NID.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleZoomIn = () => setZoom((prev) => prev + 0.2);
  const handleZoomOut = () => setZoom((prev) => Math.max(1, prev - 0.2));

  // Filtered data based on selected role
  const filteredData =
    filterRole === "all"
      ? verification
      : verification.filter((tutor) => tutor.userRole === filterRole);

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
              {/* Header + Filter */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Verification Requests</h2>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="tutor">Tutor</option>
                  <option value="student">Student</option>
                </select>
              </div>

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
                    {filteredData.map((tutor) => (
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
                              onClick={() => {
                                setSelectedTutor(tutor);
                                setZoom(1);
                              }}
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

      {/* Zoomable Identity Viewer */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-xl">Identity Info</h3>
              <button
                onClick={() => setSelectedTutor(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Content (responsive layout) */}
            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Info Section (left on lg, top on sm/md) */}
              <div className="p-4 lg:w-[28%] border-b lg:border-b-0 lg:border-r">
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {selectedTutor.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {selectedTutor.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> {selectedTutor.phone}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">ID:</span> {selectedTutor.customId}
                </p>

                {/* Controls */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleZoomIn}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  {selectedTutor.NidImage && (
                    <button
                      onClick={() =>
                        handleDownload(selectedTutor.NidImage, selectedTutor.name)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      <FaDownload className="inline w-4 h-4 " />
                    </button>
                  )}
                </div>
              </div>

              {/* Image Section (right on lg, bottom on sm/md) */}
              {selectedTutor.NidImage && (
                <div className="flex-1 overflow-auto m-4 border rounded-lg bg-gray-50 flex items-center justify-center">
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <img
                      src={selectedTutor.NidImage}
                      alt="NID"
                      className="block max-h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;

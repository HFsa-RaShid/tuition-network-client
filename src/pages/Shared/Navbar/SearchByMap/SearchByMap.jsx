

import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllJobs from "../../../../hooks/useAllJobs";
import { AuthContext } from "../../../../provider/AuthProvider";
import Navbar from "../Navbar";
import Footer from "../../../Shared/Footer/Footer";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";

import axios from "axios";
import useMultipleJobPayments from "../../../../hooks/useMultipleJobPayments";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const createColoredIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const redIcon = createColoredIcon("red");
const blueIcon = createColoredIcon("blue");
const greenIcon = createColoredIcon("green");

// 🔹 Jitter markers (avoid overlap)
const jitterCoords = (coords, index) => {
  const offset = 0.0004 * index;
  return [coords[0] + offset, coords[1] + offset];
};

// 🔹 RecenterMap - only when search center changes
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

const SearchByMap = () => {
  const { user } = useContext(AuthContext);
  const {
    currentUser,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser(user?.email);
  const { allJobs, isLoading: jobsLoading, isError: jobsError ,refetch} = useAllJobs();

  const [userCoords, setUserCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [tutorRequestMarkers, setTutorRequestMarkers] = useState([]);
  const [hoveredTutorId, setHoveredTutorId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const axiosSecure = useAxiosSecure();

  // ✅ Paid jobs hook
  const jobIds = allJobs?.map((job) => job._id) || [];
  const { paidJobsByJobIds } = useMultipleJobPayments(jobIds);

  // ✅ Geocode function
  const geocodeLocation = async (location = "", district = "", city = "") => {
    const parts = [location, city, district].filter(Boolean);
    if (parts.length === 0) return null;

    const query = parts.join(", ") + ", Bangladesh";

    try {
      const res = await axios.get(
        `http://localhost:5000/geocode?q=${encodeURIComponent(query)}`
      );
      const data = res.data;
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    return null;
  };

  // 🔹 Load user coords
  useEffect(() => {
    if (!userLoading && currentUser?.location) {
      geocodeLocation(currentUser.location, currentUser.city || "Barishal").then(
        (coords) => {
          if (coords) {
            setUserCoords(coords);
            setMapCenter(coords);
          }
        }
      );
    }
  }, [currentUser, userLoading]);

  // 🔹 Load all job markers (skip paid jobs)
  useEffect(() => {
    if (!jobsLoading && allJobs?.length) {
      const visibleJobs =
        allJobs?.filter(
          (job) =>
            !paidJobsByJobIds?.some(
              (p) =>
                p.jobId === job._id &&
                p.source === "myApplications" &&
                p.paidStatus === true
            )
        ) || [];

      Promise.all(
        visibleJobs.map(async (request) => {
          const coords = await geocodeLocation(
            request.location,
            "",
            request.city
          );
          if (coords) {
            return { id: request._id, coords, ...request };
          }
          return null;
        })
      ).then((markers) => {
        setTutorRequestMarkers(markers.filter(Boolean));
      });
    } else {
      setTutorRequestMarkers([]);
    }
  }, [allJobs, jobsLoading, paidJobsByJobIds]);

  // 🔹 Handle search
  const handleSearch = async () => {
    const coords = await geocodeLocation("", district, city);
    if (coords) {
      setMapCenter(coords);
      setSelectedRequest(null);
    } else {
      alert("Location not found!");
    }
  };



  const handleApply = (jobId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, apply for this request!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .put(`/tutorRequests/${jobId}`, {
              email: user.email,
              name: currentUser?.name || user?.displayName,
              tutorId: currentUser?.customId,
            })
            .then((res) => {
              Swal.fire(
                res.data?.message === "Applied successfully."
                  ? "Applied!"
                  : "Note",
                res.data?.message || "Something happened.",
                res.data?.message === "Applied successfully." ? "success" : "info"
              );
              refetch();
            })
            .catch((error) => {
              console.error("Apply error:", error);
              Swal.fire(
                "Error!",
                "Failed to apply for the tutor request.",
                "error"
              );
            });
        }
      });
    };

  if (userLoading || jobsLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (userError) return <div>Error loading user data.</div>;
  if (jobsError) return <div>Error loading job requests.</div>;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-6 mt-20 min-h-screen">
        <div className="flex w-full min-h-[500px]">
          {/* Left Panel */}
          <div className="w-1/3 p-4 overflow-y-auto border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              Find Tuition by Location
            </h2>

            {/* District + City Dropdown */}
            <div className="flex gap-2 mb-4">
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setCity("");
                }}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 ${
                  !district ? "text-gray-400" : "text-black"
                }`}
              >
                <option value="" disabled>
                  District
                </option>
                {bdDistricts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!district}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 ${
                  !city ? "text-gray-400" : "text-black"
                }`}
              >
                <option value="" disabled>
                  Location
                </option>
                {district &&
                  cityAreaMap[district]?.map((ct, idx) => (
                    <option key={idx} value={ct}>
                      {ct}
                    </option>
                  ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
              >
                Search
              </button>
            </div>

            {selectedRequest && (
              <div
                key={selectedRequest._id}
                className="bg-white/80 shadow-md rounded-lg p-6 relative "
              >
                {selectedRequest.appliedTutors?.some(
                  (tutor) =>
                    tutor.confirmationStatus?.toLowerCase() === "confirmed"
                ) && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Selected
                  </div>
                )}

                {selectedRequest.tutorStatus === "Not Available" && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Not Available
                  </div>
                )}

                <p className="text-gray-500">
                  📍 {selectedRequest.city}, {selectedRequest.location}
                </p>
                <h2 className="text-xl text-black font-bold mt-2">
                  Tuition for {selectedRequest.classCourse}
                </h2>
                <div className="flex gap-2 mt-2">
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm">
                    {selectedRequest.tuitionType}
                  </span>
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                    ⏰ {selectedRequest.duration}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 justify-between gap-2 text-black">
                  <p>
                    <strong>👨‍🏫 No. of Students:</strong>{" "}
                    {selectedRequest.noOfStudents}
                  </p>
                  <p>
                    <strong>🏫 Medium:</strong> {selectedRequest.category}
                  </p>
                  <p>
                    <strong>📚 Class:</strong> {selectedRequest.classCourse}
                  </p>
                  <p>
                    <strong>📅 Tutoring Days:</strong>{" "}
                    {selectedRequest.daysPerWeek}
                  </p>
                  <p>
                    <strong>👤 Preferred Tutor:</strong>{" "}
                    {selectedRequest.tutorGenderPreference}
                  </p>
                  <p>
                    <strong>👧 Student Gender:</strong>{" "}
                    {selectedRequest.studentGender}
                  </p>
                </div>

                <div className="mt-2 text-black">
                  <strong>📖 Subjects:</strong>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {selectedRequest.subjects?.map((subj, idx) => (
                      <span
                        key={idx}
                        className="bg-green-200 text-green-800 text-sm px-2 py-1 rounded"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-black">
                  <strong>💰 Salary:</strong>{" "}
                  <span className="text-blue-700 font-bold">
                    {selectedRequest.salary} TK
                  </span>
                  /Month
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Posted Date:{" "}
                  {new Date(selectedRequest.postedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* ✅ Tutor Apply Button */}
               
                    {currentUser?.role === "tutor" &&
                  selectedRequest.tutorStatus !== "selected" &&
                  selectedRequest.tutorStatus !== "Not Available" && (
                    <button
                      onClick={() => handleApply(selectedRequest._id)}
                      disabled={selectedRequest.appliedTutors?.some(
                        (tutor) => tutor.email === user.email
                      )}
                      className={`w-full mt-4 px-4 py-2 rounded font-medium ${
                        selectedRequest.appliedTutors?.some(
                          (tutor) => tutor?.email === user?.email
                        )
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#f9d045] hover:bg-[#f9d045]"
                      }`}
                    >
                      {selectedRequest.appliedTutors?.some(
                        (tutor) => tutor?.email === user?.email
                      )
                        ? "Already Applied"
                        : "Apply Now"}
                    </button>
                  )}
              </div>
            )}
          </div>

          {/* Right Map Panel */}
          <div className="w-2/3 h-[500px] m-4 relative z-0">
            <MapContainer
              center={mapCenter || userCoords || [23.8103, 90.4125]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* ✅ Auto center for search */}
              <RecenterMap center={mapCenter} />

              {userCoords && (
                <Marker position={userCoords} icon={redIcon}>
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    You are here
                  </Tooltip>
                </Marker>
              )}

              {tutorRequestMarkers.map((request, idx) =>
                request.coords && Array.isArray(request.coords) ? (
                  <Marker
                    key={request.id}
                    position={jitterCoords(request.coords, idx)}
                    icon={hoveredTutorId === request.id ? greenIcon : blueIcon}
                    eventHandlers={{
                      mouseover: () => setHoveredTutorId(request.id),
                      mouseout: () => setHoveredTutorId(null),
                      click: () => setSelectedRequest(request),
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                      <div style={{ minWidth: "180px", lineHeight: "1.3" }}>
                        <h4 style={{ marginBottom: "4px" }}>
                          <strong>Class:</strong> {request.classCourse}
                        </h4>
                        <p>
                          <strong>Location:</strong> {request.location}
                        </p>
                        <p>
                          <strong>Salary:</strong> {request.salary} TK/Month
                        </p>
                        <p>
                          <strong>Duration:</strong> {request.duration}
                        </p>
                      </div>
                    </Tooltip>
                  </Marker>
                ) : null
              )}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchByMap;

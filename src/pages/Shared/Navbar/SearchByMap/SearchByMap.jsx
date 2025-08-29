

import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
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

// 🔹 Custom colored marker icons
const createColoredIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const redIcon = createColoredIcon("red");   // user
const blueIcon = createColoredIcon("blue"); // default
const greenIcon = createColoredIcon("green"); // hover

// 🔹 Jitter markers (avoid overlap)
const jitterCoords = (coords, index) => {
  const offset = 0.0004 * index; 
  return [coords[0] + offset, coords[1] + offset];
};

// 🔹 FitBounds - only once when markers change
const FitBounds = ({ coordsArray }) => {
  const map = useMap();
  const coordsKey = JSON.stringify(coordsArray);
  const [lastKey, setLastKey] = useState(null);

  useEffect(() => {
    if (coordsArray.length > 0 && coordsKey !== lastKey) {
      if (coordsArray.length === 1) {
        map.setView(coordsArray[0], 13);
      } else {
        const bounds = L.latLngBounds(coordsArray);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
      setLastKey(coordsKey);
    }
  }, [coordsKey, coordsArray, lastKey, map]);

  return null;
};

// 🔹 RecenterMap - only when search center changes
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const SearchByMap = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading: userLoading, isError: userError } = useCurrentUser(user?.email);
  const { allJobs, isLoading: jobsLoading, isError: jobsError } = useAllJobs();

  const [userCoords, setUserCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [tutorRequestMarkers, setTutorRequestMarkers] = useState([]);
  const [hoveredTutorId, setHoveredTutorId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // ✅ Geocode function
  const geocodeLocation = async (location = "", district = "", city = "") => {
    const parts = [location, city, district].filter(Boolean);
    if (parts.length === 0) return null;

    const query = parts.join(", ") + ", Bangladesh";

    try {
      const res = await axios.get(`http://localhost:5000/geocode?q=${encodeURIComponent(query)}`);
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
      geocodeLocation(currentUser.location, currentUser.city || "Barishal").then((coords) => {
        if (coords) {
          setUserCoords(coords);
          setMapCenter(coords);
        }
      });
    }
  }, [currentUser, userLoading]);

  // 🔹 Load all job markers
  useEffect(() => {
    if (!jobsLoading && allJobs?.length) {
      Promise.all(
        allJobs.map(async (request) => {
          const coords = await geocodeLocation(request.location, "", request.city);
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
  }, [allJobs, jobsLoading]);

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
            <h2 className="text-xl font-semibold mb-4">Find Tuition by Location</h2>

            {/* District + City Dropdown */}
            <div className="flex gap-2 mb-4">
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setCity("");
                }}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 ${!district ? "text-gray-400" : "text-black"}`}
              >
                <option value="" disabled>District</option>
                {bdDistricts.map((dist, idx) => (
                  <option key={idx} value={dist}>{dist}</option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!district}
                className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 ${!city ? "text-gray-400" : "text-black"}`}
              >
                <option value="" disabled>Location</option>
                {district && cityAreaMap[district]?.map((ct, idx) => (
                  <option key={idx} value={ct}>{ct}</option>
                ))}
              </select>

              <button onClick={handleSearch} className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700">
                Search
              </button>
            </div>

            {selectedRequest && (
              <div className="p-4 bg-white rounded shadow-md mb-4">
                <h3 className="text-lg font-bold mb-2">Class: {selectedRequest.classCourse}</h3>
                <p><strong>Location:</strong> {selectedRequest.location}</p>
                <p><strong>Subjects:</strong> {selectedRequest.subjects?.join(", ")}</p>
                <p><strong>Salary:</strong> {selectedRequest.salary} TK/Month</p>
                <p><strong>Duration:</strong> {selectedRequest.duration}</p>
                <p><strong>City:</strong> {selectedRequest.city}</p>
                <p><strong>Days/Week:</strong> {selectedRequest.daysPerWeek}</p>
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

              {/* ✅ Auto fit once for markers */}
              {/* <FitBounds coordsArray={[
                ...tutorRequestMarkers.map((m) => m.coords),
                ...(userCoords ? [userCoords] : []),
              ]} /> */}

              {userCoords && (
                <Marker position={userCoords} icon={redIcon}>
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>You are here</Tooltip>
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
                        <h4 style={{ marginBottom: "4px" }}><strong>Class:</strong> {request.classCourse}</h4>
                        <p><strong>Location:</strong> {request.location}</p>
                        <p><strong>Salary:</strong> {request.salary} TK/Month</p>
                        <p><strong>Duration:</strong> {request.duration}</p>
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

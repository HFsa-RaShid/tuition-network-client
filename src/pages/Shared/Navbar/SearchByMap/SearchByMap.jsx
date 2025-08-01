
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
import ContactSection from "../../../landingPage/sections/contact/ContactSection";

// Create custom colored markers
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

// Dynamically update map center when coords change
const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (
      coords &&
      Array.isArray(coords) &&
      coords.length === 2 &&
      typeof coords[0] === "number" &&
      typeof coords[1] === "number"
    ) {
      map.setView(coords, 13);
    }
  }, [coords, map]);

  return null;
};

const SearchByMap = () => {
  const { user } = useContext(AuthContext);
  const {
    currentUser,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser(user?.email);
  const { allJobs, isLoading: jobsLoading, isError: jobsError } = useAllJobs();

  const [userCoords, setUserCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tutorRequestMarkers, setTutorRequestMarkers] = useState([]);
  const [hoveredTutorId, setHoveredTutorId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Geocode any address
  const geocodeLocation = async (location) => {
    if (!location) return null;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    return null;
  };

  // Get user's coordinates from their profile location
  useEffect(() => {
    if (!userLoading && currentUser?.location) {
      geocodeLocation(currentUser.location).then((coords) => {
        if (coords) {
          setUserCoords(coords);
          setMapCenter(coords);
        }
      });
    }
  }, [currentUser, userLoading]);

  // Get coordinates of all tutor job requests
  useEffect(() => {
    if (!jobsLoading && allJobs?.length) {
      Promise.all(
        allJobs.map(async (request) => {
          const coords = await geocodeLocation(request.location);
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

  const handleSearch = async () => {
    if (searchQuery) {
      const coords = await geocodeLocation(searchQuery);
      if (coords) {
        setMapCenter(coords);
        setSelectedRequest(null);
      }
    }
  };

  // Handle loading state
  if (userLoading || jobsLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ContactSection />
      <div className="flex w-full">
       
      {/* Left Panel */}
      <div className="w-1/3 p-4  overflow-y-auto border-r border-gray-200">
       
        <h2 className="text-xl font-semibold mb-4">Find Tuition by Location</h2>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter location..."
            className="border p-2 w-full rounded-l-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {selectedRequest && (
          <div className="p-4 bg-white rounded shadow-md mb-4">
            <h3 className="text-lg font-bold mb-2">
              Class: {selectedRequest.classCourse}
            </h3>
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
      <div className="w-2/3 h-[500px] m-4 z-0 relative">
        <MapContainer
          center={mapCenter || userCoords || [23.8103, 90.4125]} 
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ChangeMapView coords={mapCenter} />

          {userCoords && (
            <Marker position={userCoords} icon={redIcon}>
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                You are here
              </Tooltip>
            </Marker>
          )}

          {tutorRequestMarkers.map((request) => {
            if (
              request.coords &&
              Array.isArray(request.coords) &&
              typeof request.coords[0] === "number" &&
              typeof request.coords[1] === "number"
            ) {
              return (
                <Marker
                  key={request.id}
                  position={request.coords}
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
                      <p><strong>Location:</strong> {request.location}</p>
                      <p><strong>Salary:</strong> {request.salary} TK/Month</p>
                      <p><strong>Duration:</strong> {request.duration}</p>
                    </div>
                  </Tooltip>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
    </div>
    </div>
  );
};

export default SearchByMap;

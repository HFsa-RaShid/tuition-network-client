import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllJobs from "../../../../hooks/useAllJobs";
import { AuthContext } from "../../../../provider/AuthProvider";

// Create colored icons helper
const createColoredIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Icons
const redIcon = createColoredIcon("red");
const blueIcon = createColoredIcon("blue");
const greenIcon = createColoredIcon("green");

const SearchByMap = () => {
  const { user } = useContext(AuthContext);
  const {
    currentUser,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser(user?.email);
  const { allJobs, isLoading: jobsLoading, isError: jobsError } = useAllJobs();

  const [userCoords, setUserCoords] = useState(null);
  const [tutorRequestMarkers, setTutorRequestMarkers] = useState([]);
  const [hoveredTutorId, setHoveredTutorId] = useState(null);

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
      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!userLoading && currentUser?.location) {
      geocodeLocation(currentUser.location).then((coords) => {
        if (coords) setUserCoords(coords);
      });
    }
  }, [currentUser, userLoading]);

  useEffect(() => {
    if (!jobsLoading && allJobs?.length) {
      Promise.all(
        allJobs.map(async (request) => {
          const coords = await geocodeLocation(request.location);
          if (coords) {
            return {
              id: request._id,
              coords,
              classCourse: request.classCourse,
              location: request.location,
              salary: request.salary,
              duration: request.duration,
            };
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

  if (userLoading || jobsLoading)
    return <p className="text-center mt-20">Loading map data...</p>;
  if (userError)
    return (
      <p className="text-center text-red-500 mt-20">
        Failed to load user data.
      </p>
    );
  if (jobsError)
    return (
      <p className="text-center text-red-500 mt-20">
        Failed to load tutor requests.
      </p>
    );
  if (!userCoords)
    return <p className="text-center mt-20">User location not available.</p>;

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={userCoords}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker — red, no hover color change */}
        <Marker position={userCoords} icon={redIcon}>
          <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
            You are here
          </Tooltip>
        </Marker>

        {/* Tutor Requests markers — blue by default, green on hover */}
        {tutorRequestMarkers.map(
          ({ id, coords, classCourse, location, salary, duration }) => (
            <Marker
              key={id}
              position={coords}
              icon={hoveredTutorId === id ? greenIcon : blueIcon}
              eventHandlers={{
                mouseover: () => setHoveredTutorId(id),
                mouseout: () => setHoveredTutorId(null),
              }}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
                <div style={{ minWidth: "180px", lineHeight: "1.3" }}>
                  <h4 style={{ marginBottom: "4px" }}>
                    <strong>Class:</strong> {classCourse}
                  </h4>
                  <p style={{ margin: "2px 0" }}>
                    <strong>Location:</strong> {location}
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong>Salary:</strong> {salary} TK/Month
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong>Duration:</strong> {duration}
                  </p>
                </div>
              </Tooltip>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
};

export default SearchByMap;

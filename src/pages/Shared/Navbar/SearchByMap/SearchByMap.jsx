

// import React, { useContext, useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Tooltip,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import useCurrentUser from "../../../../hooks/useCurrentUser";
// import useAllJobs from "../../../../hooks/useAllJobs";
// import { AuthContext } from "../../../../provider/AuthProvider";
// import Navbar from "../Navbar";
// import ContactSection from "../../../landingPage/sections/contact/ContactSection";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import bdDistricts from "../../../utils/bdDistricts";
// import cityAreaMap from "../../../utils/cityAreaMap";
// import axios from "axios";

// // Custom colored marker icons
// const createColoredIcon = (color) =>
//   new L.Icon({
//     iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
//     shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
    
//   });

// const redIcon = createColoredIcon("red");
// const blueIcon = createColoredIcon("blue");
// const greenIcon = createColoredIcon("green");



// const jitterCoords = (coords, index) => {
//   const offset = 0.0004 * index; // ~30 meters shift
//   return [coords[0] + offset, coords[1] + offset];
// };

// const FitBounds = ({ coordsArray }) => {
//   const map = useMap();
//   const [fitted, setFitted] = useState(false);

//   useEffect(() => {
//     if (!fitted && coordsArray.length > 0) {
//       if (coordsArray.length === 1) {
        
//         map.setView(coordsArray[0], 15);
//       } else {
        
//         const bounds = L.latLngBounds(coordsArray);
//         map.fitBounds(bounds, { padding: [50, 50] });
//       }
//       setFitted(true);
//     }
//   }, [coordsArray, map, fitted]);

//   return null;
// };


// const SearchByMap = () => {
//   const { user } = useContext(AuthContext);
//   const {
//     currentUser,
//     isLoading: userLoading,
//     isError: userError,
//   } = useCurrentUser(user?.email);
//   const { allJobs, isLoading: jobsLoading, isError: jobsError } = useAllJobs();
//   const axiosPublic = useAxiosPublic();

//   const [userCoords, setUserCoords] = useState(null);
//   const [mapCenter, setMapCenter] = useState(null);
//  const [district, setDistrict] = useState("");
// const [city, setCity] = useState("");

//   const [tutorRequestMarkers, setTutorRequestMarkers] = useState([]);
//   const [hoveredTutorId, setHoveredTutorId] = useState(null);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // Geocode function using OpenStreetMap Nominatim API
//   // const geocodeLocation = async (location, city = "Barishal") => {
//   //   if (!location) return null;

//   //   const query = city
//   //     ? `${location}, ${city}, Bangladesh`
//   //     : `${location}, Bangladesh`;

//   //   try {
//   //     const res = await axiosPublic.get(
//   //       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//   //         query
//   //       )}`
//   //     );

//   //     const data = res.data;

//   //     if (data && data.length > 0) {
//   //       const filtered = data.find((place) =>
//   //         place.display_name.toLowerCase().includes(city.toLowerCase())
//   //       );
//   //       if (filtered) {
//   //         return [parseFloat(filtered.lat), parseFloat(filtered.lon)];
//   //       }
//   //       return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//   //     }
//   //   } catch (err) {
//   //     console.error("Geocoding error:", err);
//   //   }

//   //   return null;
//   // };

//   const geocodeLocation = async (location, district = "", city = "") => {
//   if (!location && !district && !city) return null;

//   const query = `${location ? location + "," : ""} ${city ? city + "," : ""} ${district}, Bangladesh`;

//   try {
//     const res = await axios.get(`http://localhost:5000/geocode?q=${encodeURIComponent(query)}`);
//     const data = res.data;
//     if (data && data.length > 0) {
//       return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//     }
//   } catch (err) {
//     console.error("Geocoding error:", err);
//   }

//   return null;
// };


//   // Load user coordinates from currentUser location
//   useEffect(() => {
//     if (!userLoading && currentUser?.location) {
//       geocodeLocation(
//         currentUser.location,
//         currentUser.city || "Barishal"
//       ).then((coords) => {
//         if (coords) {
//           setUserCoords(coords);
//           setMapCenter(coords);
//         }
//       });
//     }
//   }, [currentUser, userLoading]);

//   // Geocode all jobs locations and set markers
//   useEffect(() => {
//     if (!jobsLoading && allJobs?.length) {
//       Promise.all(
//         allJobs.map(async (request) => {
//           const coords = await geocodeLocation(request.location, request.city);
//           if (coords) {
//             return { id: request._id, coords, ...request };
//           }
//           return null;
//         })
//       ).then((markers) => {
//         setTutorRequestMarkers(markers.filter(Boolean));
//       });
//     } else {
//       setTutorRequestMarkers([]);
//     }
//   }, [allJobs, jobsLoading]);

//   // Search button handler to update map center based on query
// const handleSearch = async () => {
//   if (district || city) {
//     // location argument should not be city, use "" if empty
//     const coords = await geocodeLocation("", district, city);
//     if (coords) {
//       setMapCenter(coords);
//       setSelectedRequest(null);
//     } else {
//       alert("Location not found!");
//     }
//   }
// };




//   if (userLoading || jobsLoading) {
//     return (
//       <div className="flex justify-center items-center mt-20">
//         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (userError) return <div>Error loading user data.</div>;
//   if (jobsError) return <div>Error loading job requests.</div>;

//   return (
//     <div>
//       <Navbar />
//       <ContactSection />
//       <div className="flex w-full min-h-[600px]">
//         {/* Left Panel */}
//         <div className="w-1/3 p-4 overflow-y-auto border-r border-gray-200">
//           <h2 className="text-xl font-semibold mb-4">Find Tuition by Location</h2>

// {/* 🔽 District + City Dropdown */}
// <div className="flex gap-2 mb-4">
//   {/* District Dropdown */}
//   <select
//     value={district}
//     onChange={(e) => {
//       setDistrict(e.target.value);
//       setCity("");
//     }}
//     className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 
//       ${!district ? "text-gray-400" : "text-black"}`}
//   >
//     <option value="" disabled>
//       District
//     </option>
//     {bdDistricts.map((dist, idx) => (
//       <option key={idx} value={dist}>
//         {dist}
//       </option>
//     ))}
//   </select>

//   {/* City Dropdown */}
//   <select
//     value={city}
//     onChange={(e) => setCity(e.target.value)}
//     disabled={!district}
//     className={`border-b-2 border-gray-300 appearance-none focus:outline-none px-2 py-1 w-28 
//       ${!city ? "text-gray-400" : "text-black"}`}
//   >
//     <option value="" disabled>
//       Location
//     </option>
//     {district &&
//       cityAreaMap[district]?.map((ct, idx) => (
//         <option key={idx} value={ct}>
//           {ct}
//         </option>
//       ))}
//   </select>

//   {/* Search Button */}
//   <button
//     onClick={handleSearch}
//     className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
//   >
//     Search
//   </button>
// </div>


//           {selectedRequest && (
//             <div className="p-4 bg-white rounded shadow-md mb-4">
//               <h3 className="text-lg font-bold mb-2">
//                 Class: {selectedRequest.classCourse}
//               </h3>
//               <p>
//                 <strong>Location:</strong> {selectedRequest.location}
//               </p>
//               <p>
//                 <strong>Subjects:</strong>{" "}
//                 {selectedRequest.subjects?.join(", ")}
//               </p>
//               <p>
//                 <strong>Salary:</strong> {selectedRequest.salary} TK/Month
//               </p>
//               <p>
//                 <strong>Duration:</strong> {selectedRequest.duration}
//               </p>
//               <p>
//                 <strong>City:</strong> {selectedRequest.city}
//               </p>
//               <p>
//                 <strong>Days/Week:</strong> {selectedRequest.daysPerWeek}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Right Map Panel */}
//         <div className="w-2/3 h-[500px] m-4 relative z-0">
//           <MapContainer
//             center={mapCenter || userCoords || [23.8103, 90.4125]}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap contributors"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <FitBounds
//               coordsArray={[
//                 ...tutorRequestMarkers.map((m) => m.coords),
//                 ...(userCoords ? [userCoords] : []),
//               ]}
//             />

//             {userCoords && (
//               <Marker position={userCoords} icon={redIcon}>
//                 <Tooltip direction="top" offset={[0, -20]} opacity={1}>
//                   You are here
//                 </Tooltip>
//               </Marker>
//             )}

//             {/* ✅ Tutor request markers with jitter offset */}
//             {tutorRequestMarkers.map((request, idx) => {
//               if (
//                 request.coords &&
//                 Array.isArray(request.coords) &&
//                 typeof request.coords[0] === "number" &&
//                 typeof request.coords[1] === "number"
//               ) {
//                 return (
//                   <Marker
//                     key={request.id}
//                     position={jitterCoords(request.coords, idx)}
//                     icon={hoveredTutorId === request.id ? greenIcon : blueIcon}
//                     eventHandlers={{
//                       mouseover: () => setHoveredTutorId(request.id),
//                       mouseout: () => setHoveredTutorId(null),
//                       click: () => setSelectedRequest(request),
//                     }}
//                   >
//                     <Tooltip direction="top" offset={[0, -20]} opacity={1}>
//                       <div style={{ minWidth: "180px", lineHeight: "1.3" }}>
//                         <h4 style={{ marginBottom: "4px" }}>
//                           <strong>Class:</strong> {request.classCourse}
//                         </h4>
//                         <p>
//                           <strong>Location:</strong> {request.location}
//                         </p>
//                         <p>
//                           <strong>Salary:</strong> {request.salary} TK/Month
//                         </p>
//                         <p>
//                           <strong>Duration:</strong> {request.duration}
//                         </p>
//                       </div>
//                     </Tooltip>
//                   </Marker>
//                 );
//               }
//               return null;
//             })}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchByMap;



import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllJobs from "../../../../hooks/useAllJobs";
import { AuthContext } from "../../../../provider/AuthProvider";
import Navbar from "../Navbar";
import ContactSection from "../../../landingPage/sections/contact/ContactSection";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";
import axios from "axios";

// Custom colored marker icons
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

const jitterCoords = (coords, index) => {
  const offset = 0.0004 * index; // ~30 meters shift
  return [coords[0] + offset, coords[1] + offset];
};

const FitBounds = ({ coordsArray }) => {
  const map = useMap();
  const [fitted, setFitted] = useState(false);

  useEffect(() => {
    if (!fitted && coordsArray.length > 0) {
      if (coordsArray.length === 1) {
        map.setView(coordsArray[0], 15);
      } else {
        const bounds = L.latLngBounds(coordsArray);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
      setFitted(true);
    }
  }, [coordsArray, map, fitted]);

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

  // Load user coordinates
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

  // Load all job markers
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

  // Handle search
const handleSearch = async () => {
  console.log("Searching for:", district, city);
  const coords = await geocodeLocation("", district, city);
  console.log("Geocode result:", coords);
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
      <ContactSection />
      <div className="flex w-full min-h-[600px]">
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

            <FitBounds coordsArray={[...tutorRequestMarkers.map((m) => m.coords), ...(userCoords ? [userCoords] : [])]} />

            {userCoords && (
              <Marker position={userCoords} icon={redIcon}>
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>You are here</Tooltip>
              </Marker>
            )}

            {tutorRequestMarkers.map((request, idx) => (
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
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SearchByMap;

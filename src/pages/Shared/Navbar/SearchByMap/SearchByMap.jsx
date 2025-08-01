import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import { AuthContext } from '../../../../provider/AuthProvider';

// Fix for default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});


const SearchByMap = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading, isError } = useCurrentUser(user?.email);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (!isLoading && currentUser?.location) {
      // Use OpenStreetMap Nominatim API to geocode the location string
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          currentUser.location
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setUserCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else {
            setUserCoords(null);
          }
        })
        .catch(() => setUserCoords(null));
    }
  }, [currentUser, isLoading]);

  if (isLoading) return <p className="text-center mt-20">Loading user location...</p>;
  if (isError) return <p className="text-center text-red-500 mt-20">Failed to load location.</p>;
  if (!userCoords) return <p className="text-center mt-20">Location not available.</p>;

  return (
    <div className="w-full h-screen">
      <MapContainer center={userCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User's location marker */}
        <Marker position={userCoords}>
          <Popup>Your Location: {currentUser.location}</Popup>
        </Marker>

        {/* Listings */}
        {listings.map((listing) => (
          <Marker key={listing.id} position={listing.position}>
            <Popup>
              <img
                src={listing.image}
                alt={listing.title}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <h2 style={{ marginTop: '8px', fontSize: '16px' }}>{listing.title}</h2>
              <p style={{ fontSize: '13px' }}>{listing.description}</p>
              <p style={{ fontSize: '13px', color: '#777' }}>{listing.dateRange}</p>
              <strong style={{ display: 'block', marginTop: '4px' }}>${listing.price} for 5 nights</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SearchByMap;

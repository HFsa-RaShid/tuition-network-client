import React from 'react';
import Navbar from '../../../Shared/Navbar/Navbar';
import ContactSection from '../contact/ContactSection';
import useAllTutors from '../../../../hooks/useAllTutors';
import { useLocation } from 'react-router-dom';

const MatchTutors = () => {
  const { allTutors, isLoading, isError } = useAllTutors();
  const { state } = useLocation();
  const { className = "", location = "" } = state || {}; // ✅ safe default

  if (isLoading) return <p>Loading tutors...</p>;
  if (isError) return <p>Something went wrong while fetching tutors.</p>;

  // 🚀 filter logic (only run when tutors exist)
  const matchedTutors = allTutors.filter(
    (tutor) =>
      tutor.preferredClass?.toLowerCase().includes(className) &&
      tutor.location?.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <ContactSection />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Matched Tutors for Class: {className}, Location: {location}
        </h2>

        {matchedTutors.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {matchedTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg"
              >
                <img
                  src={tutor.photoURL}
                  alt={tutor.name}
                  className="w-24 h-24 rounded-full"
                />
                <h3 className="text-lg font-semibold mt-2">{tutor.name}</h3>
                <p>Location: {tutor.location}</p>
                <p>Subjects: {tutor.preferredSubjects}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No tutors found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default MatchTutors;

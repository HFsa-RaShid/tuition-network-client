// import React from 'react';
// import Navbar from '../../../Shared/Navbar/Navbar';
// import ContactSection from '../contact/ContactSection';
// import useAllTutors from '../../../../hooks/useAllTutors';
// import { useLocation } from 'react-router-dom';

// const MatchTutors = () => {
//   const { allTutors, isLoading, isError } = useAllTutors();
//   const { state } = useLocation();
//   const { className = "", location = "" } = state || {}; // ✅ safe default

//   if (isLoading) return <p>Loading tutors...</p>;
//   if (isError) return <p>Something went wrong while fetching tutors.</p>;

  
//   const matchedTutors = allTutors.filter(
//     (tutor) =>
//       tutor.preferredClass?.toLowerCase().includes(className) &&
//       tutor.location?.toLowerCase().includes(location.toLowerCase())
//   );

//   return (
//     <div>
//       <Navbar />
//       <ContactSection />

//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">
//           Matched Tutors for Class: {className}, Location: {location}
//         </h2>

//         {matchedTutors.length > 0 ? (
//           <div className="grid grid-cols-3 gap-6">
//             {matchedTutors.map((tutor) => (
//               <div
//                 key={tutor._id}
//                 className="border p-4 rounded-lg shadow hover:shadow-lg"
//               >
//                 <img
//                   src={tutor.photoURL}
//                   alt={tutor.name}
//                   className="w-24 h-24 rounded-full"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{tutor.name}</h3>
//                 <p>Location: {tutor.location}</p>
//                 <p>Subjects: {tutor.preferredSubjects}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-red-500">No tutors found for your search.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MatchTutors;

import React from 'react';
import Navbar from '../../../Shared/Navbar/Navbar';
import ContactSection from '../contact/ContactSection';
import useAllTutors from '../../../../hooks/useAllTutors';
import { useLocation } from 'react-router-dom';

const MatchTutors = () => {
  const { allTutors, isLoading, isError } = useAllTutors();
  const { state } = useLocation();
  const { className = "", location = "" } = state || {}; // safe defaults

  if (isLoading) return <p>Loading tutors...</p>;
  if (isError) return <p>Something went wrong while fetching tutors.</p>;

  // যদি কোনো tutor data না থাকে
  if (!allTutors || allTutors.length === 0) {
    return (
      <div>
        <Navbar />
        <ContactSection />
        <div className="container mx-auto p-4">
          <p className="text-center text-red-500 font-medium">
            No tutors available right now.
          </p>
        </div>
      </div>
    );
  }

  // যদি className বা location খালি থাকে → কোন match হবে না
  const hasSearchQuery = className.trim() !== "" || location.trim() !== "";

  const matchedTutors = hasSearchQuery
    ? allTutors.filter(
        (tutor) =>
          tutor.preferredClass?.toLowerCase().includes(className.toLowerCase()) &&
          tutor.location?.toLowerCase().includes(location.toLowerCase())
      )
    : [];

  return (
    <div>
      <Navbar />
      <ContactSection />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Matched Tutors for Class: <span className="text-blue-600">{className || "N/A"}</span>, 
          Location: <span className="text-blue-600">{location || "N/A"}</span>
        </h2>

        {matchedTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={tutor.photoURL}
                  alt={tutor.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold text-center mt-3">{tutor.name}</h3>
                <p className="text-center text-gray-600">📍 {tutor.location}</p>
                <p className="text-center text-gray-500">
                  📚 {tutor.preferredSubjects}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 font-medium">
             No tutors found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchTutors;

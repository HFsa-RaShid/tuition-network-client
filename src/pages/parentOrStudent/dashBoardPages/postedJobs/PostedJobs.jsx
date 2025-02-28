// import React, { useContext, useState, useEffect } from "react";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import { AuthContext } from "../../../../provider/AuthProvider";
// import toast from "react-hot-toast";

// const PostedJobs = () => {
//   const { user } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();
//   const [postedJobs, setPostedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPostedJobs = async () => {
//       try {
//         const res = await axiosPublic.get('/tutorRequests');
//         const userPostedJobs = res.data.filter(job => job.userEmail === user?.email);
//         setPostedJobs(userPostedJobs);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posted jobs:", error);
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchPostedJobs();
//     }
//   }, [user, axiosPublic]);

//   if (loading) {
//     return <div>Loading your posted jobs...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-4">Your Posted Jobs</h2>
//       {postedJobs.length > 0 ? (
//         <div className="space-y-4">
//           {postedJobs.map((job) => (
//             <div key={job._id} className="p-4 border rounded shadow-sm">
//               <h3 className="text-xl font-medium">{job.category} - {job.classCourse}</h3>
//               <p><strong>Tuition Type:</strong> {job.tuitionType}</p>
//               <p><strong>Location:</strong> {job.city}, {job.location}</p>
//               <p><strong>Subjects:</strong> {job.subjects.join(", ")}</p>
//               <p><strong>Salary:</strong> {job.salary} BDT</p>
//               <p><strong>No. of Students:</strong> {job.noOfStudents}</p>
//               <p><strong>Duration:</strong> {job.duration}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>You haven't posted any jobs yet.</p>
//       )}
//     </div>
//   );
// };

// export default PostedJobs;


import React, { useContext, useState, useEffect } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../provider/AuthProvider";
import toast from "react-hot-toast";

const PostedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const res = await axiosPublic.get('/tutorRequests');
        const userPostedJobs = res.data.filter(job => job.userEmail === user?.email);
        setPostedJobs(userPostedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchPostedJobs();
    }
  }, [user, axiosPublic]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading your posted jobs...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 h-screen">

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {postedJobs.length > 0 ? (
          postedJobs.map((job) => (
            <div key={job._id} className="p-3 bg-white shadow-lg rounded-lg flex flex-col">
              <h3 className="text-lg font-semibold mb-2">{job.category} - {job.classCourse}</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600"><strong>Tuition Type:</strong> {job.tuitionType}</p>
                <p className="text-gray-600"><strong>Location:</strong> {job.city}, {job.location}</p>
                <p className="text-gray-600"><strong>Subjects:</strong> {job.subjects.join(", ")}</p>
                <p className="text-gray-600"><strong>Student Gender:</strong> {job.studentGender}</p>
                <p className="text-gray-600"><strong>No. of Students:</strong> {job.noOfStudents}</p>
                <p className="text-gray-600"><strong>Tutor Preference:</strong> {job.tutorGenderPreference}</p>
                <p className="text-gray-600"><strong>Days Per Week:</strong> {job.daysPerWeek}</p>
                <p className="text-gray-600"><strong>Salary:</strong> {job.salary} BDT</p>
                <p className="text-gray-600"><strong>Duration:</strong> {job.duration}</p>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostedJobs;

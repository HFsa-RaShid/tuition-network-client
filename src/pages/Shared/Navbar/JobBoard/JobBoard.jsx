import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAllJobs from '../../../../hooks/useAllJobs';
import Navbar from '../Navbar';
import ContactSection from '../../../landingPage/sections/contact/ContactSection';

const JobBoard = () => {
  const { allJobs, refetch, isLoading } = useAllJobs();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    tutoringType: '',
    gender: '',
    medium: '',
  });

  useEffect(() => {
    if (allJobs) {
      setJobs(allJobs);
    }
  }, [allJobs]);

  const filteredJobs = jobs.filter(job => {
    return (
      (!filter.tutoringType || job.tuitionType === filter.tutoringType) &&
      (!filter.gender || job.tutorGenderPreference === filter.gender) &&
      (!filter.medium || job.category === filter.medium)
    );
  });

  return (
    <div>
         <Navbar></Navbar>
         <ContactSection></ContactSection>

         <div className='container mx-auto mt-10'>
       
       <div className="flex p-6 gap-4">
         {/* 👉 Left Sidebar (Filters) */}
         <div className="w-[30%] bg-slate-100  shadow-md rounded-lg p-4 text-black">
           <h2 className="text-lg font-semibold mb-4">🔍 Advanced Filter</h2>
 
           <div className="mb-4">
             <label className="block font-semibold mb-1">Tuition Type</label>
             <select
               className="w-full border p-2 rounded bg-white"
               onChange={e => setFilter({ ...filter, tutoringType: e.target.value })}
             >
               <option value="">All</option>
               <option value="Home Tutoring">Home Tutoring</option>
               <option value="Online Tutoring">Online Tutoring</option>
             </select>
           </div>
 
           <div className="mb-4">
             <label className="block font-semibold mb-1">Preferred Tutor</label>
             <select
               className="w-full border p-2 rounded bg-white"
               onChange={e => setFilter({ ...filter, gender: e.target.value })}
             >
               <option value="">All</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Any">Any</option>
             </select>
           </div>
 
           <div className="mb-4">
             <label className="block font-semibold mb-1">Medium</label>
             <select
               className="w-full border p-2 rounded bg-white"
               onChange={e => setFilter({ ...filter, medium: e.target.value })}
             >
               <option value="">All</option>
               <option value="Bangla Medium">Bangla Medium</option>
               <option value="English Medium">English Medium</option>
             </select>
           </div>
         </div>
 
         {/* 👉 Right Content (Job Cards) */}
         <div className="w-[70%] space-y-6">
           {filteredJobs.map(job => (
             <div key={job._id} className="bg-slate-100 shadow-md rounded-lg p-6 relative">
               <div>
                 <p className="text-gray-500">📍 {job.city}, {job.location}</p>
                 <h2 className="text-xl text-black font-bold mt-2">Tuition for {job.classCourse}</h2>
                 <div className="flex gap-2 mt-2">
                   <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                     {job.tuitionType}
                   </span>
                   <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                     ⏰ {job.duration}
                   </span>
                 </div>
 
                 <div className="mt-4 grid grid-cols-2 justify-between gap-4 text-black">
                   <p><strong>👨‍🏫 No. of Students:</strong> {job.noOfStudents}</p>
                   <p><strong>🏫 Medium:</strong> {job.category}</p>
                   <p><strong>📚 Class:</strong> {job.classCourse}</p>
                   <p><strong>📅 Tutoring Days:</strong> {job.daysPerWeek}</p>
                   <p><strong>👤 Preferred Tutor:</strong> {job.tutorGenderPreference}</p>
                   <p><strong>👧 Student Gender:</strong> {job.studentGender}</p>
                 </div>
 
                 <div className="mt-2 text-black">
                   <strong>📖 Subjects:</strong>
                   <div className="flex gap-2 mt-1 flex-wrap">
                     {job.subjects?.map((subj, idx) => (
                       <span key={idx} className="bg-green-300 text-sm px-2 py-1 rounded">
                         {subj}
                       </span>
                     ))}
                   </div>
                 </div>
 
                 <p className="mt-3 text-black"><strong>💰 Salary:</strong> <span className="text-blue-700 font-bold">{job.salary} TK</span>/Month</p>
                 <p className="text-gray-500 mt-2 text-sm">Posted by: {job.userName} ({job.userEmail})</p>
               </div>
 
               {/* 👉 Bottom-Right View Details Button */}
               <NavLink
                 to={`/job-details/${job._id}`}
                 className="absolute bottom-4 right-4 bg-[#f9d045] text-black font-medium px-4 py-2 rounded hover:bg-[#c5a331]  transition"
               >
                 View Details
               </NavLink>
             </div>
           ))}
         </div>
       </div>
     </div>
    </div>
    
   
  );
};

export default JobBoard;

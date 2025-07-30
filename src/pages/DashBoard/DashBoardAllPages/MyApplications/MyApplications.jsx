// MyApplications.jsx

import { useContext, useEffect, useState } from 'react';
import { FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import moment from 'moment';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../provider/AuthProvider';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  useEffect(() => {
  axiosSecure.get('/tutorRequests')
    .then(res => {
      const appliedJobs = res.data.filter(job =>
        job.appliedTutors?.includes(currentUser?.email)
      );
      setApplications(appliedJobs);
    });
}, [axiosSecure, currentUser]);


  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApps = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th>Profile</th>
              <th>Applied On</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.map((app, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td>
                  Class: {app.classCourse}{' '}
                  <FaArrowRight className="inline ml-2 text-blue-500 cursor-pointer" />
                </td>
                <td>{moment(app.appliedAt).format('DD MMM, YYYY')}</td>
                <td className="flex items-center gap-2">
                  {app.tutorStatus === 'selected' ? 'Selected' : 'Not selected'}
                  <FaQuestionCircle className="text-gray-400" title="Status info" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && (
          <p className="text-center text-gray-500 py-4">No applications found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;

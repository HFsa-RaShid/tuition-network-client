
import { useNavigate, useParams } from 'react-router-dom';
import useAllJobs from '../../../../hooks/useAllJobs';
import moment from 'moment';
import { IoArrowBack } from "react-icons/io5";
import EmptyState from "../../../../components/EmptyState";

const JobDetails = () => {
  const { id } = useParams();
  const { allJobs, isLoading } = useAllJobs();

  const navigate = useNavigate();
  if (isLoading) {
     return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const job = allJobs.find(job => job._id === id);

  if (!job) {
    return <EmptyState message="No job details found." />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-1"
      >
        <IoArrowBack className="text-2xl" />

        <span className="text-lg font-medium">Back</span>
      </button>
      <h2 className="text-2xl font-bold mb-10 text-blue-700 text-center">Job Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[17px]">
        <div><strong>Class/Course:</strong> {job.classCourse}</div>
        <div><strong>Tuition Type:</strong> {job.tuitionType}</div>
        <div><strong>Category:</strong> {job.category}</div>
        
        <div><strong>Subjects:</strong> {job.subjects?.join(', ')}</div>
        <div><strong>City:</strong> {job.city}</div>
        <div><strong>Location:</strong> {job.location}</div>
        <div><strong>Student Gender:</strong> {job.studentGender}</div>
        <div><strong>Number of Students:</strong> {job.noOfStudents}</div>
        <div><strong>Tutor Gender Preference:</strong> {job.tutorGenderPreference}</div>
        <div><strong>Days per Week:</strong> {job.daysPerWeek}</div>
        <div><strong>Duration:</strong> {job.duration}</div>
        <div><strong>Salary:</strong> {job.salary} BDT</div>
        <div><strong>Posted At:</strong> {moment(job.postedAt).format('DD MMM, YYYY')}</div>
        
      </div>
    </div>
  );
};

export default JobDetails;

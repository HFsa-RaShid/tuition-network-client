import { FaEyeSlash } from "react-icons/fa";

const EmptyState = ({ message = "No data found." }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <FaEyeSlash className="w-8 h-8 text-gray-500" />
    </div>
    <p className="text-center mt-4 text-gray-600 text-sm md:text-base">
      {message}
    </p>
  </div>
);

export default EmptyState;



import React, { useContext, useState } from "react";
import { FaCrown, FaUserCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleVerificationSubmit = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const response = await axiosSecure.post("/verification", {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        customId: currentUser.customId,
        idImage: currentUser.idImage,
        professionalId: currentUser.professionalId,
        city: currentUser.city,
        location: currentUser.location,
      });

      if (response.status === 201) {
        toast.success("Verification request submitted successfully!");
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to submit verification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="grid grid-cols-1 gap-6 ml-8 mt-2">
        {/* Premium Registration */}
        <div className="bg-blue-50 rounded-2xl shadow-md py-6 flex flex-col items-center text-center hover:scale-105 transition mx-20">
          <FaCrown className="text-yellow-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Premium Registration
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Unlock extra features with a{" "}
            <span className="font-bold">one-time premium membership</span>.
          </p>
          <NavLink to="premium">
            <button className="bg-blue-300 hover:bg-blue-400 border-blue-500 px-5 py-2 rounded-md font-medium transition">
              Get Premium
            </button>
          </NavLink>
        </div>

        {/* Profile Verification */}
        <div className="bg-yellow-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition mx-20">
          <FaUserCheck className="text-yellow-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Profile Verification
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Verify your tutor profile after confirming at least{" "}
            <span className="font-bold">one job</span>.
          </p>
          <button
            onClick={handleVerificationSubmit}
            disabled={isSubmitted || loading}
            className={`px-5 py-2 rounded-md font-medium transition ${
              isSubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {isSubmitted ? "Submitted" : loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

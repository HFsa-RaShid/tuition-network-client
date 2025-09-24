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

  // আগেই submit করলে ব্লক করবো
  if (currentUser.verificationStatus === "pending") {
    toast.error("You have already submitted a request!");
    return;
  }

  setLoading(true);
  try {
    // 1️⃣ verification insert
    const res1 = await axiosSecure.post("/verification", {
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      customId: currentUser.customId,
      idImage: currentUser.idImage,
      NidImage: currentUser.NidImage,
      city: currentUser.city,
      location: currentUser.location,
      verificationStatus: "pending",
    });

    
    if (res1.status === 200 || res1.status === 201) {
      await axiosSecure.put(`/users/${currentUser?.email}`, {
        verificationStatus: "pending",
      });

      if (currentUser.role === "tutor") {
        await axiosSecure.put(`/tutors/${currentUser?.email}`, {
          verificationStatus: "pending",
        });
      }

      toast.success("Verification request submitted successfully!");
      refetch();
    }

  } catch (error) {
    console.error("Verification error:", error);
    toast.error(error.response?.data?.message || "Failed to submit verification");
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
            <button className="bg-blue-300 hover:bg-blue-400 text-blue-800 px-5 py-2 rounded-md font-medium transition">
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
            Verify your profile after <span className="font-bold">100% update</span> your profile 
        
          </p>
          <button
            onClick={handleVerificationSubmit}
            disabled={currentUser.verificationStatus==='pending' || loading}
            className={`px-5 py-2 rounded-md font-medium transition ${
              currentUser.verificationStatus==='pending'
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {currentUser.verificationStatus==='pending' ? "Submitted" : loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

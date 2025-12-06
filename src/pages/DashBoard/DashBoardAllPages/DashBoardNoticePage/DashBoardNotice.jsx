
import React, { useContext, useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import TutorDashboard from "./TutorDashboard";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const DashBoardNotice = () => {
  const { user } = useContext(AuthContext);
  const {
    currentUser,
    isLoading: userLoading,
    isError,
  } = useCurrentUser(user?.email);

  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (currentUser?.role === "tutor" || currentUser?.role === "student") {
  //     const visited = localStorage.getItem("tutoriaNoticeShown");
  //     if (!visited) {
  //       setShowModal(true);
  //       localStorage.setItem("tutoriaNoticeShown", "true");
  //     }
  //   }
  // }, [currentUser]);
  useEffect(() => {
  // set a 1 second delay before checking currentUser
  const timer = setTimeout(() => {
    if (currentUser?.role === "tutor" || currentUser?.role === "student") {
      // make the key user-specific so different users get their own notice
      const key = `tutoriaNoticeShown_${currentUser.email}`;
      const visited = localStorage.getItem(key);

      if (!visited) {
        setShowModal(true);
        localStorage.setItem(key, "true");
      }
    }
  }, 1000); // 1000ms = 1 second

  // cleanup: clear timeout if component unmounts or currentUser changes
  return () => clearTimeout(timer);
}, [currentUser]);


  if (userLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <>
      
      {/* Modal for Notice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
          <div className="bg-white w-[470px] rounded-xl shadow-2xl relative p-7 animate-fadeIn border border-gray-200">
          
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src="/logo.png" 
                alt="TuToria Logo"
                className="w-20 h-20 object-contain drop-shadow-sm"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-black text-center mb-3 uppercase tracking-wide">
              Official Safety Notice
            </h2>

            {/* Body Text */}
            <p className="text-gray-800 text-[16px] leading-[1.6] text-center">
              TuToria connects tutors and students — we do not guarantee
              personal behavior. Any{" "}
              <b className="text-red-700">fraud, misconduct, or crime</b> is the{" "}
              <b>user's own responsibility</b>.
              <br />
              <br />
              TuToria may assist authorities with user information if required.
              Use this platform with honesty and respect.
              <span className="font-semibold text-blue-600 block mt-3 text-[16px] uppercase tracking-wide">
                Stay Safe. Stay Honest. Stay with TuToria.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Render Dashboard Based on Role */}
      {currentUser?.role === "admin" && <AdminDashboard />}
      {currentUser?.role === "tutor" && <TutorDashboard />}
      {currentUser?.role === "student" && <StudentDashboard />}
    </>
  );
};

export default DashBoardNotice;

import React, { useContext } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import TutorDashboard from "./TutorDashboard";

const DashBoardNotice = () => {
  const { user } = useContext(AuthContext);
  const {
    currentUser,
    isLoading: userLoading,
    isError,
  } = useCurrentUser(user?.email);

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

  if (currentUser?.role === "admin") {
    return <AdminDashboard />;
  }

  if (currentUser?.role === "tutor") {
    return <TutorDashboard />;
  }

  return <StudentDashboard />;
};

export default DashBoardNotice;

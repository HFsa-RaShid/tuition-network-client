

import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../../provider/AuthProvider";
import toast from "react-hot-toast";

const GoogleSignIn = ({ role }) => { 
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email.toLowerCase(), // ✅ Lowercase email
        role: role,
      };
  
      let userExists = false;
      try {
        const { data } = await axiosPublic.get(`/users/${userInfo.email}`);
        userExists = data?.role ? true : false;
      } catch (error) {
        if (error.response?.status === 404) {
          userExists = false;
        } else {
          console.error("Error fetching user:", error);
        }
      }
  
      if (userExists) {
        toast.success("Sign In successfully");
        setTimeout(() => {
          navigate(data.role === "parent" ? "/parentDashBoard" : "/tutorDashBoard", { replace: true });
        }, 1000);
      } else {
        await axiosPublic.post("/users", userInfo);
        toast.success("Sign Up successful! Redirecting...");
        setTimeout(() => {
          navigate(role === "parent" ? "/parentDashBoard" : "/tutorDashBoard", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Google Sign In failed. Try again.");
    }
  };
  
  return (
    <div>
      <div className="bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 my-1 font-semibold w-full gap-2 flex items-center justify-center text-xl text-center text-[#123d7e]">
        <FcGoogle />
        <button onClick={handleGoogleLogIn} className="py-2">Google</button>
      </div>
    </div>
  );
};

export default GoogleSignIn;

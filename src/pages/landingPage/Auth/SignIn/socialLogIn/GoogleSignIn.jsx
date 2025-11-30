import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

// Context & Hooks
import { AuthContext } from "../../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

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
        email: result.user?.email.toLowerCase(), 
        role: role,
      };
  
      let userExists = false;
      let data = null; // Define data here
  
      try {
        const response = await axiosPublic.get(`/users/${userInfo.email}`);
        data = response.data; // Store the response data
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
          navigate(data.role === "parent" ? "/parentDashBoard/dashBoardPage" : "/tutorDashBoard", { replace: true });
        }, 1000);
      } else {
        await axiosPublic.post("/users", userInfo);
        toast.success("Sign Up successful! Redirecting...");
        setTimeout(() => {
          navigate(role === "parent" ? "/parentDashBoard/dashBoardPage" : "/tutorDashBoard", { replace: true });
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

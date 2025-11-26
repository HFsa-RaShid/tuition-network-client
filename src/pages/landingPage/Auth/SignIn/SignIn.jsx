import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import toast from "react-hot-toast";
import signInImage from "../../../../assets/tutor-student.png";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import logo from "../../../../assets/logo.png";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    let loginId = form.loginId.value; // email or phone
    const password = form.password.value;

    try {
      // Check if input is phone
      const isPhone = /^[0-9]{11}$/.test(loginId);

      if (isPhone) {
        // fetch email by phone
        const res = await axiosPublic.get(`/find-email-by-phone/${loginId}`);
        loginId = res.data.email; // converted to email
      }

      // Firebase login with found email
      const result = await signInUser(loginId, password);

      // get user data
      const userRes = await axiosPublic.get(`/users/${result.user.email}`);
      const loggedUser = userRes.data;

      if (loggedUser?.banned === "yes") {
        toast.error("Your account has been banned.");
        return;
      }

      toast.success("Successfully Signed In!");
      // If user was redirected here, go back to the original page
      const returnTo = location.state?.from;
      if (returnTo) {
        // support both location objects and simple path strings
        const toPath = returnTo?.pathname || returnTo;
        navigate(toPath);
      } else {
        navigate(`/${loggedUser.role}/dashboard`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid login credentials.");
      form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>Sign_In | TuToria</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row w-4/5 max-w-5xl  my-2 overflow-hidden gap-2 lg:gap-20 p-2 md:p-6">
        {/* Left Image Section */}
        <img
          src={signInImage}
          className="w-full lg:w-1/2 h-80 mt-2 lg:mt-6 object-contain"
        />

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 px-4 md:px-14 py-6 bg-white">
          <div className="mb-2 flex justify-center">
            <img src={logo} alt="Logo" className="w-9 h-9 rounded-md" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome <span className="text-[#123d7e]">Back</span>
          </h2>
          <p className="text-gray-500 text-center">
            Sign in to Continue your Journey.
          </p>

          {/* Sign In Form */}
          <form className="mt-4" onSubmit={handleSignIn}>
            <label className="block text-gray-700">
              Email or Phone<span className="text-red-600">*</span>
            </label>
            {/* <input
              type="email"
              name="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              required
            /> */}
            <input
              type="text"
              name="loginId"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter email or phone"
              required
            />

            <label className="block text-gray-700 mt-2">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 border rounded mt-1 pr-10"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-200 mb-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 font-semibold shadow"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-4 text-[14px] text-gray-700">
            New to TuitionNetwork? Please{" "}
            <Link
              to="/signup"
              className="text-blue-700 underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

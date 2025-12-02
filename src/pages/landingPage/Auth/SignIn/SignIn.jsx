
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

// Context & Hooks
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

// Assets
import signInImage from "../../../../assets/tutor-student.png";
import logo from "../../../../assets/logo.png";
import authBg from "../../../../assets/auth1.png";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    let loginId = form.loginId.value;
    const password = form.password.value;

    try {
      const isPhone = /^[0-9]{11}$/.test(loginId);

      if (isPhone) {
        const res = await axiosPublic.get(`/find-email-by-phone/${loginId}`);
        loginId = res.data.email;
      }

      const result = await signInUser(loginId, password);
      const userRes = await axiosPublic.get(`/users/${result.user.email}`);
      const loggedUser = userRes.data;

      if (loggedUser?.banned === "yes") {
        toast.error("Your account has been banned.");
        return;
      }

      toast.success("Successfully Signed In!");

      const returnTo = location.state?.from;
      if (returnTo) {
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
    <div
      className="min-h-screen  w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${authBg})`,
         backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Helmet>
        <title>Sign_In | TuToria</title>
      </Helmet>

      {/* Glassmorphism Container */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 p-6 
    backdrop-blur-sm bg-white/5 border border-white/30 rounded-2xl shadow-2xl">


        {/* Left image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={signInImage}
            className="w-80 lg:w-[420px] drop-shadow-2xl"
            alt=""
          />
        </div>

        {/* Right form */}
        <div className="w-full lg:w-1/2 text-black">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-md" />
          </div>

          <h2 className="text-3xl text-black font-semibold text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-800">Sign in to continue your journey.</p>

          <form className="mt-6 text-black" onSubmit={handleSignIn}>
            <label className="block font-medium">
              Email or Phone <span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              name="loginId"
              className="w-full px-3 py-2 rounded-lg mt-1 bg-blue-300/70 text-white
                         placeholder-white/90 border border-white/30 focus:outline-none"
              placeholder="Enter email or phone"
              required
            />

            <label className="block mt-4 font-medium">
              Password <span className="text-red-300">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 rounded-lg mt-1 bg-blue-300/70 text-white
                         placeholder-white/90 border border-white/30 focus:outline-none pr-12"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 cursor-pointer text-white"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            

            <button
              type="submit"
              className="w-full mt-6 btn-primary  font-semibold "
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-4 text-black">
            New to TuToria?{" "}
            <Link to="/signup" className="text-blue-800 underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

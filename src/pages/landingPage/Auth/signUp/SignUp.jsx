import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

// Context & Hooks
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

// Assets
import tutorImage from "../../../../assets/tutorAuth.png";
import studentImage from "../../../../assets/parentauth1.png";
import logo from "../../../../assets/logo.png";
import authBg from "../../../../assets/auth1.png";

const SignupPage = () => {
  const [userType, setUserType] = useState("student");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      await axiosPublic.post("/send-verification", {
        email: data.email,
        phone: data.phone,
      });

      toast.success("Verification code sent to your email!");

      navigate("/verify-email", {
        state: {
          userData: data,
          role: userType,
          from: location.state?.from || null,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      <Helmet>
        <title>Sign_Up | TuToria</title>
      </Helmet>

      {/* Glassmorphism Container */}

      <div
        className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 p-6 
    backdrop-blur-sm bg-white/15 border border-white/30 rounded-2xl shadow-2xl"
      >
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex justify-center relative z-10">
          <img
            src={userType === "student" ? studentImage : tutorImage}
            alt="Signup Visual"
            className="w-80 lg:w-[360px] drop-shadow-2xl rounded-xl"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 text-white relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-xl shadow-md"
            />
          </div>

          <h2 className="text-3xl font-semibold text-center text-black">
            Create an Account
          </h2>
          <p className="text-center text-gray-800 mb-4">
            Let's get started on a new journey!
          </p>

          {/* User Type Selection */}
          <div className="flex gap-4 my-4">
            {["student", "tutor"].map((role) => (
              <div
                key={role}
                className={`
                  cursor-pointer border px-3 py-2 rounded-lg w-1/2 text-center backdrop-blur-sm
                  ${
                    userType === role
                      ? "bg-gradient-to-r from-blue-300 to-blue-500"
                      : "border-blue-400 bg-white/10"
                  }
                `}
                onClick={() => setUserType(role)}
              >
                <p className="font-semibold capitalize text-white">{role}</p>
              </div>
            ))}
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name*"
              className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black placeholder-white/90 border border-white/30 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-300 text-sm">{errors.name.message}</p>
            )}

            <input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              placeholder="Phone*"
              className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black  placeholder-white/90 border border-white/30 focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-300 text-sm">{errors.phone.message}</p>
            )}

            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email*"
              className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black  placeholder-white/90 border border-white/30 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-300 text-sm">Valid email required</p>
            )}

            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black  placeholder-white/90 border border-white/30 focus:outline-none pr-12"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-300 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 btn-primary font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center mt-4 text-black">
              Already have an account?{" "}
              <Link
                to="/signIn"
                className="text-blue-800 underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

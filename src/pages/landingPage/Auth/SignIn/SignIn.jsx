
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleSignIn from "./socialLogIn/GoogleSignIn";
import { AuthContext } from "../../../../provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import tutorImage from "../../../../assets/tutor-student.png";
import parentImage from "../../../../assets/parentauth.jpg";

const SignIn = () => {
  const [role, setRole] = useState("parent");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      const res = await axiosPublic.get(`/users/${result.user.email}`);
      const userRole = res.data?.role;

      if (userRole) {
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate(userRole === "parent" ? "/parentDashBoard" : "/tutorDashBoard", { replace: true });
        }, 500);
      } else {
        toast.error("User role not found. Contact support.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 max-w-5xl  my-2 overflow-hidden gap-20 p-6">
        {/* Left Image Section */}
        <div className="w-1/2 flex items-center justify-center  p-8">
          <img
            src={role === "parent" ? parentImage : tutorImage}
            alt={role === "parent" ? "Parent or Student" : "Tutor"}
            className="w-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 px-14 py-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome <span className="text-[#123d7e]">Back</span>
          </h2>
          <p className="text-gray-500 text-center">Sign in to Continue your Journey.</p>

          {/* Role Selection */}
          <div className="flex justify-center mt-4">
            <button
              className={`p-3 border rounded-l-lg w-1/2 ${
                role === "parent" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setRole("parent")}
            >
              Parents Or Student
            </button>
            <button
              className={`p-3 border rounded-r-lg w-1/2 ${
                role === "tutor" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setRole("tutor")}
            >
              Tutor
            </button>
          </div>

          {/* Sign In Form */}
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700">Email<span className="text-red-600">*</span></label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label className="block text-gray-700 mt-2">Password<span className="text-red-600">*</span></label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-[#123d7e] text-xl py-2 font-semibold">
              Sign In
            </button>
          </form>

          <div className="text-center mt-2 text-gray-500">──────── Or ────────</div>
          <GoogleSignIn role={role} />
          <p className="text-center mt-4 text-[14px] text-gray-700">
            New to TuitionNetwork? Please <Link to="/signup" className="text-blue-700 underline font-semibold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../../../../provider/AuthProvider";

import logo from "../../../../assets/logo.png";
import heroIllustration from "../../../../assets/tutorAuth.png";
import authBg from "../../../../assets/auth1.png";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(signInUser?.email);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }) => {
  try {
    const user = await signInUser(email.trim(), password); // <-- get user with role
    toast.success("Welcome back!");
    reset();

    // Role-based redirection
    const redirectTo =
      location.state?.from?.pathname || `/${currentUser.role}/dashboard`;
    navigate(redirectTo, { replace: true });
  } catch (error) {
    const message =
      error?.message?.replace("Firebase: ", "") || "Failed to sign in";
    toast.error(message);
  }
};

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <Helmet>
        <title>Sign_In | TuToria</title>
      </Helmet>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 p-6 backdrop-blur-md bg-white/15 border border-white/30 rounded-2xl shadow-2xl">
        <div className="w-full lg:w-1/2 flex justify-center relative z-10">
          <img
            src={heroIllustration}
            alt="Sign in visual"
            className="w-80 lg:w-[360px] drop-shadow-2xl rounded-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 text-white relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="TuToria logo"
              className="w-12 h-12 rounded-xl shadow-md"
            />
          </div>

          <h2 className="text-3xl font-semibold text-center text-black">
            Welcome Back
          </h2>
          <p className="text-center text-gray-800 mb-6">
            Sign in to continue learning
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-black">
                Email or Phone
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black placeholder-white/90 border border-white/30 focus:outline-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 rounded-lg bg-blue-300/70 text-black placeholder-white/90 border border-white/30 focus:outline-none pr-12"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-2.5 text-white"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 btn-primary font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-black">
            New to TuToria?{" "}
            <Link to="/signUp" className="text-blue-800 underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

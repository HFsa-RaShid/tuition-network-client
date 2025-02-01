import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./socialLogIn/GoogleSignIn";
import ContactSection from "../../sections/contact/ContactSection";

const SignIn = () => {
  const [role, setRole] = useState("parent");

  return (
   <div>
     <ContactSection></ContactSection>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="flex w-4/5 max-w-4xl bg-white my-8  overflow-hidden">
        {/* Left Image Section */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8">
          {role === "parent" ? (
            <img
              src="/parent-student.png"
              alt="Parent or Student"
              className="w-full"
            />
          ) : (
            <img src="/tutor.png" alt="Tutor" className="w-full" />
          )}
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome <span className="text-green-500">Back</span>
          </h2>
          <p className="text-gray-500 text-center">
            Sign in to Continue your Journey.
          </p>

          {/* Role Selection */}
          <div className="flex justify-center mt-4">
            <button
              className={`p-3 border rounded-l-lg w-1/2 ${
                role === "parent" ? "bg-green-500 text-white" : "bg-white"
              }`}
              onClick={() => setRole("parent")}
            >
              Parents Or Student
            </button>
            <button
              className={`p-3 border rounded-r-lg w-1/2 ${
                role === "tutor" ? "bg-green-500 text-white" : "bg-white"
              }`}
              onClick={() => setRole("tutor")}
            >
              Tutor
            </button>
          </div>

          {/* Sign In Form */}
          <form className="mt-3">
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
            />

            <label className="block text-gray-700 mt-4">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
            />

            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-black text-xl py-2">
              Sign In
            </button>
          </form>

          <div className="text-center mt-2 text-gray-500">
            ──────── Or ────────
          </div>
          <GoogleSignIn></GoogleSignIn>
          <p className="text-center mt-4 text-[14px] text-gray-700">
            New to TuitionNetwork? Please{" "}
            <Link to="/signup">
              <button className="text-blue-700 underline font-bold">
                Sign Up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;



import { useState } from "react";
import { Link } from "react-router-dom";


const SignupPage = () => {
  const [userType, setUserType] = useState("parent");

  return (
   
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="flex w-4/5 max-w-5xl my-8 ">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
          {userType === "parent" ? (
            <img src="/parent-image.png" alt="Parent and Student" className="w-72" />
          ) : (
            <img src="/tutor-image.png" alt="Tutor" className="w-72" />
          )}
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 bg-white px-10 py-6">
          <h2 className="text-3xl font-bold text-blue-500">Create an Account</h2>
          <p className="text-gray-600">Let's get started on a new journey!</p>

          {/* User Type Selection */}
          <div className="flex gap-4 my-4">
            <div
              className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                userType === "parent" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("parent")}
            >
              <p className="font-medium">Parents Or Student</p>
              <p className="text-xs text-gray-500">Looking for a tutor? Tap here!</p>
            </div>
            <div
              className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                userType === "tutor" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("tutor")}
            >
              <p className="font-medium">Tutor</p>
              <p className="text-xs text-gray-500">Looking for tuition jobs? Tap here!</p>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4 bg-white">
            <input type="text" placeholder="Name*" className="w-full border p-2 rounded-md" required />
            <input type="tel" placeholder="Phone*" className="w-full border p-2 rounded-md" required />
            <input type="email" placeholder="Email*" className="w-full border p-2 rounded-md" />
            <input type="password" placeholder="Password*" className="w-full border p-2 rounded-md" required />
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="male" className="mr-1" /> Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="female" className="mr-1" /> Female
              </label>
            </div>
            
           
            
            {/* Submit Button */}
            <button className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-black text-xl py-2">Sign Up</button>
            <p className="text-center mt-4 text-[14px] text-gray-700">
            Already have an account? Please{" "}
            <Link to="/signIn">
              <button className="text-blue-700 underline font-semibold">
                Sign In
              </button>
            </Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  
  );
};

export default SignupPage;
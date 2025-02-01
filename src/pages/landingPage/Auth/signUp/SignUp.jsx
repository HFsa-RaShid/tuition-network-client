// import React from "react";
// import Tutor from "./Tutor/Tutor";
// import StudentParent from "./StudentParent/StudentParent";

// const SignUp = () => {
//   return (
//     <div>
//       <button>Tutor</button>
//       <button>Parent/Student</button>
//       <Tutor></Tutor>
//       <StudentParent></StudentParent>
//     </div>
//   );
// };

// export default SignUp;


import { useState } from "react";

const SignupPage = () => {
  const [userType, setUserType] = useState("parent");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-wrap w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {userType === "parent" ? (
            <img src="/parent-image.png" alt="Parent and Student" className="w-72" />
          ) : (
            <img src="/tutor-image.png" alt="Tutor" className="w-72" />
          )}
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-green-600">Create an Account</h2>
          <p className="text-gray-600">Let's get started on a new journey!</p>

          {/* User Type Selection */}
          <div className="flex gap-4 my-4">
            <div
              className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                userType === "parent" ? "border-green-500 bg-green-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("parent")}
            >
              <p className="font-medium">Parents Or Student</p>
              <p className="text-xs text-gray-500">Looking for a tutor? Tap here!</p>
            </div>
            <div
              className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                userType === "tutor" ? "border-green-500 bg-green-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("tutor")}
            >
              <p className="font-medium">Tutor</p>
              <p className="text-xs text-gray-500">Looking for tuition jobs? Tap here!</p>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full border p-2 rounded-md" required />
            <input type="tel" placeholder="Phone" className="w-full border p-2 rounded-md" required />
            <input type="email" placeholder="Email" className="w-full border p-2 rounded-md" />
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="male" className="mr-1" /> Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="female" className="mr-1" /> Female
              </label>
            </div>
            <input type="password" placeholder="Password" className="w-full border p-2 rounded-md" required />
            <input type="password" placeholder="Re-Password" className="w-full border p-2 rounded-md" required />
            
            {/* Submit Button */}
            <button className="w-full p-2 bg-black text-white rounded-md">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
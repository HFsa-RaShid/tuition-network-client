
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../provider/AuthProvider";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [userType, setUserType] = useState("student");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      console.log(result.user);
  
      // Update user profile
      await updateUserProfile(data.name);
  
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        gender: data.gender,
        role: userType, 
      };
  
      const res = await axiosPublic.post('/users', userInfo);
  
      if (res.data.insertedId) {
        toast.success('Account created successfully!');
        setTimeout(() => {
         navigate(`/dashBoard/${userType}`); 
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during registration. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 max-w-5xl my-8">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
          <img
            src={userType === "student" ? "/parent-image.png" : "/tutor-image.png"}
            alt={userType === "student" ? "Parent and Student" : "Tutor"}
            className="w-72"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 bg-white px-10 py-6">
          <h2 className="text-3xl font-bold text-[#123d7e]">Create an Account</h2>
          <p className="text-gray-600">Let's get started on a new journey!</p>

          {/* User Type Selection */}
          <div className="flex gap-4 my-4">
            {["student", "tutor"].map((role) => (
              <div
                key={role}
                className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                  userType === role ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => setUserType(role)}
              >
                <p className="font-medium">{role === "student" ? "Parents Or Student" : "Tutor"}</p>
                <p className="text-xs text-gray-500">
                  {role === "student" ? "Looking for a tutor? Tap here!" : "Looking for tuition jobs? Tap here!"}
                </p>
              </div>
            ))}
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name*"
              className="w-full border p-2 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input
              {...register("phone", { required: "Phone number is required" })}
              type="tel"
              placeholder="Phone*"
              className="w-full border p-2 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <input
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+\.\S+$/ })}
              type="email"
              placeholder="Email*"
              className="w-full border p-2 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">Valid email required</p>}

            <input
              {...register("password", { required: "Password is required", minLength: 6 })}
              type="password"
              placeholder="Password*"
              className="w-full border p-2 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

            {/* Gender Selection */}
            <div className="flex gap-4">
              <label className="flex items-center">
                <input {...register("gender")} type="radio" value="male" className="mr-1" /> Male
              </label>
              <label className="flex items-center">
                <input {...register("gender")} type="radio" value="female" className="mr-1" /> Female
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-black text-xl py-2">
              Sign Up
            </button>

            <p className="text-center mt-4 text-[14px] text-gray-700">
              Already have an account?{" "}
              <Link to="/signIn">
                <button className="text-blue-700 underline font-semibold">Sign In</button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

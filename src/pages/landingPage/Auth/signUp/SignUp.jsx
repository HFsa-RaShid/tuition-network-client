
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../provider/AuthProvider";
import tutorImage from "../../../../assets/tutor-student.png";
import studentImage from "../../../../assets/parentauth.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

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
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      // ✅ Upload NID/Student ID image to imgbb
      const imageFile = new FormData();
      imageFile.append("image", data.idImage[0]);

      const uploadRes = await fetch(imageHostingApi, {
        method: "POST",
        body: imageFile,
      });
      const imgData = await uploadRes.json();
      const NidImageURL = imgData.data.display_url;

      // ✅ Create user in Firebase
      const result = await createUser(data.email, data.password);
      // console.log(result.user);

      // ✅ Update Firebase profile with default avatar
      await updateUserProfile(
        data.name,
        "https://i.ibb.co.com/SXLvbnWL/manpp.png"
      );

      // ✅ Prepare user info for database
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: userType,
        profileStatus: "Free",
        banned: "no",
        photoURL: "https://i.ibb.co.com/SXLvbnWL/manpp.png",
        NidImage: NidImageURL,
      };

      const tutorInfo = {
        name: data.name,
        email: data.email,
        role: userType,
        profileStatus: "Free",
        banned: "no",
        photoURL: "https://i.ibb.co.com/SXLvbnWL/manpp.png",
        NidImage: NidImageURL,
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (userType === "tutor") {
        await axiosPublic.post("/tutors", tutorInfo);
      }

      if (res.data.insertedId) {
        // toast.success("Account created successfully!");
        toast.success("Successfully Signed Up!!!");
          navigate(`/${userType}/dashboard`);
        
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error during registration. Please try again.");
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>Sign_Up | TiToria</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row w-4/5 max-w-5xl my-2 lg:my-8">
        {/* Left Section - Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100 p-8">
          <img
            src={userType === "student" ? studentImage : tutorImage}
            alt={userType === "student" ? "Parent and Student" : "Tutor"}
            className="h-80"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 bg-white px-4 lg:px-10 py-4 lg:py-6">
          <h2 className="text-3xl font-bold text-[#123d7e]">
            Create an Account
          </h2>
          <p className="text-gray-600">Let's get started on a new journey!</p>

          {/* User Type Selection */}
          <div className="flex gap-4 my-4">
            {["student", "tutor"].map((role) => (
              <div
                key={role}
                className={`cursor-pointer border p-2 rounded-md w-1/2 text-center ${
                  userType === role
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                }`}
                onClick={() => setUserType(role)}
              >
                <p className="font-medium">
                  {role === "student" ? "Parents Or Student" : "Tutor"}
                </p>
                <p className="text-xs text-gray-500">
                  {role === "student"
                    ? "Looking for a tutor? Tap here!"
                    : "Looking for tuition jobs? Tap here!"}
                </p>
              </div>
            ))}
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white"
          >
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name*"
              className="w-full border p-2 rounded-md"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              {...register("phone", { required: "Phone number is required" })}
              type="tel"
              placeholder="Phone*"
              className="w-full border p-2 rounded-md"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+\.\S+$/,
              })}
              type="email"
              placeholder="Email*"
              className="w-full border p-2 rounded-md"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Valid email required</p>
            )}

            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                className="w-full border p-2 rounded-md pr-10"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            {/* ✅ NID Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload NID *
              </label>
              <input
                {...register("idImage", { required: "NID image is required" })}
                type="file"
                accept="image/*"
                className="w-full border  rounded-md"
                required
              />
              {errors.NidImage && (
                <p className="text-red-500 text-sm">{errors.NidImage.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-200 mb-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 font-semibold shadow"
            >
              Sign Up
            </button>

            <p className="text-center mt-4 text-[14px] text-gray-700">
              Already have an account?{" "}
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

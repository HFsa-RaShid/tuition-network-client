
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { FaEdit } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ProfileDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);
  const [imagePreview, setImagePreview] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [step, setStep] = useState(1);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
      setValue("phone", currentUser.phone);
      setValue("gender", currentUser.gender);
      setImagePreview(currentUser?.photoURL);
    }
  }, [currentUser, setValue]);

  // ✅ Handle Image Change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await res.json();
      const photoURL = imgData.data.url;

      // ✅ Update in DB instantly
      await axiosPublic.put(`/users/${user?.email}`, {
        photoURL,
      });

      refetch(); // refresh user data
    } catch (err) {
      console.error("Image upload or update failed", err);
    }
  };


  const onSubmit = async (data) => {
    try {
      await axiosPublic.put(`/users/${user?.email}`, data);
      refetch();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };
  

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row gap-10">
      {/* Left: Image */}
      <div className="w-full md:w-1/3 text-center relative">
        <div className="relative inline-block">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-44 h-44 rounded-full border-4 p-2 border-indigo-500 object-cover"
          />
          <button
            type="button"
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="absolute bottom-6 right-2 bg-white p-1 rounded-full border shadow-md"
          >
            <FaEdit className="text-indigo-600" />
          </button>
        </div>

        {showImageUpload && (
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-[70%] h-8 max-w-xs"
            />
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-xl font-bold">{currentUser?.name}</h2>
          <p>{currentUser?.role || "Student"}</p>
          <p>{currentUser?.isPremium ? "Premium User" : "Free User"}</p>
          <p>Points: {currentUser?.points || 0}</p>
        </div>
      </div>

      {/* Right Side - Multi-step Form */}
      <div className="w-full md:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div>
              <h1 className="text-2xl pb-6 font-semibold">
                Personal Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    {...register("phone", { required: true })}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      Phone number is required
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gender */}
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <input
                    {...register("gender")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your gender"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-medium mb-1">City</label>
                  <input
                    {...register("city")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your city"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block font-medium mb-1">Location</label>
                  <input
                    {...register("location")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your location"
                  />
                </div>

                {/* Religion */}
                <div>
                  <label className="block font-medium mb-1">Religion</label>
                  <input
                    {...register("religion")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your religion"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <h3 className="text-2xl font-semibold pb-6">
                Educational Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current/Highest Education */}
                <div>
                  <label className="block font-medium mb-1">
                    Current/Highest Education
                  </label>
                  <select
                    {...register("education")}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select education level</option>
                    <option value="JSC/Equivalent">JSC/Equivalent</option>
                    <option value="SSC/Equivalent">SSC/Equivalent</option>
                    <option value="HSC/Equivalent">HSC/Equivalent</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                  </select>
                </div>

                {/* Institute */}
                <div>
                  <label className="block font-medium mb-1">Institute</label>
                  <input
                    {...register("institute")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Name of your institute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Group/Department */}
                <div>
                  <label className="block font-medium mb-1">
                    Group/Department
                  </label>
                  <input
                    {...register("department")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="e.g., Science, Arts, CSE"
                  />
                </div>

                {/* GPA / CGPA */}
                <div>
                  <label className="block font-medium mb-1">GPA / CGPA</label>
                  <input
                    {...register("gpa")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="e.g., 4.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Passing Year */}
                <div>
                  <label className="block font-medium mb-1">Passing Year</label>
                  <select
                    {...register("passingYear")}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 26 }, (_, i) => {
                      const year = 2010 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Student ID Image Upload */}
                <div>
                  <label className="block font-medium mb-1">Student ID</label>
                  <input
                    {...register("studentIdPhoto")}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full h-10"
                  />
                </div>
              </div>
            </>
          )}

{step === 3 && (
  <>
    <h3 className="text-2xl font-semibold pb-6">Tuition Related Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Tuition Preference */}
      <div>
        <label className="block font-medium mb-1">Tuition Preference</label>
        <select
          {...register("tuitionPreference")}
          className="select select-bordered w-full"
        >
          <option value="">Select preference</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Expected Salary */}
      <div>
        <label className="block font-medium mb-1">Expected Salary</label>
        <input
          {...register("expectedSalary")}
          type="text"
          className="input input-bordered w-full"
          placeholder="e.g., 5000 BDT/month"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {/* Preferred Class */}
      <div>
        <label className="block font-medium mb-1">Preferred Class</label>
        <input
          {...register("preferredClass")}
          type="text"
          className="input input-bordered w-full"
          placeholder="e.g., Class 6-10"
        />
      </div>

      {/* Preferred Subjects */}
      <div>
        <label className="block font-medium mb-1">Preferred Subjects</label>
        <input
          {...register("preferredSubjects")}
          type="text"
          className="input input-bordered w-full"
          placeholder="e.g., Math, Physics"
        />
      </div>
    </div>

    {/* Available Days */}
    <div>
            <h4 className="font-medium">Select Available Days</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <label key={day} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={day}
                    onChange={() => handleDayChange(day)}
                    className="checkbox"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available Times */}
    <div>
            <h4 className="font-medium">Select Available Times</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              {['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'].map((time) => (
                <label key={time} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={time}
                    onChange={() => handleTimeChange(time)}
                    className="checkbox"
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

        

         
        </>
)}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              disabled={step === 1}
            >
              Previous
            </button>
            {step < 3 ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep((prev) => Math.min(3, prev + 1))}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;

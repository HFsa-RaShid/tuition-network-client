import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../provider/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";
import subjects from "../../../utils/subjects";
import { RxCross2 } from "react-icons/rx";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const ProfileDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);

  const [imagePreview, setImagePreview] = useState(currentUser?.photoURL || "");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [step, setStep] = useState(1);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [studentIdUrl, setStudentIdUrl] = useState(currentUser?.idImage || "");

  const [tutorStatus, setTutorStatus] = useState(
    currentUser?.tutorStatus || "available"
  );

  const [preferredSubjects, setPreferredSubjects] = useState(
    currentUser?.preferredSubjects?.split(",") || []
  );

  const [preferredClasses, setPreferredClasses] = useState(
    currentUser?.preferredClass?.split(",") || []
  );

  const [preferredCategories, setPreferredCategories] = useState(
    currentUser?.preferredCategories?.split(",") || []
  );

  const [dataPreferredLocations, setDataPreferredLocations] = useState(
    currentUser?.preferredLocations?.split(",") || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name || "");
      setValue("email", currentUser.email || "");
      setValue("phone", currentUser.phone || "");
      setValue("gender", currentUser.gender || "");
      setValue("city", currentUser.city || "");
      setValue("location", currentUser.location || "");
      setValue("religion", currentUser.religion || "");
      setValue("education", currentUser.education || "");
      setValue("institute", currentUser.institute || "");
      setValue("department", currentUser.department || "");
      setValue("gpa", currentUser.gpa || "");
      setValue("passingYear", currentUser.passingYear || "");
      setValue("tutorType", currentUser.tutorType || "");
      setValue("tuitionArea", currentUser.tuitionArea || "");
      setValue("preferredSubjects", currentUser.preferredSubjects || "");
      setValue("expectedSalary", currentUser.expectedSalary || "");
      setValue("tuitionPreference", currentUser.tuitionPreference || "");
      setValue("preferredClass", currentUser.preferredClass || "");
      setValue("idImage", currentUser?.idImage || "");
      setStudentIdUrl(currentUser?.idImage || "");
      setAvailableDays(currentUser.availableDays || []);
      setAvailableTimes(currentUser.availableTimes || []);
    }
  }, [currentUser, setValue]);

  const categories = [
    "Bangla Medium",
    "English Version",
    "English Medium",
    "Madrasah",
  ];

  const classes = [
    "Play",
    "Nursery",
    "KG",
    ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
    "class 11",
    "Class 12",
    "Honours",
    "Masters",
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();
      const photoURL = imgData.data.url;

      await axiosSecure.put(`/users/${currentUser?.email}`, { photoURL });
      await axiosSecure.put(`/tutors/${currentUser?.email}`, { photoURL });
      refetch();
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const updatedData = {
  //       ...data,
  //       preferredSubjects: preferredSubjects.join(","),
  //       preferredClass: preferredClasses.join(","),
  //       preferredCategories: preferredCategories.join(","),
  //       preferredLocations: dataPreferredLocations.join(","),
  //       availableDays,
  //       availableTimes,
  //       idImage: data.idImage,
  //       tutorStatus,
  //     };

  //   await axiosSecure.put(`/users/${currentUser?.email}`, updatedData);
  //     await axiosSecure.put(`/tutors/${currentUser?.email}`, updatedData);
  //     refetch();
  //     toast.success("Profile updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to update profile!");
  //   }
  // };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      preferredSubjects: preferredSubjects.join(","),
      preferredClass: preferredClasses.join(","),
      preferredCategories: preferredCategories.join(","),
      preferredLocations: dataPreferredLocations.join(","),
      availableDays,
      availableTimes,
      tutorStatus,
      idImage: data.idImage || currentUser?.idImage, // ✅ fallback to old one
    };

    try {
      await axiosSecure.put(`/users/${currentUser?.email}`, payload);
      await axiosSecure.put(`/tutors/${currentUser?.email}`, payload);

      toast.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

 
  const handleStudentIdChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        { method: "POST", body: formData }
      );

      const imgData = await res.json();
      const imageUrl = imgData?.data?.url;

      if (imageUrl) {
        setStudentIdUrl(imageUrl);
        setValue("idImage", imageUrl);

        await axiosSecure.put(`/users/${currentUser?.email}`, {
          idImage: imageUrl,
        });
        await axiosSecure.put(`/tutors/${currentUser?.email}`, {
          idImage: imageUrl,
        });

        refetch();
        toast.success("ID Image updated successfully!");
      }
    } catch (err) {
      console.error("Student ID image upload failed:", err);
      toast.error("Failed to upload ID Image!");
    }
  };

  // Handle day selection
  const handleDayChange = (day) => {
    setAvailableDays((prevDays) => {
      if (prevDays.includes(day)) {
        // Remove day if it's already selected
        return prevDays.filter((selectedDay) => selectedDay !== day);
      } else {
        // Add day if not already selected
        return [...prevDays, day];
      }
    });
  };

  // Handle time selection
  const handleTimeChange = (time) => {
    setAvailableTimes((prevTimes) => {
      if (prevTimes.includes(time)) {
        // Remove time if it's already selected
        return prevTimes.filter((selectedTime) => selectedTime !== time);
      } else {
        // Add time if not already selected
        return [...prevTimes, time];
      }
    });
  };

  // Step 1 fields
  const step1Fields = watch([
    "name",
    "phone",
    "gender",
    "city",
    "location",
    "religion",
  ]);
  const isStep1Valid = step1Fields.every((field) => field && field !== "");

  // Step 2 fields
  // const step2Fields = watch([
  //   "education",
  //   "institute",
  //   "department",
  //   "gpa",
  //   "passingYear",
  //   "tutorType",
  //   "studentIdImage",
  // ]);
  const isStep2Valid =
    watch("education") &&
    watch("institute") &&
    watch("department") &&
    watch("gpa") &&
    watch("passingYear") &&
    watch("tutorType");
  currentUser.idImage;

  // const isStep2Valid = step2Fields.every((field) => field && field !== "");

  // Step 3 fields
  const isStep3Valid =
    watch("tuitionPreference") &&
    watch("expectedSalary") &&
    preferredCategories.length > 0 &&
    preferredClasses.length > 0 &&
    preferredSubjects.length > 0;

  // Step 4 fields
  const isStep4Valid =
    dataPreferredLocations.length > 0 &&
    availableDays.length > 0 &&
    availableTimes.length > 0;

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-6 flex flex-col md:flex-row gap-10">
      {/* Left Side - Profile Image and Info */}
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

      {/* Right Side - Multi-Step Form */}
      <div className="w-full md:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          {/* Step 1 - Personal Info */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold pb-6">Personal Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Name</label>
                  <input
                    {...register("name", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    {...register("phone", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.phone && (
                    <span className="text-red-500">Phone is required</span>
                  )}
                </div>
                {/* Gender */}
                <div>
                  <label>Gender</label>
                  <select
                    {...register("gender", { required: true })}
                    className="select select-bordered w-full"
                    //defaultValue={currentUser?.gender || ""}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-500">Gender is required</span>
                  )}
                </div>

                 {/* Religion */}
                <div>
                  <label>Religion</label>
                  <select
                    {...register("religion", { required: true })}
                    className="select select-bordered w-full"
                    //defaultValue={currentUser?.religion || ""}
                  >
                    <option value="">Select Religion</option>
                    <option value="Islam">Islam</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.religion && (
                    <span className="text-red-500">Religion is required</span>
                  )}
                </div>

                <div>
                  <label>City</label>
                  <select
                    {...register("city")}
                    className="input input-bordered w-full"
                    onChange={(e) => {
                      setValue("city", e.target.value);
                      setValue("location", ""); // Reset location when city changes
                    }}
                    //defaultValue={currentUser?.city || ""}
                  >
                    <option value="">Select a City</option>
                    {bdDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Location / Area</label>
                  <select
                    {...register("location")}
                    className="input input-bordered w-full"
                    disabled={!watch("city")}
                    //defaultValue={currentUser?.location || ""}
                  >
                    <option value="">Select an Area</option>
                    {cityAreaMap[watch("city")]?.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

               

                
              </div>
              {/* Tutor Type */}
              <div>
                <label className="block font-medium ">Tutor Type</label>
                <select
                  {...register("tutorType")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select </option>
                  <option value="Government Institution">Govt. Employee</option>
                  <option value="Private Institution">Private Employee</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="University Student">University Student</option>

                  <option value="College Student">College Student</option>
                </select>
              </div>
            </>
          )}

          {/* Step 2 - Educational Info */}

          {step === 2 && (
            <>
              <h3 className="text-2xl font-semibold pb-6">
                Educational Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    })}{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  <label className="block font-medium mb-1">
                    Update NID/ Student ID
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleStudentIdChange}
                  />
                  {studentIdUrl && (
                    <img
                      src={studentIdUrl}
                      alt="Student ID"
                      className="mt-2 w-60 h-24 border rounded object-cover"
                    />
                  )}
                </div>
              </div>{" "}
            </>
          )}

          {/* Step 3 - Tuition Info */}
          {step === 3 && (
            <>
              <h3 className="text-2xl font-semibold pb-4">
                Tuition Preference Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tuition Preference */}
                <div>
                  <label className="block font-medium ">
                    Tuition Preference
                  </label>
                  <select
                    {...register("tuitionPreference")}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select preference</option>
                    <option value="Home">Home Tutoring </option>
                    <option value="Online">Online Tutoring</option>
                    <option value="Online & Home">Online & Home</option>
                  </select>
                </div>

                {/* Expected Salary */}
                <div>
                  <label className="block font-medium ">Expected Salary</label>
                  <input
                    {...register("expectedSalary")}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="e.g., 5000 BDT/month"
                  />
                </div>
              </div>

              {/* Preferred Categories */}
              <div>
                <label className="block font-medium ">
                  Preferred Categories
                </label>
                <select
                  name="categories"
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    if (
                      selectedCategory &&
                      !preferredCategories.includes(selectedCategory)
                    ) {
                      setPreferredCategories([
                        ...preferredCategories,
                        selectedCategory,
                      ]);
                    }
                  }}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {preferredCategories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 bg-purple-200 mb-2 text-purple-700 rounded-full flex items-center gap-2"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() =>
                          setPreferredCategories(
                            preferredCategories.filter((c) => c !== cat)
                          )
                        }
                        className="text-white font-bold"
                      >
                        <RxCross2 />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Class */}
              <div>
                <label className="block font-medium ">Preferred Class</label>
                <select
                  name="classes"
                  onChange={(e) => {
                    const selectedClass = e.target.value;
                    if (
                      selectedClass &&
                      !preferredClasses.includes(selectedClass)
                    ) {
                      setPreferredClasses([...preferredClasses, selectedClass]);
                    }
                  }}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {preferredClasses.map((cls) => (
                    <span
                      key={cls}
                      className="px-3 bg-blue-200 mb-2 text-blue-700 rounded-full flex items-center gap-2"
                    >
                      {cls}
                      <button
                        type="button"
                        onClick={() =>
                          setPreferredClasses(
                            preferredClasses.filter((c) => c !== cls)
                          )
                        }
                        className="text-white font-bold"
                      >
                        <RxCross2 />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Subjects */}
              <div>
                <label className="block font-medium ">Preferred Subjects</label>
                <select
                  name="subjects"
                  onChange={(e) => {
                    const selectedSubject = e.target.value;
                    if (
                      selectedSubject &&
                      !preferredSubjects.includes(selectedSubject)
                    ) {
                      setPreferredSubjects([
                        ...preferredSubjects,
                        selectedSubject,
                      ]);
                    }
                  }}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {preferredSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 bg-blue-200 mb-2 text-blue-700 rounded-full flex items-center gap-2"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() =>
                          setPreferredSubjects(
                            preferredSubjects.filter((s) => s !== subject)
                          )
                        }
                        className="text-white font-bold"
                      >
                        <RxCross2 />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 4 - Availability Info */}

          {step === 4 && (
            <>
              <h3 className="text-2xl font-semibold pb-6">
                Availability Information
              </h3>
              {/* Preferred Locations */}
              <div>
                <label className="block font-medium mb-1">
                  Preferred Locations
                </label>
                <select
                  name="preferredLocations"
                  onChange={(e) => {
                    const selectedLocation = e.target.value;
                    if (
                      selectedLocation &&
                      !dataPreferredLocations.includes(selectedLocation)
                    ) {
                      setDataPreferredLocations([
                        ...dataPreferredLocations,
                        selectedLocation,
                      ]);
                    }
                  }}
                  className="w-full p-2 border rounded mb-2"
                  disabled={!watch("city")}
                >
                  <option value="">Select Location</option>
                  {cityAreaMap[watch("city")]?.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>

                {/* Selected Location Badges */}
                <div className="flex flex-wrap gap-2 ">
                  {dataPreferredLocations.map((loc) => (
                    <span
                      key={loc}
                      className="px-3 py-1 bg-blue-200 mb-2 text-blue-700 rounded-full flex items-center gap-2"
                    >
                      {loc}
                      <button
                        type="button"
                        onClick={() =>
                          setDataPreferredLocations(
                            dataPreferredLocations.filter((l) => l !== loc)
                          )
                        }
                        className="text-white font-bold"
                      >
                        <RxCross2 />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                {/* Available Days */}
                <div>
                  <h4 className="font-medium">Select Available Days</h4>
                  <div className="flex flex-wrap gap-4 text-xs">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <label
                          key={day}
                          className="inline-flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={day}
                            {...register("availableDays", {
                              setValueAs: (value) => value,
                            })}
                            checked={availableDays.includes(day)}
                            onChange={() => handleDayChange(day)} // Function to handle day change
                            className="checkbox"
                          />
                          <span>{day}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Available Times */}
                <div>
                  <h4 className="font-medium">Select Available Times</h4>
                  <div className="flex flex-wrap gap-4 text-xs">
                    {[
                      "8 AM",
                      "9 AM",
                      "10 AM",
                      "11 AM",
                      "12 PM",
                      "1 PM",
                      "2 PM",
                      "3 PM",
                      "4 PM",
                      "5 PM",
                      "6 PM",
                      "7 PM",
                      "8 PM",
                      "9 PM",
                      "10 PM",
                    ].map((time) => (
                      <label
                        key={time}
                        className="inline-flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={time}
                          {...register("availableTimes", {
                            setValueAs: (value) => value,
                          })}
                          checked={availableTimes.includes(time)}
                          onChange={() => handleTimeChange(time)}
                          className="checkbox"
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-20">
                  <h4 className="font-medium mb-2">Tutor Availability</h4>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="available"
                        checked={tutorStatus === "available"}
                        onChange={(e) => setTutorStatus(e.target.value)}
                        className="radio"
                      />
                      <span>Available</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="unavailable"
                        checked={tutorStatus === "unavailable"}
                        onChange={(e) => setTutorStatus(e.target.value)}
                        className="radio"
                      />
                      <span>Unavailable</span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                className="btn"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            {step === 4 ? (
              <button
                type="submit"
                className="btn btn-success text-white"
                disabled={!isStep4Valid}
                onClick={handleSubmit((data) => {
                  onSubmit(data);
                  setStep(1);
                })}
              >
                Complete
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit((data) => {
                  onSubmit(data);
                  setStep(step + 1);
                })}
                className="bg-blue-200 mb-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 shadow"
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid) ||
                  (step === 3 && !isStep3Valid)
                }
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;

import React, { useContext, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../../../provider/AuthProvider";
import bdDistricts from "../../../utils/bdDistricts";
import cityAreaMap from "../../../utils/cityAreaMap";
import subjects from "../../../utils/subjects";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const TutorRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading: isUserLoading } = useCurrentUser(user?.email);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tuitionType: "Home Tutoring",
    category: "",
    classCourse: "",
    subjects: [],
    city: "",
    location: "",
    studentGender: "",
    noOfStudents: "1",
    tutorGenderPreference: "Any",
    daysPerWeek: "",
    salary: "",
    duration: "1 hour",
    status: "pending",
  });

  const categories = [
    "Bangla Medium",
    "English Version",
    "English Medium",
    "Madrasah",
  ];

  const studentGender = [
    "Male",
    "Female",
    "Others",
  ];

  const tutorGenderPreference = [
    "Male",
    "Female",
    "Any",
  ];

  const classes = [
    "Play",
    "Nursery",
    "KG",
    ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
    "Class 11",
    "Class 12",
    "BSc/Honours",
    "MSc/Masters",
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    if (selectedSubject && !formData.subjects.includes(selectedSubject)) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, selectedSubject],
      }));
    }
  };

  const removeSubject = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((sub) => sub !== subject),
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to submit a request");
      return;
    }

    if (isUserLoading) {
      toast.error("Loading your profile, please wait");
      return;
    }

    const studentEmail = currentUser?.email || user?.email;
    const studentName =
      currentUser?.name || user?.displayName || user?.email || "";
    const phone =
      currentUser?.phone ||
      currentUser?.guardianPhone ||
      currentUser?.contactNumber ||
      "";

    if (!studentEmail || !studentName || !phone) {
      toast.error(
        "Missing profile details. Please update your name and phone in profile settings."
      );
      return;
    }

    const tutorRequestData = {
      ...formData,
      status: "pending",
      userEmail: user?.email,
      userName: user?.displayName || user?.email,
      postedAt: new Date(),
      studentEmail,
      studentName,
      phone,
      description: formData.description || "",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/tutorRequests", tutorRequestData);
      console.log("Tutor request submitted:", res.data);
      toast.success("Tutor request submitted successfully!");
      // Reset form data and go back to step 1
      setFormData({
        tuitionType: "Home Tutoring",
        category: "",
        classCourse: "",
        subjects: [],
        city: "",
        location: "",
        studentGender: "",
        noOfStudents: "1",
        tutorGenderPreference: "",
        daysPerWeek: "",
        salary: "",
        duration: "1 hour",
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting tutor request:", error);
      const backendMessage =
        error?.response?.data?.errors?.join(", ") ||
        error?.response?.data?.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    }
  };

  const isNextButtonDisabled = () => {
    if (step === 1) {
      return !formData.category || !formData.classCourse;
    }
    if (step === 2) {
      return (
        !formData.city || !formData.location || formData.subjects.length === 0
      );
    }
    if (step === 3) {
      return !formData.noOfStudents || !formData.salary;
    }
    return false;
  };

  return (
    <div className="ml-7">
      <div className="w-full bg-[#F9F9FF] mx-auto mt-12  px-4 py-4 md:px-10 lg:px-20 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Tuition Information
      </h2>

      {step === 1 && (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Tuition Type *</label>
              <select
                name="tuitionType"
                value={formData.tuitionType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Home Tutoring">Home</option>
                <option value="Online Tutoring">Online</option>
                
              </select>
            </div>

            <div>
              <label className="block font-medium">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Class *</label>
              <select
                name="classCourse"
                value={formData.classCourse}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label className="block font-medium">Student Gender *</label>
              <select
                name="studentGender"
                value={formData.studentGender}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {studentGender.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="mt-2 flex justify-end">
            <button
              onClick={nextStep}
              disabled={isNextButtonDisabled()}
              className={`px-4 py-2 bg-[#f9d045]  rounded hover:bg-[#e7bd34] ${
                isNextButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Subjects *</label>
              <select
                name="subjects"
                onChange={handleSubjectChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              <div className="mt-2 flex flex-wrap gap-2">
                {formData.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
                  >
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      className="text-white font-bold"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* City Selection */}
            <div>
              <label className="block font-medium">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prev) => ({
                    ...prev,
                    location: "", 
                  }));
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Select City</option>
                {bdDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Location/Area Selection */}
            <div>
              <label className="block font-medium">Location *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!formData.city}
              >
                <option value="">Select Area</option>
                {formData.city &&
                  cityAreaMap[formData.city]?.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </select>
            </div>
           </div>

            <div>
              <label className="block font-medium">Tutor Gender Preference*</label>
              <select
                name="tutorGenderPreference"
                value={formData.tutorGenderPreference}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {tutorGenderPreference.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-[#124086] text-white rounded hover:bg-[#082755]"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={isNextButtonDisabled()}
              className={`px-4 py-2 bg-[#f9d045]  rounded hover:bg-[#e7bd34] ${
                isNextButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="space-y-2">
            <div>
              <label className="block font-medium">No. of Students *</label>
              <select
                name="noOfStudents"
                value={formData.noOfStudents}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Days/Week *</label>
              <select
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <option key={day} value={day}>
                    {day} Day{day > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Duration *</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="1 hour">1 hour</option>
                <option value="1.5 hour">1.5 hour</option>
                <option value="2 hour">2 hour</option>
                <option value="2.5 hour">2.5 hour</option>
                <option value="3 hour">3 hour</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Salary (BDT) *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-[#124086] text-white rounded hover:bg-[#082755]"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={isNextButtonDisabled()}
              className={`px-4 py-2 bg-[#f9d045]  rounded hover:bg-[#e7bd34] ${
                isNextButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Review & Submit</h3>
          <p>
            <strong>Tuition Type:</strong> {formData.tuitionType}
          </p>
          <p>
            <strong>Category:</strong> {formData.category}
          </p>
          <p>
            <strong>Class:</strong> {formData.classCourse}
          </p>
          <p>
            <strong>Subjects:</strong> {formData.subjects.join(", ")}
          </p>
          <p>
            <strong>City:</strong> {formData.city}
          </p>

          <div className="mt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-[#124086] text-white rounded hover:bg-[#082755]"
            >
              ← Previous
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TutorRequests;

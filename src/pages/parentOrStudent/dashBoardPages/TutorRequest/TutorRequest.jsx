// import React, { useState } from "react";

// const TutorRequest = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     tuitionType: "Home Tutoring",
//     category: "",
//     classCourse: "",
//     subjects: [],
//     city: "",
//     location: "",
//     studentGender: "Female",
//     noOfStudents: "1",
//     tutorGenderPreference: "Any",
//     daysPerWeek: "",
//     salary: "",
//     hireDate: "",
//     address: "",
//   });

//   const cities = [
//     "Dhaka",
//     "Chattogram",
//     "Khulna",
//     "Rajshahi",
//     "Barishal",
//     "Sylhet",
//     "Rangpur",
//     "Mymensingh",
//     "Comilla",
//     "Gazipur",
//     "Narayanganj",
//     "Bogura",
//     "Cox's Bazar",
//     "Jessore",
//     "Tangail",
//     "Feni",
//     "Pabna",
//   ];

//   const categories = [
//     "Bangla Medium",
//     "English Version",
//     "English Medium",
//     "Madrasah",
//   ];
//   const classes = [
//     "Play",
//     "Nursery",
//     "KG",
//     ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
//     "Class 12",
//   ];
//   const subjects = [
//     // Pre-primary (Play, Nursery, KG)
//     "Play Activities",
//     "Drawing",
//     "Rhymes",
//     "Basic English",
//     "Basic Bangla",
//     "Numbers",
//     "Good Manners",

//     // Primary (Class 1-5)
//     "Bangla",
//     "English",
//     "Mathematics",
//     "Science",
//     "Social Studies",
//     "Islamic Studies", // or "Hindu Studies", "Buddhist Studies", etc., based on religion
//     "ICT",
//     "Physical Education",
//     "Arts and Crafts",

//     // Secondary (Class 6-10)
//     "Mathematics",
//     "Higher Mathematics",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "Bangla",
//     "English",
//     "ICT",
//     "Islamic Studies",
//     "History and Culture of Bangladesh",
//     "Geography and Environment",
//     "Agricultural Studies",
//     "Home Science",
//     "Physical Education & Health",
//     "Arts and Crafts",
//     "Career Education",

//     // Higher Secondary (Class 11-12)
//     "Bangla",
//     "English",
//     "Mathematics",
//     "Higher Mathematics",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "ICT",
//     "Islamic Studies",
//     "Economics",
//     "Accounting",
//     "Finance & Banking",
//     "Business Studies",
//     "Statistics",
//     "Psychology",
//     "Sociology",
//     "Logic",
//     "Civics and Good Governance",
//     "History",
//     "Geography",
//     "Agricultural Studies",
//     "Home Science",
//     "Physical Education",
//     "Arts and Crafts"
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubjectChange = (e) => {
//     const selectedSubject = e.target.value;
//     if (selectedSubject && !formData.subjects.includes(selectedSubject)) {
//       setFormData((prev) => ({
//         ...prev,
//         subjects: [...prev.subjects, selectedSubject],
//       }));
//     }
//   };

//   const removeSubject = (subject) => {
//     setFormData((prev) => ({
//       ...prev,
//       subjects: prev.subjects.filter((sub) => sub !== subject),
//     }));
//   };

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const handleSubmit = () => {
//     console.log("Submitted Data:", formData);
//     alert("Tutor request submitted successfully!");
//   };

//   return (
//     <div className="max-w-2xl mx-auto my-1 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-2">Hire Tutor</h2>

//       {step === 1 && (
//         <div>

//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium">Tuition Type *</label>
//               <select
//                 name="tuitionType"
//                 value={formData.tuitionType}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Home Tutoring">Home Tutoring</option>
//                 <option value="Online Tutoring">Online Tutoring</option>
//                 <option value="Group Tutoring">Group Tutoring</option>
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium">Category *</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select...</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium">Class *</label>
//               <select
//                 name="classCourse"
//                 value={formData.classCourse}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select...</option>
//                 {classes.map((cls) => (
//                   <option key={cls} value={cls}>
//                     {cls}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium">Subjects *</label>
//               <select
//                 name="subjects"
//                 onChange={handleSubjectChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select Subject</option>
//                 {subjects.map((sub) => (
//                   <option key={sub} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//               </select>

//               <div className="mt-2 flex flex-wrap gap-2">
//                 {formData.subjects.map((subject) => (
//                   <span
//                     key={subject}
//                     className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
//                   >
//                     {subject}
//                     <button
//                       onClick={() => removeSubject(subject)}
//                       className="text-white font-bold"
//                     >
//                       ❌
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={nextStep}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div>

//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium">No. of Students *</label>
//               <select
//                 name="noOfStudents"
//                 value={formData.noOfStudents}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 {Array.from({ length: 10 }, (_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium">City *</label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select...</option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium">Salary (BDT) *</label>
//               <input
//                 type="number"
//                 name="salary"
//                 value={formData.salary}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Hire Date *</label>
//               <input
//                 type="date"
//                 name="hireDate"
//                 value={formData.hireDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               ← Previous
//             </button>
//             <button
//               onClick={nextStep}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div>
//           <h3 className="text-lg font-medium mb-4">Review & Submit</h3>
//           <div className="space-y-2">
//             <p>
//               <strong>Tuition Type:</strong> {formData.tuitionType}
//             </p>
//             <p>
//               <strong>Category:</strong> {formData.category}
//             </p>
//             <p>
//               <strong>Class:</strong> {formData.classCourse}
//             </p>
//             <p>
//               <strong>Subjects:</strong> {formData.subjects.join(", ")}
//             </p>
//             <p>
//               <strong>City:</strong> {formData.city}
//             </p>
//           </div>

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               ← Previous
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorRequest;

import React, { useState } from "react";

const TutorRequest = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tuitionType: "Home Tutoring",
    category: "",
    classCourse: "",
    subjects: [],
    city: "",
    location: "", // Added location field
    studentGender: "Female",
    noOfStudents: "1",
    tutorGenderPreference: "Any",
    daysPerWeek: "",
    salary: "",
    hireDate: "",
    address: "",
    duration: "1 hour", // Added duration field
  });

  const cities = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Gazipur",
    "Narayanganj",
    "Bogura",
    "Cox's Bazar",
    "Jessore",
    "Tangail",
    "Feni",
    "Pabna",
  ];

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
    "Class 12",
  ];

  const subjects = [
    // Pre-primary (Play, Nursery, KG)
    "Play Activities",
    "Drawing",
    "Rhymes",
    "Basic English",
    "Basic Bangla",
    "Numbers",
    "Good Manners",

    // Primary (Class 1-5)
    "Bangla",
    "English",
    "Mathematics",
    "Science",
    "Social Studies",
    "Islamic Studies",
    "ICT",
    "Physical Education",
    "Arts and Crafts",

    // Secondary (Class 6-10)
    "Mathematics",
    "Higher Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Bangla",
    "English",
    "ICT",
    "Islamic Studies",
    "History and Culture of Bangladesh",
    "Geography and Environment",
    "Agricultural Studies",
    "Home Science",
    "Physical Education & Health",
    "Arts and Crafts",
    "Career Education",

    // Higher Secondary (Class 11-12)
    "Bangla",
    "English",
    "Mathematics",
    "Higher Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
    "Islamic Studies",
    "Economics",
    "Accounting",
    "Finance & Banking",
    "Business Studies",
    "Statistics",
    "Psychology",
    "Sociology",
    "Logic",
    "Civics and Good Governance",
    "History",
    "Geography",
    "Agricultural Studies",
    "Home Science",
    "Physical Education",
    "Arts and Crafts",
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

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("Tutor request submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto my-1 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2">Hire Tutor</h2>

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
                <option value="Home Tutoring">Home Tutoring</option>
                <option value="Online Tutoring">Online Tutoring</option>
                <option value="Group Tutoring">Group Tutoring</option>
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

           
          </div>

          <div className="mt-2 flex justify-end">
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
            

            <div>
              <label className="block font-medium">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

           

            
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
  );
};

export default TutorRequest;

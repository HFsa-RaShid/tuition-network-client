import React, { useEffect, useState } from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Aisha Rahman",
      role: "Student",
      message:
        "Tutoria really helped me find the best tutor! Their platform is easy, fast, and the teachers are amazing.",
    },
    {
      name: "Arif Hossain",
      role: "Student",
      message:
        "Affordable, friendly and very helpful. I got the perfect tutor within hours!",
    },
    {
      name: "Mahmud Hasan",
      role: "Tutor",
      message:
        "I love teaching on Tutoria. The student matching system is smooth and payments are always on time.",
    },
   
  
 
   
    {
      name: "Arif Hossain",
      role: "Student",
      message:
        "Affordable, friendly and very helpful. I got the perfect tutor within hours!",
    },
  
    {
      name: "Nusrat Jahan",
      role: "Parent",
      message:
        "My son improved a lot after joining Tutoria. The communication and support system is excellent.",
    },
    {
      name: "Arif Hossain",
      role: "Student",
      message:
        "Affordable, friendly and very helpful. I got the perfect tutor within hours!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalDots = 5;
  const activeDot = Math.floor((currentIndex / reviews.length) * totalDots);

  // Auto slider function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-16 px-4 md:px-20">
      <div className="text-center mb-10">
        <h4 className="text-[#DAA520] font-bold">REVIEWS</h4>
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          What Students & Tutors Say
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-xl">
          {/* Card */}
          <div
            className="bg-gradient-to-br from-[#FFF3CD] to-[#FBE9A6] p-8 rounded-3xl shadow-xl transition-all duration-500 ease-in-out"
            style={{
              transform: "scale(1)",
            }}
          >
            <p className="text-lg text-gray-800 italic mb-6 text-center">
              “{reviews[currentIndex].message}”
            </p>

            <div className="text-center mt-4">
              <h3 className="font-bold text-xl text-gray-900">
                {reviews[currentIndex].name}
              </h3>
              <p className="text-gray-600">{reviews[currentIndex].role}</p>
            </div>
          </div>

          {/* Decorative floating shapes */}
          <div className="absolute -top-4 -left-4 h-10 w-10 rounded-2xl bg-yellow-300 opacity-40 blur-md"></div>
          <div className="absolute -bottom-4 -right-4 h-14 w-14 rounded-full bg-yellow-400 opacity-30 blur-md"></div>
        </div>
      </div>

      {/* Dots */}

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              activeDot === i ? "bg-[#DAA520] w-6" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

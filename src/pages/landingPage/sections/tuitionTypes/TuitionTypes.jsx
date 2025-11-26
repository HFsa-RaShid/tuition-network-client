import React from "react";
import { BookOpen, Laptop, Users, Layers } from "lucide-react";

const TuitionTypes = () => {
  const types = [
    {
      title: "Home Tutoring",
      desc: "One-to-one personalized learning at your home.",
      icon: <BookOpen className="w-10 h-10" />,
    },
    {
      title: "Online Tutoring",
      desc: "Flexible learning from anywhere with expert tutors.",
      icon: <Laptop className="w-10 h-10" />,
    },
    {
      title: "Group Tutoring",
      desc: "Learn together and improve through collaboration.",
      icon: <Users className="w-10 h-10" />,
    },
    {
      title: "Batch Tutoring",
      desc: "Structured and syllabus-oriented batch classes.",
      icon: <Layers className="w-10 h-10" />,
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h4 className="text-[#DAA520] font-semibold mb-3 tracking-wide">
          TUITION TYPES
        </h4>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Find the Best Tuition Type
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          which suits you most
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {types.map((item, index) => (
            <div
              key={index}
              className="
                bg-white rounded-2xl shadow-md p-8
                border border-gray-100
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                flex flex-col items-center text-center
              "
            >
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TuitionTypes;

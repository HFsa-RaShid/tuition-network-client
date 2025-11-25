import React from "react";

const TutorConnection = () => {
  const steps = [
    {
      icon: "👤",
      title: "Create Profile",
      desc: "Create your tutor account with basic sign-up information.",
    },
    {
      icon: "🧾",
      title: "Complete Your Profile",
      desc: "Fill in subjects, experience & availability to reach 80% completion.",
    },
    {
      icon: "💼",
      title: "Apply for Tuition Jobs",
      desc: "Search the job board & apply to matched tuition opportunities.",
    },
    {
      icon: "🎓",
      title: "Start Tutoring",
      desc: "Attend the first session confidently and begin tutoring.",
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-16 flex justify-center">
      <div className="max-w-3xl w-full px-6">
        
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-14">
          The ways <span className="text-green-500">Tutors</span> can connect with us
        </h1>

        {/* Vertical timeline */}
        <div className="relative border-l-4 border-green-300 ml-6">

          {steps.map((step, i) => (
            <div key={i} className="mb-14 relative">

              {/* Connector Dot */}
              <div className="absolute -left-[18px] top-0 w-8 h-8 rounded-full bg-green-500 shadow-md flex items-center justify-center text-white text-lg font-bold">
                {i + 1}
              </div>

              {/* Card */}
              <div className="ml-10 bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              </div>

              {/* Curved Connector Line */}
              {i !== steps.length - 1 && (
                <div className="absolute left-[-3px] top-8 h-12 w-8 border-l-2 border-b-2 border-dotted border-green-300 rounded-bl-lg"></div>
              )}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default TutorConnection;

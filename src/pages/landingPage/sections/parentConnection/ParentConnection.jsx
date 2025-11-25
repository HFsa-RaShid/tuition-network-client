import React from "react";

const ParentConnection = () => {
  return (
    <div className="w-full bg-gray-100 py-12 font-inter">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">
          The ways <span className="text-green-500">Parents/Students</span> can
          connect with us
        </h1>

        {/* Curved Timeline */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 relative overflow-hidden">
          <div className="hidden md:block absolute inset-x-10 top-16 h-40 border-2 border-dashed border-green-300 rounded-full -rotate-2"></div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 mt-4">
            {[
              "Create Profile",
              "Submit Requirements",
              "Get Tutors' CV",
              "Select Tutor",
            ].map((label, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-500 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-md">
                  {i + 1}
                </div>
                <p className="mt-3 font-semibold text-sm text-gray-800">
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-[140px]">
                  {[
                    "Sign up quickly for learning benefits.",
                    "Tell us your tutor needs.",
                    "We share selected tutor profiles.",
                    "Pick and start learning with confidence.",
                  ][i]}
                </p>
              </div>
            ))}
          </div>

          {/* Cards below */}
          <div className="grid md:grid-cols-4 gap-5 mt-16">
            {[
              {
                t: "Create Profile",
                d: "Create a profile to get more learning benefits from website.",
              },
              {
                t: "Submit Requirements",
                d: "Fill up expected tutor requirements & submit the request.",
              },
              {
                t: "Get Tutors' CV",
                d: "We will provide expert tutors' CVs based on your request.",
              },
              {
                t: "Select Your Tutor",
                d: "Evaluate tutors & start learning with your favorite one.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:-translate-y-1 transition"
              >
                <h3 className="font-semibold text-sm mb-1">{x.t}</h3>
                <p className="text-xs text-gray-500">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentConnection;

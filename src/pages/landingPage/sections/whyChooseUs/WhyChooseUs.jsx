
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: (
        <FaChalkboardTeacher className="text-[#DAA520] bg-[#f1ecdd] p-2 rounded-md" />
      ),
      title: "One-on-one Teaching",
      description:
        "All of our special education experts have a degree in special education.",
    },
    {
      icon: (
        <AiOutlineClockCircle className="text-[#32CD32] bg-[#d9f0d9] p-2 rounded-md" />
      ),
      title: "24/7 Tutor Availability",
      description:
        "Our tutors are always available to respond as quickly as possible for you.",
    },
    {
      icon: (
        <MdOutlineAttachMoney className="text-[#FF1493] bg-[#eedae5] p-2 rounded-md" />
      ),
      title: "Affordable Prices",
      description:
        "Choose an expert tutor based on your budget, location and per hour.",
    },
  ];

  return (
    <div className="bg-[#100E20] py-24">
      <div className="container mx-auto text-center px-6 md:px-16 text-black">
        <div className="w-full mx-auto">
          <h4 className="text-[#DAA520] font-bold mb-2">WHY CHOOSE US</h4>
          <h2 className="text-3xl font-bold mb-1 text-white">
            Benefits of Online Tutoring
          </h2>
          <h2 className="text-3xl font-bold mb-8 text-white">
            Services with Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="relative bg-[#111824] rounded-xl p-6 text-center overflow-hidden group transition-all duration-700 shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_5px_rgba(0,255,255,0)]"
              >
                {/* light beam effect */}
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[200%] 
                                opacity-50 group-hover:opacity-0 transition-opacity duration-700
                                [background:radial-gradient(ellipse_at_top,rgba(0,255,255,0.35)_0%,rgba(0,255,255,0.05)_40%,transparent_70%)]
                                blur-[30px] rotate-[6deg]"></div>

                <div className="relative z-10 text-white">
                  <p className="text-5xl mb-4">{benefit.icon}</p>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-base text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;


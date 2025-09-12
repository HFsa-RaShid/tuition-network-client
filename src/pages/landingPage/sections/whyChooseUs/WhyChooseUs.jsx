import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineClockCircle, AiOutlineTeam } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";

const WhyChooseUs = () => {
    const benefits = [
        {
            icon: <FaChalkboardTeacher className="text-[#DAA520] bg-[#f1ecdd] p-2 rounded-md" />,
            title: "One-on-one Teaching",
            description: "All of our special education experts have a degree in special education.",
        },
        {
            icon: <AiOutlineClockCircle className="text-[#32CD32] bg-[#d9f0d9] p-2 rounded-md" />,
            title: "24/7 Tutor Availability",
            description: "Our tutors are always available to respond as quickly as possible for you.",
        },
       
        
        {
            icon: <MdOutlineAttachMoney className="text-[#FF1493] bg-[#eedae5] p-2 rounded-md" />,
            title: "Affordable Prices",
            description: "Choose an expert tutor based on your budget and per hour.",
        },
    ];

    return (
        <div className="bg-base-200 py-16">
            <div className="container mx-auto text-center px-20">
                <h4 className="text-[#DAA520] font-bold mb-2">WHY CHOOSE US</h4>
                <h2 className="text-3xl font-bold mb-1 text-black">Benefits of Online Tutoring</h2>
                <h2 className="text-3xl font-bold mb-8 text-black">Services with Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-between">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-base-100 z-30 shadow-lg shadow-slate-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <p className="text-5xl mb-4 ">{benefit.icon}</p>
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-base">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;

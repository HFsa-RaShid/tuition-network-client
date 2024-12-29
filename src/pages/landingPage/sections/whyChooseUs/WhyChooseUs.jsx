import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineClockCircle, AiOutlineTeam } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";

const WhyChooseUs = () => {
    const benefits = [
        {
            icon: <FaChalkboardTeacher className="text-[#DAA520]" />,
            title: "One-on-one Teaching",
            description: "All of our special education experts have a degree in special education.",
        },
        {
            icon: <AiOutlineClockCircle className="text-[#32CD32]" />,
            title: "24/7 Tutor Availability",
            description: "Our tutors are always available to respond as quickly as possible for you.",
        },
        {
            icon: <AiOutlineTeam className="text-[#FF8C00]" />,
            title: "Tuition Exchange Community",
            description: "Join a community of educators and learners where knowledge and expertise are exchanged seamlessly.",
        },
        
        {
            icon: <MdOutlineAttachMoney className="text-[#FF1493]" />,
            title: "Affordable Prices",
            description: "Choose an expert tutor based on your budget and per hour.",
        },
    ];

    return (
        <div className="bg-slate-100 py-16">
            <div className="container mx-auto text-center px-20">
                <h4 className="text-[#DAA520] font-bold mb-2">WHY CHOOSE US</h4>
                <h2 className="text-3xl font-bold mb-1 text-black">Benefits of Online Tutoring</h2>
                <h2 className="text-3xl font-bold mb-8 text-black">Services with Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-base-100 z-30 shadow-lg shadow-slate-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="text-5xl mb-4">{benefit.icon}</div>
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

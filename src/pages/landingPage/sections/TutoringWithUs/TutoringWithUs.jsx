import React from "react";
import withUs from "../../../../assets/withUs.png";
import withUsBg from "../../../../assets/tutoringbg.jpg";
import { NavLink } from "react-router-dom";

const TutoringWithUs = () => {
  return (
    <div
      className="h-[450px] bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${withUsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
  

      <div className="px-20 flex items-center h-full container mx-auto text-white ">
        <div className="flex justify-between items-center mt-[5%] ">
          <div className="w-[50%]">
            <img src={withUs} alt="withUs" className="h-[300px]" />
          </div>
          <div className="w-[50%] text-white">
            <p className="text-[#DAA520] font-bold py-2">TEAM OF EXPERT TUTORS</p>
            <h1 className="text-4xl font-bold mb-4">Start Tutoring With Us</h1>
            <p className="text-lg mb-8">
              We're always on the lookout for skilled tutors! Set your own
              rates, earn on your terms, and make a meaningful impact in
              students' lives.
            </p>
            <NavLink>
            <button className="bg-[#f9d045] py-3 px-6 rounded-3xl text-black font-semibold">
                  Apply Now
                </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringWithUs;

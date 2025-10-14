import React from "react";

const CountDown = () => {
  return (
    <div className="h-[130px] w-full bg-[#22123B] text-black shadow-md  flex items-center">
      <div className="container mx-auto flex items-center justify-around text-white">
        <div>
          <h1 className="text-3xl ">5000+</h1>
          <p>Verified Tutors</p>
        </div>

        <div className="h-[70%] border-l border-gray-300"></div>

        <div>
          <h1 className="text-3xl ">15000</h1>
          <p>Available Tuitions</p>
        </div>

        <div className="h-[70%] border-l border-gray-300"></div>

        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Matched Tuitions</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

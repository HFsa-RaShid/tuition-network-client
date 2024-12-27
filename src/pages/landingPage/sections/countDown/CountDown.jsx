import React from "react";
const CountDown = () => {
  return (
    <div className="bg-[#0065ff] h-[130px] bg-opacity-80">
      <div className="h-full flex items-center justify-around text-white container mx-auto">
        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Verified Tutors</p>
        </div>
        <div className="h-[70%] border border-gray-300"></div>


        <div>
          <h1 className="text-3xl">15000</h1>
          <p>Available Tuitions</p>
        </div>
        <div className="h-[70%] border border-gray-300"></div>


        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Matched Tuitions</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

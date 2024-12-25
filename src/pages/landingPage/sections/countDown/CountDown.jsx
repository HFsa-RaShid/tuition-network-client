import React from "react";
import tutor from "../../../../assets/tutor.png";
import tuitions from "../../../../assets/tuitions.png";
import tuitionMatched from "../../../../assets/tuitionMatched.png";
const CountDown = () => {
  return (
    <div className="bg-[#0065ff] h-[130px] flex items-center justify-around text-white">
      <div className="flex items-center gap-4">
        <div>
          <img src={tutor} alt="tutor" className="h-[52px]" />
        </div>
        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Verified Tutors</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <img src={tuitions} alt="tuitions" className="h-[52px]" />
        </div>
        <div>
          <h1 className="text-3xl">15000</h1>
          <p>Available Tuitions</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <img src={tuitionMatched} alt="tuitionMatched" className="h-[52px]" />
        </div>
        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Matched Tuitions</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

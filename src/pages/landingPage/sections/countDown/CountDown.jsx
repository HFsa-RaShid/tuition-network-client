import React from "react";
import CountUp from "react-countup";

const CountDown = () => {
  return (
    <div className="relative -mt-12">
      {/* Banner background */}
      <div className="w-full mb-14"></div>

      {/* CountDown Box */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4 bg-white rounded-3xl shadow-2xl p-8 flex justify-around items-center ">
        {/* Count Item */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            <CountUp start={0} end={5000} duration={2} separator="," />+
          </h1>
          <p className="text-gray-600 mt-1">Verified Tutors</p>
        </div>

        <div className="h-12 border-l border-gray-300"></div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            <CountUp start={0} end={9000} duration={2} separator="," />
          </h1>
          <p className="text-gray-600 mt-1">Available Tuitions</p>
        </div>

        <div className="h-12 border-l border-gray-300"></div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            <CountUp start={0} end={5000} duration={2} separator="," />
          </h1>
          <p className="text-gray-600 mt-1">Matched Tuitions</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

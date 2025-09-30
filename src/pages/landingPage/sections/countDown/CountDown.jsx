// import React from "react";
// const CountDown = () => {
//   return (
//     <div className=" h-[130px] w-full">

//         <div className="h-full bg-gray-500 flex items-center justify-around text-white container mx-auto">
//         <div>
//           <h1 className="text-3xl">5000</h1>
//           <p>Verified Tutors</p>
//         </div>
//         <div className="h-[70%] border border-gray-300"></div>
//         <div>
//           <h1 className="text-3xl">15000</h1>
//           <p>Available Tuitions</p>
//         </div>
//         <div className="h-[70%] border border-gray-300"></div>

//         <div>
//           <h1 className="text-3xl">5000</h1>
//           <p>Matched Tuitions</p>
//         </div>
//       </div>
//       </div>

//   );
// };

// export default CountDown;

import React from "react";

const CountDown = () => {
  return (
    <div className="h-[130px] w-full bg-gray-500 text-white flex items-center">
      <div className="container mx-auto flex items-center justify-around">
        <div>
          <h1 className="text-3xl">5000</h1>
          <p>Verified Tutors</p>
        </div>

        <div className="h-[70%] border-l border-gray-300"></div>

        <div>
          <h1 className="text-3xl">15000</h1>
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

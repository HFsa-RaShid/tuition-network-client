// import React from "react";
// import withUs from "../../../../assets/call.png";
// import withUsBg from "../../../../assets/tutoringbg.jpg";
// import { NavLink } from "react-router-dom";

// const TutoringWithUs = () => {
//   return (
//     <div
//       className="md:h-[450px] bg-fixed"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${withUsBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
  

//       <div className="px-20 flex items-center h-full container mx-auto text-white ">
//         <div className="md:flex justify-between items-center gap-8 mt-[3%] ">
//           <div className="md:w-[50%]">
//             <img src={withUs} alt="withUs" className="h-[300px]" />
//           </div>
//           <div className="md:w-[50%] text-white mt-4 md:mt-0">
//             <p className="text-[#DAA520] font-bold py-2">TEAM OF EXPERT TUTORS</p>
//             <h1 className="text-4xl font-bold mb-4">Start Tutoring With Us</h1>
//             <p className="text-lg mb-8 text-gray-200">
//               We're always on the lookout for skilled tutors! Set your own
//               rates, earn on your terms, and make a meaningful impact in
//               students' lives.
//             </p>
//             <NavLink to='/signUp'>
//             <button className="bg-blue-200 py-3 px-6 rounded-xl shadow-md shadow-blue-500 text-black font-semibold">
//                   Join Us
//                 </button>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutoringWithUs;



import React from "react";
import withUs from "../../../../assets/call.png";
import withUsBg from "../../../../assets/tutoringbg.jpg";
import { NavLink } from "react-router-dom";

const TutoringWithUs = () => {
  return (
    <div
      className="bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${withUsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-4 sm:px-8 md:px-20 flex items-center h-full container mx-auto text-white py-10 md:py-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={withUs}
              alt="withUs"
              className="w-[200px] sm:w-[250px] md:w-[300px] object-contain"
            />
          </div>
          
          {/* Right: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <p className="text-[#DAA520] font-bold py-2">TEAM OF EXPERT TUTORS</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Start Tutoring With Us
            </h1>
            <p className="text-base sm:text-lg mb-8 text-gray-200">
              We're always on the lookout for skilled tutors! Set your own
              rates, earn on your terms, and make a meaningful impact in
              students' lives.
            </p>
            <NavLink to="/signUp">
              <button className="bg-blue-200 py-2 sm:py-3 px-5 sm:px-6 rounded-xl shadow-md shadow-blue-500 text-black font-semibold hover:bg-blue-300 transition">
                Join Us
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringWithUs;

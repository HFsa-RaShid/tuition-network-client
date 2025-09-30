// import React from "react";

// const TuitionTypes = () => {
//   return (
//     <div className="bg-base-200">
//       <div className="container mx-auto px-0 md:px-20 text-center py-8">
//         <h4 className="text-[#DAA520] font-bold mb-2 ">TUITION TYPES</h4>
//         <h2 className="text-3xl font-bold mb-1 text-black">
//           Find the Best Tuition Type
//         </h2>
//         <h2 className="text-3xl font-bold mb-1 text-black">
//           which suits you most
//         </h2>

//         <div className="flex justify-evenly items-center py-16">
//           <ul className="timeline">
//             <li>
//               <div className="timeline-start timeline-box">Home Tutoring</div>
//               <hr />
//             </li>
//             <li>
//               <hr />
//               <div className="timeline-end timeline-box">Online Tutoring</div>
//               <hr />
//             </li>
//             <li>
//               <hr />
//               <div className="timeline-start timeline-box">Group Tutoring</div>
//               <hr />
//             </li>
//             <li>
//               <hr />
//               <div className="timeline-end timeline-box">Batch Tutoring</div>
//               <hr />
//             </li>
//             {/*
//   <li>
//     <hr />
//     <div className="timeline-start timeline-box">Apple Watch</div>
//   </li> */}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TuitionTypes;


import React from "react";

const TuitionTypes = () => {
  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-4 md:px-20 text-center py-8">
        <h4 className="text-[#DAA520] font-bold mb-2">TUITION TYPES</h4>
        <h2 className="text-2xl md:text-3xl font-bold mb-1 text-black">
          Find the Best Tuition Type
        </h2>
        <h2 className="text-2xl md:text-3xl font-bold mb-1 text-black">
          which suits you most
        </h2>

        <div className="flex flex-wrap justify-evenly items-center py-16 gap-6">
          <ul className="timeline w-full sm:w-1/2 md:w-full">
            <li>
              <div className="timeline-start timeline-box">Home Tutoring</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-end timeline-box">Online Tutoring</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start timeline-box">Group Tutoring</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-end timeline-box">Batch Tutoring</div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TuitionTypes;

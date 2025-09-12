import React from "react";

const TuitionTypes = () => {
  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-20 text-center py-8">
        <h4 className="text-[#DAA520] font-bold mb-2 ">TUITION TYPES</h4>
        <h2 className="text-3xl font-bold mb-1 text-black">Find the Best Tuition Type</h2>
        <h2 className="text-3xl font-bold mb-1 text-black">which suits you most</h2>

        {/* <div className="flex justify-evenly items-center py-16 ">
          {[
            { id: 1, text: "Home" },
            { id: 2, text: "Online" },
            { id: 3, text: "Group" },
          ].map((type) => (
            <div
              key={type.id}
              className="relative w-[200px] h-[180px] rounded-[30px_30px_60px_60px] flex flex-col justify-center items-center  shadow-sm  shadow-[#f9d045] bg-base-100 "
            >
              
              <div className="absolute -top-6 flex justify-center items-center w-12 h-12 rounded-full bg-[#f9d045]  font-bold text-black ">
                {type.id}
              </div>

             
              <p className="text-center text-2xl  font-medium px-4 leading-6 pb-4">
                {type.text}
              </p>
              <p className="text-center text-2xl  font-medium px-4 leading-6">Tutoring</p>
            </div>
          ))}
        </div> */}
<div className="flex justify-evenly items-center py-16">
  <ul className="timeline">
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
  {/*
  <li>
    <hr />
    <div className="timeline-start timeline-box">Apple Watch</div>
  </li> */}
</ul>
</div>
        
      </div>
    </div>
  );
};

export default TuitionTypes;

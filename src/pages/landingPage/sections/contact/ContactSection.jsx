import React from "react";
import { NavLink } from "react-router-dom";

const ContactSection = () => {
  return (
    <div className="h-[35px] mt-[68px] bg-[#f9d045] flex items-center justify-center">
      <div className="flex gap-2 font-semibold text-black text-sm">
        <p>Do you have any queries or need further clarification?</p>
        <NavLink>
          <p className="text-[#123d7e] underline">Talk to Us</p>
        </NavLink>
      </div>
    </div>
  );
};

export default ContactSection;

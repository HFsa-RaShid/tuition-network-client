import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Assets
import withUs from "../../../../assets/call.png";
import withUsBg from "../../../../assets/bg.jpg";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const TutoringWithUs = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, refetch, isLoading } = useCurrentUser(user?.email);
  return (
    <div
      className="bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${withUsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-4 sm:px-8 md:px-16 flex items-center h-full container mx-auto text-white py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center animate-slide-up">
            <img
              src={withUs}
              alt="withUs"
              className="w-[200px] sm:w-[250px] md:w-[300px] object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 animate-fade-in">
            <p className="text-[#DAA520] font-bold py-2">
              TEAM OF EXPERT TUTORS
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Start Tutoring With Us
            </h1>
            <p className="text-base sm:text-lg mb-8 text-gray-200">
              We're always on the lookout for skilled tutors! Set your own
              rates, earn on your terms, and make a meaningful impact in
              students' lives.
            </p>
            
            {!user ?

            
              /* If user is logged in, link to tutor application page */
              <NavLink to="/signUp">
                <button className="btn-primary">Join</button>
              </NavLink>
              :
              <button className="btn-primary" disabled>Join</button>
            
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringWithUs;

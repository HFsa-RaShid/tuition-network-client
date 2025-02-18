import React, { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
const DashBoard = () => {
  const [activeSection, setActiveSection] = useState("Profile Details");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const renderContent = () => {
  //     switch (activeSection) {
  //         case 'Messages':
  //             return <Messages />;
  //         case 'My Tuitions':
  //             return <MyTuitions />;
  //         case 'Offers':
  //             return <Offers />;
  //         case 'Payment History':
  //             return <PaymentHistory />;
  //         case 'Affiliate Program':
  //             return <AffiliateProgram />;
  //         case 'Settings':
  //             return <Settings />;
  //         default:
  //             return <ProfileDetails />;
  //     }
  // };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white p-5 flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        </div>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Profile Details" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Profile Details")}
        >
          Profile Details
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Messages" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Messages")}
        >
          Messages
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "My Tuitions" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("My Tuitions")}
        >
          My Tuitions
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Offers" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Offers")}
        >
          Offers
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Payment History" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Payment History")}
        >
          Payment History
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Affiliate Program" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Affiliate Program")}
        >
          Affiliate Program
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeSection === "Settings" ? "bg-yellow-500" : ""
          }`}
          onClick={() => setActiveSection("Settings")}
        >
          Settings
        </button>

        <button
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-yellow-500 p-2 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <RiArrowLeftDoubleLine size={20} /> : <MdOutlineKeyboardDoubleArrowRight size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-gray-100 p-6">{/* {renderContent()} */}</div>
    </div>
  );
};

export default DashBoard;

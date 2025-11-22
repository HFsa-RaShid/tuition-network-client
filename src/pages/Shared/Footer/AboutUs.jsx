import React from "react";
import { Helmet } from "react-helmet-async";
import aboutImage from "../../../assets/logo.png"; 
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      <Helmet>
        <title>About Us | TuToria</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-blue-200  py-16 mt-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About TuToria</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Welcome to TuToria! Your trusted platform connecting students and
          tutors for a seamless learning experience.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={aboutImage}
            alt="About TuToria"
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            At TuToria, our mission is to empower students by providing access
            to skilled and passionate tutors. We aim to make learning engaging,
            effective, and accessible for everyone.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-700">
            We envision a world where every student has the opportunity to reach
            their full potential with the support of knowledgeable and dedicated
            tutors.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            How TuToria Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                1. Post a Request
              </h3>
              <p className="text-gray-700">
                Students post their learning requests specifying subjects,
                grade, and schedule.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                2. Apply as a Tutor
              </h3>
              <p className="text-gray-700">
                Tutors browse requests and apply to the ones that match their
                expertise.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                3. Connect & Learn
              </h3>
              <p className="text-gray-700">
                Students review tutor applications, confirm sessions, and start
                learning online or offline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Meet Our Team
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Supervisor */}
          <div className="bg-white p-6 rounded-lg shadow text-center w-64">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Rashid Al Asif"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800">
              Rashid Al Asif
            </h3>
            <p className="text-gray-600 text-sm">Supervisor</p>
          </div>

          {/* You */}
          <div className="bg-white p-6 rounded-lg shadow text-center w-64">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Hafsa Rashid"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800">
              Hafsa Rashid
            </h3>
            <p className="text-gray-600 text-sm">
              Analysis, Design, Frontend & Backend, 
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-200  py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <p>
            Email:{" "}
            <a href="mailto:support@tutoria.com" className="underline">
              support@tutoria.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+880123456789" className="underline">
              +880 1234 56789
            </a>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AboutUs;

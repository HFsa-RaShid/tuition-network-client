import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto px-4 py-10 mt-20 mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions or suggestions? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name*</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message*</label>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Contact Information
            </h3>
            <p className="text-gray-600">
              <strong>Email:</strong> support@tutoria.com
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +880 1838 551941
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> Barishal, Bangladesh
            </p>

            {/* Map Section */}
            <div className="w-full h-64 rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.836978827538!2d90.35953117359776!3d22.659865979429643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755348ec0558363%3A0x71825eb40c8459a6!2sUniversity%20of%20Barishal!5e0!3m2!1sen!2sbd!4v1763834584331!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University of Barishal"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;

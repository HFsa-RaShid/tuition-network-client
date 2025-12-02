
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosPublic.post("/contact", formData);

      setSuccess(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100/90 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 mt-20 mb-2">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Have questions or suggestions? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Send us a message
            </h3>

            {success && (
              <p className="text-green-600 mb-3 font-semibold">{success}</p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Name*</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email*</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Message*</label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-2 border rounded-md"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Contact Information
            </h3>

            <p className="text-gray-600">
              <strong>Email:</strong> tutoria.official.bd@gmail.com
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +880 1838 551941
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> Barishal, Bangladesh
            </p>

            {/* Map */}
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

      <Footer />
    </div>
  );
};

export default ContactUs;

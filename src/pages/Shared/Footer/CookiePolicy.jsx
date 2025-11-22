import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";

const CookiePolicy = () => {
  const { user } = useContext(AuthContext);
   const { currentUser } = useCurrentUser(user?.email);
  const isAdmin = currentUser?.role === "admin";
  const axiosPublic = useAxiosPublic();
 

  // Sections state
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "What are Cookies?",
      content:
        "Cookies are small text files stored on your device that help us remember preferences and understand usage patterns.",
    },
    {
      id: 2,
      title: "How We Use Cookies",
      content:
        "We use cookies for essential site functionality, analytics, and to provide personalized content and ads. You can opt out of certain categories via your browser settings.",
    },
    {
      id: 3,
      title: "Managing Cookies",
      content:
        "Most browsers allow you to control cookies through settings. Note that disabling cookies may affect site functionality.",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (section) => {
    setEditingId(section.id);
    setEditContent(section.content);
  };

  const handleSave = async (id) => {
    try {
      // Update frontend
      setSections(
        sections.map((sec) =>
          sec.id === id ? { ...sec, content: editContent } : sec
        )
      );
      setEditingId(null);

      // Send update to backend
      await axiosPublic.put(`/cookie-policy/${id}`, { content: editContent });

      toast.success("Section updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Helmet>
        <title>Cookie Policy | TuToria</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-16 mt-14">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Cookie Policy
        </h1>
        <p className="text-gray-700 text-center mb-10">
          We use cookies and similar technologies to improve your experience on
          TuToria. This page explains what cookies are used and how you can
          control them.
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition relative"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex justify-between items-center">
                {section.title}
                {isAdmin && (
                  <button
                    onClick={() => handleEdit(section)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                )}
              </h2>

              {editingId === section.id ? (
                <div className="space-y-2">
                  <textarea
                    className="w-full p-2 border rounded-md focus:outline-blue-500"
                    rows="5"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                      onClick={() => handleSave(section.id)}
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                      onClick={handleCancel}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">{section.content}</p>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-10 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;

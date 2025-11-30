import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

// Context & Hooks
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";

// Components
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  const axiosPublic = useAxiosPublic();

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Information We Collect",
      content:
        "We may collect information you provide directly (name, email, phone), information from your use of the service, and information from third-party services if you connect them.",
    },
    {
      id: 2,
      title: "How We Use Information",
      content:
        "We use information to provide and maintain services, process payments, communicate with you, improve the platform, and for security and fraud prevention.",
    },
    {
      id: 3,
      title: "Sharing & Disclosure",
      content:
        "We may share information with service providers, payment processors, and as required by law. We do not sell personal information.",
    },
    {
      id: 4,
      title: "Data Security",
      content:
        "We take reasonable measures to protect your information but cannot guarantee absolute security. Promptly notify us of any security concerns.",
    },
    {
      id: 5,
      title: "Your Rights",
      content:
        "You may access, correct, or delete your account information by contacting support or through your account settings where available.",
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

      // Update backend
      await axiosPublic.put(`/privacy-policy/${id}`, { content: editContent });

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
    <div className="bg-gray-100/90 min-h-screen">
      <Navbar />
      <Helmet>
        <title>Privacy Policy | TuToria</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-700 text-center mb-10">
          This Privacy Policy explains how TuToria collects, uses, discloses,
          and protects your personal information when you use our services.
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

export default PrivacyPolicy;

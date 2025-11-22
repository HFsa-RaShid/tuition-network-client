import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";

const TermsOfUse = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  const axiosPublic = useAxiosPublic();

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Acceptance",
      content:
        "You must be at least 18 years old (or the age of majority in your jurisdiction) to use our services. By creating an account or using the site you accept these Terms of Use.",
    },
    {
      id: 2,
      title: "Accounts",
      content:
        "Users are responsible for maintaining the confidentiality of their account credentials. You agree to notify us immediately of any unauthorized use of your account.",
    },
    {
      id: 3,
      title: "Use Restrictions",
      content:
        "You agree not to misuse the platform, post illegal content, harass other users, or attempt to compromise the security of the service.",
    },
    {
      id: 4,
      title: "Payments",
      content:
        "Any payments processed through the platform are subject to the payment terms at the time of transaction. Disputes should be reported to support promptly.",
    },
    {
      id: 5,
      title: "Limitation of Liability",
      content:
        "To the maximum extent permitted by law, TuToria and its affiliates are not liable for indirect, incidental, or consequential damages arising from the use of the service.",
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
      // Update frontend state
      setSections(
        sections.map((sec) =>
          sec.id === id ? { ...sec, content: editContent } : sec
        )
      );
      setEditingId(null);

      // Update backend
      await axiosPublic.put(`/terms-of-use/${id}`, { content: editContent });

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
        <title>Terms of Use | TuToria</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-16 mt-14">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Terms of Use
        </h1>
        <p className="text-gray-700 text-center mb-10">
          Welcome to TuToria. These Terms of Use govern your use of the TuToria
          platform. By accessing or using our services you agree to be bound by
          these terms.
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

export default TermsOfUse;

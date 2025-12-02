import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Context & Hooks
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const VerifyEmailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(300);
  const [loading, setLoading] = useState(false);

  const { userData, role } = state || {};
  if (!userData) {
    navigate("/signup");
    return null;
  }

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleVerify = async () => {
    try {
      setLoading(true);

      //  Check code validity on backend
      await axiosPublic.post("/verify-code", { email: userData.email, code });

      // Create user in Firebase
      const firebaseUser = await createUser(userData.email, userData.password);
      await updateUserProfile(
        userData.name,
        "https://i.ibb.co.com/SXLvbnWL/manpp.png"
      );

      // Create verified user in MongoDB
      const userInfo = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role,
        profileStatus: "Free",
        banned: "no",
        verified: true, 
        photoURL: "https://i.ibb.co.com/SXLvbnWL/manpp.png",
      };

      const res = await axiosPublic.post("/users", userInfo);
      
      
      if (role === "tutor") {
        await axiosPublic.post("/tutors", userInfo);
      }

      if (res.data.insertedId) {
        toast.success("Account created successfully!");
        navigate(`/${role}/dashboard`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    await axiosPublic.post("/send-verification", { email: userData.email });
    setTimer(300);
    toast.success("New code sent!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-[#123d7e] mb-4">Email Verification</h2>
        <p className="text-gray-600 mb-3">
          Enter the 6-digit code sent to <b>{userData.email}</b>
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded-md w-full text-center tracking-widest font-bold text-lg"
          placeholder="Enter code"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-4 w-full btn-primary"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        <p className="mt-3 text-gray-600 text-sm">
          Didn't get the code?{" "}
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`font-semibold ${timer > 0 ? "text-gray-400" : "text-blue-600"}`}
          >
            Resend {timer > 0 && `(${timer}s)`}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
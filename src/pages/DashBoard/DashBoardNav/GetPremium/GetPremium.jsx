import React, { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const GetPremium = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading, refetch } = useCurrentUser(user?.email);
  const axiosSecure = useAxiosSecure();

  // 🔹 Payment handler
  const handlePaymentBkash = async (name, email, tutorId, amount,tutorAmount,
        tuToriaAmount, role) => {
    try {
      const result = await axiosSecure.post("/paymentBkash", {
        name,
        email,
        tutorId,
        amount,
        tutorAmount,
        tuToriaAmount,
        source: "getPremium",
        role,
      });

      if (result?.data?.url) {
        await axiosSecure.put(`/users/${email}`, {
          profileStatus: "Premium",
        });

        if (role === "tutor") {
          await axiosSecure.put(`/tutors/${email}`, {
            profileStatus: "Premium",
          });
        }

        refetch(); // refresh UI

        // Redirect to Bkash gateway
        window.location.replace(result.data.url);
      }
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ml-14">
      <h2 className="text-2xl font-bold mb-8">Upgrade your plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-around w-full ">
        {/* Free Plan Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="mt-2 text-gray-500">
              Intelligence for everyday tasks
            </p>
            <p className="mt-4 text-3xl font-bold">
              TK 0 <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✨ request a tutor for tuition</li>
              <li>👀 View & select all applied tutors</li>
              <li>🔍 Find nearby tuitions using map</li>
            </ul>
          </div>
          <button
            disabled={currentUser?.profileStatus === "free"}
            className={`mt-6 w-full rounded-2xl py-2 font-medium ${
              currentUser?.profileStatus === "free"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentUser?.profileStatus === "free"
              ? "Your current plan"
              : "Free"}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">Premium</h3>
            <p className="mt-2 text-gray-500">
              More access to advanced intelligence
            </p>
            <p className="mt-4 text-3xl font-bold">
              TK 200 <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              {currentUser?.role === "student" ? (
                <>
                  <li>👨‍🎓 See Top 5 Best Matched Tutors</li>
                  <li>🔍 Find tutors faster with smart matching</li>
                  <li>⚡ Save time and effort in shortlisting</li>
                </>
              ) : (
                <>
                  <li>✨ Nearby tuition Email notifications alert</li>
                  <li>📂 Prioritized during selection process</li>
                  <li>📈 Increase chances of being hired</li>
                </>
              )}
            </ul>
          </div>
          {currentUser?.profileStatus === "Premium" ? (
            <button
              disabled
              className="mt-6 w-full rounded-2xl bg-gray-200 text-gray-500 py-2 font-medium cursor-not-allowed"
            >
              Your current plan
            </button>
          ) : (
            <button
              onClick={() =>
                handlePaymentBkash(
                  currentUser?.name,
                  currentUser?.email,
                  currentUser?.customId,
                  200,
                  0,
                  200,
                  currentUser?.role
                )
              }
              className="mt-6 w-full rounded-xl bg-blue-200 text-blue-800 py-2 font-medium hover:bg-blue-300 transition"
            >
              Get Premium
            </button>
          )}
        </div>
      </div>

      {/* Show user status */}
      <div className="mt-8 text-gray-600">
        Current Profile Status:{" "}
        <span className="font-semibold">{currentUser?.profileStatus}</span>
      </div>
    </div>
  );
};

export default GetPremium;

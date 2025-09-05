
// import React, { useContext } from "react";
// import { AuthContext } from "../../../../provider/AuthProvider";
// import useCurrentUser from "../../../../hooks/useCurrentUser";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

// const GetPremium = () => {
//   const { user } = useContext(AuthContext);
//   const { currentUser, isLoading, refetch } = useCurrentUser(user?.email);
//   const axiosSecure = useAxiosSecure();

//   // 🔹 Payment handler
//   const handlePaymentBkash = async (name, email, tutorId, amount, role) => {
//     try {
//       const result = await axiosSecure.post("/paymentBkash", {
//         name,
//         email,
//         tutorId,
//         amount,
//         source: "getPremium",
//         role,
//       });

//       if (result?.data?.url) {
//         // ✅ Update profile status before redirect
//         await axiosSecure.put(`/users/${email}`, {
//           profileStatus: "Premium",
//         });
//         if(role==='tutor')
//         {
//             await axiosSecure.put(`/tutors/${email}`, {
//           profileStatus: "Premium",
//         });
//         }

//         // Refresh local state so UI updates immediately
//         refetch();

//         // Redirect to payment gateway
//         window.location.replace(result.data.url);
//       }
//     } catch (err) {
//       console.error("Payment failed:", err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center mt-20">
//         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center ml-14">
//       <h2 className="text-2xl font-bold mb-8">Upgrade your plan</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-around w-full ">
//         {/* Free Plan Card */}
//         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-semibold">Free</h3>
//             <p className="mt-2 text-gray-500">Intelligence for everyday tasks</p>
//             <p className="mt-4 text-3xl font-bold">
//               TK 0 <span className="text-base font-normal">/month</span>
//             </p>
//             <ul className="mt-6 space-y-3 text-gray-600">
//               <li>✨ Access to GPT-5</li>
//               <li>📂 Limited file uploads</li>
//               <li>🖼️ Limited & slower image generation</li>
//               <li>🧠 Limited memory and context</li>
//             </ul>
//           </div>
//           <button
//             disabled
//             className="mt-6 w-full rounded-2xl bg-gray-200 text-gray-500 py-2 font-medium cursor-not-allowed"
//           >
//             Your current plan
//           </button>
//         </div>

//         {/* Premium Plan Card */}
//         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-semibold">Premium</h3>
//             <p className="mt-2 text-gray-500">
//               More access to advanced intelligence
//             </p>
//             <p className="mt-4 text-3xl font-bold">
//               TK 150 <span className="text-base font-normal">/month</span>
//             </p>
//             <ul className="mt-6 space-y-3 text-gray-600">
//               <li>✨ GPT-5 with advanced reasoning</li>
//               <li>📂 Expanded messaging and uploads</li>
//               <li>🖼️ Expanded & faster image creation</li>
//               <li>🧠 Expanded memory and context</li>
//             </ul>
//           </div>
//           <button
//             onClick={() =>
//               handlePaymentBkash(
//                 currentUser?.name,
//                 currentUser?.email,
//                 currentUser?.customId,
//                 150,
//                 currentUser?.role
//               )
//             }
//             className="mt-6 w-full rounded-2xl bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
//           >
//             Get Premium
//           </button>
//         </div>
//       </div>

//       {/* Example: showing user profile status below */}
//       <div className="mt-8 text-gray-600">
//         Current Profile Status:{" "}
//         <span className="font-semibold">{currentUser?.profileStatus}</span>
//       </div>
//     </div>
//   );
// };

// export default GetPremium;








import React, { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const GetPremium = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading, refetch } = useCurrentUser(user?.email);
  const axiosSecure = useAxiosSecure();

  // 🔹 Payment handler
  const handlePaymentBkash = async (name, email, tutorId, amount, role) => {
    try {
      const result = await axiosSecure.post("/paymentBkash", {
        name,
        email,
        tutorId,
        amount,
        source: "getPremium",
        role,
      });

      if (result?.data?.url) {
        // ✅ Set profile status to premium (backend also validates later)
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
            <p className="mt-2 text-gray-500">Intelligence for everyday tasks</p>
            <p className="mt-4 text-3xl font-bold">
              TK 0 <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✨ Access to GPT-5</li>
              <li>📂 Limited file uploads</li>
              <li>🖼️ Slower image generation</li>
              <li>🧠 Limited memory</li>
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
              : "Switch to Free"}
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
              TK 150 <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✨ GPT-5 with advanced reasoning</li>
              <li>📂 Unlimited uploads</li>
              <li>🖼️ Faster image creation</li>
              <li>🧠 Expanded memory</li>
            </ul>
          </div>
          {currentUser?.profileStatus === "premium" ? (
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
                  150,
                  currentUser?.role
                )
              }
              className="mt-6 w-full rounded-2xl bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
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

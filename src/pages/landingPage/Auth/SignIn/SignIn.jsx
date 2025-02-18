// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import GoogleSignIn from "./socialLogIn/GoogleSignIn";
// import { AuthContext } from "../../../../provider/AuthProvider";


// const SignIn = () => {
//   const [role, setRole] = useState("parent");
//   const {signInUser}=useContext(AuthContext);
//     const [showPassword, setShowPassword] = useState(false);
//      const location = useLocation();
//     const navigate = useNavigate();

//     const handleSignIn = e =>{
//         e.preventDefault();
//         const form = e.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         signInUser(email, password)
//         .then(result => {
//             toast.success('Sign In successfully');    
//             setTimeout(() => {
//                 const from = location.state?.from || '/';
//                 navigate(from, { replace: true });
//             }, 1000);
//         })
//         .catch(error => {
//             console.error(error);
//             toast.error('Invalid email or password. Please try again.');
//         });
//     }

//   return (
//    <div>
   
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
//       <div className="flex w-4/5 max-w-4xl bg-white my-8  overflow-hidden">
//         {/* Left Image Section */}
//         <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8">
//           {role === "parent" ? (
//             <img
//               src="/parent-student.png"
//               alt="Parent or Student"
//               className="w-full"
//             />
//           ) : (
//             <img src="/tutor.png" alt="Tutor" className="w-full" />
//           )}
//         </div>

//         {/* Right Form Section */}
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-semibold text-gray-700 text-center">
//             Welcome <span className="text-blue-500">Back</span>
//           </h2>
//           <p className="text-gray-500 text-center">
//             Sign in to Continue your Journey.
//           </p>

//           {/* Role Selection */}
//           <div className="flex justify-center mt-4">
//             <button
//               className={`p-3 border rounded-l-lg w-1/2 ${
//                 role === "parent" ? "border-blue-500 bg-blue-100" : "border-gray-300"
//               }`}
//               onClick={() => setRole("parent")}
//             >
//               Parents Or Student
//             </button>
//             <button
//               className={`p-3 border rounded-r-lg w-1/2 ${
//                 role === "tutor" ? "border-blue-500 bg-blue-100" : "border-gray-300"
//               }`}
//               onClick={() => setRole("tutor")}
//             >
//               Tutor
//             </button>
//           </div>

//           {/* Sign In Form */}
//           <form className="mt-2">
//             <label className="block text-gray-700">Email<span className="text-red-600">*</span></label>
//             <input
//               type="email"
//               className="w-full p-2 border rounded mt-1"
//               placeholder="Enter your email"
//             />

//             <label className="block text-gray-700 mt-2">
//               Password<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="password"
//               className="w-full p-2 border rounded mt-1"
//               placeholder="Enter your password"
//             />

//             <div className="flex justify-between items-center mt-2">
//               <a href="#" className="text-sm text-gray-500 hover:underline">
//                 Forgot Password?
//               </a>
//             </div>

//             <button className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-blue-800 text-xl py-2 font-semibold">
//               Sign In
//             </button>
//           </form>

//           <div className="text-center mt-2 text-gray-500">
//             ──────── Or ────────
//           </div>
//           <GoogleSignIn></GoogleSignIn>
//           <p className="text-center mt-4 text-[14px] text-gray-700">
//             New to TuitionNetwork? Please{" "}
//             <Link to="/signup">
//               <button className="text-blue-700 underline font-semibold">
//                 Sign Up
//               </button>
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SignIn;


import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleSignIn from "./socialLogIn/GoogleSignIn";
import { AuthContext } from "../../../../provider/AuthProvider";

const SignIn = () => {
  const [role, setRole] = useState("parent");
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success("Sign In successfully");
      setTimeout(() => {
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 max-w-4xl bg-white my-8 overflow-hidden">
        {/* Left Image Section */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8">
          <img
            src={role === "parent" ? "/parent-student.png" : "/tutor.png"}
            alt={role === "parent" ? "Parent or Student" : "Tutor"}
            className="w-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome <span className="text-blue-500">Back</span>
          </h2>
          <p className="text-gray-500 text-center">Sign in to Continue your Journey.</p>

          {/* Role Selection */}
          <div className="flex justify-center mt-4">
            <button
              className={`p-3 border rounded-l-lg w-1/2 ${
                role === "parent" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setRole("parent")}
            >
              Parents Or Student
            </button>
            <button
              className={`p-3 border rounded-r-lg w-1/2 ${
                role === "tutor" ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setRole("tutor")}
            >
              Tutor
            </button>
          </div>

          {/* Sign In Form */}
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700">Email<span className="text-red-600">*</span></label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label className="block text-gray-700 mt-2">Password<span className="text-red-600">*</span></label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full mt-6 bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 text-blue-800 text-xl py-2 font-semibold">
              Sign In
            </button>
          </form>

          <div className="text-center mt-2 text-gray-500">──────── Or ────────</div>
          <GoogleSignIn />
          <p className="text-center mt-4 text-[14px] text-gray-700">
            New to TuitionNetwork? Please <Link to="/signup" className="text-blue-700 underline font-semibold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
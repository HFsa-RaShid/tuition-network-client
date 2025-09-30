import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import toast from "react-hot-toast";
import signInImage from "../../../../assets/tutor-student.png";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const res = await axiosPublic.get(`/users/${result.user.email}`);

      if (currentUser.banned === "yes") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        toast.error(
          "🚫 Access restricted: Your account has been banned for violating our community guidelines."
        );
        return;
      }
      toast.success("Successfully Signed In!!");
      navigate(`/${res.data.role}/dashboard`);
    } catch (error) {
      toast.error("Invalid email or password.");
      form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>Sign_In | TuiToria</title>
      </Helmet>
      <div className="flex flex-col md:flex-row w-4/5 max-w-5xl  my-2 overflow-hidden gap-20 p-6">
        {/* Left Image Section */}
        <img src={signInImage} className="h-80 mt-6" />

        {/* Right Form Section */}
        <div className="w-1/2 px-14 py-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome <span className="text-[#123d7e]">Back</span>
          </h2>
          <p className="text-gray-500 text-center">
            Sign in to Continue your Journey.
          </p>

          {/* Sign In Form */}
          <form className="mt-4" onSubmit={handleSignIn}>
            <label className="block text-gray-700">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              required
            />

            <label className="block text-gray-700 mt-2">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 border rounded mt-1 pr-10"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-200 mb-2 text-blue-700 px-3 py-2 rounded hover:bg-blue-300 font-semibold shadow"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-4 text-[14px] text-gray-700">
            New to TuitionNetwork? Please{" "}
            <Link
              to="/signup"
              className="text-blue-700 underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

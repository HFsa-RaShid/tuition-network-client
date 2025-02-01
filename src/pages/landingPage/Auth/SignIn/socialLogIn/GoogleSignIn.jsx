// import { useContext } from "react";
// import { AuthContext } from "../../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
// import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
// import { useLocation, useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  // const {googleSignIn}=useContext(AuthContext);
  // const axiosPublic = useAxiosPublic();
  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleGoogleLogIn = () => {
  //     googleSignIn()
  //     .then(result =>{
  //         console.log(result.user);
  //         const userInfo = {
  //             name: result.user?.displayName,
  //             email: result.user?.email,
  //             role: 'student',
  //             image: result.user?.photoURL
  //         }

  //         axiosPublic.post('/users',userInfo)
  //         .then(res =>{
  //             toast.success('Sign In successfully');
  //         setTimeout(() => {
  //             const from = location.state?.from || '/';
  //             navigate(from, { replace: true });
  //         }, 1000);

  //         })
  //     })
  // };

  return (
    <div>
      <div className="bg-[#f9d045] rounded-3xl shadow-md shadow-blue-500 my-1 font-bold w-full gap-2 flex items-center justify-center text-xl text-center">
        <FcGoogle />
        <button className="text-black py-2">Google</button>
      </div>

      {/* onClick={handleGoogleLogIn} */}
    </div>
  );
};

export default GoogleSignIn;

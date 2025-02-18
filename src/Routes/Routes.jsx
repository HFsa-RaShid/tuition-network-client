import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import DashBoard from "../pages/tutor/dashBoard/DashBoard";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      
      children: [
        {
          path: "/",
          element: <LandingPage></LandingPage>,
          
        },
        {
          path: "/signIn",
          element: <SignIn></SignIn>,
          
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
          
        },
        {
          path: "/tutorDashBoard",
          element: <DashBoard></DashBoard>,
          
        },

      
      ],
    },
  ]);
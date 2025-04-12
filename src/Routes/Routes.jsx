
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";

import DashBoard from "../pages/DashBoard/DashBoard";
import ProfileDetails from "../pages/parentOrStudent/dashBoardPages/ProfileDetails/ProfileDetails";
import TutorRequest from "../pages/parentOrStudent/dashBoardPages/TutorRequest/TutorRequest";
import PostedJobs from "../pages/parentOrStudent/dashBoardPages/postedJobs/PostedJobs";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/dashBoard/:role",
        element: <DashBoard></DashBoard>,
        children: [
              { path: "profile-details", element:  <ProfileDetails />},
              { path: "tutor-request", element: <TutorRequest /> },
              { path: "posted-jobs", element: <PostedJobs></PostedJobs>}
        ],
      },
    
    ],
  },
]);

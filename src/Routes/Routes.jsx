
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import DashBoard from "../pages/DashBoard/DashBoard";
import TutorRequest from "../pages/parentOrStudent/dashBoardPages/TutorRequest/TutorRequest";
import PostedJobs from "../pages/parentOrStudent/dashBoardPages/postedJobs/PostedJobs";
import PrivateRoute from "./PrivateRoute";
import ProfileDetails from "../pages/DashBoard/DashBoardAllPages/ProfileDetails/ProfileDetails";
import DashBoardNotice from "../pages/DashBoard/DashBoardAllPages/DashBoardNoticePage/DashBoardNotice";
import ViewUsers from "../pages/DashBoard/DashBoardAllPages/Users/ViewUsers";


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
        path: "/:role",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
              { path: "dashboard", element: <DashBoardNotice></DashBoardNotice> },
              { path: "profile-details", element: <ProfileDetails></ProfileDetails> },
              { path: "tutor-request", element: <TutorRequest /> },
              { path: "posted-jobs", element: <PostedJobs></PostedJobs>},
              { path: "users", element: <ViewUsers></ViewUsers>}
        ],
      },
    
    ],
  },
]);

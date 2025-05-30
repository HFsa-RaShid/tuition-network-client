
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import DashBoard from "../pages/DashBoard/DashBoard";
import TutorRequest from "../pages/parentOrStudent/dashBoardPages/TutorRequest/TutorRequest";
import PrivateRoute from "./PrivateRoute";
import ProfileDetails from "../pages/DashBoard/DashBoardAllPages/ProfileDetails/ProfileDetails";
import DashBoardNotice from "../pages/DashBoard/DashBoardAllPages/DashBoardNoticePage/DashBoardNotice";
import ViewUsers from "../pages/DashBoard/DashBoardAllPages/Users/ViewUsers";
import JobBoard from "../pages/Shared/Navbar/JobBoard/JobBoard";
import PendingRequest from "../pages/DashBoard/DashBoardAllPages/PendingRequest/PendingRequest";
import PostedJobs from "../pages/DashBoard/DashBoardAllPages/PostedJob/PostedJobs";



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
        path: "/JobBoard",
        element: <JobBoard></JobBoard>,
      },
      {
        path: "/:role",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
              { path: "dashboard", element: <DashBoardNotice></DashBoardNotice> },
              { path: "profile-details", element: <ProfileDetails></ProfileDetails> },
              { path: "tutor-request", element: <TutorRequest /> },
              { path: "posted-jobs", element: <PostedJobs></PostedJobs>},
              { path: "pending-request", element: <PendingRequest></PendingRequest>},
              { path: "users", element: <ViewUsers></ViewUsers>},
              
        ],
      },
    
    ],
  },
]);

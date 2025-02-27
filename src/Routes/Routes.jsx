
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import ParentDashBoard from "../pages/parentOrStudent/dashBoard/ParentDashboard";
import TutorDashBoard from "../pages/tutor/dashBoard/TutorDashBoard";
import TutorRequest from "../pages/parentOrStudent/dashBoardPages/TutorRequest/TutorRequest";
import ProfileDetails from "../pages/parentOrStudent/dashBoardPages/ProfileDetails/ProfileDetails";


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
        path: "/tutorDashBoard",
        element: <TutorDashBoard />,
        // children: [
        //   { path: "profile", element: <TutorProfile /> },
        //   { path: "tutor-requests", element: <TutorRequests /> },
        //   { path: "payments", element: <TutorPayments /> },
        // ],
      },
      {
        path: "/parentDashBoard",
        element: <ParentDashBoard />,
        children: [
          { path: "profile-details", element: <ProfileDetails /> },
          { path: "tutor-request", element: <TutorRequest /> },
          // { path: "posted-jobs", element: <PostedJobs /> },
          // { path: "chat", element: <Chat /> },
          // { path: "payment-history", element: <PaymentHistory /> },
          // { path: "tuition-exchange", element: <TuitionExchange /> },
          // { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import DashBoard from "../pages/DashBoard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import ProfileDetails from "../pages/DashBoard/DashBoardAllPages/ProfileDetails/ProfileDetails";
import DashBoardNotice from "../pages/DashBoard/DashBoardAllPages/DashBoardNoticePage/DashBoardNotice";
import ViewUsers from "../pages/DashBoard/DashBoardAllPages/Users/ViewUsers";
import JobBoard from "../pages/Shared/Navbar/JobBoard/JobBoard";
import PendingRequest from "../pages/DashBoard/DashBoardAllPages/PendingRequest/PendingRequest";
import PostedJobs from "../pages/DashBoard/DashBoardAllPages/PostedJob/PostedJobs";
import AppliedTutorProfile from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutorProfile";
import TutorRequests from "../pages/DashBoard/tutorRequests/TutorRequests";
import MyApplications from "../pages/DashBoard/DashBoardAllPages/MyApplications/MyApplications";
import JobDetails from "../pages/DashBoard/DashBoardAllPages/MyApplications/JobDetails";
import AppliedTutors from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutors";
import SearchByMap from "../pages/Shared/Navbar/SearchByMap/SearchByMap";
import PaymentSuccess from "../pages/DashBoard/DashBoardAllPages/MyApplications/PaymentSuccess";
import PaymentHistory from "../pages/DashBoard/DashBoardAllPages/PaymentHistory/PaymentHistory";
import MatchTutors from "../pages/landingPage/sections/matchedTutorsList/MatchTutors";
import HiredTutors from "../pages/DashBoard/DashBoardAllPages/HiredTutors/HiredTutors";
import TutorProfile from "../pages/landingPage/sections/matchedTutorsList/TutorProfile/TutorProfile";
import MatchedTutorsList from "../pages/landingPage/sections/matchedTutorsList/MatchedTutorsList";
import Tutors from "../pages/Shared/Navbar/tutors/Tutors";
import ProfileTutor from "../pages/Shared/Navbar/tutors/ProfileTutor";

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
        path: "/search-by-map",
        element: (
          <PrivateRoute>
            <SearchByMap></SearchByMap>
          </PrivateRoute>
        ),
      },
      {
        path: "/tutors",
        element: <Tutors></Tutors>,
      },
      {
        path: "/tutors/tutor-profile",
        element: <ProfileTutor></ProfileTutor>,
      },
      // {
      //   path: "/matchTutors",
      //   element: <MatchTutors></MatchTutors>,
      //   children: [
      //      { index: true, element: <MatchedTutorsList /> },
      //     { path: "tutor-profile", element: <TutorProfile></TutorProfile> },
      //   ],
      // },
      {
        path: "/:role",
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
        children: [
          { path: "dashboard", element: <DashBoardNotice></DashBoardNotice> },
          {
            path: "profile-details",
            element: <ProfileDetails></ProfileDetails>,
          },
          { path: "tutor-request", element: <TutorRequests></TutorRequests> },
          { path: "posted-jobs", element: <PostedJobs></PostedJobs> },
          {
            path: "pending-request",
            element: <PendingRequest></PendingRequest>,
          },
          { path: "users", element: <ViewUsers></ViewUsers> },

          {
            path: "myApplications",
            element: <MyApplications></MyApplications>,
          },
          {
            path: "payment/success/:tranId",
            element: <PaymentSuccess></PaymentSuccess>,
          },
          {
            path: "myApplications/job-details/:id",
            element: <JobDetails></JobDetails>,
          },
          {
            path: "posted-jobs/applied-tutors",
            element: <AppliedTutors></AppliedTutors>,
          },
          {
            path: "posted-jobs/applied-tutors/appliedTutor-profile",
            element: <AppliedTutorProfile></AppliedTutorProfile>,
          },
          {
            path: "payment-history",
            element: <PaymentHistory></PaymentHistory>,
          },
          { path: "hired-tutors", element: <HiredTutors></HiredTutors> },
        ],
      },
    ],
  },
]);

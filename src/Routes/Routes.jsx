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
import Tuitions from "../pages/Shared/Navbar/Tuitions/Tuitions";
import PendingRequest from "../pages/DashBoard/DashBoardAllPages/PendingRequest/PendingRequest";
import PostedJobs from "../pages/DashBoard/DashBoardAllPages/PostedJob/PostedJobs";
import AppliedTutorProfile from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutorProfile";
import TutorRequests from "../pages/DashBoard/DashBoardAllPages/tutorRequests/TutorRequests";
import MyApplications from "../pages/DashBoard/DashBoardAllPages/MyApplications/MyApplications";
import JobDetails from "../pages/DashBoard/DashBoardAllPages/MyApplications/JobDetails";
import AppliedTutors from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutors";
import SearchByMap from "../pages/Shared/Navbar/SearchByMap/SearchByMap";
import PaymentSuccess from "../pages/DashBoard/DashBoardAllPages/MyApplications/PaymentSuccess";
import HiredTutors from "../pages/DashBoard/DashBoardAllPages/HiredTutors/HiredTutors";
import Tutors from "../pages/Shared/Navbar/tutors/Tutors";
import ProfileTutor from "../pages/Shared/Navbar/tutors/ProfileTutor";
import OtherPaymentSuccess from "../pages/Shared/otherPaymentSuccess/OtherPaymentSuccess";
import GetPremium from "../pages/DashBoard/DashBoardNav/GetPremium/GetPremium";
import PaymentHistoryTutor from "../pages/DashBoard/DashBoardAllPages/PaymentHistoryTutor/PaymentHistoryTutor";
import PaymentHistoryStudent from "../pages/DashBoard/DashBoardAllPages/PaymentHistoryStudent/PaymentHistoryStudent";
import Settings from "../pages/DashBoard/DashBoardAllPages/userSettings/Settings";

import AllPayment from "../pages/DashBoard/DashBoardAllPages/AllPayment/AllPayment";
import VerifyEmailPage from "../pages/landingPage/Auth/signUp/VerifyEmailPage";
import AboutUs from "../pages/Shared/Footer/AboutUs";
import ContactUs from "../pages/Shared/Footer/ContactUs";
import TermsOfUse from "../pages/Shared/Footer/TermsOfUse";
import PrivacyPolicy from "../pages/Shared/Footer/PrivacyPolicy";
import CookiePolicy from "../pages/Shared/Footer/CookiePolicy";
import CategoryExplorer from "../pages/categories/CategoryExplorer";
import ClassDetails from "../pages/categories/ClassDetails";

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
        path: "/verify-email",
        element: <VerifyEmailPage></VerifyEmailPage>,
      },
      {
        path: "/tuitions",
        element: <Tuitions></Tuitions>,
      },
      {
        path: "/categories",
        element: <CategoryExplorer />,
      },
      {
        path: "/categories/:categoryId/:classId",
        element: <ClassDetails />,
      },
     
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/terms-of-use",
        element: <TermsOfUse></TermsOfUse>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy></CookiePolicy>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
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
        path: "/tutors/tutor-profile/:id",
        element: <ProfileTutor></ProfileTutor>,
      },
      {
        path: "/payment/success/:tranId",
        element: <OtherPaymentSuccess></OtherPaymentSuccess>,
      },
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
            element: <PaymentHistoryTutor></PaymentHistoryTutor>,
          },
          {
            path: "pay-history",
            element: <PaymentHistoryStudent></PaymentHistoryStudent>,
          },
          // { path: "verify-user", element: <VerifyUser></VerifyUser> },
          { path: "hired-tutors", element: <HiredTutors></HiredTutors> },
          { path: "settings", element: <Settings></Settings> },
          { path: "settings/premium", element: <GetPremium></GetPremium> },
          { path: "allPayment", element: <AllPayment></AllPayment> },
        ],
      },
    ],
  },
]);

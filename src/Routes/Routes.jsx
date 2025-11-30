import { createBrowserRouter } from "react-router-dom";

// Layout & Error
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

// Authentication Pages
import SignIn from "../pages/landingPage/Auth/SignIn/SignIn";
import SignUp from "../pages/landingPage/Auth/signUp/SignUp";
import VerifyEmailPage from "../pages/landingPage/Auth/signUp/VerifyEmailPage";

// Public Pages
import LandingPage from "../pages/landingPage/LandingPage";
import CategoryExplorer from "../pages/categories/CategoryExplorer";
import ClassDetails from "../pages/categories/ClassDetails";
import Tutors from "../pages/Shared/Navbar/tutors/Tutors";
import ProfileTutor from "../pages/Shared/Navbar/tutors/ProfileTutor";
import Tuitions from "../pages/Shared/Navbar/Tuitions/Tuitions";
import AboutUs from "../pages/Shared/Footer/AboutUs";
import ContactUs from "../pages/Shared/Footer/ContactUs";
import TermsOfUse from "../pages/Shared/Footer/TermsOfUse";
import PrivacyPolicy from "../pages/Shared/Footer/PrivacyPolicy";
import CookiePolicy from "../pages/Shared/Footer/CookiePolicy";

// Dashboard & Protected Routes
import DashBoard from "../pages/DashBoard/DashBoard";
import DashBoardNotice from "../pages/DashBoard/DashBoardAllPages/DashBoardNoticePage/DashBoardNotice";
import ProfileDetails from "../pages/DashBoard/DashBoardAllPages/ProfileDetails/ProfileDetails";
import TutorRequests from "../pages/DashBoard/DashBoardAllPages/tutorRequests/TutorRequests";
import AdminTutorRequests from "../pages/DashBoard/DashBoardAllPages/tutorRequests/AdminTutorRequests";
import MyApplications from "../pages/DashBoard/DashBoardAllPages/MyApplications/MyApplications";
import JobDetails from "../pages/DashBoard/DashBoardAllPages/MyApplications/JobDetails";
import PaymentSuccess from "../pages/DashBoard/DashBoardAllPages/MyApplications/PaymentSuccess";
import PostedJobs from "../pages/DashBoard/DashBoardAllPages/PostedJob/PostedJobs";
import AppliedTutors from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutors";
import AppliedTutorProfile from "../pages/DashBoard/DashBoardAllPages/PostedJob/AppliedTutorProfile";
import PendingRequest from "../pages/DashBoard/DashBoardAllPages/PendingRequest/PendingRequest";
import HiredTutors from "../pages/DashBoard/DashBoardAllPages/HiredTutors/HiredTutors";
import Settings from "../pages/DashBoard/DashBoardAllPages/userSettings/Settings";
import GetPremium from "../pages/DashBoard/DashBoardNav/GetPremium/GetPremium";
import PaymentHistoryTutor from "../pages/DashBoard/DashBoardAllPages/PaymentHistoryTutor/PaymentHistoryTutor";
import PaymentHistoryStudent from "../pages/DashBoard/DashBoardAllPages/PaymentHistoryStudent/PaymentHistoryStudent";
import AllPayment from "../pages/DashBoard/DashBoardAllPages/AllPayment/AllPayment";
import ViewUsers from "../pages/DashBoard/DashBoardAllPages/Users/ViewUsers";
import SearchByMap from "../pages/Shared/Navbar/SearchByMap/SearchByMap";
import OtherPaymentSuccess from "../pages/Shared/otherPaymentSuccess/OtherPaymentSuccess";

// Public Routes
const publicRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
  { path: "/tuitions", element: <Tuitions /> },
  { path: "/categories", element: <CategoryExplorer /> },
  { path: "/categories/:categoryId/:classId", element: <ClassDetails /> },
  { path: "/tutors", element: <Tutors /> },
  { path: "/tutors/tutor-profile/:id", element: <ProfileTutor /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/cookie-policy", element: <CookiePolicy /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/payment/success/:tranId", element: <OtherPaymentSuccess /> },
];

// Protected Routes (require authentication)
const protectedRoutes = [
  {
    path: "/search-by-map",
    element: (
      <PrivateRoute>
        <SearchByMap />
      </PrivateRoute>
    ),
  },
];

// Dashboard Routes (nested under /:role)
const dashboardRoutes = [
  { path: "dashboard", element: <DashBoardNotice /> },
  { path: "profile-details", element: <ProfileDetails /> },
  { path: "tutor-request", element: <TutorRequests /> },
  { path: "tutor-requests-admin", element: <AdminTutorRequests /> },
  { path: "posted-jobs", element: <PostedJobs /> },
  { path: "pending-request", element: <PendingRequest /> },
  { path: "users", element: <ViewUsers /> },
  { path: "myApplications", element: <MyApplications /> },
  { path: "payment/success/:tranId", element: <PaymentSuccess /> },
  { path: "myApplications/job-details/:id", element: <JobDetails /> },
  { path: "posted-jobs/applied-tutors", element: <AppliedTutors /> },
  {
    path: "posted-jobs/applied-tutors/appliedTutor-profile",
    element: <AppliedTutorProfile />,
  },
  { path: "payment-history", element: <PaymentHistoryTutor /> },
  { path: "pay-history", element: <PaymentHistoryStudent /> },
  { path: "hired-tutors", element: <HiredTutors /> },
  { path: "get-premium", element: <GetPremium /> },
  { path: "allPayment", element: <AllPayment /> },
];

// Main Router Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
      ...protectedRoutes,
      {
        path: "/:role",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
        children: dashboardRoutes,
      },
    ],
  },
]);

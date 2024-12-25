import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LandingPage from "../pages/landingPage/LandingPage";



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
      
      ],
    },
  ]);
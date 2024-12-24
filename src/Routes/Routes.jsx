import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";

import ErrorPage from "../pages/errorPage/ErrorPage";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      
      children: [
        {
          path: "/",
          element: <Home></Home>,
          
        },
      
      ],
    },
  ]);
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Context
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-md" />;
  }

  if (user) {
    return children;
  }
  return <Navigate state={{ from: location.pathname }} to="/signIn" />;
};

export default PrivateRoute;

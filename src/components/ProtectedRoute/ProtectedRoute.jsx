import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, authChecked, children }) => {
  if (!authChecked) {
    // auth status not loaded yet
    return null; // or a loader <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

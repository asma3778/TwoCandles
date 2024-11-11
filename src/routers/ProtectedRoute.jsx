import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, userRole, requiredRole, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signIn" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;

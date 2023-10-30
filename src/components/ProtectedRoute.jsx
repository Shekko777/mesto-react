import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  props.logedIn ? <Component {...props} /> : <Navigate to="/sign-up" replace /> ;
}

export default ProtectedRoute;
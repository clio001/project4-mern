import { Navigate } from "react-router-dom";
import useIsAuthorized from "../utils/useIsAuthorized";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { userStatus } = useContext(AuthContext);
  console.log("Authorization status: ", userStatus);
  return <>{userStatus ? children : <Navigate to="/" replace />}</>;
}

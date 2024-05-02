import React, { useContext } from "react";
// import { isLoggedIn } from "../service/Authentication";
import { Navigate, Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser.loginStatus);
  if (!currentUser.loginStatus) {
    console.log(currentUser.loginStatus);
    toast.error("Please Do signin First");

    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

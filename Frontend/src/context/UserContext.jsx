import { createContext, useEffect, useState } from "react";
import {  getCurrentUserDetails, isLoggedIn } from "../service/Authentication";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    data: "",
    loginStatus: false ,
  });

  useEffect(() => {
    setCurrentUser({
      data: getCurrentUserDetails(),
      loginStatus:  isLoggedIn(),
    });
  }, []);

  const value = {
    currentUser, setCurrentUser
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;

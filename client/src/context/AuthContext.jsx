import { createContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [userStatus, setUserStatus] = useState(false);

  const isLoggedIn = () => {
    const token = getToken();

    if (token) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
    return token;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUserStatus(false);
    console.log("=> User has been logged out.");
  };

  useEffect(() => {
    isLoggedIn();
  }, [userStatus]);

  return (
    <AuthContext.Provider value={{ userStatus, setUserStatus, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

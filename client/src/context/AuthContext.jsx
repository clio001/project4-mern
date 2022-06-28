import { createContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [userStatus, setUserStatus] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  let navigate = useNavigate();

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
    navigate("/");
    console.log("=> User has been logged out.");
  };

  const getProfileData = async () => {
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5001/users/profile",
        requestOptions
      );
      const profileData = await response.json();
      setUserProfile(profileData);
    } catch (error) {
      console.log("Error fetching profile data: ", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    isLoggedIn();
  }, [userStatus]);

  return (
    <AuthContext.Provider
      value={{ userStatus, setUserStatus, userProfile, setUserProfile, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

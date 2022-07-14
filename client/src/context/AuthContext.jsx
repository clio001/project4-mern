import { createContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [userStatus, setUserStatus] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const token = getToken();
  let navigate = useNavigate();

  // * Set userAuthorized to check authorization

  const isLoggedIn = () => {
    if (token) {
      setUserStatus(true);
      navigate("/dashboard");
      console.log("=> User is logged in.");
    } else {
      setUserStatus(false);
    }
    return token;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUserStatus(false);
    navigate("/");
    console.log("=> User is logged out.");
  };

  const getProfileData = async () => {
    if (token) {
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
        isLoggedIn();
        console.log("Profile data: ", profileData);
      } catch (error) {
        console.log("Error fetching profile data: ", error);
      }
    } else return;
  };

  useEffect(() => {
    getProfileData();
  }, [userStatus]);

  // ? Moved isLoggedIn to getProfileData function to avoid async shenanigans
  useEffect(() => {}, [userStatus]);

  return (
    <AuthContext.Provider
      value={{
        userStatus,
        setUserStatus,
        userProfile,
        setUserProfile,
        logOut,
        token,
        getProfileData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

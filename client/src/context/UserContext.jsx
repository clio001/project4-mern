import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [allUsers, setAllUsers] = useState();

  // * GET all users

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/users/all");
      const result = await response.json();
      setAllUsers(result);
    } catch (error) {
      console.log("ERROR: Unable to get all users.", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ allUsers }}>
      {props.children}
    </UserContext.Provider>
  );
};

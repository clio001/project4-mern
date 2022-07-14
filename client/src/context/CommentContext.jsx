import { useState, createContext, useEffect } from "react";

export const CommentContext = createContext();

export const CommentContextProvider = (props) => {
  const [allComments, setAllComments] = useState();

  //* GET all comments

  const getAllComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/comments/all-comments"
      );
      const result = await response.json();
      setAllComments(result);
    } catch (error) {
      console.log("ERROR: Unable to fetch all comments.", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <CommentContext.Provider value={{ allComments }}>
      {props.children}
    </CommentContext.Provider>
  );
};

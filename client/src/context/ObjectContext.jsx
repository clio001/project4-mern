import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ObjectContext = createContext();

export const ObjectContextProvider = (props) => {
  const { userProfile } = useContext(AuthContext);
  const [newObject, setNewObject] = useState();
  const [docImage, setDocImage] = useState(null);

  // * POST new object

  const handleNewObjectForm = (e) => {
    setNewObject({
      ...newObject,
      [e.target.name]: e.target.value,
    });
  };

  // * Upload image

  const handleSelectedImage = (e) => {
    setDocImage(e.target.files[0]);
  };

  const createNewObject = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("docImage: ", docImage.name);
    formData.append("image", docImage);
    console.log("FormData: ", formData);

    const requestImageOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/objects/upload-image",
        requestImageOptions
      );
      const result = await response.json();
      console.log("Result of image upload: ", result);
      /*  setNewObject({ image_url: result.image_URL });
      console.log(newObject); */
    } catch (error) {
      console.log("ERROR: Unable to upload image file.");
    }

    /*  let urlencoded = new URLSearchParams();
    urlencoded.append("user_id", userProfile.user._id);
    urlencoded.append("title", newObject.title);
    urlencoded.append("date", newObject.date);
    urlencoded.append("creator", newObject.creator);
    urlencoded.append("archive", newObject.archive);
    urlencoded.append("description", newObject.description);
    urlencoded.append("rights", newObject.rights);
    urlencoded.append("web_url", newObject.web_url);
    urlencoded.append("image_url", newObject.image_url);
    urlencoded.append("type", newObject.type);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/objects/new-object",
        requestOptions
      );
      const result = await response.json();
      console.log("Result from posting new object: ", result);
    } catch (error) {
      console.log("ERROR posting new object.", error);
    } */
  };

  return (
    <ObjectContext.Provider
      value={{
        handleNewObjectForm,
        createNewObject,
        handleSelectedImage,
      }}
    >
      {props.children}
    </ObjectContext.Provider>
  );
};

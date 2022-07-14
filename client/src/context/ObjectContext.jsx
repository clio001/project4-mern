import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ObjectContext = createContext();

export const ObjectContextProvider = (props) => {
  const { userProfile } = useContext(AuthContext);
  const [newObject, setNewObject] = useState();
  const [docImage, setDocImage] = useState(null);
  const [allObjects, setAllObjects] = useState();
  const [open, setOpen] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackError, setSnackError] = useState(false);

  // * GET all objects

  const getAllObjects = async () => {
    try {
      const response = await fetch("http://localhost:5001/objects/all");
      const result = await response.json();
      setAllObjects(result);
    } catch (error) {
      console.log("ERROR: Unable to fetch all objects.", error);
    }
  };
  useEffect(() => {
    getAllObjects();
  }, []);

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

      let urlencoded = new URLSearchParams();
      urlencoded.append("user_id", userProfile.user._id);
      urlencoded.append("title", newObject.title);
      urlencoded.append("date", newObject.date);
      urlencoded.append("creator", newObject.creator);
      urlencoded.append("archive", newObject.archive);
      urlencoded.append("description", newObject.description);
      urlencoded.append("rights", newObject.rights);
      urlencoded.append("web_url", newObject.web_url);
      urlencoded.append("image_url", result.image_URL);
      urlencoded.append("type", newObject.type);
      urlencoded.append("createdBy", userProfile.user._id);

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
      }
      setNewObject({ image_url: result.image_URL });
      setOpen(false);
      setSnackSuccess(true);
    } catch (error) {
      setSnackError(true);
      console.log("ERROR: Unable to upload image file.");
    }
  };

  return (
    <ObjectContext.Provider
      value={{
        handleNewObjectForm,
        createNewObject,
        handleSelectedImage,
        allObjects,
        setAllObjects,
        open,
        setOpen,
        snackSuccess,
        snackError,
        setSnackError,
        setSnackSuccess,
      }}
    >
      {props.children}
    </ObjectContext.Provider>
  );
};

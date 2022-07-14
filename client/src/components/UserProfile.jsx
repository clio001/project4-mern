import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  TextField,
  Input,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Avatar,
  Modal,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ReturnButton from "./ReturnButton";

function UserProfile() {
  const { userProfile, logOut } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleDelete = () => setOpen(true);

  // * Set file object (name, size, type, last changed) to selectedFile state variable

  const handleSelectedFile = (e) => {
    console.log("Selected file: ", e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  // * Upload function for image file => moved into Update User function to save updated information and upload file at the same time

  /* const uploadImage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user_id", userProfile.user._id);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/users/upload-image",
        requestOptions
      );
      const result = await response.json();
      console.log("Result of image upload: ", result);
      setUpdatedInfo({ avatar_url: result.image_URL });
      console.log(updatedInfo);
    } catch (error) {
      console.log("ERROR: Unable to upload image file.");
    }
  }; */

  // * Delete account

  const deleteAccount = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", userProfile.user.email);

    const requestOptions = {
      method: "DELETE",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/users/delete",
        requestOptions
      );
      const results = await response.json();
      console.log("Account deletion results: ", results);

      handleClose();
      logOut();
    } catch (error) {
      console.log("ERROR: Unable to delete account.", error);
    }
  };

  // * Update Account

  const handleFormChange = (event) => {
    setUpdatedInfo({ ...updatedInfo, [event.target.name]: event.target.value });
    console.log(updatedInfo);
  };
  const updateAccount = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user_id", userProfile.user._id);

    const requestImageOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/users/upload-image",
        requestImageOptions
      );
      const result = await response.json();
      console.log("Result of image upload: ", result);
      setUpdatedInfo({ avatar_url: result.image_URL });
    } catch (error) {
      console.log("ERROR: Unable to upload image file.");
    }

    let urlencoded = new URLSearchParams();
    urlencoded.append("firstName", updatedInfo.firstName);
    urlencoded.append("lastName", updatedInfo.lastName);
    urlencoded.append("organization", updatedInfo.organization);
    urlencoded.append("project", updatedInfo.project);
    urlencoded.append("role", updatedInfo.role);
    urlencoded.append("id", userProfile.user._id);

    const requestOptions = {
      method: "PATCH",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "httP://localhost:5001/users/update-profile",
        requestOptions
      );
      const result = await response.json();
      console.log("Result of user info update: ", result);
      navigate(0);
    } catch (error) {
      console.log("ERROR: Unable to update user information.", error);
    }
  };

  return (
    <div id="home-screen">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal confirmation"
        aria-describedby="modal account deletion confirmation"
      >
        <Box className="modalStyle">
          <Typography>Permanently delete this account?</Typography>
          {userProfile && (
            <Typography variant="h6" sx={{ marginTop: "1rem" }}>
              {userProfile.user.email}
            </Typography>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={deleteAccount}
            sx={{ marginTop: "2rem" }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#489a8e",
              color: "#489a8e",
              marginTop: "1rem",
            }}
          >
            Back
          </Button>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "1rem",
          paddingTop: "1rem",
        }}
      >
        <ReturnButton />
      </Box>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "max-content",
            padding: "1rem",
            justifyContent: "flex-start",
            alignItems: "start",
            opacity: "0.9",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Box style={{ marginRight: "1rem" }}>
                <Avatar
                  sx={{ width: 75, height: 75 }}
                  src={userProfile.user.avatar_url}
                  alt="User profile"
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {userProfile.user.firstName && (
                    <Typography variant="h5">
                      {userProfile.user.firstName} {userProfile.user.lastName}{" "}
                    </Typography>
                  )}
                  {userProfile.user.role === "Admin" && (
                    <LocalPoliceOutlinedIcon
                      fontSize="small"
                      sx={{ color: "gray", marginLeft: "0.5rem" }}
                    />
                  )}
                  {userProfile.user.comments.length > 9 && (
                    <WorkspacePremiumOutlinedIcon
                      fontSize="small"
                      sx={{ color: "gray", marginLeft: "0.5rem" }}
                    />
                  )}
                </Box>

                {userProfile.user.organization ? (
                  <Typography variant="body2" color="text.secondary">
                    {userProfile.user.organization}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No organization
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {userProfile.user.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Role</Typography>
                {userProfile.user.role ? (
                  <Typography variant="body2" color="text.secondary">
                    {userProfile.user.role}
                  </Typography>
                ) : (
                  <Typography>No role selected</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={8} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Objects</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {userProfile.user.object &&
                    userProfile.user.object.map((element, i) => {
                      return (
                        <div key={i}>
                          <Link to={`/single-object/${element._id}`}>
                            <img
                              src={element.image_url}
                              alt="Object description"
                              style={{
                                height: "50px",
                                borderRadius: "5px",
                                marginRight: "0.5rem",
                              }}
                            />
                          </Link>
                        </div>
                      );
                    })}
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                  marginTop: "1rem",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Divider>
                      <EditIcon style={{ color: "#489a8e" }} />
                    </Divider>
                  </Box>
                  <TextField
                    variant="standard"
                    required
                    name="firstName"
                    label="First name"
                    onChange={handleFormChange}
                    style={{ margin: "0.5rem" }}
                  />
                  <TextField
                    variant="standard"
                    required
                    name="lastName"
                    label="Last name"
                    onChange={handleFormChange}
                    style={{ margin: "0.5rem" }}
                  />
                  <TextField
                    variant="standard"
                    required
                    name="organization"
                    label="Organization"
                    onChange={handleFormChange}
                    style={{ margin: "0.5rem" }}
                  />
                  <FormControl
                    variant="standard"
                    style={{ margin: "0.5rem" }}
                    required
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      name="role"
                      defaultValue=""
                      onChange={handleFormChange}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Contributor">Contributor</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ marginLeft: "0.5rem", marginTop: "0.8rem" }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Add image:
                    </Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    type="file"
                    name="image_URL"
                    label=""
                    style={{ margin: "0.5rem" }}
                    onChange={handleSelectedFile}
                  />

                  <Button
                    variant="contained"
                    onClick={updateAccount}
                    style={{
                      marginTop: "1.5rem",
                      backgroundColor: "#489a8e",
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    style={{
                      marginTop: "1.5rem",
                      marginBottom: "3rem",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default UserProfile;

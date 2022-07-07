import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  FormControlLabel,
  Modal,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function UserProfile() {
  const { userProfile, logOut } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  const handleDelete = () => setOpen(true);

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
  const updateAccount = async () => {
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
                <img
                  src="http://www.johnwoitkowitz.de/3813184d-3.jpg"
                  className="user-profile-img"
                  alt="User profile"
                />
              </Box>
              <Box sx={{}}>
                {userProfile.user.firstName && (
                  <Typography variant="h5">
                    {userProfile.user.firstName} {userProfile.user.lastName}{" "}
                  </Typography>
                )}

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
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Projects</Typography>
                {userProfile.user.project ? (
                  <Typography>{userProfile.user.project}</Typography>
                ) : (
                  <Typography>No project selected</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Objects</Typography>
                <Box>
                  {userProfile.user.object &&
                    userProfile.user.object.map((element, i) => {
                      return (
                        <>
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
                        </>
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
                    <InputLabel>Project</InputLabel>
                    <Select
                      label="Project"
                      name="project"
                      onChange={handleFormChange}
                      defaultValue=""
                    >
                      <MenuItem value="62ac5335d3749757becff764">
                        Estudios Espanoles
                      </MenuItem>
                      <MenuItem value="Climate Governance">
                        Climate Governance
                      </MenuItem>
                      <MenuItem value="Receta del tamal">
                        La receta del tamal
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="moderator">Moderator</MenuItem>
                      <MenuItem value="contributor">Contributor</MenuItem>
                    </Select>
                  </FormControl>
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

import React, { useContext, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Switch,
  Zoom,
  Grid,
  FormControlLabel,
  Modal,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { userProfile, logOut } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const navigate = useNavigate();

  const handleSwitch = () => {
    if (checked) {
      setChecked(false);
      console.log(checked);
    } else {
      setChecked(true);
      console.log(checked);
    }
  };

  const handleClose = () => setOpen(false);

  const handleDelete = () => setOpen(true);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };

  // * Delete account

  const deleteAccount = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", userProfile.email);

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
    urlencoded.append("id", userProfile._id);
    console.log(userProfile._id);

    const requestOptions = {
      method: "PUT",
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
        <Box sx={modalStyle}>
          <Typography>Permanently delete this account?</Typography>
          {userProfile && (
            <Typography variant="h6" sx={{ marginTop: "1rem" }}>
              {userProfile.email}
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
        <Paper
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box style={{ textAlign: "end" }}>
                <FormControlLabel
                  labelPlacement="start"
                  label=""
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleSwitch}
                      size="small"
                      style={{ color: "#489a8e" }}
                    />
                  }
                />
              </Box>
            </Grid>
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
                {userProfile.firstName ? (
                  <Typography variant="h5">
                    {userProfile.firstName} {userProfile.lastName}{" "}
                  </Typography>
                ) : (
                  <Typography variant="h5">No username</Typography>
                )}

                {userProfile.organization ? (
                  <Typography variant="body2" color="text.secondary">
                    {userProfile.organization}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No organization
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {userProfile.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Projects</Typography>
                {userProfile.project ? (
                  <Typography>{userProfile.project}</Typography>
                ) : (
                  <Typography>No project selected</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <Box style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <Typography variant="subtitle2">Objects</Typography>
                <Typography>5th IPCC Report</Typography>
              </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={0} lg={4} xl={4}></Grid>
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
                {checked && (
                  <Zoom in={checked}>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        <Divider>
                          <Chip
                            label="Update your profile"
                            style={{
                              color: "white",
                              backgroundColor: "#489a8e",
                            }}
                          />
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
                  </Zoom>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default UserProfile;

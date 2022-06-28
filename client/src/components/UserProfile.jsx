import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  const handleSwitch = () => {
    if (checked) {
      setChecked(false);
      console.log(checked);
    } else {
      setChecked(true);
      console.log(checked);
    }
  };

  const handleFormChange = () => {};

  return (
    <div id="home-screen">
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
                <Typography>Climate Science and Governance</Typography>
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
                        name="email"
                        label="E-Mail"
                        onChange={handleFormChange}
                        style={{ margin: "0.5rem" }}
                      />
                      <TextField
                        variant="standard"
                        type="password"
                        required
                        name="password"
                        label="Password"
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
                        style={{
                          marginTop: "1.5rem",
                          backgroundColor: "#489a8e",
                        }}
                      >
                        Save
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

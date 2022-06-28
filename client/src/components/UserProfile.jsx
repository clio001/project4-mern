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
} from "@mui/material";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { userProfile, setUserProfile } = useContext(AuthContext);

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
            marginTop: "0.5rem",
          }}
        >
          {userProfile ? (
            <>
              <Box style={{ marginRight: "1rem" }}>
                <img
                  src="http://www.johnwoitkowitz.de/3813184d-3.jpg"
                  className="user-profile-img"
                />
              </Box>
              <Box>
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
              <Box style={{ marginLeft: "0.5rem", marginTop: "1.5rem" }}>
                <Typography variant="subtitle2">Projects</Typography>
                <Typography>Climate Science and Governance</Typography>
              </Box>
              <Box style={{ marginLeft: "0.5rem", marginTop: "1.5rem" }}>
                <Typography variant="subtitle2">Objects</Typography>
                <Typography>5th IPCC Report</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="subtitle1">No profile data found.</Typography>
          )}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              marginTop: "2rem",
            }}
          >
            <Divider>
              <Chip label="Update your profile" />
            </Divider>
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
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default UserProfile;

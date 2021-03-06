import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [newUser, setNewUser] = useState({});
  const [signUpAlert, setSignUpAlert] = useState(false);
  const navigate = useNavigate();

  function closeBanner() {
    setSignUpAlert(false);
    navigate(-1);
  }

  const handleFormChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  // * Create frontend sign-up function to send user input to backend
  const signUpUser = async () => {
    // TODO: include checks that all fields are completed and code requirements met.

    let urlencoded = new URLSearchParams();
    urlencoded.append("firstName", newUser.firstName);
    urlencoded.append("lastName", newUser.lastName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("organization", newUser.organization);
    urlencoded.append("project", newUser.project);
    urlencoded.append("role", newUser.role);
    urlencoded.append("createdAt", newUser.createdAt);

    // * Defining the method and format for the post request
    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    // * Fetch function to post the new user object collected from the frontend form to the database via the endpoint
    try {
      const response = await fetch(
        "http://localhost:5001/users/signup",
        requestOptions
      );
      const results = await response.json();
      setSignUpAlert(true);
      setTimeout(closeBanner, 3000);
      console.log("Results: ", results);
    } catch (error) {
      setSignUpAlert(false);
      console.log("Failed to transmit user data to backend.", error);
    }
  };

  return (
    <div id="home-screen">
      <Collapse in={signUpAlert}>
        <Alert severity="success">
          {newUser.firstName} {newUser.lastName} successfully signed up!
        </Alert>{" "}
      </Collapse>

      <Box
        id="form"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Paper
          variant="elevation"
          elevation={3}
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "row",
            width: "24rem",
            marginTop: "2rem",
            opacity: "0.9",
          }}
        >
          <Box>
            <Box>
              <Typography variant="h5" m={1}>
                New user
              </Typography>
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
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
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
                  style={{ width: "165px" }}
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
                  style={{ width: "165px" }}
                  onChange={handleFormChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  <MenuItem value="contributor">Contributor</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              variant="contained"
              onClick={signUpUser}
              style={{ margin: "1rem", backgroundColor: "#489a8e" }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

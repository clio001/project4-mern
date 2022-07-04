import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Collapse,
  Alert,
} from "@mui/material";

function CreateProject() {
  const [newProject, setNewProject] = useState({});
  const [signUpAlert, setSignUpAlert] = useState(false);
  const navigate = useNavigate();

  function closeBanner() {
    setSignUpAlert(false);
    navigate(-1);
  }

  const handleFormChange = (event) => {
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  };

  // * Create frontend function to submit form data to insert new project into database

  const submitForm = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", newProject.name);
    urlencoded.append("description", newProject.description);
    urlencoded.append("organization", newProject.organization);
    urlencoded.append("email", newProject.email);
    urlencoded.append("website", newProject.website);

    // * Define request options as a post request and that the form data is submitted in the body of the request

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    // * Fetch function to post form data from the frontend to the database via the endpoint

    try {
      const response = await fetch(
        "http://localhost:5001/projects/newproject",
        requestOptions
      );
      const results = await response.json();
      setSignUpAlert(true);
      setTimeout(closeBanner, 2000);
      console.log("New project created: ", results);
    } catch (error) {
      setSignUpAlert(false);
      console.log("Failed to transmit new project data to backend");
    }
  };

  return (
    <div id="home-screen">
      <Collapse in={signUpAlert}>
        <Alert severity="success">
          New project "{newProject.name}" created!
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
                Create a new project
              </Typography>
              <TextField
                variant="standard"
                required
                name="name"
                label="Name"
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
              <TextField
                variant="standard"
                required
                name="website"
                label="Website"
                onChange={handleFormChange}
                style={{ margin: "0.5rem" }}
              />
              <FormControl variant="standard" style={{ margin: "0.5rem" }}>
                <InputLabel>Members</InputLabel>
                <Select
                  label="Members"
                  name="users"
                  defaultValue=""
                  disabled
                  style={{ width: "165px" }}
                  onChange={handleFormChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  <MenuItem value="contributor">Contributor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="standard"
                required
                name="description"
                label="Description"
                onChange={handleFormChange}
                style={{ margin: "0.5rem" }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              onClick={submitForm}
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

export default CreateProject;

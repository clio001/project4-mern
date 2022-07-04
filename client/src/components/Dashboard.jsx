import {
  Typography,
  Box,
  Paper,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Drawer,
  Chip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "../App.css";
import { ProjectFetchContext } from "../context/ProjectFetchContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloseIcon from "@mui/icons-material/Close";
import { ObjectContext } from "../context/ObjectContext";

export default function Dashboard() {
  const { projectData } = useContext(ProjectFetchContext);
  const { userProfile } = useContext(AuthContext);
  const { handleNewObjectForm, createNewObject } = useContext(ObjectContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleNewObject = () => setOpen(true);

  const drawerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <>
      <div id="home-screen">
        <Drawer
          anchor="top"
          variant="temporary"
          open={open}
          onClose={handleClose}
        >
          <Box sx={drawerStyle}>
            <Box sx={{ textAlign: "end", marginTop: "0.5rem" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h5">Create new object</Typography>
            <Box sx={{ textAlign: "center", marginTop: "0.5rem" }}>
              <PostAddIcon fontSize="large" sx={{ color: "#489a8e" }} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  required
                  name="title"
                  label="Title"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {" "}
                <TextField
                  variant="standard"
                  required
                  name="creator"
                  label="Creator"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {" "}
                <TextField
                  variant="standard"
                  required
                  name="date"
                  label="Date"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  required
                  name="type"
                  label="Type"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  required
                  name="archive"
                  label="Archive"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  required
                  name="rights"
                  label="Rights"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  name="web_url"
                  label="Website"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  name="image_url"
                  label="Image"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  variant="standard"
                  required
                  name="description"
                  label="Description"
                  onChange={handleNewObjectForm}
                  style={{ width: "70%" }}
                />
              </Grid>
            </Grid>
            <Box>
              <Button
                type="submit"
                variant="contained"
                onClick={createNewObject}
                style={{
                  marginTop: "2rem",
                  marginBottom: "5rem",
                  backgroundColor: "#489a8e",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Drawer>
        <Paper elevation={3}>
          <Grid container spacing={2} sx={{ marginLeft: "0.1rem" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              {" "}
              <Box>
                {userProfile ? (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      Dashboard / {userProfile.firstName} {userProfile.lastName}
                    </Typography>{" "}
                    <Typography variant="h3" component="h2">
                      Dashboard
                    </Typography>
                    <Box sx={{ marginTop: "1rem" }}>
                      Objects:
                      <Chip
                        label={`${userProfile.object.length}`}
                        variant="outlined"
                        sx={{
                          marginLeft: "0.5rem",
                          backgroundColor: "#489a8e",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      Dashboard / Not logged in
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              {" "}
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <TextField
                    label="Search"
                    variant="standard"
                    sx={{ pr: "1rem" }}
                  >
                    Search
                  </TextField>
                  {/*                   <Link to="/new-project">
                    <Button
                      variant="outlined"
                      style={{ borderColor: "#489a8e", color: "#489a8e" }}
                    >
                      Create Project
                    </Button> </Link>*/}

                  <Button
                    variant="outlined"
                    onClick={handleNewObject}
                    style={{ borderColor: "#489a8e", color: "#489a8e" }}
                  >
                    <PostAddIcon />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {userProfile && console.log(userProfile.object)}
                {userProfile.object &&
                  userProfile.object.map((element, i) => {
                    console.log(element);
                    return (
                      <Box className="dashboard-box-container" key={i}>
                        <Link to="/single-object">
                          <Box>
                            <img
                              src="https://icon-library.com/images/file_light-14-512.png"
                              style={{ width: "50px" }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Object
                            </Typography>
                            <Typography variant="subtitle1">
                              {element.title}
                            </Typography>
                            <Chip
                              label={`${element.comments.length} comments`}
                              variant="outlined"
                            />
                          </Box>
                        </Link>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

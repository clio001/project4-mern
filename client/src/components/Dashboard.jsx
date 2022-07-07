import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Grid,
  IconButton,
  Drawer,
  Divider,
  Chip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ObjectContext } from "../context/ObjectContext";

export default function Dashboard() {
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

  const messageDate = (time) => {
    let date = new Date(time);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
            <Grid container spacing={0} columns={12}>
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
        <Box>
          <Grid container spacing={2} sx={{ marginLeft: "0.1rem" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box>
                {userProfile && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Dashboard / {userProfile.user.firstName}{" "}
                        {userProfile.user.lastName}
                      </Typography>
                      <TextField
                        label="Search"
                        variant="standard"
                        sx={{ pr: "1rem" }}
                        size="small"
                      >
                        Search
                      </TextField>
                    </Box>{" "}
                    <Typography variant="h3" component="h2">
                      Dashboard
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ marginTop: "1rem", fontSize: "small" }}>
                        Docs:
                        <Chip
                          label={`${userProfile.user.object.length}`}
                          variant="outlined"
                          sx={{
                            marginLeft: "0.5rem",

                            color: "#489a8e",
                            borderColor: "#489a8e",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          marginTop: "1rem",
                          marginLeft: "0.5rem",
                          fontSize: "small",
                        }}
                      >
                        Comments:
                        <Chip
                          label={`${userProfile.user.comments.length}`}
                          variant="outlined"
                          sx={{
                            marginLeft: "0.5rem",
                            color: "#489a8e",
                            borderColor: "#489a8e",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          marginTop: "1rem",
                          marginLeft: "0.5rem",
                          fontSize: "small",
                        }}
                      >
                        Likes:
                        <Chip
                          label="24"
                          variant="outlined"
                          sx={{
                            marginLeft: "0.5rem",

                            color: "#489a8e",
                            borderColor: "#489a8e",
                          }}
                        />
                      </Box>
                    </Box>
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
                    alignItems: "center",
                  }}
                >
                  {/*                   <Link to="/new-project">
                    <Button
                      variant="outlined"
                      style={{ borderColor: "#489a8e", color: "#489a8e" }}
                    >
                      Create Project
                    </Button> </Link>*/}

                  <Button
                    variant="contained"
                    onClick={handleNewObject}
                    style={{
                      borderColor: "#489a8e",
                      backgroundColor: "#489a8e",
                      color: "white",
                      marginRight: "1rem",
                    }}
                  >
                    <PostAddIcon />
                  </Button>
                  <Link to="/">
                    <Button
                      variant="contained"
                      style={{
                        borderColor: "#489a8e",
                        backgroundColor: "#489a8e",
                        color: "white",
                        marginRight: "1rem",
                      }}
                    >
                      <LibraryBooksIcon />
                    </Button>
                  </Link>
                  <Link to="/user-profile">
                    <Button
                      variant="contained"
                      style={{
                        borderColor: "#489a8e",
                        backgroundColor: "#489a8e",
                        color: "white",
                      }}
                    >
                      <AccountCircleIcon />
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Divider>
                <Chip
                  label="My Docs"
                  sx={{
                    backgroundColor: "#489a8e",
                    color: "white",
                    fontSize: "16px",
                    padding: "1rem",
                  }}
                />
              </Divider>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  marginBottom: "4rem",
                }}
              >
                {userProfile.user.object &&
                  userProfile.user.object.map((element, i) => {
                    return (
                      <div key={i}>
                        <Box className="dashboard-box-container">
                          <Link to={`/single-object/${element._id}`}>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                <Box>
                                  <img
                                    src={element.image_url}
                                    alt="Object illustration"
                                    style={{
                                      width: "75px",
                                      marginRight: "1rem",
                                      marginBottom: "0.5rem",
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Document
                                  </Typography>
                                  <Typography variant="body2">
                                    {element.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ marginBottom: "0.5rem" }}
                                  >
                                    by {element.creator}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Added on
                                  </Typography>
                                  <Typography variant="body2">
                                    {messageDate(element.createdAt)}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ marginTop: "0.5rem" }}>
                                <Chip
                                  label={`${element.comments.length} comments`}
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Link>
                        </Box>
                      </div>
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

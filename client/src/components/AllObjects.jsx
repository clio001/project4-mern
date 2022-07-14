import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Chip, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
import ReturnButton from "./ReturnButton";

function AllObjects() {
  const [allObjects, setAllObjects] = useState();

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

  const messageDate = (time) => {
    let date = new Date(time);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div id="landing-screen">
      <Grid
        container
        sx={{
          marginLeft: "0.1rem",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginBottom: "3rem" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1rem",
              marginRight: "2rem",
            }}
          >
            <ReturnButton />
          </Box>

          <Divider>
            <Chip
              label="All Docs"
              sx={{
                backgroundColor: "#489a8e",
                color: "white",
                fontSize: "16px",
                padding: "1rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {allObjects &&
              allObjects.allObjects.map((element, i) => {
                return (
                  <div key={i}>
                    <Box className="dashboard-box-container">
                      <Link to={`/single-object/${element._id}`}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
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
    </div>
  );
}

export default AllObjects;

import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import "../App.css";
import { ProjectFetchContext } from "../context/ProjectFetchContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { projectData } = useContext(ProjectFetchContext);

  return (
    <>
      <div id="home-screen">
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={3}
            style={{
              width: "70%",
              marginTop: "2rem",
              padding: "1.5rem",
              opacity: "0.9",
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Dashboard / user
                </Typography>
                <Typography variant="h2" component="h2" mb={4}>
                  Dashboard
                </Typography>
              </Box>
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
                <Link to="/newproject">
                  <Button
                    variant="outlined"
                    style={{ borderColor: "#489a8e", color: "#489a8e" }}
                  >
                    Create Project
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {projectData &&
                projectData.map((element, i) => {
                  return (
                    <Box className="dashboard-box-container" key={i}>
                      <Link to="/singleproject">
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Project
                          </Typography>
                          <Typography variant="subtitle1">
                            {element.name}
                          </Typography>
                          <Box mt={1}>
                            {" "}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Description
                            </Typography>
                            <Typography variant="body2">
                              {element.description}
                            </Typography>
                          </Box>
                          {/*  <Box
                        style={{ display: "flex", justifyContent: "center" }}
                        mt={3}
                      >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#489a8e" }}
                        >
                          Open
                        </Button>
                      </Box> */}
                        </Box>
                      </Link>
                    </Box>
                  );
                })}
            </Box>
          </Paper>
        </Box>
      </div>
    </>
  );
}

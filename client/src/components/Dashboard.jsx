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
import SearchIcon from "@mui/icons-material/Search";

export default function Dashboard() {
  const { projectData } = useContext(ProjectFetchContext);

  return (
    <>
      <div id="home-screen">
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={3}
            style={{ width: "70%", marginTop: "2rem", padding: "1.5rem" }}
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
                <Button variant="outlined">New Project</Button>
              </Box>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row" }}>
              {projectData &&
                projectData.map((element, i) => {
                  return (
                    <Box className="dashboard-box-container" key={i}>
                      <Typography variant="caption" color="text.secondary">
                        Project
                      </Typography>
                      <Typography variant="h5">{element.name}</Typography>
                      <Box className="team-box-container" mt={1}>
                        <Box>
                          {" "}
                          <Typography variant="caption" color="text.secondary">
                            Members
                          </Typography>
                          <Typography variant="body2">
                            {element.users}
                            <span style={{ color: "grey", fontSize: "0.8rem" }}>
                              {" "}
                              (Lead)
                            </span>
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            ml={3}
                          >
                            Organization
                          </Typography>
                          <Typography variant="body2" ml={3}>
                            {element.organization}
                          </Typography>
                        </Box>
                      </Box>
                      <Box mt={1}>
                        {" "}
                        <Typography variant="caption" color="text.secondary">
                          Description
                        </Typography>
                        <Typography variant="body2">
                          {element.description}
                        </Typography>
                      </Box>{" "}
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                        mt={3}
                      >
                        <Button variant="contained">Open</Button>
                      </Box>
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

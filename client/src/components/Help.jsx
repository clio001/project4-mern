import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ReturnButton from "./ReturnButton";

function Help() {
  return (
    <div
      id="landing-screen"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          padding: "1.5rem",
          borderRadius: "1rem",
          backgroundColor: "white",
          width: "80%",
          height: "100%",
          marginTop: "1rem",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h4" m={2}>
              Help
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              Consult this documentation to better understand how to use DocHub
              in a way to suits your project.
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography variant="body1" mb={1}>
              As collaborative working practices move into the digital space,
              collaborative working platforms are ever more important to bring
              teams and projects together.
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography variant="body1" mb={1}>
              DocHub is a platform that enables a variety of users to interact
              with colleagues as well as the wider knowledge community. Users
              are able to create documents with rich metadata documentation and
              illustrations.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" mb={3}>
              In addition, users engage in meaningful exchanges to improve and
              enrich your understanding of your project.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ReturnButton />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Help;

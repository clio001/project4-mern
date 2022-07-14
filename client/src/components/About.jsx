import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function About() {
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
              About
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              DocHub provides a platform to work collaboratively on documents
              across geographical spaces.
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography variant="body1" mb={1} sx={{ textAlign: "justify" }}>
              As collaborative working practices move into the digital space,
              collaborative working platforms are ever more important to bring
              teams and projects together.
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography variant="body1" mb={1} sx={{ textAlign: "justify" }}>
              DocHub is a platform that enables a variety of users to interact
              with colleagues as well as the wider knowledge community. Users
              are able to create documents with rich metadata documentation and
              illustrations.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" mb={3} sx={{ textAlign: "justify" }}>
              In addition, users engage in meaningful exchanges to improve and
              enrich your understanding of your project.
            </Typography>
          </Box>
          <Box>
            <Link to="/dashboard">
              <Button variant="contained" sx={{ backgroundColor: "#489a8e" }}>
                Let's get started!
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default About;

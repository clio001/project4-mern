import React from "react";
import { Typography, Box } from "@mui/material";

export default function ViewLanding() {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" m={4}>
          Landing page
        </Typography>
        <Typography variant="h4">Project 4: M.E.R.N.</Typography>
      </Box>
    </>
  );
}

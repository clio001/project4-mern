import React from "react";
import { Typography, Box, Button, TextField } from "@mui/material";

export default function Home() {
  return (
    <div id="home-screen">
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "2rem",
          }}
        >
          <Typography variant="h1">
            <span style={{ fontFamily: "Courier" }}>Doc</span>
            <span style={{ fontSize: "5rem", color: "white" }}>Hub</span>
          </Typography>
          <Typography variant="h5" style={{ color: "#eeeeee" }}>
            A platform for collaborative research
          </Typography>

          <Button variant="contained" style={{ marginTop: "2rem" }}>
            Sign up
          </Button>
        </Box>
        {/* Login Interface */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",

            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.8rem",
              opacity: "0.9",
            }}
          >
            <Typography variant="h4">Login</Typography>
            <TextField
              variant="standard"
              label="E-Mail"
              required
              style={{ marginTop: "1rem" }}
            />
            <TextField
              variant="standard"
              type="password"
              label="Password"
              required
              style={{ marginTop: "0.5rem" }}
            />
            <Button variant="contained" style={{ marginTop: "1.5rem" }}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

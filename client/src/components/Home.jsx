import React, { useContext, useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const { userStatus, setUserStatus } = useContext(AuthContext);

  const handleLoginChange = (event) => {
    setLoggedInUser({
      ...loggedInUser,
      [event.target.name]: event.target.value,
    });
  };

  const submitLogin = async (request, response) => {
    console.log(loggedInUser);
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", loggedInUser.email);
    urlencoded.append("password", loggedInUser.password);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/users/login",
        requestOptions
      );
      const result = await response.json();
      const { user } = result;

      if (user.token) {
        localStorage.setItem("token", user.token);
        setUserStatus(true);
        console.log("SUCCESS: Token set in local storage.");
      } else {
        console.log("ERROR: Token could not be set in local storage.");
      }

      console.log("Login result: ", result);
      // TODO: alert for success and error, plus redirection
    } catch (error) {
      console.log("ERROR: User could not be logged in.");
    }
  };

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
          <Link to="/registration">
            <Button variant="contained" style={{ marginTop: "2rem" }}>
              Sign up
            </Button>
          </Link>
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
              name="email"
              onChange={handleLoginChange}
              required
              style={{ marginTop: "1rem" }}
            />
            <TextField
              variant="standard"
              type="password"
              label="Password"
              name="password"
              onChange={handleLoginChange}
              required
              style={{ marginTop: "0.5rem" }}
            />
            <Box style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={submitLogin}
                style={{ marginTop: "1.5rem" }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

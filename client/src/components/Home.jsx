import React, { useContext, useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Zoom,
  Slide,
  Collapse,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [newUser, setNewUser] = useState({});
  const [showSignUp, setSignUp] = useState(false);
  const [zoomLogin, setZoomLogin] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);
  const [loginFailAlert, setLoginFailAlert] = useState(false);
  const { userStatus, setUserStatus, token } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleShowSignUp = () => {
    if (showSignUp) {
      setSignUp(false);
      setZoomLogin(true);
    } else {
      setZoomLogin(false);
      setSignUp(true);
    }
  };

  function closeBanner() {
    setSuccessAlert(false);
    setWarningAlert(false);
    setLoginFailAlert(false);
    navigate("/");
  }

  // * SIGN UP FETCH POST

  const handleFormChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const signUpUser = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log("Signup result: ", result);
      if (result.message === "User already exists.") {
        setWarningAlert(true);
        setTimeout(closeBanner, 3000);
      } else {
        setSuccessAlert(true);
        setTimeout(closeBanner, 3500);
        setSignUp(false);
        setZoomLogin(true);
      }
    } catch (error) {
      console.log("Error signing up new user.", error);
    }
  };

  // * LOGIN FETCH POST

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
      navigate("/user-profile");
      // TODO: alert for success and error, plus redirection
    } catch (error) {
      console.log("ERROR: User could not be logged in.");
      setLoginFailAlert(true);
      setTimeout(closeBanner, 3000);
    }
  };

  return (
    <div id="home-screen">
      <Collapse in={successAlert}>
        <Alert severity="success">
          Success! Please, log in to your account.
        </Alert>
      </Collapse>
      <Collapse in={warningAlert}>
        <Alert severity="error">
          Account already exists. Please, use different email!
        </Alert>
      </Collapse>
      <Collapse in={loginFailAlert}>
        <Alert severity="error">
          Login failed. Try again or sign up a new account.
        </Alert>
      </Collapse>
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
          <Typography variant="subtitle1" style={{ color: "#eeeeee" }}>
            A platform for collaborative research
          </Typography>
        </Box>
        {/* LOGIN */}
        {showSignUp ? (
          <Slide direction="up" mountOnEnter unmountOnExit in={showSignUp}>
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
                <Typography variant="h4">Sign up</Typography>
                <TextField
                  variant="standard"
                  label="E-Mail"
                  name="email"
                  onChange={handleFormChange}
                  required
                  style={{ marginTop: "1rem" }}
                />
                <TextField
                  variant="standard"
                  type="password"
                  label="Password"
                  name="password"
                  onChange={handleFormChange}
                  required
                  style={{ marginTop: "0.5rem" }}
                />
                <Box
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={signUpUser}
                    style={{ marginTop: "1.5rem", backgroundColor: "#489a8e" }}
                  >
                    Sign up
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleShowSignUp}
                    style={{
                      marginTop: "1.5rem",
                      borderColor: "#489a8e",
                      color: "#489a8e",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </Slide>
        ) : (
          <Zoom in={zoomLogin}>
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
                <Box
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={submitLogin}
                    style={{
                      marginTop: "1.5rem",
                      backgroundColor: "#489a8e",
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleShowSignUp}
                    className="button"
                    style={{
                      marginTop: "1.5rem",
                      borderColor: "#489a8e",
                      color: "#489a8e",
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </Box>
          </Zoom>
        )}
      </Box>
    </div>
  );
}

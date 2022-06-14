import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";

export default function ViewList() {
  const [myData, setMyData] = useState(null);
  URL = "http://192.168.2.124:5001/users/data";

  const getData = () => {
    fetch(URL).then((response) =>
      response.json().then((myData) => {
        console.log("First fetch: ", myData);
        setMyData(myData);
      })
    );
  };

  useEffect(() => {
    getData(URL);
  }, []);

  return (
    <>
      {" "}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h1" m={4}>
          List screen
        </Typography>
        <Typography variant="subtitle1">
          Users from White Lake database
        </Typography>
        <Typography variant="body1"></Typography>
      </Box>{" "}
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <Box id="form">
          {" "}
          <Paper
            variant="elevation"
            elevation={3}
            style={{
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              width: "16rem",
              marginLeft: "2rem",
            }}
          >
            <Typography variant="h5" m={1}>
              New user
            </Typography>
            <TextField
              variant="standard"
              required
              label="First name"
              style={{ margin: "0.5rem" }}
            />

            <TextField
              variant="standard"
              required
              label="Last name"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              variant="standard"
              required
              label="E-Mail"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              variant="standard"
              required
              label="Password"
              style={{ margin: "0.5rem" }}
            />

            <Button type="submit">Submit</Button>
          </Paper>
        </Box>
        <Box>
          {" "}
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {myData &&
              myData.map((user, index) => {
                return (
                  <Paper
                    variant="elevation"
                    key={index}
                    elevation={3}
                    style={{
                      width: "16rem",
                      height: "5rem",
                      marginRight: "0.8rem",
                      marginBottom: "0.5rem",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box>
                      <FaceSharpIcon
                        fontSize="large"
                        style={{ marginRight: "0.8rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="button" sx={{ fontWeight: "bold" }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.role}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

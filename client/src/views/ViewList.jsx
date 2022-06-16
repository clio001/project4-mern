import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useContext } from "react";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";
import { FetchContext } from "../context/FetchContext";
import Navbar from "../components/Navbar";

export default function ViewList() {
  const { myData } = useContext(FetchContext);

  return (
    <>
      <Navbar />
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
            <FormControl variant="standard" style={{ margin: "0.5rem" }}>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
                <MenuItem value="contributor">Contributor</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              style={{ margin: "1rem" }}
            >
              Submit
            </Button>
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

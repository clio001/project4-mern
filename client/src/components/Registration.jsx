import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function Registration() {
  return (
    <div id="home-screen">
      <Box
        id="form"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Paper
          variant="elevation"
          elevation={3}
          style={{
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            width: "16rem",
            marginTop: "2rem",
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
          <TextField
            variant="standard"
            required
            label="Team"
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

          <Button type="submit" variant="contained" style={{ margin: "1rem" }}>
            Submit
          </Button>
        </Paper>
      </Box>
    </div>
  );
}

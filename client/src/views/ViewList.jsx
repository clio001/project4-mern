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
    <div id="landing-screen">
      <div>
        <Navbar />

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
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
                        <Typography
                          variant="button"
                          sx={{ fontWeight: "bold" }}
                        >
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {user.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.organization}
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
      </div>
    </div>
  );
}

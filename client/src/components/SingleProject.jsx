import React from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleProject() {
  const navigate = useNavigate();
  // TODO: Specific project get fetch

  const redirectBack = () => {
    navigate(-1);
  };
  return (
    <div id="home-screen">
      <Paper sx={{ opacity: 0.9 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Link to="/single-object">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginTop: "0.5rem",
                  marginRight: "0.5rem",
                  borderColor: "#489a8e",
                  color: "#489a8e",
                }}
              >
                Object
              </Button>
            </Link>
            <Button
              variant="outlined"
              onClick={redirectBack}
              size="small"
              sx={{
                marginTop: "0.5rem",
                marginRight: "0.5rem",
                borderColor: "#489a8e",
                color: "#489a8e",
              }}
            >
              Return
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box>
              <img
                src="https://icon-library.com/images/file_light-14-512.png"
                width="300px"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box mb={1} ml={1}>
              <Typography variant="caption" color="text.secondary">
                Project
              </Typography>
              <Typography variant="subtitle2">
                Climate Science and Governance
              </Typography>
            </Box>
            <Box ml={1}>
              <Typography variant="caption" color="text.secondary">
                Description
              </Typography>
              <Typography variant="subtitle2">
                In this project, members will examine the intersections of
                environmental science and international politics.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box ml={1}>
              <Typography variant="caption" color="text.secondary">
                Members
              </Typography>
              <Typography variant="subtitle2">John Woitkowitz</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box ml={1}>
              <Typography variant="caption" color="text.secondary">
                Objects
              </Typography>
              <Typography variant="subtitle2">5th IPCC Report</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SingleProject;

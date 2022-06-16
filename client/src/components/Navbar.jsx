import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div>
      <div style={{ width: "80%" }}>
        <Drawer
          anchor="left"
          variant="temporary"
          open={show}
          onClose={handleShow}
        >
          <Box style={{ textAlign: "end", width: "20rem" }}>
            <IconButton>
              <CloseIcon onClick={handleShow} />
            </IconButton>
          </Box>
          <Typography variant="h6" m={2}>
            Menu
          </Typography>
          <Link to="list">
            <MenuItem>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "grey" }}>List view</ListItemText>
            </MenuItem>
          </Link>
        </Drawer>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="primary" elevation={8}>
          <Toolbar>
            <Grid container style={{ alignItems: "center" }}>
              <Grid item xs={4}>
                {" "}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleShow}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <Link to="/">
                  <Typography variant="h4" component="div" mr={2}>
                    <span style={{ fontFamily: "Courier", color: "black" }}>
                      Doc
                    </span>
                    <span style={{ fontSize: "1.8rem" }}>Hub</span>
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

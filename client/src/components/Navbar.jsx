import React, { useContext, useState } from "react";
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
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import FolderIcon from "@mui/icons-material/Folder";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { userStatus, userProfile, logOut } = useContext(AuthContext);

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
            <IconButton onClick={handleShow}>
              <CloseIcon />
            </IconButton>
          </Box>
          {userStatus && userProfile.user && (
            <>
              <Link to="/user-profile">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "1rem",
                  }}
                >
                  <Avatar
                    src={userProfile.user.avatar_url}
                    sx={{ marginRight: "0.5rem" }}
                  />
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography>
                        {userProfile.user.firstName} {userProfile.user.lastName}
                      </Typography>
                      {userProfile.user.role === "Admin" && (
                        <LocalPoliceOutlinedIcon
                          fontSize="small"
                          sx={{ color: "gray", marginLeft: "0.5rem" }}
                        />
                      )}
                      {userProfile.user.comments.length > 9 && (
                        <WorkspacePremiumOutlinedIcon
                          fontSize="small"
                          sx={{ color: "gray", marginLeft: "0.5rem" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {userProfile.user.organization}
                    </Typography>
                  </Box>
                </Box>
              </Link>
              <Divider style={{ marginTop: "2rem" }} />
            </>
          )}
          <Box sx={{ backgroundColor: "#489a8e" }}>
            <Typography variant="h5" m={2}>
              <span style={{ fontFamily: "Courier" }}>Doc</span>
              <span style={{ fontSize: "1.3rem", color: "white" }}>Hub</span>
            </Typography>
          </Box>
          <Divider style={{ marginBottom: "0.5rem" }} />{" "}
          {userStatus && (
            <>
              {" "}
              <Link to="/dashboard">
                <MenuItem>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText style={{ color: "grey" }}>
                    Dashboard
                  </ListItemText>
                </MenuItem>
              </Link>
              <Link to="/list">
                <MenuItem>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText style={{ color: "grey" }}>
                    All Members
                  </ListItemText>
                </MenuItem>
              </Link>
              <Link to="/user-profile">
                <MenuItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText style={{ color: "grey" }}>
                    Manage account
                  </ListItemText>
                </MenuItem>
              </Link>
              <Divider style={{ marginBottom: "0.5rem" }} />{" "}
            </>
          )}
          <Link to="/about">
            <MenuItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "grey" }}>About</ListItemText>
            </MenuItem>
          </Link>
          <Link to="/all-objects">
            <MenuItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "grey" }}>Browse Docs</ListItemText>
            </MenuItem>
          </Link>
          <Link to="/help">
            <MenuItem>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "grey" }}>Help</ListItemText>
            </MenuItem>
          </Link>
          <Divider style={{ marginBottom: "0.5rem" }} />{" "}
          {userStatus ? (
            <>
              <MenuItem>
                <ListItemIcon onClick={logOut}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "grey" }}>Logout</ListItemText>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <ListItemIcon onClick={handleShow}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "grey" }}>Login</ListItemText>
              </MenuItem>{" "}
            </>
          )}
        </Drawer>
      </div>
      <Box>
        <AppBar
          position="sticky"
          elevation={8}
          style={{ backgroundColor: "#489a8e" }}
        >
          <Toolbar>
            <Grid container>
              <Grid item xs={4} sx={{ flexGrow: 1 }}>
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
              <Grid
                item
                xs={4}
                style={{ textAlign: "center" }}
                sx={{ flexGrow: 1 }}
              >
                <Link to="/">
                  <Typography variant="h4" component="div" mr={2}>
                    <span style={{ fontFamily: "Courier", color: "black" }}>
                      Doc
                    </span>
                    <span style={{ fontSize: "1.8rem", color: "white" }}>
                      Hub
                    </span>
                  </Typography>
                </Link>
              </Grid>
              {userStatus ? (
                <Grid item xs={4} style={{ textAlign: "end" }}>
                  {" "}
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={logOut}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Grid>
              ) : (
                <Grid item xs={4} style={{ textAlign: "end" }}>
                  {" "}
                  <Link to="/">
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

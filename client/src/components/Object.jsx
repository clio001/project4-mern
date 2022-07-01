import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Box,
  Paper,
  Button,
  InputBase,
  IconButton,
  Typography,
  Drawer,
  Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "../App.css";
import CommentItem from "./CommentItem";
import { AuthContext } from "../context/AuthContext";

function Object() {
  const [item, setItem] = useState();
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);
  const { userProfile } = useContext(AuthContext);

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // * GET Object data

  const getObjectData = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("id", "62bd5b50de5e932b21d3f521");

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/objects/object-comments",
        requestOptions
      );
      const result = await response.json();
      console.log("GetObjectComments result: ", result);
      setItem(result);
    } catch (error) {
      console.log("ERROR: Unable to find object data from database.", error);
    }
  };

  // * POST Object comments

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const postComments = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append(
      "author",
      `${userProfile.firstName} ${userProfile.lastName}`
    );
    urlencoded.append("comment", comment);
    urlencoded.append("id", "62bd5b50de5e932b21d3f521");

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/objects/post-comment",
        requestOptions
      );
      const result = await response.json();
      console.log("Result posting comment: ", result);
      getObjectData();
    } catch (error) {
      console.log("ERROR posting comment.", error);
    }
  };

  useEffect(() => {
    getObjectData();
  }, []);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box>
              <img
                className="object-img"
                src="https://upload.wikimedia.org/wikipedia/commons/3/32/Petermann_Franz-Josef-Land%2C_provisorische_Karte_1874.png"
                alt="Petermann Land"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            style={{ backgroundColor: "#eceff1" }}
          >
            <Drawer
              anchor="top"
              variant="temporary"
              open={show}
              onClose={handleShow}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h6" ml={1}>
                  Metadata
                </Typography>
                {item && (
                  <>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Title
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].title}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Creator
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].creator}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].date}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].description}
                      </Typography>
                    </Box>

                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Type
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].type}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Archive
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].archive}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Rights
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].rights}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Web URL
                      </Typography>
                      <Typography variant="body2">
                        {item.result[0].web_url}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Image
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {item.result[0].image_url}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Object added
                      </Typography>

                      <Typography variant="body2">
                        {item.result[0].createdAt}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Drawer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
              }}
            >
              <Box>
                {item && (
                  <Chip
                    label={`${item.result[0].comments.length} comments`}
                    variant="outlined"
                  />
                )}
              </Box>
              <Box>
                <IconButton onClick={handleShow}>
                  <InfoIcon />
                </IconButton>
                <IconButton>
                  <PictureAsPdfIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ padding: "5px", marginBottom: "5rem" }}>
              {item &&
                item.result[0].comments.map((element, index) => {
                  return <CommentItem element={element} index={index} />;
                })}
            </Box>
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "3rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  border: "1px",
                }}
              >
                <InputBase
                  id="userInputValue"
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="New message ..."
                  inputProps={{ "aria-label": "Neue Nachricht" }}
                  onChange={handleCommentInput}
                />
                <span>
                  <Button
                    variant="contained"
                    style={{
                      marginRight: "0.5rem",
                      marginLeft: "0.5rem",
                      backgroundColor: "#489a8e",
                    }}
                    onClick={postComments}
                  >
                    Send
                  </Button>
                </span>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Object;

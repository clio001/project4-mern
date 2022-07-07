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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";
import CommentItem from "./CommentItem";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function Object() {
  const [item, setItem] = useState();
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);

  const { userProfile } = useContext(AuthContext);

  const objectID = useParams();

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // * GET object by ID

  const getObjectByID = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/objects/single-object/${objectID.id}`
      );
      const result = await response.json();
      setItem(result);
      console.log("New Item: ", result);
    } catch (error) {
      console.log("ERROR: Unable to fetch object by date.", error);
    }
  };

  // * POST comment to Comments Collection

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const postComments = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append(
      "author",
      `${userProfile.user.firstName} ${userProfile.user.lastName}`
    );
    urlencoded.append("comment", comment);
    urlencoded.append("object_id", item.result._id);
    urlencoded.append("user_id", userProfile.user._id);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/comments/create-comment",
        requestOptions
      );
      const result = await response.json();
      console.log("Result posting comment: ", result);

      getObjectByID();
    } catch (error) {
      console.log("ERROR posting comment.", error);
    }
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    /* getObjectData(); */
    getObjectByID();
  }, []);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ backgroundColor: "#eceff1" }}
          >
            <Box>
              {item && (
                <img
                  className="object-img"
                  src={`${item.result.image_url}`}
                  alt="Object illustration"
                />
              )}
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
                        {item.result.title}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Creator
                      </Typography>
                      <Typography variant="body2">
                        {item.result.creator}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body2">
                        {item.result.date}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body2">
                        {item.result.description}
                      </Typography>
                    </Box>

                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Type
                      </Typography>
                      <Typography variant="body2">
                        {item.result.type}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Archive
                      </Typography>
                      <Typography variant="body2">
                        {item.result.archive}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Rights
                      </Typography>
                      <Typography variant="body2">
                        {item.result.rights}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Web URL
                      </Typography>
                      <Typography variant="body2">
                        {item.result.web_url}
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
                        {item.result.image_url}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography variant="caption" color="text.secondary">
                        Object added
                      </Typography>

                      <Typography variant="body2">
                        {item.result.createdAt}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Drawer>{" "}
            {item && (
              <Box sx={{ marginLeft: "1rem" }}>
                <Typography variant="h6">{item.result.title}</Typography>
                <Typography variant="subtitle2">
                  by {item.result.creator}, {item.result.archive} (
                  {item.result.date})
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <Box>
                {item && (
                  <Chip
                    label={`${item.result.comments.length} comments`}
                    variant="outlined"
                  />
                )}
              </Box>
              <Box>
                <IconButton onClick={handleShow}>
                  <InfoOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleShow}>
                  <BookmarkAddOutlinedIcon />
                </IconButton>
                <IconButton>
                  <PictureAsPdfOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Typography></Typography>
            </Box>
            <Box sx={{ padding: "5px", marginBottom: "10rem" }}>
              {item &&
                item.result.comments.map((element, index) => {
                  return (
                    <CommentItem
                      element={element}
                      index={index}
                      item={item}
                      key={index}
                      retrieve={getObjectByID}
                    />
                  );
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
                    <SendIcon />
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

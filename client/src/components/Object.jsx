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
  Avatar,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import SendIcon from "@mui/icons-material/Send";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import "../App.css";
import CommentItem from "./CommentItem";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import ReturnButton from "./ReturnButton";

function Object() {
  const [item, setItem] = useState();
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);
  const { userProfile, getProfileData } = useContext(AuthContext);
  const objectID = useParams();

  const getTweetTitle = () => {
    let tweetURL = `https://twitter.com/intent/tweet?text=${item.result.title}&via=docHub_app&hashtags=GoodToKnow`;
    return tweetURL;
  };

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

  const postComments = async (e) => {
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
      const inputValue = document.getElementById("userInputValue");
      inputValue.value = "";
      getObjectByID();
    } catch (error) {
      console.log("ERROR posting comment.", error);
    }
    window.scrollTo(0, document.body.scrollHeight);
  };

  // * POST create new bookmark in Bookmarks collection and update Objects and Users collections
  const createBookmark = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("object_id", item.result._id);
    urlencoded.append("user_id", userProfile.user._id);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/bookmarks/create-bookmark",
        requestOptions
      );
      const result = await response.json();
      getObjectByID();
      getProfileData();
      console.log(
        "SUCCESS: Post fetch request to create new bookmark successfull.",
        result
      );
    } catch (error) {
      console.log(
        "ERROR: Unable to execute post fetch request to create new bookmark.",
        error
      );
    }
  };

  // * DELETE bookmark from Bookmarks, Objects, and Users collections
  const deleteBookmark = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("user_id", userProfile.user._id);
    urlencoded.append("object_id", item.result._id);
    const bookmark_id = item.result.bookmarks.map((element) => {
      if (userProfile.user._id === element.user_id) {
        return element._id;
      }
    });
    urlencoded.append("bookmark_id", bookmark_id);

    const requestOptions = {
      method: "DELETE",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/bookmarks/delete-bookmark",
        requestOptions
      );
      const result = await response.json();
      getObjectByID();
      getProfileData();
      console.log("Result of deleting bookmark: ", result);
    } catch (error) {
      console.log(
        "ERROR: Unable to execute post fetch request to delete bookmark.",
        error
      );
    }
  };

  const getUniqueAuthors = () => {
    let authors = [];
    item.result.comments.map((element) => {
      authors.push(element.user_id.avatar_url);
    });
    let uniqueAuthors = [...new Set(authors)];
    return uniqueAuthors;
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "1rem",
              }}
            >
              <ReturnButton />
            </Box>
            {item && (
              <Box sx={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
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
                flexDirection: "row",
                marginRight: "1rem",
                marginTop: "0.5rem",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {item &&
                getUniqueAuthors().map((element, i) => {
                  return (
                    <Avatar
                      key={i}
                      src={element}
                      size="large"
                      sx={{ marginLeft: "0.3rem" }}
                    />
                  );
                })}
            </Box>
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
                {item && userProfile && item.result.bookmarks.length === 0 ? (
                  <IconButton onClick={createBookmark}>
                    <BookmarkAddOutlinedIcon />
                  </IconButton>
                ) : (
                  item &&
                  userProfile &&
                  item.result.bookmarks.map((element) => {
                    return userProfile.user._id === element.user_id ? (
                      <IconButton onClick={deleteBookmark}>
                        <BookmarkRemoveOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={createBookmark}>
                        <BookmarkAddOutlinedIcon />
                      </IconButton>
                    );
                  })
                )}
                {item && (
                  <a
                    href={`https://twitter.com/intent/tweet?text=${item.result.title}%20by%20${item.result.creator}%20is%20a%20fascinating%20piece!%20Check%20it%20out!&via=docHub_app&hashtags=GoodToKnow`}
                    target="blank"
                  >
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                  </a>
                )}
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
                      setitem={setItem}
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
                  height: "max-content",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  border: "1px",
                }}
              >
                <InputBase
                  multiline
                  maxRows={5}
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

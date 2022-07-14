import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Modal,
  Snackbar,
  Button,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function CommentItem(props) {
  const element = props.element;
  const index = props.index;
  const getObjectByID = props.retrieve;
  const [item, setItem] = useState(props.item);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [openSuccessEdit, setOpenSuccessEdit] = useState(false);
  const [openErrorEdit, setOpenErrorEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedComment, setEditedComment] = useState();
  const { userProfile } = useContext(AuthContext);

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const messageDate = (time) => {
    let date = new Date(time);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // * Update comment in Comments collection (Object and Users will be populated when collections are fetched.)

  const handleTextFieldChange = (e) => {
    setEditedComment(e.target.value);
    console.log(editedComment);
  };

  const updateComment = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("comment_id", element._id);
    urlencoded.append("edited_comment", editedComment);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/comments/update-comment",
        requestOptions
      );
      const result = await response.json();
      console.log("SUCCESS: Result of comment update: ", result);
      setOpenSuccessEdit(true);
      setOpenModal(false);
    } catch (error) {
      console.log("ERROR: Unable to update comment.", error);
      setOpenErrorEdit(true);
    }
  };

  // * Delete comment in Comments, Objects and Users collections

  const deleteComment = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("comment_id", element._id);
    urlencoded.append("object_id", item.result._id);
    urlencoded.append("user_id", userProfile.user._id);

    const requestOptions = {
      method: "DELETE",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/comments/delete-comment",
        requestOptions
      );
      const result = await response.json();
      console.log("Result of deleting comment: ", result);
      getObjectByID();
      setOpenSuccess(true);
    } catch (error) {
      console.log("ERROR: Unable to delete comment.", error);
      setOpenFailure(true);
    }
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modalStyle">
          <Typography mb={1}>Edit comment</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <EditIcon fontSize="large" style={{ color: "#489a8e" }} />
          </Box>

          <TextField
            multiline
            name="body"
            maxRows={8}
            defaultValue={element.body}
            onChange={handleTextFieldChange}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "1.5rem",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#489a8e" }}
              onClick={updateComment}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              style={{ color: "#489a8e", borderColor: "#489a8e" }}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box className="comment-item" mb={1} key={index}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={element.user_id.avatar_url}
              alt="user image"
              sx={{ marginRight: "0.5rem" }}
            />
            <Typography variant="caption" color="text.secondary">
              {element.author}
            </Typography>
            {element.user_id.role === "Admin" && (
              <LocalPoliceOutlinedIcon
                fontSize="small"
                sx={{ color: "gray", marginLeft: "0.5rem" }}
              />
            )}
            {element.user_id.comments.length > 9 && (
              <WorkspacePremiumIcon
                fontSize="small"
                sx={{ color: "gray", marginLeft: "0.5rem" }}
              />
            )}
          </Box>
          {userProfile.user._id === element.user_id._id && (
            <Box>
              <IconButton onClick={() => setOpenModal(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={deleteComment}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Typography variant="body2">{element.body}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0.5rem",
          }}
        >
          {element.createdAt === element.updatedAt ? (
            <Typography variant="caption" color="text.secondary">
              {messageDate(element.createdAt)}
            </Typography>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Last edited: {messageDate(element.updatedAt)}
            </Typography>
          )}
        </Box>
      </Box>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Comment deleted!"
      />
      <Snackbar
        open={openFailure}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Unable to delete comment. Try again!"
      />
      <Snackbar
        open={openSuccessEdit}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Comment edited!"
      />
      <Snackbar
        open={openErrorEdit}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Error editing comment. Try again!"
      />
    </div>
  );
}

export default CommentItem;

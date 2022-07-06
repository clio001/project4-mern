import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";

function CommentItem(props) {
  const element = props.element;
  const index = props.index;

  const messageDate = (time) => {
    return new Date(time * 1000).toLocaleTimeString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div>
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
            <Avatar src="" alt="user image" sx={{ marginRight: "0.5rem" }} />
            <Typography variant="caption" color="text.secondary">
              {element.author}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2">{element.body}</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="caption" color="text.secondary">
            Date
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default CommentItem;

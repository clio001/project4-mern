import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import "../App.css";

function CommentItem(props) {
  const element = props.element;
  const index = props.index;
  return (
    <div>
      <Box className="comment-item" key={index} mb={1}>
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
          <Typography variant="caption" color="text.secondary">
            Date
          </Typography>
        </Box>

        <Typography variant="body2">{element.body}</Typography>
      </Box>
    </div>
  );
}

export default CommentItem;

import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Button, InputBase, Box, ButtonGroup } from "@mui/material";

import { useContext } from "react";

import Paper from "@mui/material/Paper";

export default function MessageField() {
  return (
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
        />
        <span>
          <Button
            variant="contained"
            style={{
              marginRight: "0.5rem",
              marginLeft: "0.5rem",
              backgroundColor: "#489a8e",
            }}
          >
            Send
          </Button>
        </span>
      </Paper>
    </Box>
  );
}

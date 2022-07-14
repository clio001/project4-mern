import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ReturnButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ borderColor: "#489a8e", color: "#489a8e" }}
      >
        <ArrowBackIosIcon />
      </Button>
    </div>
  );
}

export default ReturnButton;

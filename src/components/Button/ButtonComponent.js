import React from "react";
import Button from "@mui/material/Button";

function ButtonComponent({ name, onClick }) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#000",
        fontSize: "14px",
        color: "#fff",
      }}
      onClick={() => onClick()}
    >
      {name}
    </Button>
  );
}

export default ButtonComponent;

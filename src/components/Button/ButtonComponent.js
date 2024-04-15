import React from "react";
import Button from "@mui/material/Button";

function ButtonComponent({ name, onClick, disabled, variant }) {
  return (
    <Button
      variant={variant}
      // style={{
      //   backgroundColor: "#006edc",
      //   fontSize: "14px",
      //   color: "#fff",
      // }}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {name}
    </Button>
  );
}

export default ButtonComponent;

import { IconButton, Tooltip } from "@mui/material";
import React from "react";

function IconButtonWithTooltip({ title, icon, ...props }) {
  return (
    <>
      <Tooltip title={title}>
        <IconButton {...props}>{icon}</IconButton>
      </Tooltip>
    </>
  );
}

export default IconButtonWithTooltip;

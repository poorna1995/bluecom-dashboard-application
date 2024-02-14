import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

export default function BottomDrawer({
  openDrawer,
  handleClose,
  children,
  ...props
}) {
  const maxHeight = typeof window !== "undefined" && window.innerHeight - 80;
  return (
    <div>
      <Drawer
        sx={{
          maxHeight: maxHeight,
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
        anchor={"bottom"}
        open={openDrawer}
        onClose={handleClose}
      >
        <Box sx={{ minHeight: maxHeight, maxHeight: maxHeight }}>
          {children}
        </Box>
      </Drawer>
    </div>
  );
}

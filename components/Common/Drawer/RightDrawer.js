import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

export default function RightDrawer({ openDrawer, handleClose, children }) {
  const maxHeight = typeof window !== "undefined" && window.innerHeight - 80;
  return (
    <div>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            // borderTopLeftRadius: "16px",
            // borderTopRightRadius: "16px",
            width: "400px",
          },
        }}
        anchor={"right"}
        open={openDrawer}
        onClose={handleClose}
      >
        <Box>{children}</Box>
      </Drawer>
    </div>
  );
}

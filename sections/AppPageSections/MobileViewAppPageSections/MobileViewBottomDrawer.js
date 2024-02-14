import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton, Typography } from "@mui/material";
import { MdClose } from "react-icons/md";

export default function MobileViewBottomDrawer({
  openDrawer,
  handleClose,
  children,
  ...props
}) {
  const maxHeight = typeof window !== "undefined" && window.innerHeight - 160;
  return (
    <div>
      <Drawer
        sx={{
          maxHeight: maxHeight,
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
          zIndex: "3000",
        }}
        anchor={"bottom"}
        open={openDrawer}
        onClose={handleClose}
      >
        <Box
          sx={{
            py: 2,
            borderBottom: "1px solid rgba(17,17,17,0.1)",
            // mb: 2,
            px: 3,
          }}
        >
          <Typography
            sx={{
              color: "#212121",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "17px",
              letterSpacing: " -0.32px",
            }}
          >
            {props.title}
          </Typography>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
          onClick={handleClose}
        >
          <MdClose color="black" />
        </IconButton>
        <Box
          sx={{
            minHeight: maxHeight,
            maxHeight: maxHeight,
            overflow: "scroll",
          }}
        >
          {children}
        </Box>
      </Drawer>
    </div>
  );
}

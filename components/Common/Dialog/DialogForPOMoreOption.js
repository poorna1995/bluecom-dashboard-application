import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import CrossIcon from "../Icons/POicons/DialogIcons/CrossIcon";

function DialogForPOMoreOption({
  open,
  handleClose,
  children,
  title,
  hideCloseButton,
  dialogActions,
  titleStyles,
  containerProps,
  dialogContentStyles,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: "10px",
          maxWidth: "1000px",
          overflowY: "unset",
        },
      }}
      {...containerProps}
    >
      {!hideCloseButton && (
        <IconButton
          onClick={() => handleClose()}
          sx={{ position: "absolute", top: "16px", right: "16px" }}
        >
          {/* <MdClose /> */}
          <CrossIcon />
        </IconButton>
      )}
      {title && (
        <DialogTitle sx={{ mt: 2, ...titleStyles }}>{title}</DialogTitle>
      )}
      <DialogContent
        sx={{
          overflowY: "unset",
          ...dialogContentStyles,
        }}
      >
        {children}
      </DialogContent>
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
}

export default DialogForPOMoreOption;

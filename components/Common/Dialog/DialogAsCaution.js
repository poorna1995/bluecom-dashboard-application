import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Dialog,
  Stack,
  IconButton,
} from "@mui/material";
import React from "react";
import BaseDialog from ".";
import OutlinedButton from "../Buttons/OutlinedButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import CautionIcon from "../Icons/CautionIcon";
import SecondaryButton from "../Buttons/SecondaryButton";
import DeleteIconPopup from "../Icons/VendorIcon/DeleteIconPopup";

function DialogAsCaution({
  title,
  message,
  onCancel,
  onDelete,
  open,
  primaryButtonName,
  secondaryButtonName,
  loading,
}) {
  const handleDeleteWarehouse = () => {
    onDelete();
  };

  const handleDeleteDialogClose = () => {
    onCancel();
  };
  return (
    <Dialog
      // hideCloseButton
      open={open}
      handleClose={handleDeleteDialogClose}
      PaperProps={{
        sx: {
          borderRadius: "10px !important",
          minWidth: "480px",
          maxWidth: "480px",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          m: 2,
          // mb: 1,
          mx: 4,
          mt: 3,
          "& .delete-icon": {
            border: "1px solid #e4e7ec",
            borderRadius: "10px",
            boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

            height: "48px",
            width: "48px",
            p: 1,
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="delete-icon"
        >
          <path
            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
            stroke="#4F44E0"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <IconButton
          onClick={handleDeleteDialogClose}
          disableRipple
          sx={{
            "&:hover": {
              background: "#F5F4FD",
              transition: "all 0.3s ease-in-out",
              borderRadius: "50%",
            },
            "& .logoutCross-icon": {
              borderRadius: "10px",
              height: "40px",
              width: "40px",
              p: 1,
            },
            borderRadius: "50%",
            marginTop: "-4px",
            marginRight: "-18px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="logoutCross-icon"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#4F44E0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </Stack>
      <Stack sx={{ mx: 4 }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "28px",
            my: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: " #626266",
            fontSize: "18px",
            lineHeight: "24px",
            // fontWeight: 500,

            mb: 2,
            mr: 2,
            pr: 2,
          }}
        >
          {message}
        </Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} m={4}>
        <SecondaryButton
          sx={{ mr: 2 }}
          fullWidth
          onClick={() => handleDeleteDialogClose()}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          loading={loading}
          fullWidth
          onClick={handleDeleteWarehouse}
          disabled={loading}
        >
          {primaryButtonName ?? "Delete This Location"}
        </PrimaryButton>
      </Stack>
    </Dialog>
  );
}

export default DialogAsCaution;

// READ ME :
// this can be used to display warning while deleting something , or any other action that needs confirmation from user

// if you want to use this as a component , you can use it as :-

// <DialogAsCaution
// title="main title of dialogue"
// message="message you want to display"
// open={}
// onCancel={}
// onDelete={function to handle action}
// />

// example of this can be seen in sections->WarehousePageSection->index.js

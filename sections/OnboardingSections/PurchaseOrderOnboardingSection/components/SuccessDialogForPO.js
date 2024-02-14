import {
  Box,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import CreateSuccessIcon from "components/Common/Icons/CreateSuccessIcon";
import SuccessDialogIcon from "components/Common/Icons/POicons/DialogIcons/SuccessDialogIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";

function SuccessDialogForPO({
  title,
  message,
  onCancel,
  onDelete,
  open,
  icon,
  primaryButtonName,
  primaryButtonProps,
  secondaryButtonName,
  primaryButtonColor,
  loading,
}) {
  const handleDeleteWarehouse = () => {
    onDelete();
  };

  const handleDeleteDialogClose = () => {
    onCancel();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleDeleteDialogClose}
        // hideCloseButton={false}
        PaperProps={{
          sx: {
            borderRadius: "10px !important",
            minWidth: "480px",
            maxWidth: "480px",
          },
        }}
      >
        {/* {icon ?? <SuccessDialogIcon />} */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            m: 2,
            // mb: 1,
            mx: 4,
            mt: 3,
            "& .unsave-icon": {
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
            className="unsave-icon"
          >
            <path
              d="M7 3V6.4C7 6.96005 7 7.24008 7.10899 7.45399C7.20487 7.64215 7.35785 7.79513 7.54601 7.89101C7.75992 8 8.03995 8 8.6 8H15.4C15.9601 8 16.2401 8 16.454 7.89101C16.6422 7.79513 16.7951 7.64215 16.891 7.45399C17 7.24008 17 6.96005 17 6.4V4M17 21V14.6C17 14.0399 17 13.7599 16.891 13.546C16.7951 13.3578 16.6422 13.2049 16.454 13.109C16.2401 13 15.9601 13 15.4 13H8.6C8.03995 13 7.75992 13 7.54601 13.109C7.35785 13.2049 7.20487 13.3578 7.10899 13.546C7 13.7599 7 14.0399 7 14.6V21M21 9.32548V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H14.6745C15.1637 3 15.4083 3 15.6385 3.05526C15.8425 3.10425 16.0376 3.18506 16.2166 3.29472C16.4184 3.4184 16.5914 3.59135 16.9373 3.93726L20.0627 7.06274C20.4086 7.40865 20.5816 7.5816 20.7053 7.78343C20.8149 7.96237 20.8957 8.15746 20.9447 8.36154C21 8.59171 21 8.8363 21 9.32548Z"
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
          {secondaryButtonName && (
            <SecondaryButton
              sx={{ mr: 2 }}
              fullWidth
              onClick={handleDeleteDialogClose}
            >
              {secondaryButtonName}
            </SecondaryButton>
          )}

          <PrimaryButton
            // sx={{
            //   flex: 1,
            //   ml: "16px",
            //   backgroundColor: primaryButtonColor,
            //   "&:hover": {
            //     backgroundColor: primaryButtonColor,
            //   },
            //   ...primaryButtonProps?.sx,
            // }}
            onClick={handleDeleteWarehouse}
            // {...primaryButtonProps}
            disabled={loading}
            fullWidth
          >
            {loading && (
              <CircularProgress
                thickness={4}
                size={20}
                sx={{ mr: 2, color: "#fff" }}
              />
            )}
            {primaryButtonName}
          </PrimaryButton>
        </Stack>

        {/* <Box
          sx={{
            marginY: "8px",

            marginX: "8px",
            mt: "32px",
            mb: "2px",
            width: "500px",
            height: "300px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mb: "16px",
            },
          }}
        >
          {/* <CreateSuccessIcon /> 

          <Box
            sx={{
              // borderTop: (theme) =>
              // 	`1px solid ${theme.palette.grey[300]}`,
              display: "flex",
              // pt: "32px",

              // bottom: "0",
              width: "70%",

              // pb: "24px",
            }}
          >
            {secondaryButtonName && (
              <SecondaryButton
                sx={{
                  flex: 1,
                }}
                onClick={handleDeleteDialogClose}
              >
                {secondaryButtonName}
              </SecondaryButton>
            )}

            <PrimaryButton
              sx={{
                flex: 1,
                ml: "16px",
                backgroundColor: primaryButtonColor,
                "&:hover": {
                  backgroundColor: primaryButtonColor,
                },
                ...primaryButtonProps?.sx,
              }}
              onClick={handleDeleteWarehouse}
              {...primaryButtonProps}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  thickness={4}
                  size={20}
                  sx={{ mr: 2, color: "#fff" }}
                />
              )}
              {primaryButtonName}
            </PrimaryButton>
          </Box>
        </Box> */}
      </Dialog>
    </>
  );
}

export default SuccessDialogForPO;

import React from "react";
import BaseDialog from ".";
import {
  Box,
  Divider,
  Typography,
  Dialog,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SecondaryButton from "../Buttons/SecondaryButton";
import SuccessDialogIcon from "../Icons/POicons/DialogIcons/SuccessDialogIcon";
import SectionTitleText from "../Typography/HeadingText/SectionTitleText";
import DescriptionText from "../Typography/BodyText/DescriptionText";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function SuccessDialog({
  handleButtonClick,
  open,
  handleClose,
  buttonTitle,
  title,
  description,
  icon,
  secondaryButtonName,
  primaryButtonName,
  handlePrimaryButton,
  handleSecondaryButton,
  primaryButtonColor,
  primaryButtonProps,
  primaryButtonTitle,
  secondaryButtonTitle,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // hideCloseButton={false}
      // hideCloseButton={true}
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
          onClick={handleClose}
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
          {title || `Bundle added Successfully`}
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
          {description || `Your bundle has been added.`}
        </Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} m={4}>
        {secondaryButtonName ||
          (secondaryButtonTitle && (
            <SecondaryButton
              sx={{ mr: 2 }}
              fullWidth
              onClick={handleSecondaryButton || handleButtonClick}
            >
              {secondaryButtonName || secondaryButtonTitle || buttonTitle}
            </SecondaryButton>
          ))}
        {primaryButtonName ||
          (primaryButtonTitle && (
            <PrimaryButton
              sx={
                {
                  // flex: 1,
                  // ml: "16px",
                  // minWidth: "fit-content",
                  // backgroundColor: primaryButtonColor,
                  // "&:hover": {
                  //   backgroundColor: primaryButtonColor,
                  // },
                }
              }
              onClick={handlePrimaryButton}
              // {...primaryButtonProps}
              // disabled={loading}
              fullWidth
            >
              {primaryButtonName || primaryButtonTitle}
            </PrimaryButton>
          ))}
      </Stack>

      {/* <Box
        sx={{
          marginY: "8px",

          marginX: "8px",
          mt: "32px",
          mb: "2px",
          width: "500px",
          // height: "200px",
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          borderRadius: "12px",
          "& svg": {
            mb: "16px",
          },
        }}
      >
        <SectionTitleText
          sx={{
            pt: "8px",
            color: "#222222",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          {title || `Bundle added Successfully`}
        </SectionTitleText>
        <DescriptionText
          sx={{
            mt: "18px",
            fontSize: "18px",
            fontWeight: "600",
            // lineHeight: "20px",
            textAlign: "center",
            color: "#313131",
          }}
        >
          {description || `Your bundle has been added.`}
        </DescriptionText>
        <Divider
          sx={{
            width: "112%",

            mt: "48px",
            mb: "16px",

            color: "#E0E0E0",
          }}
          variant="middle"
        />
        <Box
          sx={{
            // borderTop: (theme) =>
            // 	`1px solid ${theme.palette.grey[300]}`,
            display: "flex",
            // pt: "32px",

            // bottom: "0",
            // width: "70%",
            justifyContent: "center",
            width: "fit-content",
            flex: 1,

            // pb: "24px",
          }}
        >
          {secondaryButtonName ||
            (secondaryButtonTitle && (
              <SecondaryButton
                sx={{
                  flex: 1,
                  minWidth: "fit-content",
                }}
                onClick={handleSecondaryButton || handleButtonClick}
              >
                {secondaryButtonName || secondaryButtonTitle || buttonTitle}
              </SecondaryButton>
            ))}
          {primaryButtonName ||
            (primaryButtonTitle && (
              <PrimaryButton
                sx={{
                  flex: 1,
                  ml: "16px",
                  minWidth: "fit-content",
                  backgroundColor: primaryButtonColor,
                  "&:hover": {
                    backgroundColor: primaryButtonColor,
                  },
                }}
                onClick={handlePrimaryButton}
                {...primaryButtonProps}
              >
                {primaryButtonName || primaryButtonTitle}
              </PrimaryButton>
            ))}
        </Box>
      </Box> */}

      {/* <Box>
				<Box
					sx={{
						py: 4,
						px: 3,
					}}
				>
					<Typography
						sx={{
							fontWeight: 700,
							fontSize: "21px",
							lineHeight: "25px",

							color: "#19235A",
							my: 2,
						}}
					>
						{title || `Bundle added Successfully`}
					</Typography>
					<Typography
						sx={{
							fontWeight: 400,
							fontSize: "14px",
							lineHeight: "17px",
							/* identical to box height 

							color: "#19235A",
						}}
					>
						{description || `Your bundle has been added.`}
					</Typography>
				</Box>
				<Box
					sx={{
						py: "2",
						borderTop: (theme) =>
							`1px solid ${theme.palette.grey[300]}`,
						display: "flex",
						justifyContent: "center",
						pt: 3,
					}}
				>
					<SecondaryButton onClick={handleButtonClick}>
						{buttonTitle || "Go to Dashboard"}
					</SecondaryButton>
				</Box>
			</Box> */}
    </Dialog>
  );
}

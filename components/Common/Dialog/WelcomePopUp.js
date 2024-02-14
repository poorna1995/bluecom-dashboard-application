import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import BaseDialog from ".";
import CrossIcon from "../Icons/POicons/DialogIcons/CrossIcon";
import ScheduleDemoAndGotoDashboardButtons from "components/Common/Buttons/ScheduleDemoAndGotoDashboardButtons";
import AppImage from "../AppImage";
import Welcome from "public/assets/BackgroundImages/welcome.png";
import bluecomStore from "public/assets/welcomePopups/bluecomStore.png";

export default function WelcomePopUp() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: "600px",
          borderRadius: "20px",
          // background: "#fff",
          backgroundImage: `url(${Welcome.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "600px",
          pl: "16px",
          pr: "16px",
          // backgroundImage: [
          //   "linear-gradient(90deg, rgba(90, 184, 255, 0.90) 0%, #FFF 50%, rgba(95, 136, 252, 0.70) 100%, #FFF 50%, #FFF 100%)",
          // ],
        }}
      >
        <IconButton
          onClick={() => handleClose()}
          sx={{ position: "absolute", top: "16px", right: "16px" }}
        >
          <CrossIcon />
        </IconButton>

        <Box
          sx={{
            mt: "70px",
          }}
        >
          <AppImage
            src={bluecomStore}
            width={500}
            height={200}
            className={"image"}
            unoptimized={false}
            loading={"eager"}
            placeholder="empty"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#222",
              mb: "12px",
            }}
          >
            Welcome to Bluecom!
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#555",
              mb: "26px",
            }}
          >
            We&apos;re thrilled to have you join us. Get started by connecting
            your first store.
          </Typography>
        </Box>
        <DialogActions
          sx={{
            pb: "16px",
          }}
        >
          <ScheduleDemoAndGotoDashboardButtons handleClose={handleClose} />
        </DialogActions>
      </Box>
    </Dialog>
  );
}

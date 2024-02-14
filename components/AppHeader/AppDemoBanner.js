import { Box, Button, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "redux/user/userSlice";
import { setIsDemoBannerVisible } from "redux/views/viewsSlice";

const mapState = ({ views }) => ({
  isBannerVisible: views.isDemoBannerVisible,
});
export default function AppDemoBanner() {
  const { isBannerVisible } = useSelector(mapState);
  const dispatch = useDispatch();
  function handleLogin() {
    // handleClick();
    // router.push("/auth/login");
    window.open(`https://app.bluecom.ai/auth/sign-up`, "_blank");
    // dispatch(signOutUser());
  }
  // const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const handleBannerClose = () => {
    dispatch(setIsDemoBannerVisible(false));
  };
  if (!isBannerVisible) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "rgba(233, 112, 0, 0.1)",
        gap: "1.125rem",
        py: ".5rem",
        position: "relative",
      }}
    >
      {/* <Box sx={{ alignSelf: "center" }}>
				<StarBold />
			</Box> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // gap: "22px",
          // flex: 1,
        }}
      >
        <Typography
          sx={{
            color: " #121212",
            // fontFamily: "Plus Jakarta Sans",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "20px",
            // flex: { xs: 0.65, md: 1 },
          }}
        >
          Welcome to bluecom! Get started to initiate your store.
        </Typography>
        <PrimaryButton
          variant="contained"
          sx={{
            // background: "white",
            textTransform: "none",
            // border: `1px solid rgba(0, 0, 0, 0.20)`,
            height: "32px",
            // fontFamily: " Plus Jakarta Sans",
            borderRadius: "4px",
            fontSize: { md: "14px", xs: "10px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
            ml: { md: 2 },
            // flex: { xs: 0.35, md: 1 },

            // width: "100%",
            mr: 2,
            "&:hover": {
              // background: "white",
              background: (theme) => theme.palette.primary.main,
              color: "white",
              "& path": {
                stroke: "white",
              },
            },
          }}
          // startIcon={<ScheduleIcon />}
          onClick={handleLogin}
        >
          Get Started
        </PrimaryButton>
      </Box>
      {/* <StarThin /> */}
      <Box
        sx={{
          position: "absolute",
          right: { md: "2rem", xs: "1rem" },

          top: "0.8rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleBannerClose}
      >
        <MdClose
          style={{
            width: "24px",
            height: "24px",
            color: "#4F44E0",
          }}
        />
      </Box>
    </Box>
  );
}

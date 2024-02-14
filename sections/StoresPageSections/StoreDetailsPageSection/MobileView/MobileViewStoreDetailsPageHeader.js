import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import EyeIcon from "components/Common/Icons/PublishProduct/EyeIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function MobileViewStoreDetailsPageHeader({
  loading,
  storeName,
  storeId,
  handleViewStoreButton,
  router,
  status,
}) {
  return (
    <Box
      sx={{
        // m: 2,
        px: 2,
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: 2,
        }}
      >
        <Box>
          <IconButton
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "5px",
              marginRight: "10px",
              color: "#101828",
            }}
            size="small"
            onClick={() => router.push(`/home`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_12372_14388)">
                <path
                  d="M2.424 7.52876C2.29902 7.65378 2.22881 7.82332 2.22881 8.0001C2.22881 8.17687 2.29902 8.34641 2.424 8.47143L6.19533 12.2428C6.25683 12.3064 6.33039 12.3572 6.41173 12.3922C6.49306 12.4271 6.58054 12.4455 6.66906 12.4463C6.75758 12.447 6.84537 12.4302 6.9273 12.3966C7.00923 12.3631 7.08366 12.3136 7.14626 12.251C7.20885 12.1884 7.25836 12.114 7.29188 12.0321C7.3254 11.9501 7.34227 11.8623 7.3415 11.7738C7.34073 11.6853 7.32234 11.5978 7.2874 11.5165C7.25246 11.4352 7.20167 11.3616 7.138 11.3001L4.50466 8.66676L13.3333 8.66676C13.5101 8.66676 13.6797 8.59652 13.8047 8.4715C13.9298 8.34648 14 8.17691 14 8.0001C14 7.82329 13.9298 7.65372 13.8047 7.52869C13.6797 7.40367 13.5101 7.33343 13.3333 7.33343L4.50466 7.33343L7.138 4.7001C7.25943 4.57436 7.32663 4.40596 7.32511 4.23116C7.32359 4.05636 7.25348 3.88916 7.12988 3.76555C7.00627 3.64195 6.83906 3.57183 6.66426 3.57031C6.48947 3.56879 6.32106 3.63599 6.19533 3.75743L2.424 7.52876Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_12372_14388">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 16) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </Box>
        <Box>
          {loading ? (
            <Skeleton />
          ) : (
            <SectionTitleText
              sx={{
                color: "#212121",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "21px",

                "& span": {
                  color: "#46946D",
                  fontSize: "10px",
                  fontWeight: 600,
                },
                "& .error": {
                  color: "#46946D",
                },
              }}
            >
              {storeName}
              <br />{" "}
              {status === "success" ? (
                <span> Connected</span>
              ) : (
                <span className="error"> Not Connected</span>
              )}
              {/* {connectedApps.shop} */}
            </SectionTitleText>
          )}
          {loading ? (
            <Skeleton
              sx={{
                width: "100px",
                height: "28px",
              }}
            />
          ) : (
            <PrimaryButton
              sx={{
                display: "flex",
                alignItems: "center",
                // "& svg path": {
                // 	color: "#ffffff",
                // 	fill: "#ffffff",
                // 	stroke: "1px #ffffff",
                // },
                height: "28px",
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: "20px",
                mt: 1,
              }}
              onClick={() => handleViewStoreButton()}
              // startIcon={<EyeIcon fillColor={"#fff "} />}
            >
              View Store
            </PrimaryButton>
          )}{" "}
        </Box>
      </Box>

      <Divider
        variant="middle"
        sx={{
          mt: 2,
          ml: -1,
          mr: -1,
        }}
      />
    </Box>
  );
}

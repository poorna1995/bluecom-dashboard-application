import React from "react";
import placeholder from "public/assets/placeholder/empty_state1.png";
import { Box, Typography, Divider } from "@mui/material";
import AppImage from "../AppImage";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Outbound } from "@mui/icons-material";
import OutlinedButton from "../Buttons/OutlinedButton";
import DescriptionText from "../Typography/BodyText/DescriptionText";
import RecommendedIcon from "../Icons/EmptyStates/RecommendedIcon";
import BlueTick from "../Icons/EmptyStates/BlueTick";

export default function NewEmptyState({
  icon,
  title,
  text,
  titleDesc,
  image = "",
  children,
  containerStyles,
  imageStyles,
  hidePoints,
  hideRecommendedTitle,

  note1,
  note2,
  note3,

  ActionOne,
  ActionTwo,
  ActionThree,

  hideActionOne,
  hideActionTwo,
  hideActionThree,

  handleActionOne = () => {},
  handleActionTwo = () => {},
  handleActionThree = () => {},
}) {
  // const data = [
  //   {
  //     number: "1",
  //     notes: "Create a product with bluecom",
  //   },
  // ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // mt: "24px",
        minHeight: "600px",
      }}
    >
      <Box
        sx={{
          // height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "32px",
          maxHeight: "400px",
          maxWidth: "750px",
          m: "auto",
          border: "1px solid #958FEC",
          borderRadius: "10px",
          ...containerStyles,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {icon ?? <AppImage src={placeholder} width="150" height="150" />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {title && (
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#2a2a2f",
                }}
              >
                {title}
              </Typography>
            )}
            {titleDesc && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#626266",
                  textWrap: "wrap",
                }}
              >
                {titleDesc}
              </Typography>
            )}
          </Box>
        </Box>
        {!hideRecommendedTitle && (
          <Box
            sx={{
              pt: "16px",
              width: "100%",
              borderBottom: "1px solid #958FEC",
            }}
          ></Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "12px",
            pt: "16px",
            width: "100%",
          }}
        >
          {!hidePoints && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#313131",
                }}
              >
                We recommend having following completed before creating a
                Purchase order.
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  // fontSize:"14px",
                }}
              >
                <BlueTick />
                Make sure vendor/supplier is created in bluecom
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BlueTick />
                Connect your operational store with bluecom.
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  pb: "16px",
                }}
              >
                <BlueTick />
                Product lead time information is recorded in PDP page
              </Typography>
            </Box>
          )}
          {!hideRecommendedTitle && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "20px",
                fontWeight: 600,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <RecommendedIcon />
              Recommended Actions
            </Typography>
          )}

          {/* First Item */}
          {!hideActionOne && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pb: "10px",
                ml: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#313131",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "#DCDAF9",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1,
                    py: 1,
                    mr: "4px",
                    mt: "3px",
                  }}
                >
                  1
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#313131",
                  }}
                >
                  {note1}
                </Typography>
              </Box>
              <Box>
                <PrimaryButton
                  size="small"
                  sx={{
                    width: "160px",
                  }}
                  onClick={() => handleActionOne()}
                >
                  {ActionOne}
                </PrimaryButton>
              </Box>
            </Box>
          )}

          {/* Second Item */}

          {!hideActionTwo && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pb: "10px",
                ml: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#313131",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    backgroundColor: "#DCDAF9",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: "4px",
                    mt: "3px",
                    px: 1,
                    py: 1,
                  }}
                >
                  2
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#313131",
                  }}
                >
                  {note2}
                </Typography>
              </Box>
              <Box>
                <PrimaryButton
                  size="small"
                  sx={{
                    width: "160px",
                  }}
                  onClick={() => handleActionTwo()}
                >
                  {ActionTwo}
                </PrimaryButton>
              </Box>
            </Box>
          )}

          {/* Third Item */}
          {!hideActionThree && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                // pb: "10px",
                ml: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#313131",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    backgroundColor: "#DCDAF9",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: "4px",
                    mt: "1px",
                    px: 1,
                    py: 1,
                  }}
                >
                  3
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#313131",
                  }}
                >
                  {note3}
                </Typography>
              </Box>
              <Box>
                <PrimaryButton
                  size="small"
                  sx={{
                    width: "160px",
                  }}
                  onClick={() => handleActionThree()}
                >
                  {ActionThree}
                </PrimaryButton>
              </Box>
            </Box>
          )}
        </Box>

        {/* <AppImage
        src={image}
        width="190"
        height="180"
        sx={{ mb: 1, ...imageStyles }}
      /> */}

        {children}
      </Box>
    </Box>
  );
}

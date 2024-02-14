import React from "react";
import { Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import AppImage from "components/Common/AppImage";
import image from "public/assets/Group 39519.png";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BaseDialog from "components/Common/Dialog";
import BaseCard from "components/Common/Cards/BaseCard";

const AnalyticsAndReportingPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "90px",
        }}
      >
        <BaseCard
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              width: "392px",
              height: "448px",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <AppImage src={image} width="72" height="72" />
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "35px",
                    color: "#170F49",
                  }}
                >
                  Analytics & Reporting
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#6F6C90",
                    lineHeight: "30px",
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  Get Complete Operations Analytics
                </Typography>
              </Box>
            </Box>
            <Box>
              <PrimaryButton
                sx={{
                  backgroundColor: "#4A3AFF",
                  padding: "26px 78px",
                  borderRadius: "96px",
                }}
              >
                Get started
              </PrimaryButton>
            </Box>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "392px",
              height: "448px",
              backgroundColor: "#F7F7FC",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    color: "#170F49",
                    fontWeight: "700",
                    fontSize: "18px",
                    lineHeight: "20px",
                    marginRight: "55px",
                  }}
                >
                  What’s included
                </Typography>
              </Box>
              <Box sx={{ marginTop: "1rem" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    style={{
                      color: "4A3AFF",
                      width: "28px",
                      height: "28px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#170F49",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    All analytics features
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    style={{
                      color: "4A3AFF",
                      width: "28px",
                      height: "28px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#170F49",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    All analytics features
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    style={{
                      color: "4A3AFF",
                      width: "28px",
                      height: "28px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#170F49",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    All analytics features
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    style={{
                      color: "4A3AFF",
                      width: "28px",
                      height: "28px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#170F49",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    All analytics features
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </BaseCard>
      </Box>
    </Box>
  );
};

export default AnalyticsAndReportingPage;

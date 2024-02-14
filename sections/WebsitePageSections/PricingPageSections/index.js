import React from "react";
import {
  Box,
  Typography,
  Grid,
  GridItem,
  Checkbox,
  Container,
} from "@mui/material";
import IosSwitch from "components/Common/Switches/IosSwitch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PricingSubscriptionPage from "./components/PricingSubscriptionPage";
import AnalyticsAndReportingPage from "./components/AnalyticsAndReportingPage";

export default function PricingPageSections() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#4A3AFF",
            }}
          >
            PRICING
          </Typography>
        </Box>
        <Box>
          <IosSwitch />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
            }}
          >
            Simple, transparent pricing
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              backgroundColor: "#4A3AFF",
              fontSize: "18px",
              fontWeight: "700",
              color: "#FFFFFF",
              lineHeight: "20px",
              padding: "18px 44px",
              borderRadius: "96px",
            }}
          >
            Explore Features
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: " #F9F9FB",
            marginTop: "3rem",
            borderRadius: "5px",
            justifyContent: "flex-end",
            gap: "90px",
            width: "55%",
            alignItems: "center",
            paddingTop: "10px",
            paddingRight: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Starter
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Business
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Enterprise
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            borderRadius: "5px",
            justifyContent: "flex-end",
            gap: "10px",
            width: "55%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginRight: "3rem",
              fontSize: "40px",
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
            }}
          >
            $xxx{" "}
            <span
              style={{
                fontSize: "15px",
                opacity: "0.7",
                fontWeight: "500",
              }}
            >
              /monthly
            </span>
          </Typography>

          <Typography
            sx={{
              marginRight: "4rem",
              fontSize: "40px",
              fontWeight: "700",
              color: "#170F49",
              marginBottom: "1.2rem",
            }}
          >
            $xxx{" "}
            <span
              style={{
                fontSize: "15px",
                opacity: "0.7",
                fontWeight: "500",
              }}
            >
              /monthly
            </span>
          </Typography>

          <Typography
            sx={{
              marginRight: "3rem",
              fontSize: "15px",
              opacity: "0.7",
              fontWeight: "500",
              color: "#170F49",
              marginBottom: "1.2rem",
            }}
          >
            Contact US
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            backgroundColor: " #F9F9FB",
            borderRadius: "5px",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "55%",
            gap: "110px",
            paddingTop: "20px",
          }}
        >
          <Typography
            sx={{
              opacity: "0.4",
              verticalAlign: "middle",
              fontWeight: "300",
            }}
          >
            <span>
              <HelpOutlineIcon fontSize="small" />
            </span>
          </Typography>

          <Typography
            sx={{
              marginRight: "0px",
              backgroundColor: "#4A3AFF",
              fontWeight: "600",
              lineHeight: "20px",
              fontSize: "15px",
              color: "#FFFFFF",
              marginBottom: "1.2rem",
              padding: "8px 20px",
              borderRadius: "96px",
            }}
          >
            {" "}
            Get started
          </Typography>

          <Typography
            sx={{
              backgroundColor: "#4A3AFF",
              color: "#FFFFFF",
              marginBottom: "1.2rem",
              fontWeight: "600",
              lineHeight: "20px",
              fontSize: "15px",
              padding: "8px 20px",
              borderRadius: "96px",
            }}
          >
            Get started
          </Typography>

          <Typography
            sx={{
              backgroundColor: "#4A3AFF",
              color: "#FFFFFF",
              marginBottom: "1.2rem",
              fontWeight: "600",
              lineHeight: "20px",
              fontSize: "15px",
              padding: "8px 20px",
              borderRadius: "96px",
            }}
          >
            Get started
          </Typography>
        </Box>
      </Box>

      <PricingSubscriptionPage />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "50px 0",
          color: "#4A3AFF",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "20px",
          }}
        >
          ADD ONS
        </Typography>
      </Box>

      <AnalyticsAndReportingPage />
    </Box>
  );
}

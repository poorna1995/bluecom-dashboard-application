import { Box, Typography } from "@mui/material";
import React from "react";

export default function StoresFAQSection() {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        mb: 4,
      }}
    >
      <Typography
        sx={{
          color: "#222",
          fontSize: "28px",
          fontWeight: 700,
        }}
      >
        FAQs
      </Typography>

      {data.map((item) => {
        return (
          <Box
            key={item.title}
            sx={{
              mt: 2,
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.1)",
              p: 4,
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontSize: "20px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontSize: "16px",
                fontWeight: 500,

                pl: 3,
              }}
            >
              {item.description}
            </Typography>
          </Box>
        );
      })}
      <Typography
        sx={{
          mt: 2,
          fontSize: "15px",
          "& a": {
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        For further questions, bluecom team is here to assist you in your
        onboarding process.{" "}
        <a
          href="https://calendly.com/bluecom/30min?back=1&month"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us!
        </a>
      </Typography>
    </Box>
  );
}

const data = [
  {
    title: "1. What is a primary store?",
    description: `A primary store is your main ecommerce store where the majority of your products are listed. The primary store’s data will be used as the source of truth for the products.`,
  },
  {
    title: "2. Can I have multiple primary stores?",
    description: `No, you can only have one primary store, while any other stores you have are considered secondary. The primary store serves as the baseline for comparing product information when additional stores are connected.`,
  },
];

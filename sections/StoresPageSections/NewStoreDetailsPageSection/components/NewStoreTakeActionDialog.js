import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import React from "react";

export default function NewStoreTakeActionDialog({ open, handleClose }) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={"Confirm Action"}
      dialogActions={
        <Box sx={{ py: 2, gap: 2, display: "flex", px: 2 }}>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleClose}>Confirm</PrimaryButton>
        </Box>
      }
      titleStyles={{
        borderBottom: "1px solid #E0E0E0",
        color: "#19235A",
        fontSize: "21px",
        fontWeight: 700,
      }}
      dialogContentStyles={{
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Box
        sx={{
          maxWidth: "576px",
          py: 4,

          "& ol": {
            maxWidth: "540px",
            listStylePosition: "outside",
            "& li": {
              color: "#000",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: " 20px",
              ml: -2,
            },
          },
          "& p": {
            color: "#000",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: " 20px",
            px: 1,
          },
        }}
      >
        <ol>
          <li>
            This Operation will bring any new products which are not connected
            in bluecom.
          </li>
          <li>This action will bring inventory data of the new products</li>
        </ol>
        <p>
          In conclusion, we recommend to continue with this action if there are
          new products added to your shopify store
        </p>
        <FormControlLabel
          sx={{ px: 1 }}
          control={<Checkbox />}
          label={
            <Typography
              sx={{
                color: "#3D3D3D",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: " 20px",
              }}
            >
              I agree with the above statements & like to continue
            </Typography>
          }
        />
      </Box>
    </BaseDialog>
  );
}

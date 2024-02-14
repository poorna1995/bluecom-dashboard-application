import { Box } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import { useRouter } from "next/router";
import React from "react";

export default function ConfirmFirstStoreLinkDialog({
  open,
  handleClose,
  handleConfirmButtonClick,
  channel,
}) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={"Confirm Primary Store"}
      titleStyles={{
        color: "#19235A",
        fontSize: " 21px",
        fontWeight: 700,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
      dialogActions={
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            // borderTop: "1px solid rgba(0,0,0,0.1)",
            px: 2,
            py: 1.5,
            gap: 2,
          }}
        >
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleConfirmButtonClick}>
            Connect Primary Store
          </PrimaryButton>
        </Box>
      }
      dialogContentStyles={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          "& .confirmation-text": {
            color: "#19235A",
            fontSize: "16px",
            fontWeight: 500,
            my: 2,
          },

          "& .notes-container": {
            borderRadius: " 6px",
            background: "#FEF7F0",
            p: 2,
            "& .title": {
              color: (theme) => theme.palette.text.primary,
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: " 20px",
              "& svg": {
                mr: 1,
              },
            },
            "& ul": {
              // listDecoration: "none",
              // listStylePosition: "outside",
              // marginBlockStart: "0px",
              px: 2,
              "& li": {
                // listStylePosition: "outside",
                color: "#000",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "150%",
              },
            },
          },
        }}
      >
        <div className="confirmation-text">
          Please confirm if {channel} store is your primary store.
        </div>
        <div className="notes-container">
          <p className="title">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.33398 11.332H8.66732V7.33203H7.33398V11.332ZM8.00065 5.9987C8.18954 5.9987 8.34798 5.9347 8.47598 5.8067C8.60398 5.6787 8.66776 5.52048 8.66732 5.33203C8.66732 5.14314 8.60332 4.9847 8.47532 4.8567C8.34732 4.7287 8.1891 4.66492 8.00065 4.66536C7.81176 4.66536 7.65332 4.72936 7.52532 4.85736C7.39732 4.98536 7.33354 5.14359 7.33398 5.33203C7.33398 5.52092 7.39798 5.67936 7.52598 5.80736C7.65398 5.93536 7.81221 5.99914 8.00065 5.9987ZM8.00065 14.6654C7.07843 14.6654 6.21176 14.4903 5.40065 14.14C4.58954 13.7898 3.88398 13.3149 3.28398 12.7154C2.68398 12.1154 2.2091 11.4098 1.85932 10.5987C1.50954 9.78759 1.33443 8.92092 1.33398 7.9987C1.33398 7.07648 1.5091 6.20981 1.85932 5.3987C2.20954 4.58759 2.68443 3.88203 3.28398 3.28203C3.88398 2.68203 4.58954 2.20714 5.40065 1.85736C6.21176 1.50759 7.07843 1.33248 8.00065 1.33203C8.92287 1.33203 9.78954 1.50714 10.6007 1.85736C11.4118 2.20759 12.1173 2.68248 12.7173 3.28203C13.3173 3.88203 13.7924 4.58759 14.1427 5.3987C14.4929 6.20981 14.6678 7.07648 14.6673 7.9987C14.6673 8.92092 14.4922 9.78759 14.142 10.5987C13.7918 11.4098 13.3169 12.1154 12.7173 12.7154C12.1173 13.3154 11.4118 13.7905 10.6007 14.1407C9.78954 14.4909 8.92287 14.6658 8.00065 14.6654Z"
                fill="#E3810F"
              />
            </svg>
             */}
            <b>Note:</b> A primary store is your main ecommerce store where the
            majority of your products are listed. The primary store&apos;s data
            will be used as the source of truth for the products.
          </p>
          {/* <ul>
            <li>
              {" "}
              Selecting the primary store ensures accurate comparison data
              between different stores.
            </li>
            {/* <li>
              If this store isn&apos;t your primary Store, comparisons might not
              reflect your main business operations.
            </li>{" "}
          </ul> */}
        </div>
      </Box>
    </BaseDialog>
  );
}

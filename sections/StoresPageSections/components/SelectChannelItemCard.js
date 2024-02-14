import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";
import FieldsLinkButton from "./FieldsLinkButton";

export default function SelectChannelItemCard({
  isSelected,
  icon,
  title,
  onClick,
  handleClickInfoButton,
}) {
  return (
    <BaseCard
      sx={{
        // height: "190px",
        // width: "200px",
        boxShadow: "none",
        border: (theme) =>
          isSelected
            ? `3px solid ${theme.palette.primary.main}`
            : `2px solid ${theme.palette.grey[300]}`,
        borderRadius: "10px",
        position: "relative",
        // cursor: "pointer",
        p: 3,
      }}
      // onClick={onClick}
    >
      {/* <CheckCircle
				sx={{
					color: (theme) =>
						isSelected
							? theme.palette.primary.main
							: theme.palette.grey[300],
					position: "absolute",
					right: "10px",
					top: "10px",
				}}
			/> */}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          height: "inherit",
          "& .helper-text": {
            color: "#555",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "27px",
            width: "220px",
          },
          "& .info-button": {
            color: "#4F44E0",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 2,
            cursor: "pointer",
            "& svg": {
              mr: 1,
            },
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          {icon && icon}
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: 600,
              lineHeight: "24px",
              color: "#000",
              fontSize: " 21px",
            }}
          >
            {title}
            <p className="helper-text">
              Establish connection with your {title} store
            </p>
          </Typography>
          {/* <FieldsLinkButton /> */}
          {/* <p className="info-button" onClick={handleClickInfoButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.66732 5.9987H7.33398V4.66536H8.66732M8.66732 11.332H7.33398V7.33203H8.66732M8.00065 1.33203C7.12517 1.33203 6.25827 1.50447 5.44943 1.8395C4.64059 2.17453 3.90566 2.6656 3.28661 3.28465C2.03636 4.5349 1.33398 6.23059 1.33398 7.9987C1.33398 9.76681 2.03636 11.4625 3.28661 12.7127C3.90566 13.3318 4.64059 13.8229 5.44943 14.1579C6.25827 14.4929 7.12517 14.6654 8.00065 14.6654C9.76876 14.6654 11.4645 13.963 12.7147 12.7127C13.9649 11.4625 14.6673 9.76681 14.6673 7.9987C14.6673 7.12322 14.4949 6.25631 14.1598 5.44747C13.8248 4.63864 13.3338 3.90371 12.7147 3.28465C12.0956 2.6656 11.3607 2.17453 10.5519 1.8395C9.74304 1.50447 8.87613 1.33203 8.00065 1.33203Z"
                fill="#4F44E0"
              />
            </svg>{" "}
            Know which fields linked
          </p> */}
          <PrimaryButton
            small="small"
            onClick={onClick}
            size="medium"
            sx={{ mt: 2 }}
          >
            Connect
          </PrimaryButton>
        </div>
      </Box>
    </BaseCard>
  );
}

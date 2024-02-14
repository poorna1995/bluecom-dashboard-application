import { Box, CircularProgress, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SyncIcon from "components/Common/Icons/SyncIcon";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import React from "react";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";

export default function MobileViewStoreDetailsCard({
  data,
  storeData,
  handleSyncButtonClick,
}) {
  return (
    <Box
      sx={{
        px: 2,
        borderBottom: "1px solid rgba(17,17,17,0.1)",
        py: 2,
      }}
    >
      <Typography
        sx={{
          color: " #000",
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "20px",
          letterSpacing: "-0.48px",
          "& span": {
            color: "#46946D",
            fontSize: "12px",
            fontWeight: 600,
            alignItems: "center",
            display: "flex",
            "& svg": {
              mr: 0.5,
            },
          },
          "& .error": {
            color: "#46946D",
          },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {(data.fact_line_desc && data.fact_line_desc.split("_api")[0]) || ""}
        {data.status === "success" ? (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <g clipPath="url(#clip0_12372_15365)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 7.5C0.5 5.64348 1.2375 3.86301 2.55025 2.55025C3.86301 1.2375 5.64348 0.5 7.5 0.5C9.35652 0.5 11.137 1.2375 12.4497 2.55025C13.7625 3.86301 14.5 5.64348 14.5 7.5C14.5 9.35652 13.7625 11.137 12.4497 12.4497C11.137 13.7625 9.35652 14.5 7.5 14.5C5.64348 14.5 3.86301 13.7625 2.55025 12.4497C1.2375 11.137 0.5 9.35652 0.5 7.5ZM7.10053 10.496L11.1307 5.45787L10.4027 4.87547L6.96613 9.16973L4.532 7.1416L3.93467 7.8584L7.10053 10.4969V10.496Z"
                  fill="#039855"
                />
              </g>
              <defs>
                <clipPath id="clip0_12372_15365">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>{" "}
            Connected
          </span>
        ) : (
          <span className="error"> Not Connected</span>
        )}
      </Typography>
      <RenderDate
        date={data.last_synced}
        sx={{
          color: "#616161",
          fontFamily: "Inter",
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: "17px",
          letterSpacing: "-0.24px",
        }}
      />
    </Box>
  );
}

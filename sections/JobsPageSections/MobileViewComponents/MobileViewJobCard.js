import { Box, IconButton, Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import CustomCircularProgressWithLabel from "components/Common/Progress/CustomCircularProgressWithLabel";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import React from "react";

export default function MobileViewJobCard({ data }) {
  console.log({ data });
  return (
    <Box sx={{ py: 2, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppLink
          href={`/app/jobs/${data.task_id}`}
          sx={{
            color: "#212121",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "17px",
            letterSpacing: " -0.28px",
            maxWidth: "340px",
            wordBreak: "break-word",
          }}
        >
          {data.task_id}
        </AppLink>
        <IconButton LinkComponent={AppLink} href={`/app/jobs/${data.task_id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M1.18333 -0.000323666L7.85 6.66634L1.18334 13.333L2.28074e-06 12.1497L5.48333 6.66634L1.322e-06 1.18301L1.18333 -0.000323666Z"
              fill="#222222"
            />
          </svg>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Box>
          <Box
            sx={{
              color: "#616161",

              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "17px",
              letterSpacing: " -0.24px",
            }}
          >
            <RenderDate
              date={data.updated_at}
              sx={{
                color: "#616161",

                fontSize: "12px",
                fontWeight: 600,
                lineHeight: "17px",
                letterSpacing: " -0.24px",
              }}
            />
            {" - "}
            <span>{data.result.length === 1 ? "Publish" : "Bulk Publish"}</span>
          </Box>
          <RenderStatus value={data.task_status} />
        </Box>
        <Box>
          <CustomCircularProgressWithLabel progress={data.task_percentage} />
        </Box>
      </Box>
    </Box>
  );
}

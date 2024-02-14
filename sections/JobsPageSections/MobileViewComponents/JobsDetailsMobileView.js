import { Box, IconButton, Typography } from "@mui/material";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import JobDetailsProductCard from "./JobDetailsProductCard";

export default function JobsDetailsMobileView({
  publishProducts,
  jobId,
  statusText,
  orderedList,
}) {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          pl: "16px",
          pr: "16px",
          pb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            // pl: 2,
            // pr: 2,
            mt: -1,
            mb: "12px",
          }}
        >
          <IconButton
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              p: "4px",
            }}
            onClick={() => router.push("/app/jobs")}
          >
            <MdArrowBack />
          </IconButton>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // pr: 1,
              fontSize: "12px",
              fontWeight: "600",
              color: "#616161",
              width: "100%",
            }}
          >
            Last Updated:{" "}
            <span>
              {publishProducts && (
                <RenderDate date={publishProducts.result.updated_at} />
              )}
            </span>
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "21px",
            fontWeight: "700",
            color: "#212121",
            mb: "12px",
          }}
        >
          {jobId}
        </Typography>
        <RenderStatus value={statusText} />
        <Box sx={{ mt: "12px" }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              color: "#00000",
            }}
          >
            Products Published
          </Typography>
          <SectionTitleText
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#000000",
              mt: "8px",
            }}
          >
            {Array.isArray(orderedList) && orderedList.length}
          </SectionTitleText>
        </Box>
      </Box>
      <JobDetailsProductCard
        orderedList={orderedList}
        statusText={statusText}
      />
    </>
  );
}

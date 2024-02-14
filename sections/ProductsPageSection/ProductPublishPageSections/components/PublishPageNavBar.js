import { Box, Container, IconButton } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function PublishPageNavBar({
  pageLabel,
  handleClickBackButton,
  handleClickContinueButton,
  disableContinueButton,
}) {
  const router = useRouter();
  const pageType = router.query.step;
  const status = router.query.status;
  console.log({ pageType });

  return (
    <Box
      sx={{
        padding: "16px",
        background: "white",
        margin: "-8px",
        marginBottom: "16px",
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        position: "sticky",
        top: "0px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
        {status === "success" ? (
          <IconButton
            onClick={() => router.back()}
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              borderRadius: "5px",
            }}
          >
            <MdArrowBack />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleClickBackButton}
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              borderRadius: "5px",
            }}
          >
            <MdArrowBack />
          </IconButton>
        )}
        <SectionTitleText sx={{ marginLeft: "16px", fontSize: "18px" }}>
          {/* {pageLabel} */}
          Go Back
        </SectionTitleText>
        <div style={{ flex: 1 }} />
        {/* {
					// status !== "success"
					pageType !== "publish" && (
						<PrimaryButton
							onClick={handleClickContinueButton}
							disabled={disableContinueButton}
						>
							Continue
						</PrimaryButton>
					)
				} */}
      </Box>
    </Box>
  );
}

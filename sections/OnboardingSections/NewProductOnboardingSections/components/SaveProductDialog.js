import { Box } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import CreateSuccessIcon from "components/Common/Icons/CreateSuccessIcon";
import React from "react";

export default function SaveProductDialog({
  open,
  handleClose,
  handleGoToHomeButtonClick,
  handlePublishNowButtonClick,
}) {
  return (
    <BaseDialog handleClose={handleClose} open={open} hideCloseButton>
      <Box
        sx={{
          marginY: "8px",
          marginX: "8px",
          width: "400px",
          // height: "200px",
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          borderRadius: "12px",
          "& svg": {
            mb: "16px",
          },
        }}
      >
        <CreateSuccessIcon />
        <SectionTitleText sx={{ pt: "8px" }}>
          Product Created Successfully
        </SectionTitleText>
        <DescriptionText
          sx={{
            mt: "16px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            textAlign: "center",
          }}
        >
          {/* Your product has been added.
          <br />
          You can now publish it on the store */}
          Product is created successfully, you have option to publish to a store
        </DescriptionText>

        <Box
          sx={{
            // borderTop: (theme) =>
            // 	`1px solid ${theme.palette.grey[300]}`,
            display: "flex",
            pt: "32px",

            // bottom: "0",
            width: "100%",
            pb: "16px",
            // pb: "24px",
          }}
        >
          <OutlinedButton
            sx={{
              flex: 1,
            }}
            onClick={handleGoToHomeButtonClick}
          >
            Go to List view
          </OutlinedButton>
          <PrimaryButton
            sx={{
              flex: 1,
              ml: "16px",
            }}
            onClick={handlePublishNowButtonClick}
          >
            Publish to a Store
          </PrimaryButton>
        </Box>
      </Box>
    </BaseDialog>
  );
}

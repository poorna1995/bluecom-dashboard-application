import { Box, IconButton } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/router";

export default function BundleOverviewCard({
  icon,
  title,
  children,
  tab,
  type = "bundle",
}) {
  const router = useRouter();
  const productId = router.query.productId;
  const productType = router.query.productType;
  const handleClickIconButton = () => {
    if (productType === "bundle") {
      return router.push(
        `/app/products/${productId}?productType=${productType}&tab=${tab}`
      );
    } else return router.push(`/app/products/${productId}?tab=${tab}`);
  };

  return (
    <BaseCard
      sx={{
        boxShadow: "none",
        // width: "300px",
        // height: "325px",
        border: "1px solid rgba(49, 61, 78, 0.1)",
        // overflow: "unset",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: !tab ? "13px" : "8px",
          pl: "16px",
          minHeight: "40px",
        }}
      >
        <SectionTitleText
          sx={{
            display: "flex",
            flexDirection: "row",
            // height: "40px",
            fontSize: {
              xs: "14px",
              md: "14px",
              md: "18px",
            },
            fontWeight: {
              xs: "600",
              sm: "600",
              md: "700",
            },
            gap: "0.5rem",
            alignItems: "center",
            // paddingLeft: "15px",
            // marginTop: "15px",
            color: "#484A9E",
            "& svg": {
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            },
          }}
        >
          {icon}
          {title}
        </SectionTitleText>
        {tab !== 0 ? (
          <IconButton onClick={handleClickIconButton} sx={{ zIndex: 1 }}>
            <OpenInNewIcon
              sx={{
                color: "#5860D7",
              }}
            />
          </IconButton>
        ) : null}
      </Box>
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "320px",
          minHeight: "320px",
          // pb: 2,
        }}
      >
        {children}
      </Box>
    </BaseCard>
  );
}

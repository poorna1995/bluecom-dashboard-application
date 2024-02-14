import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";

export default function ProductOnboardingSectionContainer({
  containerStyles,
  children,
  title,
}) {
  return (
    <BaseCard
      sx={{
        padding: "16px",
        marginTop: "16px",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "none",
        overflow: "unset",
        ...containerStyles,
      }}
    >
      {title && (
        <SectionTitleText
          sx={{
            my: 2,
            borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
            pb: 2,
          }}
        >
          {title}
        </SectionTitleText>
      )}
      {children}
    </BaseCard>
  );
}

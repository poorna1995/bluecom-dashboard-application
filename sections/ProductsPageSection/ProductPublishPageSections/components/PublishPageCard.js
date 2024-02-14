import { Container } from "@mui/system";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";

export default function PublishPageCard({ children }) {
  return (
    <>
      <BaseCard
        sx={{
          // padding: "16px",
          // minHeight: "400px",
          // marginBottom: "32px",
          border: "none",
          boxShadow: "none",
        }}
      >
        {children}
      </BaseCard>
    </>
  );
}

import React from "react";
import { Box, Button } from "@mui/material";
import BackArrowIcon from "components/Common/Icons/SettingsSectionIcons/BackArrow";
import { useRouter } from "next/router";

function GoBackButtonWithRoute() {
  const router = useRouter();

  return (
    <Button
      sx={{
        minWidth: "40px",
        height: "40px",
        border: "1px solid #0000001A",
        borderRadius: "5px",
      }}
      onClick={() => router.push(`/settings`)}
    >
      <BackArrowIcon />
    </Button>
  );
}
export default GoBackButtonWithRoute;

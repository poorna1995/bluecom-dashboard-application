import { Avatar, styled } from "@mui/material";
import React from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
export default function RenderCustomerInfo({ customerInfo = {} }) {
  if (!customerInfo.first_name)
    return (
      <StyledDiv>
        {/* <Avatar></Avatar> */}
        <span>{`No Customer Info`}</span>
      </StyledDiv>
    );

  return (
    <StyledDiv>
      <Avatar sx={{ mr: 1, height: "24px", width: "24px" }}>
        {customerInfo.first_name[0]}
      </Avatar>
      <span>{`${customerInfo.first_name} ${customerInfo.last_name}`}</span>
    </StyledDiv>
  );
}

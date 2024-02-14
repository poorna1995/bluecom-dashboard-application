import { InputAdornment, Tooltip } from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import React from "react";

import ReportIcon from "@mui/icons-material/Report";
export default function RenderTextInputForPOTable({
  cell,
  handleChangeValues,
  value,
  message,
  placeholder,
  condition,
  ...props
}) {
  return (
    <TextInput
      sx={{
        "& .MuiOutlinedInput-input": {
          padding: "10px 12px",
          borderRadius: "8px",
          border: "none",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #E5E5E5",
        },
        // input:{
        //   textAlign:"right"
        // }
      }}
      containerStyles={{
        marginTop: "0px",
        // width: "50%",
        minWidth: "70px",
      }}
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValues}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {condition && (
              <Tooltip title={message}>
                <ReportIcon size="small" color="error" />
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

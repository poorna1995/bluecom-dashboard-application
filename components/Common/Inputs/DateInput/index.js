import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { InputLabel, TextField, styled } from "@mui/material";

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  color: "#222222",
  margin: theme.spacing(1),
  marginLeft: 0,
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "17px",
  // letterSpacing: "-3%",
}));

export default function DateInput({
  title,
  required,
  labelStyles,
  inputStyles,
  ...props
}) {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {title && (
        <StyledLabel sx={labelStyles} required={required}>
          {title}
        </StyledLabel>
      )}

      <DesktopDatePicker
        // label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            inputProps={{
              sx: {
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "8px",
                fontWeight: 500,
                // height:"26px"
                ...inputStyles,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
                borderRadius: "8px",
                fontWeight: 500,
              },
            }}
            {...params}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
}

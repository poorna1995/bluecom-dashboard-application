import {
  Box,
  Button,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function FormInputWithLabelAndHelpButton({
  title,
  helperButtonText,
  helperButtonOnClick,
  helperText,
  required,
  ...props
}) {
  return (
    <Stack
      direction="column"
      sx={{
        minWidth: "500px",
        mt: 2,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#222",
          }}
        >
          {title || "Store Name"} {required && "*"}
        </Typography>
        <Button
          // onAbort={helperButtonOnClick}
          sx={{
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            // color: "#4F44E0",

            "&:hover": {
              background: "transparent",
            },
          }}
          disableRipple
          onClick={helperButtonOnClick}
        >
          {helperButtonText}
        </Button>
      </Stack>
      <Stack>
        <OutlinedInput
          sx={{
            borderRadius: "8px",
          }}
          {...props}
        />
        <FormHelperText
          sx={{
            color: (theme) => props.error && theme.palette.error.main,
          }}
        >
          {helperText}
        </FormHelperText>
      </Stack>
    </Stack>
  );
}

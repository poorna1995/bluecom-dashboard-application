import { InputLabel, styled, TextField } from "@mui/material";
import React from "react";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  maxWidth: "600px",
  height: "100%",
  width: "100%",
  margin: "auto",
  marginTop: "24px",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  paddingTop: {
    xs: "12px",
    sm: "12px",
    md: "15px",
  },
  paddingBottom: {
    xs: "11px",
    sm: "11px",
    md: "14px",
  },
  borderRadius: "7px",
  fontWeight: 600,
  fontSize: {
    xs: "14px",
    sm: "14px",
    md: "16px",
  },
  // height:"26px"
}));

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
  // margin: {
  //   xs: theme.spacing(0.5),
  //   sm: theme.spacing(0.5),
  //   md: theme.spacing(1),
  // },
  marginLeft: 0,
  marginBottom: {
    xs: "4px",
    sm: "4px",
    md: "8px",
  },
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "#313131",
  // letterSpacing: "0px",
}));
const TextInput = ({
  title,
  required,
  containerStyles,
  value,
  onChange,
  inputStyles,
  labelStyles,
  inputRef,
  borderRadius,
  ...props
}) => {
  return (
    <StyledContainer style={containerStyles}>
      {title && (
        <StyledLabel sx={labelStyles} required={required}>
          {title}
        </StyledLabel>
      )}
      <TextField
        ref={inputRef}
        inputProps={{
          sx: {
            paddingTop: {
              xs: "12px",
              sm: "12px",
              md: "12px",
            },
            paddingBottom: {
              xs: "11px",
              sm: "11px",
              md: "12px",
            },
            // height: "52px",
            borderRadius: "3px",
            // border: "1px solid #c5c5c5",
            fontWeight: 600,
            // fontSize: "16px",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "16px",
            },
            // height:"26px"
            ...inputStyles,
          },
        }}
        sx={{
          // "& .MuiOutlinedInput-root": {
          // 	borderRadius: "3px",
          // 	// "&:focus-within": {},
          // },
          // "& .MuiFocused": {
          // 	border: "1px solid #4f44e0",
          // 	outline: "none",
          // },
          height: "50px !important",
          position: "relative",
          // textDecoration: "none",

          "&::after": {
            borderBottom: "2.5px solid #4F44E0",
            content: '""',
            position: "absolute",
            // bottom: "0px",
            left: "0px",
            width: "100%",
            height: 10,
            borderRadius: "4px",
            backgroundColor: "transparent",
            bottom: "2px",
            // left: 0,
            transformOrigin: "left",
            transform: "scaleX(0)",
            transition: "all 0.3s ease-in-out",
            // transition:
            //   "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
          },

          "&:focus-within::after": {
            transformOrigin: "left",
            transform: "scaleX(1)",

            // width: "100%",
            // backgroundColor: "#4F44E0",
          },

          ...props.sx,
        }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={`Enter ${title}`}
        {...props}
      />
    </StyledContainer>
  );
};

export default TextInput;

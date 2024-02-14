import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

export const GetStartedPrimaryButton = ({
  widthInput,
  heightInput,
  fontSize,
  fontWeight,
  padding,
  mt,
  mr,
  functionName,
  buttonName,
  ...props
}) => {
  function handleButton() {
    // router.push("/auth/login");
    functionName();
    // handleClick();
    setFocused(false);

    // window.open(`https://dev.bluecom.ai/auth/${link}`, "_blank");
  }
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleClick = () => {
    setLoading(true);
    // Perform loading action here
    setTimeout(() => {
      setLoading(false);
      setHovered(false);
      setFocused(false);
    }, 2000);
  };
  return (
    <PrimaryButton
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      sx={{
        width: widthInput ? widthInput : "147px",
        height: heightInput ? heightInput : "56px",
        mt: mt ? mt : "0",
        fontSize: fontSize ? fontSize : "18px",
        fontWeight: fontWeight ? fontWeight : "500",
        padding: padding ? padding : "28px 24px",
        // fontFamily: "Manrope, sans-serif",
        mr: mr ? mr : "0",
        backgroundColor: pressed ? "#0A0092" : hovered ? "#0C00AF" : "#4F44E0",

        border: focused ? "1px solid #fff" : "",

        "&:hover": {
          backgroundColor: "#0C00AF",
        },
        "&:focus": {
          outline: focused ? "2px solid #7C99FF" : "none",
        },

        ...props.sx,
      }}
      {...loading}
      onClick={() => handleButton()}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" sx={{ color: "#FFF" }} />
      ) : (
        buttonName
      )}
    </PrimaryButton>
  );
};

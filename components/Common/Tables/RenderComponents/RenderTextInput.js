import TextInput from "components/Common/Inputs/TextInput";
import React from "react";

export default function RenderTextInput({ params = "", onChange, ...props }) {
  return (
    <TextInput
      value={params?.value ?? ""}
      containerStyles={{
        width: "100%",
        marginTop: "0px",
        ...props.containerStyles,
      }}
      inputStyles={{
        paddingTop: "8px",
        paddingBottom: "8px",

        "& .MuiOutlined-input": {
          border: "none",
        },
      }}
      sx={{
        "&::after": {
          bottom: "-1px",
          borderBottom: "4px solid #4F44E0",
          content: '""',
          position: "absolute",
          // bottom: "0px",
          left: "0px",
          width: "100%",
          height: 12,
          borderRadius: "4px",
          backgroundColor: "transparent",
          // left: 0,
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "all 0.3s ease-in-out",
        },
        "&:focus-within::after": {
          transformOrigin: "left",
          transform: "scaleX(1)",

          // width: "100%",
          // backgroundColor: "#4F44E0",
        },
      }}
      // size="small"
      onChange={onChange}
      {...props}
    />
  );
}

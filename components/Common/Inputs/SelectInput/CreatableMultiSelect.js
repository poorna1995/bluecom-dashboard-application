import { InputLabel, useTheme } from "@mui/material";

import React from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function CreatableMultiSelect({
  title,
  options,
  required,
  inputRef,
  labelStyles,
  containerStyles,
  styles,
  ...props
}) {
  const ref = React.createRef();
  const theme = useTheme();

  const customStyles = {
    multiValueRemove: (styles) => ({
      ...styles,
      ":hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    }),
    control: (styles) => ({
      ...styles,
      paddingTop: "3px",
      paddingBottom: "6px",
      borderRadius: "3px",
      fontSize: "17px",
      fontWeight: 600,

      ":hover": {
        borderColor: theme.palette.grey[800],
      },
      ":focus-within": {
        borderColor: theme.palette.primary.main,
      },
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      borderRadius: "7px",
      fontWeight: 500,
      fontSize: "16px",

      paddingRight: "12px",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: isSelected ? "12px" : "34px",

      marginBottom: "4px",
      marginLeft: "12px",
      marginRight: "12px",

      width: "93%",
      transition: "all 0.3s ease-in-out",
      color: isSelected ? "#4F44E0" : "#212121",
      background: isSelected ? "#E0E0E0" : "transparent",
      "&:hover": {
        color: "#4F44E0",
        borderRadius: "7px",
        background: "#F5F4FD",
        transition: "all 0.3s ease-in-out",
      },
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: theme.palette.text.primary,
      fontWeight: 500,
      fontSie: "19px",
    }),
    placeholder: (styles) => ({
      ...styles,
      // color: theme.palette.text.secondary,
      // color: theme.palette.grey[400],
      fontWeight: 500,
      fontSize: "17px",
      // color:"324532"
      color: "#A6A6A8",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 99999,
      // fontFamily: "Mulish, sans-serif",
    }),
  };
  return (
    <div
      style={{
        paddingTop: props.noMargin ? "" : "24px",
        width: "100%",
        ...containerStyles,
      }}
      ref={inputRef}
    >
      <InputLabel
        style={
          labelStyles
            ? labelStyles
            : {
                color: "#313131",
                // margin: theme.spacing(1),
                marginLeft: 0,
                marginBottom: "4px",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                // letterSpacing: "",
              }
        }
      >
        {title}
        {required && "*"}
      </InputLabel>
      <CreatableSelect
        styles={{ ...customStyles, ...styles }}
        isMulti
        ref={ref}
        placeholder={`Select ${title}`}
        components={animatedComponents}
        options={options}
        // promptTextCreator={(label) => `Add "${label}"`}
        formatCreateLabel={(label) => `Add "${label}"`}
        theme={(th) => ({
          ...th,
          // borderRadius: 0,
          colors: {
            ...th.colors,
            primary: theme.palette.primary.main,
          },
          borderColor: th.primary,
        })}
        {...props}
      />
    </div>
  );
}

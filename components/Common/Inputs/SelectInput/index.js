import { InputLabel, useTheme } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import TickIcon from "components/Common/Icons/DropDownIcons/TickIcon";
import React from "react";
import Select, { components } from "react-select";

const FormSelectInput = ({
  title,
  required,
  options,
  labelStyles,
  noPadding,
  styles,
  containerStyles,
  inputRef,
  borderRadius,
  paddingTop,
  ...props
}) => {
  const ref = React.createRef();

  const theme = useTheme();
  const customStyles = {
    control: (styles) => ({
      ...styles,
      height: "48px !important",
      paddingTop: paddingTop ? paddingTop : "6px",
      paddingBottom: "7px",
      borderRadius: borderRadius ? borderRadius : "3px",
      borderColor: "#c5c5c5",
      ":hover": {
        border: "0.5px solid #222",
      },
      ":focus-within": {
        border: "1px solid #E0E0E0",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 99999,
      borderRadius: "3px",
      boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 10px",
      // fontFamily: "Mulish, sans-serif",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      borderRadius: "3px",
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
      background: isSelected ? "#F5F4FD" : "transparent",
      "&:hover": {
        color: "#4F44E0",
        borderRadius: "3px",
        background: "#F5F4FD",
        transition: "all 0.3s ease-in-out",
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: theme.palette.text.primary,
      fontWeight: 500,
      fontSie: "16px",
    }),
    placeholder: (styles) => ({
      ...styles,
      // color: "#f2f2f2",
      color: theme.palette.grey[400],
      fontWeight: 500,
      fontSize: "15px",
    }),
  };

  return (
    <div
      style={{
        paddingTop: noPadding ? "0px" : "24px",
        width: "100%",
        ...containerStyles,
      }}
      ref={inputRef}
    >
      {title && (
        <InputLabel
          sx={
            labelStyles
              ? labelStyles
              : {
                  color: (theme) => theme.palette.text.primary,
                  // margin: theme.spacing(1),
                  marginLeft: 0,
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  // letterSpacing: "-3%",
                  borderRadius: "3px",
                }
          }
        >
          {title}
          {required && " *"}
        </InputLabel>
      )}
      <Select
        ref={ref}
        styles={{
          ...customStyles,
          ...styles,
        }}
        closeMenuOnSelect
        placeholder={`Select ${title}`}
        theme={(th) => ({
          ...th,
          // borderRadius: 0,
          colors: {
            ...th.colors,
            primary: theme.palette.primary.main,
            primary75: theme.palette.primary.main,
          },
          borderColor: th.primary,
        })}
        options={options}
        {...props}
        components={{
          Option: (optionProps) => (
            <components.Option {...optionProps}>
              {optionProps.isSelected && (
                <span
                  role="img"
                  aria-label="Selected"
                  style={{
                    marginRight: "8px",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2.75 8.75L6.25 12.25L13.25 4.75"
                      stroke="#4F44E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              {optionProps.children}
            </components.Option>
          ),
        }}
      />
    </div>
  );
};

export default FormSelectInput;

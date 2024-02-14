import { Box, FilledInput } from "@mui/material";
import React from "react";

export default function ShopLinkInput({
  shopName,
  setShopName,
  replaceValue,
  error,
  inputPrefix,
  inputSuffix,
  containerStyles,
  maxWidth,
  ...props
}) {
  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        // border: "1px solid rgba(0,0,0,0.1)",
        width: "auto",
        flex: 1,
        px: 2,
        maxWidth: maxWidth ? maxWidth : "480px",
        // borderRadius: "8px",
        "& .store-url-input": {
          border: "none",
          // border: error ? "1px solid #A4262C" : "1px solid rgba(0,0,0,0.1)",
          background: "transparent",
          // p: "12px",
          // borderRadius: "8px",
          flex: 1,
          //   "&:focus-within": {
          //     outline: "none",
          //     border: "none",
          //   },
          // "&:focus-within": {
          //   border: (theme) => `1px solid ${theme.palette.primary.main}`,
          // },
          // "&:hover": {
          //   border: "1px solid #000",
          // },
          mx: 2,
          // height: "36px",

          color: "#000",
          fontSize: " 16px",
          fontWeight: 500,
          lineHeight: " 24px",
        },
        "& span": {
          color: "#000",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          mt: 1,
        },
        ...containerStyles,
      }}
    >
      <span>{inputPrefix || "https://"}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <FilledInput
          className={"store-url-input"}
          value={shopName
            .replace(replaceValue, "")
            .replace("https://", "")
            .replace("http://", "")}
          onChange={(e) =>
            setShopName(
              e.target.value
                .replace(replaceValue, "")
                .replace("https://", "")
                .replace("http://", "")
            )
          }
          inputProps={{
            sx: {
              pt: 1,
            },
          }}
          placeholder="your-store-name"
          {...props}
        />
        {/* <span className="helper__text">
					{" "}
					{error && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							style={{ marginRight: "8px" }}
						>
							<path
								d="M6 8.5C6.14167 8.5 6.2605 8.452 6.3565 8.356C6.4525 8.26 6.50033 8.14133 6.5 8C6.5 7.85833 6.452 7.7395 6.356 7.6435C6.26 7.5475 6.14133 7.49967 6 7.5C5.85833 7.5 5.7395 7.548 5.6435 7.644C5.5475 7.74 5.49967 7.85867 5.5 8C5.5 8.14167 5.548 8.2605 5.644 8.3565C5.74 8.4525 5.85867 8.50033 6 8.5ZM5.5 6.5H6.5V3.5H5.5V6.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3433 2.9125 9.98717 2.4625 9.5375C2.0125 9.0875 1.65633 8.55833 1.394 7.95C1.13167 7.34167 1.00033 6.69167 1 6C1 5.30833 1.13133 4.65833 1.394 4.05C1.65667 3.44167 2.01283 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65633 4.05 1.394C4.65833 1.13167 5.30833 1.00033 6 1C6.69167 1 7.34167 1.13133 7.95 1.394C8.55833 1.65667 9.0875 2.01283 9.5375 2.4625C9.9875 2.9125 10.3438 3.44167 10.6065 4.05C10.8692 4.65833 11.0003 5.30833 11 6C11 6.69167 10.8687 7.34167 10.606 7.95C10.3433 8.55833 9.98717 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3438 7.95 10.6065C7.34167 10.8692 6.69167 11.0003 6 11Z"
								fill="#A4262C"
							/>
						</svg>
					)}
					Enter a valid URL
				</span> */}
      </div>
      <span>{inputSuffix}</span>
    </Box>
  );
}

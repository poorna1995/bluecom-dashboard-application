import { Box, Typography } from "@mui/material";
import React from "react";
import RenderAppLink from "./RenderAppLink";
import RenderAppImage from "./RenderAppImage";
import CircleIcon from "@mui/icons-material/Circle";

export default function RenderProductDetails({
  display_image,
  href,
  title,
  product_id,
  sku,
  barcode,
  hide_display_image,
  openInNewTab,
  variant_title,
  unit_retail_price,
}) {
  const productTitle = title;
  const keys = [
    { key: "product_id", title: "Product Id" },
    { key: "sku", title: "SKU" },
    { key: "barcode", title: "Barcode" },
    { key: "variant_title", title: "Variant" },
  ];

  const data = {
    sku: {
      title: "SKU",
      value: sku || "-",
    },
    barcode: { title: "Barcode", value: barcode || "-" },
    variant_title: { title: "Variant", value: variant_title },
  };
  const filteredKeys =
    keys
      .map((key) => data[key.key])
      .filter((item) => {
        if (item?.value === undefined) return;
        if (item?.value === "") return;
        return item;
      }) ?? [];
  // console.log({ filteredKeys });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // alignItems: "flex-start",
        // flexDirection: "column",
      }}
    >
      {!hide_display_image && (
        <RenderAppImage
          sx={{
            // height: "20px",
            // width: "20px",
            marginTop: "4px",
            borderRadius: "4px",
          }}
          display_image={display_image}
        />
      )}{" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RenderAppLink
          href={href}
          title={productTitle}
          target={openInNewTab && "_blank"}
        />
        {/* <Box
          sx={{
            display: "flex",
            ml: "16px",
            mt: "6px",
            flexWrap: "wrap",
          }}
        >
          {Array.isArray(filteredKeys) &&
            filteredKeys.map((item, index) => {
              return (
                <Typography
                  sx={{
                    fontSize: "14px",
                    ml: "8px",
                    // ml: product_id ? "8px" : "0px",
                    // color: (theme) => theme.palette.grey[600],
                    color: "#222222",
                    fontWeight: "500",
                  }}
                  key={index}
                >
                  {index !== 0 && (
                    <CircleIcon
                      sx={{
                        mr: 1,
                        // color: color,
                        width: "6px",
                        height: "8px",
                      }}
                    />
                  )}
                  {item.title}:{" "}
                  <span
                    style={
                      {
                        // color: "#494949",
                        // fontWeight: "600",
                      }
                    }
                  >
                    {item.value}
                  </span>
                </Typography>
              );
            })}
        </Box> */}
      </Box>
    </Box>
  );
}

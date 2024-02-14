import { Box, Typography, Tooltip, Skeleton } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import AppImage from "components/Common/AppImage";

export default function ShowProductDetails({
  display_image,
  product_title,
  title,
  unit_retail_price,
  sku,
  barcode,
  hide_display_image,
  openInNewTab,
  variant_title,
  isLoading,
}) {
  const productTitle = title;
  console.log({ display_image });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        // flexDirection: "column",
      }}
    >
      {!hide_display_image && (
        <AppImage
          src={display_image}
          width={240}
          height={240}
          sx={{
            // marginTop: "4px",
            borderRadius: "4px",
            width: "228px",
            height: "228px",
          }}
          // display_image={display_image}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Skeleton
            sx={{
              width: "200px",
              height: "50px",
              variant: "rounded",
            }}
          />
        ) : (
          product_title && (
            <Typography
              sx={{
                marginLeft: "16px",
                fontWeight: "700",
                fontSize: "16px",
                color: "#222222",
              }}
            >
              {product_title}
            </Typography>
          )
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: "16px",
            mt: "6px",
            flexWrap: "wrap",
          }}
        >
          {isLoading ? (
            <Skeleton
              sx={{
                width: "150px",
                height: "30px",
                variant: "rounded",
              }}
            />
          ) : (
            unit_retail_price && (
              <Typography
                sx={{
                  color: "#222222",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                {unit_retail_price && (
                  <CircleIcon
                    sx={{
                      mr: 1,
                      ml: 1,
                      // color: color,
                      width: "6px",
                      height: "8px",
                    }}
                  />
                )}
                Retail Price:{" "}
                <span
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  $ {unit_retail_price}
                </span>
              </Typography>
            )
          )}
          {isLoading ? (
            <Skeleton
              sx={{
                width: "150px",
                height: "30px",
                variant: "rounded",
              }}
            />
          ) : (
            sku && (
              <Typography
                sx={{
                  color: "#222222",
                  fontWeight: "500",
                  fontSize: "14px",
                  ml: unit_retail_price ? "8px" : "0px",
                }}
              >
                {unit_retail_price && (
                  <CircleIcon
                    sx={{
                      mr: 1,
                      // color: color,
                      width: "6px",
                      height: "8px",
                    }}
                  />
                )}
                SKU:{" "}
                <span
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {/* <Tooltip title={sku}>
                  <span>{sku}</span>
                </Tooltip> */}
                  {sku || "N/A"}
                </span>
              </Typography>
            )
          )}{" "}
          {isLoading ? (
            <Skeleton
              sx={{
                width: "150px",
                height: "30px",
                variant: "rounded",
              }}
            />
          ) : (
            barcode && (
              <Typography
                sx={{
                  color: "#222222",
                  fontWeight: "500",
                  fontSize: "14px",
                  ml: "8px",
                }}
              >
                <CircleIcon
                  sx={{
                    mr: 1,
                    // color: color,
                    width: "6px",
                    height: "8px",
                  }}
                />
                Barcode:{" "}
                <span
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {barcode || "N/A"}
                </span>
              </Typography>
            )
          )}{" "}
          {isLoading ? (
            <Skeleton
              sx={{
                width: "150px",
                height: "30px",
                variant: "rounded",
              }}
            />
          ) : (
            variant_title && (
              <Typography
                sx={{
                  fontSize: "14px",
                  ml: "8px",
                  color: (theme) => theme.palette.grey[600],
                  fontWeight: "500",
                }}
              >
                <CircleIcon
                  sx={{
                    mr: 1,
                    // color: color,
                    width: "6px",
                    height: "8px",
                  }}
                />
                Variant:{" "}
                <span
                  style={
                    {
                      // color: "#494949",
                      // fontWeight: "600",
                    }
                  }
                >
                  {variant_title || "N/A"}
                </span>
              </Typography>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      {/* <Skeleton
        variant="circular"
        height={"40px"}
        width={"300px"}
        sx={{ mr: 2 }}
      /> */}
      <Skeleton
        variant="rounded"
        height="30px"
        width={"200px"}
        // sx={{ mb: 1 }}
      />
    </Box>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderLinearProgressBar from "components/Common/Tables/RenderComponents/RenderLinearProgressBar";

export default function PODetailViewCard({ orderProductsData = [] }) {
  return (
    <>
      {Array.isArray(orderProductsData) &&
        orderProductsData.map((item, index) => (
          <Box
            key={index}
            sx={{
              py: 2,
              borderBottom: `1px solid rgba(17, 17, 17, 0.10)`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
              }}
            >
              <RenderAppImage
                display_image={item.display_image}
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "4px",
                  width: "36px",
                }}
              />
              <Box
                sx={{
                  ml: 1,
                  flex: 1,
                }}
              >
                <AppLink
                  href={`/app/products/${item.master_product_id}?tab=overview`}
                  sx={{
                    color: "#212121",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px" /* 121.429% */,
                    letterSpacing: " -0.28px",
                    // mb: 1,
                  }}
                  title={item.product_title}
                >
                  {item.product_title}
                </AppLink>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#414141",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "20px" /* 166.667% */,
                }}
              >
                Unit Price:
                <span
                  style={{
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {item.item_unit_cost_price}
                </span>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#414141",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "20px" /* 166.667% */,
                }}
              >
                Total Price:
                <span
                  style={{
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {item.total_cost}
                </span>
              </Typography>
            </Box>
            <RenderLinearProgressBar
              x={item.received_qty}
              y={item.qty_ordered}
            />
          </Box>
        ))}
    </>
  );
}

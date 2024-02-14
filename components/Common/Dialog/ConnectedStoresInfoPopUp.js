import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import BaseDialog from ".";
import Shopify from "public/assets/icons/shopifyListIcon.png";
import Woocommerce from "public/assets/icons/woocommerceListIcon.png";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import CrossIcon from "../Icons/POicons/DialogIcons/CrossIcon";
import WooCommerceWithSquareBorder from "../Icons/StoresIcon/WooCommerceWithSquareBorder";
import ShopifyIconWIthSquareBorder from "../Icons/StoresIcon/ShopifyIconWIthSquareBorder";

export default function ConnectedStoresInfoPopUp() {
  const tableData = [
    {
      title: "Total Products",
      fields_linked: "20",
      sync: "20 min ago",
    },
    {
      title: "Inventory",
      fields_linked: "120",
      sync: "20 min ago",
    },
    {
      title: "Total Locations",
      fields_linked: "-",
      sync: "20 min ago",
    },
  ];

  const tableColumns = [
    {
      accessorKey: "title",
      // Header: "Title",
      size: 30,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            color: "#000",
            fontSize: " 14px",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          {cell.getValue() || "ABCD"}
        </Typography>
      ),
    },
    {
      accessorKey: "fields_linked",
      // Header: "Field Linked",
      size: 30,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            color: "#1D2939",
            fontSize: "14px",
            fontWeight: 500,
            wordWrap: "break-word",
            whitespace: "normal",
            maxWidth: "400px",
          }}
        >
          {cell.getValue() || "ABCD"}
        </Typography>
      ),
    },
    {
      accessorKey: "sync",
      // Header: "Field Linked",
      size: 430,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            color: "#1D2939",
            fontSize: "14px",
            fontWeight: 500,
            wordWrap: "break-word",
            whitespace: "normal",
            maxWidth: "400px",
          }}
        >
          {cell.getValue() || "ABCD"}
        </Typography>
      ),
    },
  ];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          maxWidth: "750px",
        },
      }}
    >
      <Box
        sx={
          {
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "space-between",
            // width: "700px",
          }
        }
      >
        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(90, 184, 255, 0.90) 0%, #FFF 50%, rgba(95, 136, 252, 0.70) 100%, #FFF 50%, #FFF 100%)",
            width: "100%",
            height: "100px",
            position: "relative",
            opacity: "0.5",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
            alignItems: "flex-start",
            top: "16px",
            right: "16px",
            left: "16px",
          }}
        >
          <Box
            sx={
              {
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "flex-start",
              }
            }
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#4F44E0",
              }}
            >
              Welcome Back!👋
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                color: "#000",
                mt: "4px", // Adding margin to create separation between texts
              }}
            >
              Please find the summary of your stores connected!
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleClose()}>
              <CrossIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          maxWidth: "100%",
          // mt: "16px",
          mb: "16px",
          color: "#E0E0E0",
        }}
      />

      <Box
        sx={{
          display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          mr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                ml: "16px",
                "& .primary-chip": {
                  borderRadius: " 30px",
                  width: "90px",
                  background:
                    " linear-gradient(0deg, #E59537 0%, #E59537 100%), #4F44E0",
                  display: "flex",
                  alignItems: "center",
                  color: "#FFF",
                  fontSize: " 12px",
                  fontWeight: 600,
                  p: "6px 10px",
                  ml: 2,
                  "& svg": {
                    mr: 0.6,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#222",
                }}
              >
                <span
                  style={{
                    marginRight: "16px",
                  }}
                >
                  <ShopifyIconWIthSquareBorder />
                </span>
                Shopify-Test-store
              </Typography>
              <Typography
                sx={{
                  marginLeft: "40px",
                }}
              >
                <div className="primary-chip">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99956 11.5145L10.7662 13.1878C11.2729 13.4945 11.8929 13.0411 11.7596 12.4678L11.0262 9.32115L13.4729 7.20115C13.9196 6.81448 13.6796 6.08115 13.0929 6.03448L9.87289 5.76115L8.61289 2.78781C8.38623 2.24781 7.61289 2.24781 7.38623 2.78781L6.12623 5.75448L2.90623 6.02781C2.31956 6.07448 2.07956 6.80781 2.52623 7.19448L4.97289 9.31448L4.23956 12.4611C4.10623 13.0345 4.72623 13.4878 5.23289 13.1811L7.99956 11.5145Z"
                      fill="white"
                    />
                  </svg>
                  Primary
                </div>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
          minWidth={"350px"}
          maxWidth={"350px"}
        >
          <BluecomMRTBaseTable
            enableTableHead={false}
            tableData={tableData}
            columnsData={tableColumns}
            data={tableData}
            muiTableBodyRowProps={{
              sx: {
                // minHeight: "60px",
                height: "50px",
              },
            }}
            enableBottomToolbar={false}
            muiTableContainerProps={{
              sx: {
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overFlow: "hidden",
              },
            }}
            muiTablePaperProps={{
              sx: {
                boxShadow: "none",
                border: "none",
                borderBottom: "none",
                overFlow: "hidden",
              },
            }}
          />
        </Box>
      </Box>

      <Divider
        sx={{
          maxWidth: "100%",
          mb: "16px",
          color: "#E0E0E0",
        }}
      />

      <Box
        sx={{
          display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          mr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                ml: "16px",
                "& .connected-chip": {
                  width: "85px",
                  borderRadius: "30px",
                  background:
                    "linear-gradient(0deg, #8DB849 0%, #8DB849 100%), #4F44E0",
                  display: "flex",
                  alignItems: "center",
                  color: "#FFF",
                  fontSize: " 12px",
                  fontWeight: 600,
                  p: "6px 10px",
                },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#222",
                }}
              >
                <span
                  style={{
                    marginRight: "16px",
                  }}
                >
                  <WooCommerceWithSquareBorder />
                </span>
                Woocommerce
              </Typography>
              <Typography
                sx={{
                  marginLeft: "70px",
                }}
              >
                <div className="connected-chip">Connected</div>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
          minWidth={"350px"}
          maxWidth={"350px"}
        >
          <BluecomMRTBaseTable
            enableTableHead={false}
            tableData={tableData}
            columnsData={tableColumns}
            data={tableData}
            muiTableBodyRowProps={{
              sx: {
                // minHeight: "60px",
                height: "50px",
              },
            }}
            muiTableContainerProps={{
              sx: {
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overFlow: "hidden",
              },
            }}
            muiTablePaperProps={{
              sx: {
                boxShadow: "none",
                border: "none",
                borderBottom: "none",
                overFlow: "hidden",
              },
            }}
            enableBottomToolbar={false}
          />
        </Box>
      </Box>
    </Dialog>
  );
}

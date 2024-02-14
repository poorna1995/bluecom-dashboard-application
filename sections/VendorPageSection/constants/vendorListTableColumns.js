import { Launch } from "@mui/icons-material";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import PayPalIcon from "components/Common/Icons/PayPalIcon";
import CreditCardPaymentTransfer from "components/Common/Icons/VendorIcon/CreditCardPaymentTransfer";
import PaymentWIFITransfer from "components/Common/Icons/VendorIcon/PaymentWIFITransfer";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderPaymentMethod from "components/Common/Tables/RenderComponents/RenderPaymentMethod";
import RenderWebsiteURL from "components/Common/Tables/RenderComponents/RenderWebsiteURL";

function getStr1(str) {
  return str.length > 30 ? str.slice(0, 30) + "..." : str;
}

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let darkHex = Math.floor(hex / 1.5);
  let color = "#" + darkHex.toString(16);

  return color;
}

const vendorListTableColumns = [
  {
    field: "vendor_id",
    accessorKey: "vendor_id",
    header: "Details",
    headerName: "Details",
    minSize: 400,
    flex: 1,
    fontSize: "14px",
    fontWeight: "600",
    valueGetter: ({ value }) => value,

    Cell: ({ cell }) => (
      <div
        style={{
          display: "flex",
          // flexDirection: "row",
        }}
      >
        {/* <AppImage src={params.row.logo_url} width="40" height="40" /> */}
        {cell.row.original.logo_url === "" ? (
          <Avatar
            sx={{
              width: 40,
              height: 40,
              // backgroundColor: randomColor(),
            }}
          >
            {cell.row.original.company_name.charAt(0)}
          </Avatar>
        ) : (
          <AppImage
            src={cell.row.original.logo_url}
            sx={{
              borderRadius: "100%",
              border: "1px solid rgb(208, 213, 221)",
            }}
            width="40"
            height="40"
          />
        )}
        <Box
          sx={{
            display: "inline",
            flexDirection: "column",
            fontWeight: "600",
            fontSize: "16px",
            color: (theme) => theme.palette.text.primary,
            whiteSpace: "normal",
            wordWrap: "break-word",
            "& a": {
              ml: "16px",
              // color: "#484A9E",
              color: (theme) => theme.palette.text.primary,
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <RenderAppLink
            href={`/app/vendors/${cell.getValue()}?tab=overview`}
            title={getStr1(cell.row.original.company_name)}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: (theme) => theme.palette.grey[600],
              ml: "16px",
            }}
          >
            Vendor ID:{" "}
            <span
              style={
                {
                  // fontSize: "14px",
                  // fontWeight: "600",
                }
              }
            >
              {cell.row.original.vendor_id}
            </span>
          </Typography>
        </Box>
      </div>
    ),
  },
  // {
  //   field: "company_name",
  //   headerName: "Vendor Details",
  //   width: 150,
  //   // flex: 1,
  //   renderCell: (params) => (
  //     <AppLink href={`/app/vendors/${params.value}?tab=overview`}>
  //       {params.value}
  //     </AppLink>
  //   ),
  // },
  {
    field: "email",
    headerName: "Email Id",
    accessorKey: "email",
    header: "Email Id",
    // width: 240,
    flex: 1,
    align: "left",
    headerAlign: "left",
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => (
      <AppLink
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          // ml: 1,
          // color: (theme) => theme.palette.text.primary,
          color: (theme) => theme.palette.text.title,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        href={`mailto:${cell.getValue()}`}
      >
        {/* {params.value} */}
        {getStr1(cell.getValue())}
      </AppLink>
    ),
  },
  {
    field: "website_url",
    accessorKey: "website_url",
    header: "Website URL",
    headerName: "Website URL",
    // width: 240,
    flex: 1,
    align: "left",
    headerAlign: "left",
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => <RenderWebsiteURL value={getStr1(cell.getValue())} />,
  },

  {
    field: "payment_method",
    accessorKey: "payment_method",
    header: "Payment Method",
    headerName: "Payment Method",
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => (
      <>
        <RenderPaymentMethod
          value={cell.getValue()}
          sx={
            {
              // ml: 1,
            }
          }
        />
      </>
    ),
    size: 160,
    align: "left",
    headerAlign: "left",
  },

  {
    field: "vendor_lead_time",
    accessorKey: "vendor_lead_time",
    header: "Lead Time (in days)",
    headerName: "Lead Time (in days)",
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {cell.getValue()}
      </Typography>
    ),
    size: 175,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "product_count",
    accessorKey: "product_count",
    header: "# of Products",
    headerName: "# of Products",
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {cell.getValue()}
      </Typography>
    ),
    size: 145,
    align: "right",
    headerAlign: "right",
    // flex: 1,
  },
  // {
  //   field: "variants",
  //   headerName: "Varients",
  //   width: 150,
  //   align: "center",
  //   headerAlign: "center",
  // },
];

export default vendorListTableColumns;

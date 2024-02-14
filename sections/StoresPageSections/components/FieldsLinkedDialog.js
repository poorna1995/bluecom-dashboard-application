import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import React from "react";

export default function FieldsLinkedDialog({ open, handleClose, channel }) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={"Fields Linked"}
      titleStyles={{
        color: "#19235A",
        fontSize: " 21px",
        fontWeight: 700,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box minWidth={"600px"} maxWidth={"600px"} my={4}>
        <BluecomMRTBaseTable
          tableData={tableData}
          columnsData={tableColumns}
          data={tableData}
          muiTableBodyRowProps={{
            sx: {
              // minHeight: "60px",
              height: "60px",
            },
          }}
          enableBottomToolbar={false}
        />
      </Box>
    </BaseDialog>
  );
}

const tableColumns = [
  {
    accessorKey: "title",
    Header: "Title",
    size: 100,
    Cell: ({ cell }) => (
      <Typography
        sx={{
          color: "#000",
          fontSize: " 14px",
          fontWeight: 600,
          lineHeight: "20px",
        }}
      >
        {cell.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "fields_linked",
    Header: "Field Linked",
    size: 400,
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
        {cell.getValue()}
      </Typography>
    ),
  },
];

const tableData = [
  {
    title: "Product Information",
    fields_linked:
      "Product ID, SKU'S, Images, Product Type, Categories, Barcode, Tags, Price, Product Title, Collections",
  },
  {
    title: "Inventory",
    fields_linked: "On Hand or Available",
  },
  {
    title: "Variants",
    fields_linked: "Options",
  },
  {
    title: "Vendors",
    fields_linked: "Vendor",
  },
];

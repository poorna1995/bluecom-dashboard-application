import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React from "react";

export default function PublishProductFieldsDialog({ open, handleClose }) {
  const [fields, setFields] = React.useState([]);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { publishProductId } = router.query;
  const handleFetchProductFields = () => {
    const URL = PRODUCT.FETCH_PRODUCT_FIELDS;
    // const data = {
    // 	master_product_id: publishProductId,
    // };
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          setFields(json.result);
        }
        console.log({ json }, "productList");
      })
      .catch((error) => console.log({ error }));
  };
  React.useEffect(() => {
    if (open) {
      handleFetchProductFields();
    }
  }, [open]);
  const columnsData = [
    // {
    //   accessorKey: "normalize_field",
    //   header: "Stored on bluecom",
    //   size: 150,
    // },
    {
      accessorKey: "channel_field_name",
      header: "Published to Shopify",
      size: 250,
    },
  ];
  // {
  //     "channel_field_name": "name",
  //     "channel_id": 4,
  //     "id": 1,
  //     "normalize_field": "product_title",
  //     "type": "string"
  // }
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Attributes published to Shopify
          {/* Publish Product Fields */}
        </Typography>
      }
    >
      <Box
        sx={{
          minWidth: "520px",
          pb: 3,

          // maxHeight: "600px",
        }}
      >
        <BluecomMRTBaseTable
          columnsData={columnsData}
          data={fields}
          state={{
            showSkeletons: loading,
          }}
          muiTableContainerProps={{
            sx: {
              // height: "600px",
            },
          }}
          // muiTableFooterRowProps={{
          // 	sx: {
          // 		display: "none",
          // 	},
          // }}
          enableBottomToolbar={false}
        />
      </Box>
    </BaseDialog>
  );
}

import { Box, Typography } from "@mui/material";
import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableSection from "sections/AppPageSections/CommonComponents/TableSection";
import appFetch from "utils/appFetch";

import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import AppImage from "components/Common/AppImage";
import channelsOptions from "constants/channelOptions";
import MobileViewInventoryLocationsList from "./components/MobileViewComponents/MobileViewInventoryLocationsComponents/MobileViewInventoryLocationsList";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function WarehouseTable({ warehouseData, masterProductId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector(mapState);
  const [warehouseInventoryData, setWarehouseInventoryData] = useState([]);
  const handleFetchWarehouseData = () => {
    const url = PRODUCT.MERCHANT.FETCH_WAREHOUSE_LEVEL_INVENTORY;
    const data = {
      warehouse: warehouseData,
      user_id: currentUser.merchant_id,
      master_product_id: masterProductId,
    };
    setIsLoading(true);
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        setWarehouseInventoryData(json.result);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchWarehouseData();
  }, []);
  console.log({ warehouseInventoryData });
  const formattedTableData =
    Array.isArray(warehouseInventoryData) &&
    warehouseInventoryData.map((item) => {
      const { items_count, total_qty, wh_id, wh_name } = item;
      return {
        ...item,
        Warehouse: wh_name || "",
        "Total qty": total_qty,
        "# Items": `${items_count} Variants`,
      };
    });

  const columns = [
    // {
    //   accessorKey: "channel_id",
    //   header: "Channel",
    //   size: 50,
    //   muiTableHeaderCellProps: {
    //     align: "center",
    //   },
    //   muiTableBodyCellProps: {
    //     align: "center",
    //   },
    //   Cell: ({ cell, row }) => (
    //     <>
    //       <AppImage
    //         src={
    //           channelsOptions[cell.row.original.channel_id] &&
    //           channelsOptions[cell.row.original.channel_id].image
    //         }
    //         width="40"
    //         height="40"
    //         sx={{
    //           borderRadius: "50%",
    //         }}
    //       />
    //       {console.log({ image: row.original })}
    //     </>
    //   ),
    // },
    // {
    //   accessorKey: "shop",
    //   header: "Store",
    //   size: 200,
    //   Cell: ({ cell }) => cell.row.original.shop,
    // },
    {
      field: "Warehouse",
      accessorKey: "Warehouse",
      header: "Location",
      headerName: "Location",
      // width: 260,
      flex: 1,
      valueGetter: (params) => params.row["Warehouse"],
      sortable: false,
    },
    {
      field: "available",
      accessorKey: "available",
      header: "On Hand",
      headerName: "On Hand",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#000000",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 120,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "# Items",
      accessorKey: "# Items",
      header: "# Of Variants",
      headerName: "# Of Variants",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#000000",
          }}
        >
          {params.row["# Items"]}
        </Typography>
      ),
      width: 120,
      headerAlign: "right",
      align: "right",
    },
  ];

  return (
    <>
      <Box
        sx={{
          minWidth: "700px",
          maxWidth: "700px",
          display: {
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        {" "}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            p: "12px",
            paddingLeft: "0px",
            // mb: "12px",
            ml: "5px",
          }}
        >
          Location
        </Typography>
        {/* {Array.isArray(formattedTableData) &&
							formattedTableData.length > 0 && ( */}
        <BluecomMRTBaseTable
          // sx={{ borderBottom: "none" }}
          data={formattedTableData}
          columnsData={columns}
          // columnDefData={columns}
          state={{
            showSkeletons: isLoading,
          }}
        />
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            sm: "block",
            xs: "block",
          },
        }}
      >
        <MobileViewInventoryLocationsList
          data={formattedTableData}
          loading={isLoading}
        />
      </Box>
    </>
  );
}

const d = [
  {
    warehouse: "warehouse 1",
    "Total quantity": 1000,
    "#Items": "3 Items",
  },
  {
    warehouse: "warehouse 1",
    "Total quantity": 1000,
    "#Items": "3 Items",
  },
  {
    warehouse: "warehouse 1",
    "Total quantity": 1000,
    "#Items": "3 Items",
  },
];

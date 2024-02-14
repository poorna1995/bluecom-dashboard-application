import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableSection from "sections/AppPageSections/CommonComponents/TableSection";
import appFetch from "utils/appFetch";
import lodash from "lodash";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  Skeleton,
} from "@mui/material";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import MobileViewInventoryVariantsList from "./components/MobileViewComponents/MobileViewInventoryVariantsComponents/MobileViewInventoryVariantsList";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function ItemsTable({ itemsData, masterProductId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector(mapState);

  const [tableData, setTableData] = useState([]);
  const handleFetchItemsData = () => {
    const URL = PRODUCT.MERCHANT.FETCH_ITEM_LEVEL_INVENTORY;
    const data = {
      items: itemsData,
      user_id: currentUser.merchant_id,
      master_product_id: masterProductId,
    };
    setIsLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);
        console.log({ tableData: json });
        setTableData(json.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    handleFetchItemsData();
  }, []);
  const formatTableData =
    (Array.isArray(tableData) &&
      tableData.map((item) => {
        const { item_desc, item_title, master_item_id, total_qty, warehouse } =
          item;
        const getWarehouseList =
          Array.isArray(warehouse) &&
          warehouse.map((it) => {
            const { qty, wh_name } = it;
            return { wh_name, qty };
          });
        const groupBy = lodash.groupBy(getWarehouseList, "wh_name");
        const mapGroupBy = Object.values(groupBy)
          .map((item) => {
            const it = item.map((i) => {
              return { [i.wh_name]: i.qty };
            });

            return it;
          })
          .flat();
        return {
          "Item Title": item_title,
          "Total Qty": total_qty,
          mapGroupBy,
        };
      })) ||
    [];

  // print product title form FETCH_ITEM_LEVEL_INVENTORY this api
  const product_name =
    (Array.isArray(tableData) &&
      tableData.length > 0 &&
      tableData[0].product_title) ||
    "";

  function getStr1(str) {
    return str.length > 55 ? str.slice(0, 55) + "..." : str;
  }

  const data = formatTableData;
  const getHeaderData =
    Array.isArray(data) &&
    data.length > 0 &&
    data
      .map((item) => {
        const { mapGroupBy } = item;
        const mappedGroups = mapGroupBy.map((i) => {
          const obj = Object.keys(i).map((ob) => ob);
          return obj;
        });
        return mappedGroups;
      })
      .flat();

  const flatHeaderData = Array.isArray(getHeaderData) && getHeaderData.flat();
  const getUniq = lodash.uniq(flatHeaderData);
  // const getColumnTitles =
  // 	Object.keys(getHeaderData[0]) &&
  // 	Object.keys(getHeaderData[0]).map((item) => item);
  console.log({ getUniq, flatHeaderData });
  const valData = data.map((item) => {
    const cellVal = getUniq.map((it) => {
      const cell = item.mapGroupBy.map((i) => {
        return i[it];
      });
      return cell;
    });
    return cellVal;
  });
  console.log({
    formatTableData,
    getHeaderData,
    flatHeaderData,
    getUniq,
    valData,
  });

  const columns = [
    {
      field: "Item Title",
      headerName: "Item Title",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#000000",
            }}
          >
            {params.row["Item Title"]}
          </Typography>
        );
      },
      flex: 1,
    },
    {
      field: "Total Qty",
      headerName: "Total Qty",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#000000",
            }}
          >
            {params.row["Total Qty"]}
          </Typography>
        );
      },
      width: 120,
      headerAlign: "right",
      align: "right",
    },
  ];
  const itemsTableColumns = [
    {
      accessorKey: "item_title",
      header: "Variants Title",
      Cell: ({ cell }) => (
        <Typography>
          {cell.getValue() ||
            (Array.isArray(cell.row.original.options) &&
              cell.row.original.options.map((item) => item.value).join(" / "))}
        </Typography>
      ),
    },
    {
      accessorKey: "wh_name",
      header: "Location",
    },
    {
      accessorKey: "available",
      header: "Available",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          minWidth: "720px",
          minHeight: "300px",
          maxWidth: "720px",

          display: {
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        {isLoading ? (
          <Skeleton
            sx={{
              width: "450px",
              height: "50px",
              variant: "rounded",
              p: "12px",
              paddingLeft: "0px",
              ml: "5px",
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              p: "12px",
              paddingLeft: "0px",
              ml: "5px",
              maxWidth: "500px",
              whiteSpace: "wrap",
              // textAlign: "left",
              wordWrap: "break-word",
            }}
          >
            {/* <Tooltip title={product_name}> */}
            {/* {getStr1(product_name)} */}
            {product_name}
            {/* </Tooltip> */}
          </Typography>
        )}

        <BluecomMRTBaseTable
          columnsData={itemsTableColumns}
          data={tableData}
          enableExpanding={true}
          getSubRows={(row) => row.inventory}
          state={{
            showSkeletons: isLoading,
          }}
          initialState={{
            expanded: true,
          }}
          // muiTableBodyCellProps={{
          // 	sx: {
          // 		height: "48px",
          // 	},
          // }}
          muiTableContainerProps={{
            sx: {
              maxHeight: "500px",
            },
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
        <MobileViewInventoryVariantsList data={tableData} loading={isLoading} />
      </Box>
    </>
  );
}

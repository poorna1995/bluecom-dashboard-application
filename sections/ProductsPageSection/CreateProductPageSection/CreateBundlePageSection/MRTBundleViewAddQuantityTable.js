import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import EmptyState from "components/Common/EmptyState";
import { BUNDLE } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { TableCell, Tooltip } from "@mui/material";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function MRTBundleViewAddQuantityTable({
  tableData = [],
  columnsData,
  handleFetchBundleData = () => {},
  renderEmptyRowsFallback,
  showSkeletons,
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId || router.query.productId;
  const [data, setData] = useState(tableData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const handleSaveCell = (cell, value) => {
    if (value >= 0) {
      let columnId = cell.column.id;
      let key = data[+cell.row.index][cell.column.id];

      key = Number(value);
      setData([...data]);
      console.log({
        cell,
        value,
        columnId,
      });
      if (value > 0) {
        return handleUpdateBundleData(key, cell);
      } else {
        enqueueSnackbar("Quantity must be greater than 0", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Quantity must not be negative", {
        variant: "error",
      });
    }
    // console.log("cell", cell);
    // handleChangeAggregatedCellValues({ target: { value } }, cell, columnId);
  };

  const handleUpdateBundleData = (qty, cell) => {
    if (qty === cell.row.original.qty) {
      return;
    }
    const master_product_id = cell.row.original.master_product_id;
    const master_item_id = cell.row.original.master_item_id;
    const parent_product_id = cell.row.original.parent_product_id;
    const URL = BUNDLE.ADD_QUANTITY;
    const data = {
      master_item_id: master_item_id,
      master_product_id: master_product_id,
      parent_product_id: parent_product_id,
      user_id: currentUser.merchant_id,
      qty: Number(qty),
    };

    setLoading(true);
    appFetch(URL, data)
      .then((res) => {
        setLoading(false);
        if (res.status === "success") {
          // handleFetchProductData();
          handleFetchBundleData();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const columns = React.useMemo(
    () => columnsData,

    []
  );

  return (
    <div>
      {loading && <PageLoader />}
      <BluecomMRTBaseTable
        columns={columns}
        data={data}
        initialState={{
          // expanded: true,
          density: "compact",
        }}
        state={{
          // showProgressBars: loading,
          showSkeletons: showSkeletons,
        }}
        muiLinearProgressProps={({ isTopToolbar }) => ({
          sx: {
            display: isTopToolbar ? "block" : "none",
          },
        })}
        muiTableFooterRowProps={{}}
        autoResetExpanded={false}
        autoResetAll={false}
        autoResetPageIndex={false}
        // enableExpanding
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
            border: "1px solid rgba(0,0,0,0.1)",
          },
        }}
        muiTableContainerProps={{
          sx: {
            minHeight: data.length === 0 && "400px",
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            // background: "yellow",
            width: "100%",
            py: 2,
            // background: "#f1f1f1",

            borderBottom: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "none",
            // textAlign: "center",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            py: 1.5,
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "uppercase",
            color: "#999999",
            background: "#f6f6f6",
          },
          align: "right",
        }}
        muiTableBodyCellProps={{
          sx: {
            maxWidth: "500px",
            // overflowX: "scroll",
            py: 1,

            fontSize: "16px",
            fontWeight: "500",
            "&:hover": {
              border: "none",
              borderBottom: "1px solid rgba(0,0,0,0.1) ",
            },
          },
          align: "right",
        }}
        muiTableFooterCellProps={{
          align: "right",
        }}
        // enableColumnResizing
        // muiTablePaginationProps={{
        //   ActionsComponent: (props) => {
        //     return <Pagination />;
        //   },
        // }}
        getSubRows={(row) => row.children}
        enableTopToolbar={false}
        // enableBottomToolbar={false}
        enableColumnActions={false}
        enableSorting={false}
        renderEmptyRowsFallback={renderEmptyRowsFallback}
        enableEditing
        editingMode="table"
        // onEditingRowSave={handleSaveRow}
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          onBlur: (event) => {
            handleSaveCell(cell, Number(event.target.value));
          },
          type: "number",

          // helperText: "Do not enter negative value as units",

          variant: "outlined",
          min: 0,
          inputProps: {
            sx: {
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "5px",
              fontWeight: 500,
              fontSize: "16px",
              textAlign: "right",
            },
          },
        })}

        // muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        // 	onBlur: (event) => {
        // 		handleSaveCell(cell, event.target.value);
        // 	},
        // })}
      />
    </div>
  );
}

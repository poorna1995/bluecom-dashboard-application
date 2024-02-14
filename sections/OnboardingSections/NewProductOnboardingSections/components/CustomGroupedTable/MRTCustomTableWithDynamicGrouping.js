import EmptyState from "components/Common/EmptyState";
import React, { useEffect, useState } from "react";

import MaterialReactTable from "material-react-table";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSelector } from "react-redux";
import AddIcon from "components/Common/Icons/add";
import CheckCircleIcon from "components/Common/Icons/CheckCircleIcon";
import PDFicon from "components/Common/Icons/PDFicon";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function MRTCustomTableWithDynamicGrouping({
  tableData = [],
  columnsData = [],
  columnGroups = [],
  // handleSaveRow,
  handleFetchProductData = () => {},
  // handleSaveCell
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId || router.query.productId;
  const [hiding, setHiding] = useState();

  const columns = React.useMemo(
    () => columnsData,

    []
  );

  const [data, setData] = useState(tableData);
  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  const handleSaveRow = ({ exitEditingMode, row, table, values }) => {
    data[row.index] = values;
    setData([...data]);
    console.log("data", { data, row, table, values });
    exitEditingMode();
  };
  const handleSaveCell = (cell, value) => {
    let columnId = cell.column.id;
    let key = data[+cell.row.index][cell.column.id];

    key = value;
    setData([...data]);

    handleChangeAggregatedCellValues({ target: { value } }, cell, columnId);
  };
  const getMasterItemIdsRecursively = (row) => {
    if (row.subRows.length > 0) {
      return row.subRows
        .map((item) => {
          return getMasterItemIdsRecursively(item);
        })
        .flat();
    } else {
      return [row.original.master_item_id];
    }
  };

  const handleChangeAggregatedCellValues = (e, cell, key) => {
    const masterItemIdList = getMasterItemIdsRecursively(cell.row);

    console.log({ masterItemIdList });
    const productsList = masterItemIdList.map((item) => {
      return {
        master_product_id: pageId,
        [key]: e.target.value,
        master_item_id: item,
      };
    });

    const URL = PRODUCT.MERCHANT.UPDATE_VARIANT_GROUPS;
    const data = {
      user_id: currentUser.merchant_id,
      products: productsList,
    };
    appFetch(URL, data)
      .then((json) => {
        handleFetchProductData();
        console.log({ json });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  /**
   *
   * we want to update the children of the group
   * we will just pass an object lkike this
   * {
   * user_id:"",
   * master_product_id:"",
   * master_item_id:"",
   * variant_sku:"",
   * unit_retail_price:"",
   * unit_cost_price:"",
   * display_image:"",
   * }
   *
   *
   * Now we have have to update the parent:
   * [{
   * user_id:"",
   * master_product_id:"",
   * master_item_id:"",
   * variant_sku:"",
   * unit_retail_price:"",
   * unit_cost_price:"",
   * },
   * {
   * user_id:"",
   * master_product_id:"",
   * master_item_id:"",
   * variant_sku:"",
   * unit_retail_price:"",
   * unit_cost_price:"",
   * }
   * ]
   *
   */
  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          // expanded: true,
          density: "compact",
        }}
        state={{
          grouping: columnGroups,
          // columnVisibility: hiding,
        }}
        enableExpanding
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
        enableExpandAll={false}
        positionExpandColumn="first"
        muiTableHeadRowProps={{
          sx: {
            // background: "yellow",
            width: "100%",
            py: 2,
            background: "#f1f1f1",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "none",
            // textAlign: "center",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            py: 2,
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            maxWidth: "500px",
            // overflowX: "scroll",
            py: 2,
            fontSize: "16px",
            fontWeight: "500",
            "&:hover": {
              border: "none",
            },
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            height: "40px",
            py: 1,
          },
        }}
        // icons={{
        // 	KeyboardDoubleArrowDownIcon: CheckCircleIcon,
        // 	ExpandMoreIcon: CheckCircleIcon,
        // }}
        // muiExpandAllButtonProps={{
        // 	sx: {
        // 		transform: "rotate(0deg)",

        // 	},

        // }}

        // onColumnVisibilityChange={(cell) =>
        // 	setHiding(cell.getIsAggregated())
        // }
        // muiTablePaginationProps={{
        //   ActionsComponent: (props) => {
        //     return <Pagination />;
        //   },
        // }}
        // getSubRows={(row) => row.children}
        enableTopToolbar={false}
        // enableBottomToolbar={false}
        enableColumnActions={false}
        enableSorting={false}
        renderEmptyRowsFallback={() => (
          <EmptyState
            icon={<ProductEmptyState />}
            text={"No Variants Found!"}
            bodyText={
              "Please add products to the table using `Add Bundle Components` Button"
            }
          ></EmptyState>
        )}
        // enableGrouping
        enableEditing
        editingMode="table"
        onEditingRowSave={handleSaveRow}
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value);
          },
          variant: "outlined",
          inputProps: {
            sx: {
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "5px",
              fontWeight: 500,
              fontSize: "16px",
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

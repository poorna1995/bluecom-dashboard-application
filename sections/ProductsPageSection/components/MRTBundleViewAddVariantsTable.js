import EmptyState from "components/Common/EmptyState";
import RenderImageWithTextAndNavigation from "components/Common/Tables/RenderComponents/RenderAppImageAndTextWithNavigation";
import React from "react";
import dynamic from "next/dynamic";
import RenderImageWithText from "components/Common/Tables/RenderComponents/RenderImageWithText";
import AppImage from "components/Common/AppImage";
import { Typography } from "@mui/material";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
const MaterialReactTable = dynamic(() => import("material-react-table"), {
  ssr: false,
});
export default function MRTBundleViewAddVariantsTable({
  tableData = [],
  rowSelection,
  setRowSelection,
  selectedItemsData = [],
  setSelectedItemsData,
  usedIn,
  columnsData = [],
  totalRows,
  shallUseRouter,
  basePath,
  showSkeletons,

  ...props
}) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "product_title" ?? "item_title",
        header: "Product Title",

        Cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 3}rem`,
              display: "flex",
            }}
          >
            <RenderProductDetails
              title={row.original.product_title ?? row.original.item_title}
              display_image={row.original.display_image}
              href={`/app/products/${row.original.master_product_id}`}
              sku={row.original.product_sku ?? row.original.item_sku}
              openInNewTab={true}
            />
            {/* <RenderImageWithText
							display_image={row.original.display_image}
							alt={
								row.original.product_title ??
								row.original.item_title
							}
							title={
								row.original.product_title ??
								row.original.item_title
							}
						/> */}
          </div>
        ),
        footer: (props) => props.column.id,
        muiTableHeadCellProps: {
          align: "left",
          maxWidth: "200px",
        },
        muiTableBodyCellProps: {
          align: "left",
          // maxWidth: "200px",
        },
        size: 700,
      },
      // {
      //   accessorKey: "product_sku",
      //   header: "SKU",
      //   footer: (props) => props.column.id,
      //   size: 200,
      // },
      // {
      // 	accessorKey: "moq",
      // 	header: "MOQ",
      // 	footer: (props) => props.column.id,
      // },
      {
        accessorKey: "qty_available",
        header: "In Stock",
        footer: (props) => props.column.id,
        Cell: ({ row, cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "item_unit_cost_price",
        header: "Cost",
        footer: (props) => props.column.id,
        Cell: ({ row, cell }) => (
          <span>
            {usedIn === "purchase-order" ? (
              <RenderCurrency
                value={cell.row.original.unit_cost_price || cell.getValue()}
              />
            ) : (
              <RenderCurrency value={cell.getValue()} />
            )}
          </span>
        ),
        muiTableHeadCellProps: {
          align: "right",
          maxWidth: "200px",
          pr: 1,
          marginRight: "10px",
        },
        muiTableBodyCellProps: {
          align: "right",
          pr: 1,
          mr: 2,
          // maxWidth: "200px",
        },
        size: 100,
      },
    ],

    []
  );

  // React.useEffect(() => {
  //   setSelectedItemsData(
  //     getSelectedRowModel().flatRows.map((row) => ({
  //       ...row.original,
  //     }))
  //   );
  // }, [rowSelection]);
  const memoizedData = React.useMemo(() => tableData, [tableData]);

  return (
    <div>
      <BluecomMRTBaseTable
        // columns={columns}
        columnsData={columnsData.length > 0 ? columnsData : columns}
        data={memoizedData}
        initialState={
          {
            // expanded: true,
            // density: "compact",
            // rowSelection: rowSelection,
          }
        }
        state={{
          rowSelection: rowSelection,
          showSkeletons: showSkeletons,
        }}
        muiTableContainerProps={{
          sx: {
            // border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: "5px",
            maxHeight: "560px",
          },
        }}
        paginateExpandedRows={false}
        getRowId={(row) => row.master_item_id ?? row.master_product_id}
        enableExpanding
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
        enableStickyHeader
        muiTableHeadRowProps={{
          sx: {
            // background: "yellow",
            // py: 2,
            background: "#f6f6f6",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "none",
            // textAlign: "center",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            py: 1.5,
            maxWidth: "160px",
            fontWeight: "500",
            textTransform: "uppercase",
            color: "#999999",

            fontSize: "14px",
          },
        }}
        onRowSelectionChange={setRowSelection}
        // muiTablePaginationProps={{
        //   ActionsComponent: (props) => {
        //     return <Pagination />;
        //   },
        // }}
        getSubRows={(row) => row.items}
        enableTopToolbar={false}
        // enableBottomToolbar={false}
        enableColumnActions={false}
        renderEmptyRowsFallback={() => (
          <EmptyState
            icon={<ProductEmptyState />}
            text={"No Variants Found!"}
            bodyText={
              "Please add products to the table using `Add Bundle Components` Button"
            }
          ></EmptyState>
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: row.getToggleSelectedHandler(),
          sx: {
            cursor: "pointer",
          },
        })}
        muiTableBodyCellProps={{
          sx: {
            maxWidth: "160px",
          },
        }}
        enableRowSelection
        enableSorting={false}
        basePath={basePath}
        shallUseRouter={shallUseRouter}
        totalRows={totalRows}
        {...props}
      />
    </div>
  );
}

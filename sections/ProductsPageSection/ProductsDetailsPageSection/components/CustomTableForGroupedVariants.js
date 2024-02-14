import React from "react";
import {
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  IconButton,
  Pagination,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
export default function CustomTableForGroupedVariants({
  tableData = [],
  columnsData = [],
  columnGroups = [],
}) {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columnsFromColumnGroups = columnGroups.map((item) => {
    return {
      accessorKey: item,
      header: () => <span>{item}</span>,
      cell: (info) => info.getValue(),
    };
  });
  const columns = React.useMemo(
    () => columnsData,
    // [
    // ...columnsFromColumnGroups,
    // {
    // 	accessorKey: "Size",
    // 	id: "Size",
    // 	header: "Size",
    // 	cell: (info) => info.getValue(),
    // },
    // {
    // 	accessorKey: "Color",
    // 	header: () => <span>Color</span>,
    // 	cell: (info) => info.getValue(),
    // },

    // {
    // 	accessorKey: "Material",
    // 	header: () => "Material",
    // 	// aggregatedCell: ({ getValue }) =>
    // 	// 	Math.round(getValue() * 100) / 100,
    // 	// aggregationFn: "median",
    // 	cell: (info) => info.getValue(),
    // },
    // {
    // 	accessorKey: "Style",
    // 	header: () => <span>Style</span>,
    // 	// aggregationFn: "sum",
    // 	cell: (info) => info.getValue(),
    // 	// aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
    // },
    // 	{
    // 		accessorKey: "item_display_image",
    // 		header: () => <span>Image</span>,
    // 		cell: (info) => (
    // 			<AppImage
    // 				src={info.getValue()}
    // 				alt="item image"
    // 				width={50}
    // 				height={50}
    // 			/>
    // 		),
    // 	},
    // 	{
    // 		accessorKey: "item_title",
    // 		header: () => <span>Variant Title</span>,
    // 		cell: (info) => info.getValue(),
    // 	},
    // 	{
    // 		accessorKey: "sku",
    // 		header: () => <span>Variant SKU</span>,
    // 		cell: (info) => <RenderTextInput value={info.getValue()} />,
    // 	},
    // 	{
    // 		accessorKey: "item_unit_cost_price",
    // 		header: () => <span>Unit Cost Price</span>,
    // 		cell: (info) => <RenderTextInput value={info.getValue()} />,
    // 	},
    // 	{
    // 		accessorKey: "item_unit_retail_price",
    // 		header: () => <span>Unit Retail Price</span>,
    // 		cell: (info) => <RenderTextInput value={info.getValue()} />,
    // 		width: 100,
    // 	},
    // 	// ...columnsData,
    // ],
    [columnsData]
  );

  const [data, setData] = React.useState(() => tableData);
  // const refreshData = () => setData(() => tableData);

  const [grouping, setGrouping] = React.useState(columnGroups);

  React.useEffect(() => {
    // refreshData();
    setGrouping(columnGroups);
  }, [columnGroups]);
  // console.log({ columnGroups });
  const table = useReactTable({
    data: data,
    columns,
    state: {
      grouping,
    },

    // updateData: updateData,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    paginateExpandedRows: false,

    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <TableContainer
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
        }}
      >
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                sx={{
                  background: "#F5F4FD",
                }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        py: 2,
                        // textTransform: "uppercase",
                        textAlign:
                          (header.id === "item_unit_cost_price" ||
                            header.id === "item_unit_retail_price") &&
                          "right",
                        maxWidth:
                          header.id === "item_unit_retail_price" ||
                          header.id === "item_unit_cost_price"
                            ? "120px"
                            : "150px",
                        minWidth:
                          header.id === "item_display_image" ? "60px" : "120px",
                      }}
                    >
                      {console.log(
                        { header, id: header.id },
                        "inside header of variant table"
                      )}
                      {header.isPlaceholder ? null : (
                        <div>
                          {header.column.getCanGroup() ? (
                            // If the header can be grouped, let's add a toggle
                            // <button
                            // 	{...{
                            // 		onClick:
                            // 			header.column.getToggleGroupingHandler(),
                            // 		style: {
                            // 			cursor: "pointer",
                            // 		},
                            // 	}}
                            // >
                            // 	{header.column.getIsGrouped()
                            // 		? `😂 (${header.column.getGroupedIndex()}) `
                            // 		: `😎😏`}
                            // </button>
                            <></>
                          ) : null}{" "}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} sx={{ p: 1 }}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        {...{
                          key: cell.id,
                          sx: {
                            background: "white",
                            py: "8px",
                            fontSize: "15px",
                            fontWeight: "500",
                            lineHeight: "21px",
                            color: (theme) => theme.palette.text.primary,

                            textAlign:
                              (cell.column.id === "item_unit_retail_price" ||
                                cell.column.id === "item_unit_cost_price") &&
                              "right",
                            maxWidth:
                              cell.column.id === "item_unit_retail_price" ||
                              cell.column.id === "item_unit_cost_price"
                                ? "120px"
                                : "150px",
                            minWidth:
                              cell.column.id === "item_display_image"
                                ? "60px"
                                : "auto",
                            wordBreak: "break-word",
                            // margin: "0px",
                            // cell.getIsGrouped()
                            // 	? "#0aff0082"
                            // 	: cell.getIsAggregated()
                            // 	? "#ffa50078"
                            // 	: cell.getIsPlaceholder()
                            // 	? "#ff000042"
                            // 	: "white",
                          },
                        }}
                      >
                        {cell.getIsGrouped() ? (
                          // If it's a grouped cell, add an expander and row count
                          <Box
                            sx={{
                              display: "flex",
                              pb: 0.5,
                              pt: 0.5,
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              {...{
                                onClick: row.getToggleExpandedHandler(),
                                sx: {
                                  cursor: row.getCanExpand()
                                    ? "pointer"
                                    : "normal",
                                },
                              }}
                            >
                              {row.getIsExpanded() ? (
                                <ChevronDownIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </IconButton>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontWeight: 500,
                                lineHeight: "19px",
                                color: (theme) => theme.palette.text.primary,
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{" "}
                              ({row.subRows.length})
                            </Typography>
                          </Box>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          <>
                            {/* flexRender(
                            cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                            cell.getContext()
                          ) */}
                          </>
                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            sx={{
              width: "100%",
            }}
          >
            <TableRow>
              <TableCell colSpan={12}>
                <Box
                  sx={{
                    display: "flex",
                    // py: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // width: "100%",
                    // minWidth: "100%",
                    flex: 1,
                  }}
                >
                  {/* <div
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    Page{" "}
                    <strong>
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </strong>
                  </div> */}

                  <Pagination
                    page={table.getState().pagination.pageIndex + 1}
                    // nextIconButtonProps={{
                    // 	onClick: table.nextPage,
                    // }}
                    // backIconButtonProps={{
                    // 	onClick: table.previousPage,
                    // }}
                    // shape="rounded"
                    // variant="outlined"
                    onChange={(e, page) => {
                      table.setPageIndex(page - 1);
                    }}
                    count={table.getPageCount()}
                    rowsPerPage={10}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: MdArrowBack,
                          next: MdArrowForward,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <div className="h-2" />
      {/* <div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{table.getRowModel().rows.length} Rows</div> */}
      {/* <div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div>
			<pre>{JSON.stringify(grouping, null, 2)}</pre> */}
    </div>
  );
}

import React, { useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Checkbox,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import { ChevronRight } from "@mui/icons-material";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";
import RenderImageWithTextAndNavigation from "components/Common/Tables/RenderComponents/RenderAppImageAndTextWithNavigation";

export default function BundleViewCustomTable({ tableData = [] }) {
  const rerender = React.useReducer(() => ({}), {})[1];

  /**
     * is_bundle
        item_title
        master_item_id
        master_product_id
        product_barcode
        product_desc
        product_sku
        product_title
        product_type
        type
        unit_cost_price
        unit_retail_price
 */
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "product_title",
        header: ({ table }) => (
          <>
            {/* <Checkbox
							{...{
								checked: table.getIsAllRowsSelected(),
								indeterminate: table.getIsSomeRowsSelected(),
								onChange:
									table.getToggleAllRowsSelectedHandler(),
							}}
						/>{" "} */}
            {/* <IconButton
							{...{
								onClick:
									table.getToggleAllRowsExpandedHandler(),
							}}
						>
							{table.getIsAllRowsExpanded() ? (
								<ChevronRightIcon />
							) : (
								<ChevronDownIcon />
							)}
						</IconButton>{" "} */}
            Bundle Details
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
              display: "flex",
            }}
          >
            <>
              {/* <Checkbox
								{...{
									checked: row.getIsSelected(),
									indeterminate: row.getIsSomeSelected(),
									onChange: row.getToggleSelectedHandler(),
								}}
							/>{" "} */}
              {row.getCanExpand() ? (
                <IconButton
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                  sx={{
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  disableRipple
                >
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              ) : (
                <span
                  style={{
                    marginLeft: "16px",
                  }}
                />
              )}{" "}
              <div>
                <RenderImageWithTextAndNavigation
                  display_image={row.original.display_image}
                  alt={row.original.product_title}
                  title={row.original.product_title}
                  href={`/app/products/${row.original.master_product_id}`}
                />
              </div>
              {/* {getValue()} */}
            </>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        cell: (info) => info.getValue() ?? "No details Found",
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "product_sku",
        header: () => "SKU",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "unit_cost_price",
        header: () => <span>Unit cost price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "unit_retail_price",
        header: "Unit Retail Price",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "type",
        header: "Type",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
        footer: (props) => props.column.id,
        cell: (info) => info.getValue() ?? "No details Found",
      },
    ],

    []
  );

  const [data, setData] = React.useState(() => tableData);
  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  const refreshData = () => setData(() => tableData);

  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-2" style={{ maxWidth: "100%" }}>
      <div className="h-2" />
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                sx={{
                  background: "#f1f1f1",
                }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "17px",
                        color: "#222222",
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <div>
                              {/* <Filter
															column={
																header.column
															}
															table={table}
														/> */}
                            </div>
                          ) : null}
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        rowSpan={cell.rowSpan}
                        sx={{
                          borderBottom: row.getCanExpand()
                            ? row.getIsExpanded()
                              ? "none"
                              : "1px solid rgba(0,0,0,0.1)"
                            : "none",

                          borderTop:
                            row.getCanExpand() && "1px solid rgba(0,0,0,0.1)",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <Box
              sx={{
                py: 1,
                display: "flex",
              }}
            >
              <Typography>
                {" "}
                Showing {table.getRowModel().rows.length} of {tableData.length}
              </Typography>

              <Pagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // colSpan={3}
                count={
                  table.getPageCount()
                  // table.getRowModel().rows.length /
                  // rowsPerPage
                }
                rowsPerPage={rowsPerPage}
                page={table.getState().pagination.pageIndex + 1}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}

                onChange={table.getState().pagination.pageSize}

                // ActionsComponent={TablePaginationActions}
              />
            </Box>
          </TableFooter>
        </Table>
      </TableContainer>

      <div className="h-2" />
      <div className="flex items-center gap-2">
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
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? `<LastPageIcon />` : `<FirstPageIcon />`}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl"
          ? `<KeyboardArrowRight />`
          : `<KeyboardArrowLeft />`}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl"
          ? `<KeyboardArrowLeft />`
          : `<KeyboardArrowRight />`}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? `<FirstPageIcon />` : `<LastPageIcon />`}
      </IconButton>
    </Box>
  );
}

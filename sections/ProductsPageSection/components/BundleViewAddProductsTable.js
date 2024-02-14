import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import { ChevronRight } from "@mui/icons-material";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";

export default function BundleViewAddProductsTable({
  tableData,
  rowSelection = {},
  setRowSelection,
  selectedItemsData = [],
  setSelectedItemsData,
}) {
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
        // accessorKey: "product_title",
        accessorFn: (row) => row.product_title ?? row.item_title,
        id: "product_title",
        header: ({ table }) => (
          <>
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{" "}
            <IconButton
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <ChevronRightIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </IconButton>{" "}
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
            }}
          >
            <>
              <Checkbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{" "}
              {row.getCanExpand() ? (
                <IconButton
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </IconButton>
              ) : (
                ""
              )}
              {getValue()}
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
        accessorKey: "created_date",
        header: "Created Date",
        footer: (props) => props.column.id,
      },
    ],

    []
  );

  const [data, setData] = React.useState(() => tableData);

  // const [rowSelection, setRowSelection] = React.useState({});
  const refreshData = () => setData(() => tableData);

  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      rowSelection,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => Array.isArray(row?.items) && row.items,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    debugTable: true,
  });
  console.log({
    table,
    rowSelection,
    allDataOfSelected: table.getSelectedRowModel().flatRows,
  });

  React.useEffect(() => {
    setSelectedItemsData(
      table.getSelectedRowModel().flatRows.map((row) => ({
        ...row.original,
      }))
    );
  }, [rowSelection]);

  return (
    <div className="p-2" style={{ maxWidth: "100%" }}>
      <div className="h-2" />
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
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
                      <TableCell key={cell.id}>
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
      {/* <div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div> */}
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </div>
  );
}

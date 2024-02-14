import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  toggleAllRowsExpanded,
} from "@tanstack/react-table";
import AppImage from "components/Common/AppImage";
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
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import TextInput from "components/Common/Inputs/TextInput";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import EditIcon from "components/Common/Icons/EditIcon";
import UpdateVariantGroupDialog from "../UpdateVariantGroupDialog";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import BluecomCustomGroupedTable from "components/Common/Tables/BluecomCustomGroupedTable";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { enqueueSnackbar } from "notistack";

const Cell = ({
  getValue,
  row: { index },
  column: { id, columnDef },
  table,
}) => {
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // console.log({ getValue, index, id, table });
  return (
    <RenderTextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type={id === "sku" ? "text" : "number"}
      placeholder={`Enter ${columnDef.header}`}
    />
  );
};
function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
}

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function CustomTableWithDynamicGrouping({
  tableData = [],
  columnsData = [],
  columnGroups = [],
  handleFetchProductData = () => {},
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId || router.query.productId;

  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const [loading, setLoading] = useState(false);
  const columnsFromColumnGroups = columnGroups.map((item) => {
    return {
      accessorKey: item,
      header: () => <span>{item}</span>,
      cell: (info) => info.getValue(),
    };
  });
  const columns = React.useMemo(() => columnsData, [columnsData]);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const memoizedTableData = useMemo(() => tableData, [tableData]);
  const [data, setData] = React.useState(memoizedTableData);
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    setData(memoizedTableData);
  }, [memoizedTableData]);
  // const refreshData = () => setData(() => tableData);

  const [grouping, setGrouping] = React.useState(columnGroups);

  const [expanded, setExpanded] = useState(false);
  console.log(expanded, "expanded");
  // React.useEffect(() => {
  //   // refreshData();
  //   setGrouping(columnGroups);
  // }, [columnGroups]);
  console.log({ columnGroups });
  const table = useReactTable({
    data: memoizedData,
    columns,
    state: {
      grouping: columnGroups,
      expanded: expanded,
    },

    // updateData: updateData,
    // onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    columnResizeMode,

    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // meta: {
    // updateData: (rowIndex, columnId, value) => {
    // 	// Skip page index reset until after next rerender
    // 	skipAutoRes etPageIndex();
    // 	setData((old) =>
    // 		old.map((row, index) => {
    // 			if (index === rowIndex) {
    // 				return {
    // 					...old[rowIndex],
    // 					[columnId]: value,
    // 				};
    // 			}
    // 			return row;
    // 		}),
    // 	);
    // },
    // },
    autoResetPageIndex,
    autoResetExpanded: false,
    paginateExpandedRows: false,

    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              handleChangeAggregatedCellValues(
                { target: { value } },
                row.master_item_id,
                columnId,
                row
              );

              console.log({
                rowIndex,
                columnId,
                value,
                row,
              });
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },

    debugTable: true,
  });
  const handleSaveCell = (cell, value) => {
    let columnId = cell.column.id;
    let key = data[+cell.row.index][cell.column.id];

    key = value;
    setData([...data]);

    handleChangeAggregatedCellValues({ target: { value } }, cell, columnId);
  };
  const getMasterItemIdsRecursively = (row) => {
    if (Array.isArray(row.subRows) && row.subRows.length > 0) {
      return row.subRows
        .map((item) => {
          return getMasterItemIdsRecursively(item);
        })
        .flat();
    } else {
      return [row.original.master_item_id ?? row.master_item_id];
    }
  };

  const handleChangeAggregatedCellValues = (e, item_id, key, row) => {
    const value = e.target.value;

    if (value === row[key]) {
      return;
    }
    if (
      key === "item_unit_cost_price" &&
      Number(value) > Number(row.item_unit_retail_price)
    ) {
      return enqueueSnackbar("Cost price cannot be greater than retail price", {
        variant: "error",
      });
    }
    if (
      key === "item_unit_retail_price" &&
      Number(value) < Number(row.item_unit_cost_price)
    ) {
      return enqueueSnackbar("Retail price cannot be less than cost price", {
        variant: "error",
      });
    }

    const masterItemIdList = [item_id];
    // getMasterItemIdsRecursively(row);
    setLoading(true);
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
        setLoading(false);
        handleFetchProductData();
        console.log({ json });
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };
  const handleClickCell = (row) => {
    console.log({ row });
  };
  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);
  const [selectedCell, setSelectedCell] = React.useState(null);
  const handleCloseEditGroupDialog = () => {
    setOpenEditGroupDialog(false);
    setSelectedCell(null);
  };
  const handleOpenEditGroupDialog = (cell) => {
    console.log({ cell });
    setOpenEditGroupDialog(true);
    setSelectedCell(cell);
  };

  // const { toggleAllRowsExpanded, getIsAllRowsExpanded } = table;

  // useEffect(() => {
  //   toggleAllRowsExpanded(true);
  // }, [getIsAllRowsExpanded()]);

  return (
    <div className="p-2">
      <div className="h-2" />
      {loading && <PageLoader />}
      {/* <BluecomCustomGroupedTable
        table={table}
        columns={columns}
        columnGroups={columnGroups}
        columnsData={columnsData}
        tableData={tableData}
        handleFetchProductData={handleFetchProductData}
      /> */}
      <TableContainer
        sx={{
          borderRadius: "5px",
          border: "1px solid #E5E5E5",
        }}
      >
        <Table>
          <TableHead sx={{ background: "#f5f4fd" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                sx={{
                  my: 2,
                  // background: "#f1f1f1",
                  background: "#f5f4fd",
                }}
              >
                {console.log({ headerGroup })}
                {Array.isArray(columnGroups) && columnGroups.length > 0 && (
                  <TableCell
                    sx={{
                      color: "#2a2a2f",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "19px",
                      // height: "70px",
                      // borderRight: "1px solid #E5E5E5",
                      height: "40px",
                      // textTransform: "uppercase",
                      maxWidth: "80px",
                      minWidth: "80px",
                    }}
                  >
                    Action
                  </TableCell>
                )}

                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={1}
                      sx={{
                        color: "#2a2a2f",
                        fontWeight: "700",
                        fontSize: "15px",
                        lineHeight: "19px",
                        maxWidth: "150px",

                        // textTransform: "uppercase",
                        minWidth:
                          header.id === "item_display_image" ? "50px" : "120px",
                        // height: "70px",
                        // borderRight: "1px solid #E5E5E5",
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
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
                <TableRow
                  key={row.id}
                  sx={{
                    p: 1,
                    maxHeight: "60px",
                    minHeight: "60px",
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.grey[300]}`,
                    fontWeight: 400,
                  }}
                >
                  {Array.isArray(columnGroups) && columnGroups.length > 0 && (
                    <TableCell
                      sx={{
                        // cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        maxHeight: "60px",
                        minHeight: "60px",
                        borderBottom: "none",
                        maxWidth: "150px",
                      }}
                    >
                      {row.getIsGrouped() && (
                        <IconButtonWithTooltip
                          {...{
                            onClick: row.getToggleExpandedHandler(),
                            sx: {
                              cursor: row.getCanExpand() ? "pointer" : "normal",
                              // height: "30px",
                              // width: "30px",
                              // p: "0px",
                              mr: 1,
                            },
                          }}
                          disabled={!row.getCanExpand()}
                          title={`Expand`}
                          icon={
                            <>
                              {row.getIsExpanded() ? (
                                <ChevronDownIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </>
                          }
                        ></IconButtonWithTooltip>
                        // <IconButton
                        // 	{...{
                        // 		onClick:
                        // 			row.getToggleExpandedHandler(),
                        // 		sx: {
                        // 			cursor: row.getCanExpand()
                        // 				? "pointer"
                        // 				: "normal",
                        // 			height: "30px",
                        // 			width: "30px",
                        // 			p: "0px",
                        // 		},
                        // 	}}
                        // 	disabled={
                        // 		!row.getCanExpand()
                        // 	}
                        // >
                        // 	{row.getIsExpanded() ? (
                        // 		<ChevronDownIcon />
                        // 	) : (
                        // 		<ChevronRightIcon />
                        // 	)}
                        // </IconButton>
                      )}
                      {row.getIsGrouped() && (
                        <IconButtonWithTooltip
                          onClick={
                            () => handleOpenEditGroupDialog(row)
                            // handleClickCell(row)
                          }
                          sx={
                            {
                              // height: "32px",
                              // width: "32px",
                              // p: "8px",
                            }
                          }
                          disabled={!row.getCanExpand()}
                          icon={
                            <svg
                              id="Layer_1"
                              enableBackground="new 0 0 64 64"
                              height="24"
                              viewBox="0 0 64 64"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path d="m11.105 43.597c-.512 0-1.023-.195-1.414-.586-.781-.781-.781-2.047 0-2.828l31.254-31.254c.78-.781 2.047-.781 2.828 0s.781 2.047 0 2.828l-31.254 31.254c-.39.39-.902.586-1.414.586z" />
                              </g>
                              <g>
                                <path d="m8.017 58c-.139 0-.28-.015-.421-.045-1.08-.232-1.768-1.295-1.536-2.375l3.09-14.403c.232-1.08 1.3-1.766 2.375-1.536 1.08.232 1.768 1.295 1.536 2.375l-3.09 14.403c-.201.939-1.031 1.581-1.954 1.581z" />
                              </g>
                              <g>
                                <path d="m22.418 54.91c-.512 0-1.023-.195-1.414-.586-.781-.781-.781-2.047 0-2.828l31.254-31.253c.78-.781 2.047-.781 2.828 0s.781 2.047 0 2.828l-31.253 31.253c-.391.391-.903.586-1.415.586z" />
                              </g>
                              <g>
                                <path d="m8.013 58c-.923 0-1.752-.642-1.954-1.581-.231-1.08.456-2.143 1.536-2.375l14.403-3.09c1.081-.229 2.144.457 2.375 1.536.231 1.08-.456 2.143-1.536 2.375l-14.403 3.09c-.141.031-.282.045-.421.045z" />
                              </g>
                              <g>
                                <path d="m48.015 29.313c-.512 0-1.024-.195-1.414-.586l-11.313-11.313c-.781-.781-.781-2.047 0-2.828.78-.781 2.048-.781 2.828 0l11.313 11.313c.781.781.781 2.047 0 2.828-.39.391-.902.586-1.414.586z" />
                              </g>
                              <g>
                                <path d="m53.672 23.657c-.512 0-1.024-.195-1.415-.586-.781-.781-.781-2.047 0-2.829 1.113-1.113 1.726-2.62 1.726-4.242s-.613-3.129-1.726-4.242c-1.114-1.114-2.621-1.727-4.243-1.727s-3.129.613-4.242 1.727c-.78.781-2.046.782-2.829 0-.781-.781-.781-2.047 0-2.829 1.868-1.869 4.379-2.898 7.071-2.898 2.691 0 5.203 1.029 7.071 2.898 1.869 1.868 2.898 4.379 2.898 7.071s-1.029 5.203-2.898 7.071c-.389.39-.901.586-1.413.586z" />
                              </g>
                            </svg>
                          }
                          title={`Edit`}
                        >
                          {/* {row.getIsExpanded() ? (
													<ChevronDownIcon />
												) : (
													<ChevronRightIcon />
												)} */}
                          <svg
                            id="Layer_1"
                            enableBackground="new 0 0 64 64"
                            height="512"
                            viewBox="0 0 64 64"
                            width="512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path d="m11.105 43.597c-.512 0-1.023-.195-1.414-.586-.781-.781-.781-2.047 0-2.828l31.254-31.254c.78-.781 2.047-.781 2.828 0s.781 2.047 0 2.828l-31.254 31.254c-.39.39-.902.586-1.414.586z" />
                            </g>
                            <g>
                              <path d="m8.017 58c-.139 0-.28-.015-.421-.045-1.08-.232-1.768-1.295-1.536-2.375l3.09-14.403c.232-1.08 1.3-1.766 2.375-1.536 1.08.232 1.768 1.295 1.536 2.375l-3.09 14.403c-.201.939-1.031 1.581-1.954 1.581z" />
                            </g>
                            <g>
                              <path d="m22.418 54.91c-.512 0-1.023-.195-1.414-.586-.781-.781-.781-2.047 0-2.828l31.254-31.253c.78-.781 2.047-.781 2.828 0s.781 2.047 0 2.828l-31.253 31.253c-.391.391-.903.586-1.415.586z" />
                            </g>
                            <g>
                              <path d="m8.013 58c-.923 0-1.752-.642-1.954-1.581-.231-1.08.456-2.143 1.536-2.375l14.403-3.09c1.081-.229 2.144.457 2.375 1.536.231 1.08-.456 2.143-1.536 2.375l-14.403 3.09c-.141.031-.282.045-.421.045z" />
                            </g>
                            <g>
                              <path d="m48.015 29.313c-.512 0-1.024-.195-1.414-.586l-11.313-11.313c-.781-.781-.781-2.047 0-2.828.78-.781 2.048-.781 2.828 0l11.313 11.313c.781.781.781 2.047 0 2.828-.39.391-.902.586-1.414.586z" />
                            </g>
                            <g>
                              <path d="m53.672 23.657c-.512 0-1.024-.195-1.415-.586-.781-.781-.781-2.047 0-2.829 1.113-1.113 1.726-2.62 1.726-4.242s-.613-3.129-1.726-4.242c-1.114-1.114-2.621-1.727-4.243-1.727s-3.129.613-4.242 1.727c-.78.781-2.046.782-2.829 0-.781-.781-.781-2.047 0-2.829 1.868-1.869 4.379-2.898 7.071-2.898 2.691 0 5.203 1.029 7.071 2.898 1.869 1.868 2.898 4.379 2.898 7.071s-1.029 5.203-2.898 7.071c-.389.39-.901.586-1.413.586z" />
                            </g>
                          </svg>
                        </IconButtonWithTooltip>
                      )}
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        {...{
                          key: cell.id,
                          sx: {
                            background: "white",
                            py: 1,
                            maxHeight: "60px",
                            minHeight: "60px",
                            borderBottom: "none",
                            fontWeight: 400,
                            maxWidth: "150px",
                            overflowX: "hidden",

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
                            <Tooltip title={cell.getValue()}>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  lineHeight: "19px",
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{" "}
                                ({row.subRows.length})
                              </Typography>
                            </Tooltip>
                          </Box>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell<>
                          <>
                            {/* {flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext(),
														)} */}
                          </>
                        ) : cell.getIsPlaceholder() ? null : (
                          // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          <>
                            {cell.column.id === "item_unit_cost_price" ||
                            cell.column.id === "item_unit_retail_price" ||
                            cell.column.id === "sku" ? (
                              <Cell
                                column={cell.column}
                                getValue={cell.getValue}
                                row={cell.row}
                                table={table}
                              />
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  lineHeight: "19px",
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            sx={
              {
                // width: "100%",
                // display: "flex",
                // justifyContent: "space-between",
              }
            }
          >
            <TableRow>
              {/* <TableCell
								colSpan={2}
								sx={{
									borderBottom: "none",
									"& span": {
										mr: "10px",
									},
								}}
							>
								<span className="flex items-center gap-1">
									Page {"  "}
									<strong>
										{table.getState().pagination.pageIndex +
											1}{" "}
										of {table.getPageCount()}
									</strong>
								</span>

								<select
									value={table.getState().pagination.pageSize}
									onChange={(e) => {
										table.setPageSize(
											Number(e.target.value),
										);
									}}
								>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</select>
							</TableCell> */}
              <TableCell
                colSpan={12}
                sx={{
                  borderBottom: "none",
                }}
              >
                <Box
                  sx={{
                    // py: 1,
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    minWidth: "100%",
                    flex: 1,
                  }}
                >
                  {/* <div
										style={{
											flex: 1,
										}}
									/> */}

                  <Pagination
                    // component={Pagination}
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    sx={{
                      display: "flex",
                      // width: "100%",
                    }}
                    // colSpan={12}
                    count={table.getPageCount()}
                    variant="outlined"
                    shape="rounded"
                    page={table.getState().pagination.pageIndex + 1}
                    onChange={(event, value) => table.setPageIndex(value - 1)}
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
      {selectedCell && openEditGroupDialog && (
        <UpdateVariantGroupDialog
          open={openEditGroupDialog}
          handleClose={handleCloseEditGroupDialog}
          row={selectedCell}
          handleFetchProductData={handleFetchProductData}
        />
      )}{" "}
      {/* <div className="h-2" /> */}
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

// import React, { useEffect, useMemo, useState } from "react";
// import {
// 	useReactTable,
// 	getPaginationRowModel,
// 	getFilteredRowModel,
// 	getCoreRowModel,
// 	getGroupedRowModel,
// 	getExpandedRowModel,
// 	flexRender,
// } from "@tanstack/react-table";
// import {} from "@tanstack/react-table";
// import {
// 	Box,
// 	IconButton,
// 	Pagination,
// 	PaginationItem,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableFooter,
// 	TableHead,
// 	TablePagination,
// 	TableRow,
// 	Typography,
// 	Tooltip,
// } from "@mui/material";
// import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
// import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
// import { MdArrowBack, MdArrowForward } from "react-icons/md";
// import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
// import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
// import ChevronRightIcon from "components/Common/Icons/ChevronRight";
// import EditIcon from "components/Common/Icons/EditIcon";
// const Cell = ({ getValue, row: { index }, column: { id }, table }) => {
// 	const initialValue = getValue();
// 	// We need to keep and update the state of the cell normally
// 	const [value, setValue] = React.useState(initialValue);

// 	// When the input is blurred, we'll call our table meta's updateData function
// 	const onBlur = () => {
// 		table.options.meta?.updateData(index, id, value);
// 	};

// 	// If the initialValue is changed external, sync it up with our state
// 	React.useEffect(() => {
// 		setValue(initialValue);
// 	}, [initialValue]);

// 	// console.log({ getValue, index, id, table });
// 	return (
// 		<RenderTextInput
// 			value={value}
// 			onChange={(e) => setValue(e.target.value)}
// 			onBlur={onBlur}
// 		/>
// 	);
// };
// function useSkipper() {
// 	const shouldSkipRef = React.useRef(true);
// 	const shouldSkip = shouldSkipRef.current;

// 	// Wrap a function with this to skip a pagination reset temporarily
// 	const skip = React.useCallback(() => {
// 		shouldSkipRef.current = false;
// 	}, []);

// 	React.useEffect(() => {
// 		shouldSkipRef.current = true;
// 	});

// 	return [shouldSkip, skip];
// }

// const mapState = ({ user }) => ({
// 	currentUser: user.currentUser,
// });

// export default function BluecomCustomGroupedTable({
// 	tableData = [],
// 	columnsData = [],
// 	columnGroups = [],
// 	handleFetchProductData = () => {},
// 	table,
// }) {
// 	const { currentUser } = useSelector(mapState);
// 	const router = useRouter();
// 	const pageId = router.query.pageId || router.query.productId;

// 	const rerender = React.useReducer(() => ({}), {})[1];
// 	const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");

// 	// const columnsFromColumnGroups = columnGroups.map((item) => {
// 	// 	return {
// 	// 		accessorKey: item,
// 	// 		header: () => <span>{item}</span>,
// 	// 		cell: (info) => info.getValue(),
// 	// 	};
// 	// });
// 	const columns = React.useMemo(() => columnsData, [columnsData]);

// 	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

// 	const [data, setData] = React.useState(() => tableData);
// 	const memoizedData = useMemo(() => data, [data]);
// 	useEffect(() => {
// 		setData(tableData);
// 	}, [tableData]);
// 	// const refreshData = () => setData(() => tableData);

// 	const [grouping, setGrouping] = React.useState(columnGroups);

// 	const [expanded, setExpanded] = useState();
// 	console.log(expanded, "expanded");
// 	// React.useEffect(() => {
// 	//   // refreshData();
// 	//   setGrouping(columnGroups);
// 	// }, [columnGroups]);
// 	console.log({ columnGroups });
// 	// const table = useReactTable({
// 	// 	data: memoizedData,
// 	// 	columns,
// 	// 	state: {
// 	// 		grouping: columnGroups,
// 	// 		expanded: expanded,
// 	// 	},

// 	// 	// updateData: updateData,
// 	// 	// onGroupingChange: setGrouping,
// 	// 	onExpandedChange: setExpanded,
// 	// 	columnResizeMode,

// 	// 	getExpandedRowModel: getExpandedRowModel(),
// 	// 	getGroupedRowModel: getGroupedRowModel(),
// 	// 	getCoreRowModel: getCoreRowModel(),
// 	// 	getPaginationRowModel: getPaginationRowModel(),
// 	// 	getFilteredRowModel: getFilteredRowModel(),
// 	// 	// meta: {
// 	// 	// updateData: (rowIndex, columnId, value) => {
// 	// 	// 	// Skip page index reset until after next rerender
// 	// 	// 	skipAutoRes etPageIndex();
// 	// 	// 	setData((old) =>
// 	// 	// 		old.map((row, index) => {
// 	// 	// 			if (index === rowIndex) {
// 	// 	// 				return {
// 	// 	// 					...old[rowIndex],
// 	// 	// 					[columnId]: value,
// 	// 	// 				};
// 	// 	// 			}
// 	// 	// 			return row;
// 	// 	// 		}),
// 	// 	// 	);
// 	// 	// },
// 	// 	// },
// 	// 	autoResetPageIndex,
// 	// 	autoResetExpanded: false,

// 	// 	meta: {
// 	// 		updateData: (rowIndex, columnId, value) => {
// 	// 			// Skip page index reset until after next rerender
// 	// 			skipAutoResetPageIndex();
// 	// 			setData((old) =>
// 	// 				old.map((row, index) => {
// 	// 					if (index === rowIndex) {
// 	// 						handleChangeAggregatedCellValues(
// 	// 							{ target: { value } },
// 	// 							row.master_item_id,
// 	// 							columnId,
// 	// 						);

// 	// 						console.log({
// 	// 							rowIndex,
// 	// 							columnId,
// 	// 							value,
// 	// 							row,
// 	// 						});
// 	// 						return {
// 	// 							...old[rowIndex],
// 	// 							[columnId]: value,
// 	// 						};
// 	// 					}
// 	// 					return row;
// 	// 				}),
// 	// 			);
// 	// 		},
// 	// 	},

// 	// 	debugTable: true,
// 	// });
// 	// const handleSaveCell = (cell, value) => {
// 	// 	let columnId = cell.column.id;
// 	// 	let key = data[+cell.row.index][cell.column.id];

// 	// 	key = value;
// 	// 	setData([...data]);

// 	// 	handleChangeAggregatedCellValues({ target: { value } }, cell, columnId);
// 	// };
// 	// const getMasterItemIdsRecursively = (row) => {
// 	// 	if (Array.isArray(row.subRows) && row.subRows.length > 0) {
// 	// 		return row.subRows
// 	// 			.map((item) => {
// 	// 				return getMasterItemIdsRecursively(item);
// 	// 			})
// 	// 			.flat();
// 	// 	} else {
// 	// 		return [row.original.master_item_id ?? row.master_item_id];
// 	// 	}
// 	// };

// 	// const handleChangeAggregatedCellValues = (e, item_id, key) => {
// 	// 	const masterItemIdList = [item_id];
// 	// 	// getMasterItemIdsRecursively(row);

// 	// 	console.log({ masterItemIdList });
// 	// 	const productsList = masterItemIdList.map((item) => {
// 	// 		return {
// 	// 			master_product_id: pageId,
// 	// 			[key]: e.target.value,
// 	// 			master_item_id: item,
// 	// 		};
// 	// 	});

// 	// 	const URL = PRODUCT.MERCHANT.UPDATE_VARIANT_GROUPS;
// 	// 	const data = {
// 	// 		user_id: currentUser.merchant_id,
// 	// 		products: productsList,
// 	// 	};
// 	// 	appFetch(URL, data)
// 	// 		.then((json) => {
// 	// 			handleFetchProductData();
// 	// 			console.log({ json });
// 	// 		})
// 	// 		.catch((error) => {
// 	// 			console.log({ error });
// 	// 		});
// 	// };
// 	// const handleClickCell = (row) => {
// 	// 	console.log({ row });
// 	// };
// 	// const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);
// 	// const [selectedCell, setSelectedCell] = React.useState(null);
// 	// const handleCloseEditGroupDialog = () => {
// 	// 	setOpenEditGroupDialog(false);
// 	// 	setSelectedCell(null);
// 	// };
// 	// const handleOpenEditGroupDialog = (cell) => {
// 	// 	console.log({ cell });
// 	// 	setOpenEditGroupDialog(true);
// 	// 	setSelectedCell(cell);
// 	// };

// 	return (
// 		<div className="p-2">
// 			<div className="h-2" />
// 			<TableContainer
// 				sx={{
// 					borderRadius: "5px",
// 					border: "1px solid #E5E5E5",
// 				}}
// 			>
// 				<Table>
// 					<TableHead>
// 						{table.getHeaderGroups().map((headerGroup) => (
// 							<TableRow
// 								key={headerGroup.id}
// 								sx={{
// 									my: 2,
// 									// background: "#f1f1f1",
// 								}}
// 							>
// 								{/* {console.log({ headerGroup })} */}
// 								{Array.isArray(columnGroups) &&
// 									columnGroups.length > 0 && (
// 										<TableCell
// 											sx={{
// 												color: "#19235A",
// 												fontWeight: "700",
// 												fontSize: "16px",
// 												lineHeight: "19px",
// 												// height: "70px",
// 												borderRight:
// 													"1px solid #E5E5E5",
// 												height: "40px",
// 											}}
// 										>
// 											Action
// 										</TableCell>
// 									)}

// 								{headerGroup.headers.map((header) => {
// 									return (
// 										<TableCell
// 											key={header.id}
// 											colSpan={1}
// 											sx={{
// 												color: "#19235A",
// 												fontWeight: "700",
// 												fontSize: "16px",
// 												lineHeight: "19px",
// 												maxWidth: "150px",
// 												// height: "70px",
// 												borderRight:
// 													"1px solid #E5E5E5",
// 											}}
// 										>
// 											{header.isPlaceholder ? null : (
// 												<div>
// 													{flexRender(
// 														header.column.columnDef
// 															.header,
// 														header.getContext(),
// 													)}
// 												</div>
// 											)}
// 										</TableCell>
// 									);
// 								})}
// 							</TableRow>
// 						))}
// 					</TableHead>
// 					<TableBody>
// 						{table.getRowModel().rows.map((row) => {
// 							return (
// 								<TableRow
// 									key={row.id}
// 									sx={{
// 										p: 1,
// 										maxHeight: "50px",
// 										minHeight: "50px",
// 										borderBottom: (theme) =>
// 											`1px solid ${theme.palette.grey[300]}`,
// 										fontWeight: 400,
// 									}}
// 								>
// 									{Array.isArray(columnGroups) &&
// 										columnGroups.length > 0 && (
// 											<TableCell
// 												sx={{
// 													// cursor: "pointer",
// 													display: "flex",
// 													alignItems: "center",
// 													maxHeight: "50px",
// 													minHeight: "50px",
// 													borderBottom: "none",
// 													maxWidth: "150px",
// 												}}
// 											>
// 												{row.getIsGrouped() && (
// 													<IconButtonWithTooltip
// 														{...{
// 															onClick:
// 																row.getToggleExpandedHandler(),
// 															sx: {
// 																cursor: row.getCanExpand()
// 																	? "pointer"
// 																	: "normal",
// 																height: "30px",
// 																width: "30px",
// 																p: "0px",
// 																mr: 1,
// 															},
// 														}}
// 														disabled={
// 															!row.getCanExpand()
// 														}
// 														title={`Expand`}
// 														icon={
// 															<>
// 																{row.getIsExpanded() ? (
// 																	<ChevronDownIcon />
// 																) : (
// 																	<ChevronRightIcon />
// 																)}
// 															</>
// 														}
// 													></IconButtonWithTooltip>
// 												)}
// 												{row.getIsGrouped() && (
// 													<IconButtonWithTooltip
// 														// onClick={() =>
// 														// 	handleOpenEditGroupDialog(
// 														// 		row,
// 														// 	)
// 														// }
// 														sx={{
// 															height: "30px",
// 															width: "30px",
// 															p: "0px",
// 														}}
// 														disabled={
// 															!row.getCanExpand()
// 														}
// 														icon={<EditIcon />}
// 														title={`Edit`}
// 													></IconButtonWithTooltip>
// 												)}
// 											</TableCell>
// 										)}
// 									{row.getVisibleCells().map((cell) => {
// 										return (
// 											<TableCell
// 												key={cell.id}
// 												{...{
// 													// key: cell.id,
// 													sx: {
// 														background: "white",
// 														py: 0.5,
// 														maxHeight: "44px",
// 														minHeight: "44px",
// 														borderBottom: "none",
// 														fontWeight: 400,
// 														maxWidth: "150px",
// 														overflowX: "hidden",
// 													},
// 												}}
// 											>
// 												{cell.getIsGrouped() ? (
// 													// If it's a grouped cell, add an expander and row count
// 													<Box
// 														sx={{
// 															display: "flex",
// 															pb: 0.5,
// 															pt: 0.5,
// 															alignItems:
// 																"center",
// 														}}
// 													>
// 														<Tooltip
// 															title={cell.getValue()}
// 														>
// 															<Typography
// 																sx={{
// 																	fontSize:
// 																		"14px",
// 																	fontWeight: 400,
// 																	lineHeight:
// 																		"19px",
// 																}}
// 															>
// 																{flexRender(
// 																	cell.column
// 																		.columnDef
// 																		.cell,
// 																	cell.getContext(),
// 																)}{" "}
// 																(
// 																{
// 																	row.subRows
// 																		.length
// 																}
// 																)
// 															</Typography>
// 														</Tooltip>
// 													</Box>
// 												) : cell.getIsAggregated() ? (
// 													// If the cell is aggregated, use the Aggregated
// 													// renderer for cell<>
// 													<></>
// 												) : cell.getIsPlaceholder() ? null : (
// 													// For cells with repeated values, render null
// 													// Otherwise, just render the regular cell
// 													<>
// 														{flexRender(
// 															cell.column
// 																.columnDef.cell,
// 															cell.getContext(),
// 														)}
// 													</>
// 												)}
// 											</TableCell>
// 										);
// 									})}
// 								</TableRow>
// 							);
// 						})}
// 					</TableBody>
// 					<TableFooter>
// 						<TableRow>
// 							<TableCell
// 								colSpan={2}
// 								sx={{
// 									borderBottom: "none",
// 									"& span": {
// 										mr: "10px",
// 									},
// 								}}
// 							>
// 								<span className="flex items-center gap-1">
// 									Page {"  "}
// 									<strong>
// 										{table.getState().pagination.pageIndex +
// 											1}{" "}
// 										of {table.getPageCount()}
// 									</strong>
// 								</span>

// 								<select
// 									value={table.getState().pagination.pageSize}
// 									onChange={(e) => {
// 										table.setPageSize(
// 											Number(e.target.value),
// 										);
// 									}}
// 								>
// 									{[10, 20, 30, 40, 50].map((pageSize) => (
// 										<option key={pageSize} value={pageSize}>
// 											Show {pageSize}
// 										</option>
// 									))}
// 								</select>
// 							</TableCell>
// 							<TableCell
// 								colSpan={10}
// 								sx={{
// 									borderBottom: "none",
// 								}}
// 							>
// 								<Box
// 									sx={{
// 										// py: 1,
// 										display: "flex",
// 										width: "100%",
// 										justifyContent: "center",
// 										minWidth: "100%",
// 										flex: 1,
// 									}}
// 								>
// 									<Pagination
// 										// component={Pagination}
// 										rowsPerPageOptions={[
// 											5,
// 											10,
// 											25,
// 											{ label: "All", value: -1 },
// 										]}
// 										sx={{
// 											display: "flex",
// 											// width: "100%",
// 										}}
// 										// colSpan={12}
// 										count={table.getPageCount()}
// 										variant="outlined"
// 										shape="rounded"
// 										page={
// 											table.getState().pagination
// 												.pageIndex + 1
// 										}
// 										onChange={(event, value) =>
// 											table.setPageIndex(value - 1)
// 										}
// 										renderItem={(item) => (
// 											<PaginationItem
// 												slots={{
// 													previous: MdArrowBack,
// 													next: MdArrowForward,
// 												}}
// 												{...item}
// 											/>
// 										)}
// 									/>
// 								</Box>
// 							</TableCell>
// 						</TableRow>
// 					</TableFooter>
// 				</Table>
// 			</TableContainer>
// 			{/* {selectedCell && openEditGroupDialog && (
// 				<UpdateVariantGroupDialog
// 					open={openEditGroupDialog}
// 					handleClose={handleCloseEditGroupDialog}
// 					row={selectedCell}
// 					handleFetchProductData={handleFetchProductData}
// 				/>
// 			)}{" "} */}
// 		</div>
// 	);
// }

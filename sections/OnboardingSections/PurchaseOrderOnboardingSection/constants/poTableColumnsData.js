// import { InputAdornment, Stack, Tooltip, Typography } from "@mui/material";
// import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
// import DeleteIconPO from "components/Common/Icons/POicons/DeleteIconPO";
// import TextInput from "components/Common/Inputs/TextInput";
// import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";

// const poTableColumnsData = [
// 	{
// 		accessorKey: "action",
// 		header: "Action",
// 		Cell: ({ cell }) => (
// 			<IconButtonWithTooltip
// 				icon={<DeleteIconPO />}
// 				// title={"Delete"}
// 				// onClick={() => {
// 				// 	handleDeleteProductfromRow(
// 				// 		cell.row.original.master_item_id,
// 				// 	);
// 				// 	// console.log(cell.row.original.id, "cell.row.original");
// 				// }}
// 				title={`Remove Item`}
// 				onClick={() => {
// 					handleDeleteDialogOpenforProduct(
// 						cell.row.original.master_item_id,
// 					);
// 				}}
// 			/>
// 		),
// 		size: 10,
// 	},
// 	{
// 		accessorKey: "product",
// 		header: "Product Details",
// 		Cell: ({ cell }) => (
// 			<RenderProductDetails
// 				display_image={cell.row.original.display_image}
// 				title={cell.row.original.product_title}
// 				href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
// 				// product_id={cell.row.original.master_product_id}
// 				sku={cell.row.original.product_sku}
// 				// barcode={cell.row.original.product_barcode}
// 				variant_title={cell.row.original.item_title}
// 				openInNewTab={true}
// 			/>
// 		),
// 		Footer: ({ table }) =>
// 			tableItems.length > 0 && (
// 				<Stack
// 					sx={{
// 						py: 1,
// 						ml: "16px",
// 					}}
// 				>
// 					{console.log({
// 						table,
// 						pageCount: table.getPageCount(),
// 						expandedRow: table.getExpandedRowModel(),
// 						coreRow: table.getCoreRowModel(),
// 					})}
// 					<Typography
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					>
// 						{tableItems.length} variant
// 					</Typography>
// 				</Stack>
// 			),
// 		size: 700,
// 	},

// 	{
// 		accessorKey: "qty_available",
// 		header: "In Stock",
// 		Cell: ({ cell, row }) => (
// 			<>
// 				{!cell.row.getCanExpand() ? (
// 					<Typography>
// 						{getFormattedNumber(
// 							cell.row.original.qty_available ||
// 								cell.row.original.available_qty ||
// 								0,
// 						)}
// 					</Typography>
// 				) : (
// 					<Typography>
// 						{getFormattedNumber(
// 							selectedProducts.reduce(
// 								(sum, row) =>
// 									sum +
// 									(row.qty_available ||
// 										row.available_qty ||
// 										0),
// 								0,
// 							) || 0,
// 						)}
// 					</Typography>
// 				)}
// 			</>
// 		),
// 		Footer: () =>
// 			tableItems.length > 0 && (
// 				<Stack
// 					sx={{
// 						py: 1,
// 					}}
// 				>
// 					<Typography
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					>
// 						{getFormattedNumber(
// 							selectedProducts.reduce(
// 								(sum, row) =>
// 									sum +
// 									(row.qty_available ||
// 										row.available_qty ||
// 										0),
// 								0,
// 							) || 0,
// 						)}
// 					</Typography>
// 				</Stack>
// 			),
// 		size: 10,
// 		muiTableBodyCellProps: {
// 			align: "right",
// 		},
// 		muiTableHeadCellProps: {
// 			align: "right",
// 		},
// 		muiTableFooterCellProps: {
// 			align: "right",
// 		},
// 	},
// 	{
// 		accessorKey: "moq",
// 		header: "MOQ *",
// 		Cell: ({ cell }) => (
// 			<>
// 				{!cell.row.getCanExpand() ? (
// 					<TextInput
// 						sx={{
// 							"& .MuiOutlinedInput-input": {
// 								padding: "10px 12px",
// 								borderRadius: "8px",
// 							},

// 							"& .MuiOutlinedInput-notchedOutline": {
// 								border: "1px solid #E5E5E5",
// 							},
// 							// input:{
// 							//   textAlign:"right"
// 							// }
// 						}}
// 						containerStyles={{
// 							marginTop: "0px",
// 							// width: "50%",
// 							minWidth: "70px",
// 						}}
// 						placeholder="Enter MOQ"
// 						value={cell.row.original.moq}
// 						onChange={(e) =>
// 							handleChangeValues(
// 								e,
// 								cell.row.original.master_item_id,
// 								"moq",
// 							)
// 						}
// 						InputProps={{
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									{parseInt(cell.row.original.moq) < 1 && (
// 										<Tooltip title="moq cannot be less than 1">
// 											<ReportIcon
// 												size="small"
// 												color="error"
// 											/>
// 										</Tooltip>
// 									)}
// 								</InputAdornment>
// 							),
// 						}}
// 					/>
// 				) : (
// 					<>{getFormattedNumber(cell.row.original.moq || 0)}</>
// 					// <RenderTextInputForPOTable
// 					// 	cell={cell}
// 					// 	handleChangeValues={(e) =>
// 					// 		handleChangeValues(
// 					// 			e,
// 					// 			cell.row.original.master_item_id,
// 					// 			"moq",
// 					// 		)
// 					// 	}
// 					// 	message={`MOQ cannot be less than 1`}
// 					// 	value={cell.row.original.moq}
// 					// 	placeholder={`Enter MOQ`}
// 					// 	condition={parseInt(cell.row.original.moq) < 1}
// 					// />
// 				)}
// 			</>
// 		),
// 		Footer: () =>
// 			tableItems.length > 0 && (
// 				<Stack
// 					sx={{
// 						py: 1,
// 						ml: "8px",
// 					}}
// 				>
// 					<Typography
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					>
// 						{getTotalOfAllTheTableItemsMoq()}
// 					</Typography>
// 				</Stack>
// 			),
// 		size: 20,
// 	},

// 	{
// 		accessorKey: "qty_ordered",
// 		header: "Order Qty *",
// 		Cell: ({ cell }) => (
// 			<>
// 				{!cell.row.getCanExpand() ? (
// 					<TextInput
// 						sx={{
// 							"& .MuiOutlinedInput-input": {
// 								padding: "10px 12px",
// 							},

// 							"& .MuiOutlinedInput-notchedOutline": {
// 								border: "1px solid #E5E5E5",
// 							},
// 						}}
// 						placeholder="Enter Order Qty"
// 						containerStyles={{
// 							marginTop: "0px",
// 							// width: "50%",
// 							minWidth: "70px",
// 						}}
// 						value={cell.row.original.qty_ordered}
// 						onChange={(e) =>
// 							handleChangeValues(
// 								e,
// 								cell.row.original.master_item_id,
// 								"qty_ordered",
// 							)
// 						}
// 						InputProps={{
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									{parseInt(cell.row.original.qty_ordered) <
// 										parseInt(cell.row.original.moq) && (
// 										<Tooltip title="Order qty cannot be less than MOQ">
// 											<ReportIcon
// 												size="small"
// 												color="error"
// 											/>
// 										</Tooltip>
// 									)}
// 								</InputAdornment>
// 							),
// 						}}
// 					/>
// 				) : (
// 					<>
// 						{getFormattedNumber(cell.row.original.qty_ordered || 0)}
// 					</>
// 					// <RenderTextInputForPOTable
// 					// 	cell={cell}
// 					// 	handleChangeValues={(e) =>
// 					// 		handleChangeValues(
// 					// 			e,
// 					// 			cell.row.original.master_item_id,
// 					// 			"qty_ordered",
// 					// 		)
// 					// 	}
// 					// 	message={`Order qty cannot be less than MOQ`}
// 					// 	value={cell.row.original.qty_ordered}
// 					// 	placeholder={`Enter Order Qty`}
// 					// 	condition={
// 					// 		parseInt(cell.row.original.qty_ordered) <
// 					// 		parseInt(cell.row.original.moq)
// 					// 	}
// 					// />
// 				)}
// 			</>
// 		),

// 		Footer: () =>
// 			tableItems.length > 0 && (
// 				<Stack sx={{ py: 1, ml: "8px" }}>
// 					<Typography
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					>
// 						{getTotalOfAllTheTableItemsQtyOrdered()}
// 					</Typography>
// 				</Stack>
// 			),
// 		size: 10,
// 	},

// 	{
// 		accessorKey: "item_unit_cost_price",
// 		header: "Unit Price *",
// 		Cell: ({ cell }) => (
// 			<>
// 				{!cell.row.getCanExpand() ? (
// 					<TextInput
// 						sx={{
// 							"& .MuiOutlinedInput-input": {
// 								padding: "10px 12px",
// 							},

// 							"& .MuiOutlinedInput-notchedOutline": {
// 								border: "1px solid #E5E5E5",
// 							},
// 						}}
// 						containerStyles={{
// 							marginTop: "0px",
// 							// width: "50%",
// 						}}
// 						type="number"
// 						placeholder="Enter unit price"
// 						value={
// 							cell.row.original.item_unit_cost_price < 0
// 								? 0
// 								: cell.row.original.item_unit_cost_price
// 						}
// 						onChange={(e) =>
// 							handleChangeValues(
// 								e,
// 								cell.row.original.master_item_id,
// 								"item_unit_cost_price",
// 							)
// 						}
// 					/>
// 				) : (
// 					<>
// 						{getCurrencyValue(
// 							cell.row.original.item_unit_cost_price || 0,
// 						)}
// 					</>
// 					// <RenderTextInputForPOTable
// 					// 	cell={cell}
// 					// 	condition={
// 					// 		cell.row.original.item_unit_cost_price < 0
// 					// 	}
// 					// 	message={`Unit price cannot be less than 0`}
// 					// 	handleChangeValues={(e) =>
// 					// 		handleChangeValues(
// 					// 			e,
// 					// 			cell.row.original.master_item_id,
// 					// 			"item_unit_cost_price",
// 					// 		)
// 					// 	}
// 					// 	value={cell.row.original.item_unit_cost_price}
// 					// 	placeholder={`Enter unit price`}
// 					// />
// 				)}
// 			</>
// 		),
// 		Footer: () =>
// 			tableItems.length > 0 && (
// 				<Stack
// 					sx={{
// 						py: 1,
// 						ml: "8px",
// 					}}
// 				>
// 					<RenderCurrency
// 						value={getTotalOfAllTheTableItemsUnitCostPrice()}
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					/>
// 				</Stack>
// 			),
// 		size: 10,
// 	},

// 	{
// 		accessorKey: "total_cost",
// 		header: "Total Price *",
// 		Cell: ({ cell }) => (
// 			<>
// 				{console.log({ cell })}
// 				{!cell.row.getCanExpand() ? (
// 					<>
// 						<RenderCurrency
// 							value={
// 								cell.row.original.item_unit_cost_price *
// 									cell.row.original.qty_ordered || 0
// 							}
// 							sx={{
// 								fontSize: "14px",
// 								fontWeight: 500,
// 							}}
// 						/>
// 					</>
// 				) : (
// 					<>
// 						{getFormattedNumber(
// 							selectedProducts.reduce(
// 								(sum, row) =>
// 									sum +
// 									(cell.row.original.item_unit_cost_price *
// 										cell.row.original.qty_ordered || 0),
// 								0,
// 							) || 0,
// 						)}
// 					</>
// 				)}
// 			</>
// 		),
// 		Footer: () =>
// 			tableItems.length > 0 && (
// 				<Stack sx={{ py: 1 }}>
// 					<RenderCurrency
// 						value={getTotalOfAllTheTableItemsTotalCost()}
// 						sx={{
// 							fontSize: "14px",
// 							fontWeight: "700",
// 							color: (theme) => theme.palette.text.primary,
// 						}}
// 					/>
// 				</Stack>
// 			),
// 		size: 10,
// 		muiTableBodyCellProps: {
// 			align: "right",
// 		},
// 		muiTableHeadCellProps: {
// 			align: "right",
// 		},
// 		muiTableFooterCellProps: {
// 			align: "right",
// 		},
// 	},
// ];

// export default poTableColumnsData;

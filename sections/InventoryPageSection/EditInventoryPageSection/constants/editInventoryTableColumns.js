import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";

const METHODS = ["add", "sub", "set"];
const editInventoryTableColumns = [
  {
    accessorKey: "item_title",
    Header: "Variants Name",
    enableSorting: false,
    Cell: ({ cell }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <RenderAppImage
          sx={{
            marginTop: "4px",
            borderRadius: "4px",
            marginRight: "8px",
          }}
          display_image={
            cell.row.original.item_display_image ||
            cell.row.original.display_image
          }
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {/* {cell.row.original.product_title}{" "} */}
          {cell.row.original.item_title ||
            cell.row.original.options.map((item) => item.value).join(" / ")}
        </Typography>
      </Box>
    ),
    size: 400,
  },
  {
    accessorKey: "sku",
    Header: "SKU",
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#222",
        }}
      >
        {cell.row.original.sku}
      </Typography>
    ),
    size: 120,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    // enableSorting: true,
    // sorting: "fuzzy",
    // enableColumnActions: true,
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#222",
        }}
      >
        {cell.row.original.wh_name}
      </Typography>
    ),
    size: 180,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "available",
    header: "Available",
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#222",
        }}
      >
        {cell.getValue()}
        {/* {cell.row.original.available} */}
      </Typography>
    ),
    size: 80,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    Cell: ({ cell }) => (
      <RenderDate date={cell.row.original.updated_at} renderAsDistance={true} />
    ),
  },
  // {
  // 	accessorKey: "method",
  // 	Header: "Adjust Type",
  // 	enableSorting: false,
  // 	Cell: ({ cell }) => (
  // 		<>
  // 			<Box
  // 				sx={{
  // 					display: "flex",
  // 					// flexDirection: "row",
  // 					border: "1px solid rgba(0,0,0,0.3)",
  // 					borderRadius: "4px",
  // 					justifyContent: "space-between",
  // 					alignItems: "center",
  // 					flex: 1,
  // 					maxWidth: "190px",
  // 					height: "40px",
  // 					m: "auto",
  // 					fontSize: "14px",
  // 					fontWeight: 400,
  // 					padding: "0px",
  // 					color: "2a2a2f",
  // 				}}
  // 			>
  // 				{METHODS.map((item, index) => {
  // 					if (item.toLowerCase() === cell.row.original.method) {
  // 						return (
  // 							<PrimaryButton
  // 								size="small"
  // 								key={item}
  // 								sx={{
  // 									textTransform: "capitalize",
  // 									fontWeight: "500 !important",
  // 									transition: "all 0.3s ease-in-out",
  // 								}}
  // 								onClick={() =>
  // 									handleChangeMethod(
  // 										item,
  // 										cell.row.original
  // 											.item_inventory_item_id,
  // 										cell.row.original,
  // 									)
  // 								}
  // 							>
  // 								{item}
  // 							</PrimaryButton>
  // 						);
  // 					}
  // 					if (index === METHODS.length - 1) {
  // 						return (
  // 							<Button
  // 								disableRipple
  // 								key={item}
  // 								sx={{
  // 									color: "#000",
  // 									fontWeight: "500 !important",
  // 									// borderRight:
  // 									// 	"1px solid rgba(0,0,0,0.3)",
  // 									borderRadius: "0px",
  // 									flex: 0.3,
  // 									textTransform: "capitalize",
  // 								}}
  // 								onClick={() =>
  // 									handleChangeMethod(
  // 										item,
  // 										cell.row.original
  // 											.item_inventory_item_id,
  // 										cell.row.original,
  // 									)
  // 								}
  // 							>
  // 								{item}
  // 							</Button>
  // 						);
  // 					}

  // 					return (
  // 						<Button
  // 							disableRipple
  // 							key={item}
  // 							size="small"
  // 							sx={{
  // 								color: "#000",
  // 								borderRight: "1px solid rgba(0,0,0,0.3)",
  // 								borderRadius: "0px",
  // 								fontWeight: "500 !important",
  // 								flex: 0.3,
  // 								textTransform: "capitalize",
  // 							}}
  // 							onClick={() =>
  // 								handleChangeMethod(
  // 									item,
  // 									cell.row.original
  // 										.item_inventory_item_id,
  // 									cell.row.original,
  // 								)
  // 							}
  // 						>
  // 							{item}
  // 						</Button>
  // 					);
  // 				})}
  // 			</Box>
  // 		</>
  // 	),
  // 	size: 200,
  // 	muiTableHeadCellProps: {
  // 		align: "center",
  // 	},
  // 	muiTableBodyCellProps: {
  // 		align: "center",
  // 	},
  // },
  // {
  //     accessorKey: "adjusted_value",
  //     Header: "Adjust Inventory",
  //     Cell: ({ cell }) => (
  //         <Box
  //             sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "flex-start",
  //             }}
  //         >
  //             <RenderTextInput
  //                 containerStyles={{
  //                     maxWidth: "160px",
  //                     marginTop: "0px",
  //                     margin: "0px",

  //                     // mt:0
  //                 }}
  //                 value={cell.getValue()}
  //                 onChange={(e) =>
  //                     handleWarehouseInventoryChange(
  //                         e,
  //                         cell.row.original.item_inventory_item_id,
  //                         cell.row.original,
  //                     )
  //                 }
  //                 placeholder="0"
  //                 type="number"
  //             />
  //             <PrimaryButton
  //                 size="small"
  //                 sx={{
  //                     ml: 2,
  //                     // width: "80px",
  //                     height: "40px",
  //                     borderRadius: "4px",
  //                 }}
  //                 onClick={() =>
  //                     handleSaveRowDataButton(
  //                         cell.row.original.item_inventory_item_id,
  //                         cell.row.original,
  //                     )
  //                 }
  //                 disabled={
  //                     (buttonLoading[
  //                         cell.row.original.item_inventory_item_id
  //                     ] &&
  //                         buttonLoading[
  //                             cell.row.original.item_inventory_item_id
  //                         ]) ||
  //                     cell.row.original.adjusted_value === "" ||
  //                     false
  //                 }
  //             >
  //                 {buttonLoading[
  //                     cell.row.original.item_inventory_item_id
  //                 ] &&
  //                     buttonLoading[
  //                         cell.row.original.item_inventory_item_id
  //                     ] && (
  //                         <Fade
  //                             in={
  //                                 buttonLoading[
  //                                     cell.row.original
  //                                         .item_inventory_item_id
  //                                 ]
  //                             }
  //                         >
  //                             <CircularProgress
  //                                 thickness={4}
  //                                 size={20}
  //                                 sx={{ mr: 2 }}
  //                             />
  //                         </Fade>
  //                     )}
  //                 Save
  //             </PrimaryButton>
  //         </Box>
  //     ),
  //     size: 280,
  // },
];

export default editInventoryTableColumns;

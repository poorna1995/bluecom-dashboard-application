import { Box, Typography } from "@mui/material";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";

const productsListTableColumnsData = [
  {
    field: "Product Title",
    // headerName: <span style={{
    //  marginLeft: "64px",
    // }}>Product</span>,
    headerName: "Product",
    // headerClassName:'productHeaderMargin',
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            marginTop: "4px",
          }}
        >
          <ClickPopover
            src={params.row.display_image}
            slides={params.row.ImageSlides}
          />
        </span>
        <RenderProductDetails
          href={
            params.row.status === "draft"
              ? `/app/products/create/product/${params.row.master_product_id}?step=general-info&id=0`
              : `/app/products/${params.row.master_product_id}?tab=overview`
          }
          title={params.row["Product Title"]}
          barcode={params.row.product_barcode}
          product_id={params.row["Master Product Id"]}
          sku={params.row.product_sku}
          hide_display_image={true}
        />
      </Box>
    ),
    minWidth: 750,
    size: 750,
    flex: 1,
    // headerAlign: "center",
    valueGetter: ({ value }) => value,
    // align: "left",
  },
  {
    field: "Channel Name",
    headerName: "Listing Channel",
    renderCell: (params) => (
      // <RenderChannelAsIcon
      //   value={params.value}
      //   channelList={params.row.channelList}
      // />
      <ChannelGroups
        channels={params.value}
        channelDetails={params.row.channels || []}
      />
    ),
    width: 170,
    valueGetter: ({ value }) => value,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Status",
    headerName: "Status",
    renderCell: (params) => <RenderStatusAsChip status={params.value} />,
    width: 120,
    align: "center",
    valueGetter: ({ value }) => value,
    headerAlign: "center",
  },

  {
    field: "total_qty",
    headerName: "Inventory",
    align: "right",
    headerAlign: "right",
    width: 110,
    renderCell: (params) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "items_count",
    headerName: "# of Variants",
    align: "right",
    headerAlign: "right",
    width: 140,
    renderCell: (params) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "Unit Retail Price",
    headerName: "Retail Price",
    // renderCell: (params) => <span>$ {params.value}</span>,
    renderCell: (params) => (
      <RenderCurrency
        value={params.value}
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          color: (theme) => theme.palette.text.secondary,
        }}
      />
    ),
    width: 130,
    valueGetter: ({ value }) => value,
    headerAlign: "right",
    align: "right",
  },
  {
    field: "created_at",
    headerName: "Created Date",
    headerAlign: "left",
    align: "left",

    width: 160,
    renderCell: (params) => (
      <RenderDate
        date={params.value}
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          ml: 1,
          color: (theme) => theme.palette.text.secondary,
        }}
      />
    ),
    valueGetter: ({ value }) => value,
    sortable: false,
  },

  // {
  // 	field: "master_product_id",
  // 	headerName: "Action",
  // 	renderCell: (params) => (
  // 		<MenuforAction
  // 			options={[
  // 				{
  // 					label: "Edit product",
  // 					icon: (
  // 						<IconButton>
  // 							<EditIcon />
  // 						</IconButton>
  // 					),
  // 					onClick: () => {
  // 						router.push(
  // 							`/app/products/edit/${params.value}?tab=general-info`,
  // 						);
  // 					},
  // 				},
  // 				{
  // 					label: "Copy product",
  // 					icon: (
  // 						<IconButton>
  // 							<CloneIcon />
  // 						</IconButton>
  // 					),
  // 					onClick: () => {
  // 						// Do something
  // 					},
  // 				},
  // 				{
  // 					label: (
  // 						<>
  // 							<Typography
  // 								sx={{
  // 									color: "#d92d20",
  // 								}}
  // 							>
  // 								Delete product
  // 							</Typography>
  // 						</>
  // 					),
  // 					icon: (
  // 						<IconButton
  // 							sx={{
  // 								color: "#d92d20",
  // 								"& svg path": {
  // 									color: "#d92d20",
  // 									// fill: "#d92d20",
  // 									stroke: "#d92d20",
  // 								},
  // 							}}
  // 						>
  // 							<DeleteIcon />
  // 						</IconButton>
  // 					),
  // 					onClick: () => {
  // 						handleDeleteDialogOpen(params.value);
  // 					},
  // 				},
  // 			]}
  // 			buttonIcon={<MoreHoriz />}
  // 		/>
  // 	),
  // 	width: 120,
  // 	headerAlign: "center",
  // 	align: "center",
  // 	sortable: false,
  // },
];

const productListColumnsForMRT = productsListTableColumnsData.map((item) => {
  return {
    ...item,
    accessorKey: item.field,
    Header: item.headerName,
    Cell: item.renderCell,
    size: item.width,
    muiTableHeadCellProps: {
      align: item.headerAlign,
    },
    muiTableBodyCellProps: {
      align: item.align,
    },
  };
});

export default productsListTableColumnsData;

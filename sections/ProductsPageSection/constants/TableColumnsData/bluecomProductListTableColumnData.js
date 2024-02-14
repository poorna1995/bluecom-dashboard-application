import { Box, Stack, Typography } from "@mui/material";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import RenderTableBodyCellText from "components/Common/Tables/RenderComponents/RenderTableBodyCellText";
import { differenceInMinutes, formatDistance } from "date-fns";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import { getDateWithTimezone } from "utils/dateUtils/getFormattedDate";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

function getStr1(str = "") {
  return str.length > 20 ? str.slice(0, 20) + "..." : str;
}

const bluecomProductsListTableColumnsData = [
  {
    accessorKey: "product_title",
    // header: <span style={{
    //  marginLeft: "64px",
    // }}>Product</span>,
    Header: (
      <span
        style={{
          marginLeft: "8px",
        }}
      >
        Product
      </span>
    ),
    // headerClassName:'productHeaderMargin',
    Cell: ({ cell }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 1,
        }}
      >
        <ClickPopover
          src={cell.row.original.display_image}
          slides={cell.row.original.ImageSlides}
        />
        <RenderProductDetails
          href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
          title={cell.row.original["Product Title"]}
          barcode={cell.row.original.product_barcode}
          product_id={cell.row.original["Master Product Id"]}
          sku={cell.row.original.product_sku}
          hide_display_image={true}
        />
      </Box>
    ),
    size: 500,
    minSize: 360,

    flex: 1,
    muiTableHeadCellProps: {
      // align: "center",
      paddingLeft: "8px",
      // width: "20",
    },
    // headerAlign: "center",
    // valueGetter: ({ value }) => value,
    // align: "left",
  },
  {
    accessorKey: "product_sku",
    header: "Product SKU",
    Cell: ({ cell }) => (
      <RenderTableBodyCellText>
        {getStr1(cell.row.original.product_sku) || "-"}
      </RenderTableBodyCellText>
    ),
    size: 100,
    valueGetter: ({ value }) => value,
    headerAlign: "left",
    align: "left",
    muiTableBodyCellProps: {
      align: "center",
    },
    muiTableHeadCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "Channel Name",
    header: "Listing Channel",
    Cell: ({ cell }) => (
      // <RenderChannelAsIcon
      //   value={cell.getValue()}
      //   channelList={cell.row.original.channelList}
      // />
      <ListedChannelsNumber
        channels={cell.getValue()}
        channelDetails={cell.row.original.channels || []}
      />
    ),
    size: 100,
    valueGetter: ({ value }) => value,
    headerAlign: "center",
    align: "center",
    muiTableBodyCellProps: {
      align: "center",
      // width: "20",
    },
    muiTableHeadCellProps: {
      align: "center",
      // width: "20",
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
    Cell: ({ cell }) => (
      <Stack direction="column" alignItems={"center"}>
        <RenderStatusAsChip status={cell.getValue()} />

        {/* {(cell.getValue() === "active" || cell.getValue() === "modified") && (
          <span style={{ marginTop: "4px" }}>
            {" "}
            Edited{" "}
            {formatDistance(
              getDateWithTimezone(cell.row.original.updated_at),
              new Date(),
              { addSuffix: true }
            ).replace("about", " ")}{" "}
          </span>
        )} */}
      </Stack>
    ),
    size: 100,
    align: "center",
    valueGetter: ({ value }) => value,
    headerAlign: "center",
    muiTableBodyCellProps: {
      align: "center",
      // width: "20",
    },
    muiTableHeadCellProps: {
      align: "center",
      // width: "20",
    },
  },

  {
    accessorKey: "total_qty",
    header: "Inventory",
    align: "right",
    headerAlign: "right",
    size: 120,
    Cell: ({ cell }) => (
      <RenderTableBodyCellText>
        {getFormattedNumber(cell.getValue())}
      </RenderTableBodyCellText>
    ),
    muiTableBodyCellProps: {
      align: "right",
      // width: "20",
    },
    muiTableHeadCellProps: {
      align: "right",
      // width: "20",
    },
  },
  {
    accessorKey: "items_count",
    header: "# of Variants",
    align: "right",
    headerAlign: "right",
    size: 120,
    Cell: ({ cell }) => (
      <RenderTableBodyCellText>{cell.getValue()}</RenderTableBodyCellText>
    ),
    muiTableBodyCellProps: {
      align: "right",
      // width: "20",
    },
    muiTableHeadCellProps: {
      align: "right",
      // width: "20",
    },
  },
  {
    accessorKey: "Unit Retail Price",
    header: "Retail Price",
    // Cell: ({cell}) => <span>$ {cell.value}</span>,
    Cell: ({ cell }) => (
      <RenderCurrency
        value={cell.getValue()}
        currency={cell.row.original.currency}
        sx={{
          fontSize: "15px",
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
        }}
      />
    ),
    size: 120,
    valueGetter: ({ value }) => value,
    headerAlign: "right",
    align: "right",
    muiTableBodyCellProps: {
      align: "right",
      // width: "20",
    },
    muiTableHeadCellProps: {
      align: "right",
      // width: "20",
    },
  },
  // {
  //   accessorKey: "created_at",
  //   Header: <span style={{ marginLeft: "8px" }}>Created Date</span>,
  //   headerAlign: "left",
  //   align: "left",

  //   size: 160,
  //   Cell: ({ cell }) => (
  //     <RenderDate
  //       date={cell.getValue()}
  //       sx={{
  //         fontSize: "14px",
  //         fontWeight: "600",
  //         ml: 1,
  //         color: (theme) => theme.palette.text.secondary,
  //       }}
  //     />
  //   ),
  //   valueGetter: ({ value }) => value,
  //   sortable: false,
  // muiTableBodyCellProps: {
  // 	align: "center",

  // },
  // muiTableHeadCellProps: {
  // 	align: "center",

  // },
  // },
  {
    accessorKey: "updated_at",
    Header: <span style={{ marginLeft: "20px" }}>Last Updated</span>,
    headerAlign: "left",
    align: "left",

    size: 120,
    Cell: ({ cell }) => (
      <>
        <RenderTableBodyCellText>
          {/* Edited{" "} */}
          {formatDistance(getDateWithTimezone(cell.getValue()), new Date(), {
            addSuffix: true,
          }).replace("about", "")}{" "}
        </RenderTableBodyCellText>

        {/* <RenderDate
        date={cell.getValue()}
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          ml: 1,
          color: (theme) => theme.palette.text.primary,
        }}
      /> */}
      </>
    ),
    valueGetter: ({ value }) => value,
    sortable: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    muiTableHeadCellProps: {
      align: "center",
    },
  },
];

export default bluecomProductsListTableColumnsData;

import { Avatar, Box, Typography } from "@mui/material";
import ColorAvatar from "components/Common/ColorAvatar";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

// function randomColor() {
//   let hex = Math.floor(Math.random() * 0xffffff);
//   let color = "#" + hex.toString(16);

//   return color;
// }

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let darkHex = Math.floor(hex / 1.5);
  let color = "#" + darkHex.toString(16);

  return color;
}

// function randomColor(letter) {
//   let seed = letter.charCodeAt(0); // Use letter's character code as the seed
//   let random = Math.sin(seed) * 10000;
//   let hex = Math.floor((random - Math.floor(random)) * 0xffffff);
//   let darkHex = Math.floor(hex / 2); // Generate a darker hex value
//   let color = "#" + darkHex.toString(16);

//   return color;
// }

const listOfKeys = [
  "address_1",
  "address_2",
  "city",
  "state",
  "country",
  "zipcode",
];
const addressList = (data) =>
  listOfKeys.map((item) => data[item]).filter((item) => item) ?? [];

const warehouseListColumns = [
  {
    field: "Warehouse Name",
    accessorKey: "Warehouse Name",
    header: "Location Name",
    headerName: "Details",
    // width: 150,
    flex: 1,
    Cell: ({ cell }) => (
      <div
        style={{
          display: "flex",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            mr: "12px",
            // backgroundColor: randomColor(),
          }}
        >
          {cell.row.original["Warehouse Name"].charAt(0)}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            fontWeight: "600",
            "& a": {
              ml: "0px",
              // color: "#4F44E0",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {cell.getValue()}
          </Typography>
          {/* <RenderAppLink
						// href={`/app/warehouse/${params.value}`}
						title={params.value}
					/> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                // color: (theme) => theme.palette.grey[600],
                // color: (theme) => theme.palette.grey[600],
                color: (theme) => theme.palette.text.secondary,
                pt: "2px",
              }}
            >
              Location ID:{" "}
              <span
                style={{
                  fontSize: "14px",
                  // fontWeight: "600",
                  // color: "#000000",
                }}
              >
                {cell.row.original["Warehouse ID"]}
              </span>
            </Typography>
          </Box>
        </Box>
      </div>
    ),
  },

  {
    accessorKey: "channels",
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
    field: "address_id",
    accessorKey: "address_id",
    header: "Address",
    headerName: "Address",
    headerAlign: "left",
    align: "left",
    // width: 250,
    flex: 1,
    valueGetter: ({ value }) => value,
    Cell: ({ cell }) => (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            // fontSize: "14px",
            // fontWeight: "700",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                // color: (theme) => theme.palette.grey[600],
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {/* {console.log(addressList(cell.row.original))} */}
              {addressList(cell.row.original).map((item, index) => {
                if (index === 0) {
                  return (
                    <>
                      {" "}
                      <span
                        key={item}
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {item}
                        {index !== addressList.length - 1 && ","}{" "}
                      </span>
                      <br />
                    </>
                  );
                }
                // if (!data[item]) return null;
                return (
                  <span key={item}>
                    {item}
                    {index !== addressList.length - 1 && ","}{" "}
                  </span>
                );
              })}
            </Typography>
          </Box>
        </Box>
      </>
    ),
  },
  {
    field: "last_updated",
    accessorKey: "last_updated",
    header: "Last Updated",
    headerName: "Last Updated",
    size: 150,
    headerAlign: "center",
    align: "Center",
    Cell: ({ cell }) => <RenderDate date={cell.row.original["Last Updated"]} />,
  },
  {
    field: "stocks",
    accessorKey: "stocks",
    header: "Inventory",
    headerName: "Inventory",
    size: 110,
    headerAlign: "right",
    align: "right",
    Cell: ({ cell }) => (
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {getFormattedNumber(cell.row.original["Stocks"]) || 0}
      </Typography>
    ),
  },
];
export default warehouseListColumns;

import { Box, Skeleton, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import MobileViewSelectChannelButton from "./MobileViewSelectChannelButton";
import MobileViewStoresList from "./MobileViewStoresList";
import MobileViewStoreCardSkeleton from "./MobileViewStoreCardSkeleton";

export default function MobileViewStoresPageSection({ data = {}, loading }) {
  console.log({ data }, "list");
  const channels = Object.keys(data).map((item) => item);
  // const currentChannelData = data[channels[0]];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentChannelData, setCurrentChannelData] = React.useState(
    data[channels[0]]
  );

  React.useEffect(() => {
    setCurrentChannelData(data[channels[0]]);
  }, [data]);
  const handleClick = () => {
    console.info(`You clicked ${channels[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setCurrentChannelData(data[channels[index]]);
  };
  console.log({ channel: channels[selectedIndex], currentChannelData });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  console.log({ channels });
  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ px: 2, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "#000",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "20px",
            }}
          >
            Store:
          </Typography>
          {loading ? (
            <Skeleton
              variant="rounded"
              sx={{ width: "100px", height: "24px", ml: 1 }}
            />
          ) : (
            <MobileViewSelectChannelButton
              options={channels}
              anchorRef={anchorRef}
              open={open}
              selectedIndex={selectedIndex}
              handleClick={handleClick}
              handleMenuItemClick={handleMenuItemClick}
              handleToggle={handleToggle}
              handleClose={handleClose}
            />
          )}
        </Box>
        <PrimaryButton>Add Store</PrimaryButton>
      </Box>
      {loading ? (
        <>
          {skeletonsData.map((item) => (
            <Box key={item} sx={{ px: 2 }}>
              <MobileViewStoreCardSkeleton />
            </Box>
          ))}
        </>
      ) : (
        <>
          <MobileViewStoresList data={currentChannelData} />
        </>
      )}
    </Box>
  );
}

const skeletonsData = [1, 2, 3, 4, 5, 6, 7, 8];

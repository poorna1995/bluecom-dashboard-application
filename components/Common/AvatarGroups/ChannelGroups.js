import React, { useEffect, useState } from "react";
import Unlisted from "public/assets/icons/unlisted.png";

import {
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  Fade,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Popper,
  Skeleton,
  Typography,
} from "@mui/material";
import AppImage from "../AppImage";
import IconMenu from "../Menus/IconMenu";
import {
  usePopupState,
  bindHover,
  bindPopper,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { CHANNEL, THIRD_PARTY } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { MdClose } from "react-icons/md";
import channelsOptions from "constants/channelOptions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ChannelGroups({ channels = [], channelDetails = [] }) {
  // console.log({ channels, channelDetails });
  const { currentUser } = useSelector(mapState);
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper",
  });

  const handleClose = () => {
    // setAnchorEl(null);
    popupState.close();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    popupState.setOpen(!popupState.isOpen);
  };
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchStores = () => {
    const URL = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        setShops(json.result);
        // console.log({ json });
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };
  // get common shops from the `shops ` array and the channelDetails array
  // based on the store_id and merge the properties of the two arrays

  const getCommonShops =
    Array.isArray(shops) &&
    shops
      .map((item) => {
        let channelDetailsItem = channelDetails.find(
          (item2) =>
            item2.store_id === item.store_id || item.shop === item2.shop
        );
        // console.log({ channelDetailsItem });
        if (channelDetailsItem) {
          return { ...item, ...channelDetailsItem };
        }

        // return;

        // return channelDetails.some(
        // 	(item2) => item2.store_id === item.store_id,
        // );
      })
      .filter((item) => item !== undefined);
  // console.log({ getCommonShops });
  useEffect(() => {
    if (popupState.isOpen) {
      // popupState.close();
      handleFetchStores();
    }
  }, [popupState.isOpen]);
  // console.log({ getChannels: getCommonShops, channelDetails });

  let options = getCommonShops.map((channel) => {
    let iconImage = channelsOptions[channel.channel_id].image;

    return {
      label: `${channel.shop ?? channel.channel_product_link}`,
      icon: (
        <ListItemIcon>
          <AppImage
            src={iconImage}
            sx={{
              borderRadius: "100%",
              border: "1px solid rgb(208, 213, 221)",
              width: {
                md: "40px",
                xs: "24px",
              },
              height: {
                md: "40px",
                xs: "24px",
              },
            }}
            width="40"
            height="40"
          />
        </ListItemIcon>
      ),
      onClick: () => {
        window.open(channel.channel_product_link, "_blank");
        // console.log("clicked");
      },
    };
  });
  // get the unique channels from the channelDetails array based on the channel_id
  const getUniqueChannels =
    Array.isArray(channelDetails) &&
    channelDetails.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.channel_id === item.channel_id)
    );

  // console.log({ popupState });
  // console.log({ getUniqueChannels });

  return (
    <div>
      <AvatarGroup
        max={3}
        total={getUniqueChannels.length}
        sx={{
          cursor:
            Array.isArray(channelDetails) && channelDetails.length > 0
              ? "pointer"
              : "default",
          display: "flex",
          justifyContent: "center",
        }}
        // onClick={
        // 	Array.isArray(options) && options.length > 0
        // 		? () => handleClick("bottom")
        // 		: () => {}
        // }
        {...(Array.isArray(channelDetails) &&
          channelDetails.length > 0 &&
          bindTrigger(popupState))}
      >
        {Array.isArray(getUniqueChannels) &&
          getUniqueChannels.length > 0 &&
          getUniqueChannels.map((channel, index) => {
            let iconImage = channelsOptions[channel.channel_id]?.image || "";
            return (
              <Avatar
                key={index}
                sx={{
                  width: {
                    md: "35px",
                    xs: "24px",
                  },
                  height: {
                    md: "35px",
                    xs: "24px",
                  },
                }}
              >
                <AppImage
                  src={iconImage}
                  sx={{
                    borderRadius: "100%",
                    border: "1px solid rgb(208, 213, 221)",
                    width: {
                      md: "40px",
                      xs: "24px",
                    },
                    height: {
                      md: "40px",
                      xs: "24px",
                    },
                  }}
                  width="40"
                  height="40"
                />
              </Avatar>
            );
          })}
        {Array.isArray(channelDetails) && channelDetails.length === 0 && (
          <Avatar
            sx={{
              width: {
                md: "40px",
                xs: "24px",
              },
              height: {
                md: "40px",
                xs: "24px",
              },
            }}
          >
            <AppImage
              src={Unlisted}
              sx={{
                borderRadius: "100%",
                border: "1px solid rgb(208, 213, 221)",
                width: {
                  md: "40px",
                  xs: "24px",
                },
                height: {
                  md: "40px",
                  xs: "24px",
                },
              }}
              width="40"
              height="40"
            />
          </Avatar>
        )}
      </AvatarGroup>
      {
        <Popover
          {...bindPopover(popupState)}
          // placement="bottom"
          open={popupState.isOpen}
          // anchorEl={anchorEl}
          // placement={placement}
          transition
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              maxWidth: "300px",
              minWidth: "300px",
              minHeight: "50px",
              p: 2,
              borderRadius: "8px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Published on Stores
            </Typography>
            <IconButton onClick={() => popupState.close()}>
              <MdClose />
            </IconButton>
          </Box>

          {loading && (
            <>
              <LoadingSkeleton /> <LoadingSkeleton /> <LoadingSkeleton />{" "}
            </>
          )}
          {!loading &&
            options.map(({ label, icon, onClick }) => (
              <MenuItem
                key={label}
                onClick={() => {
                  onClick();
                  handleClose();
                }}
                sx={{
                  maxWidth: "100%",
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: 2,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    wordBreak: "break-word",
                  }}
                >
                  {label}
                </Typography>
              </MenuItem>
            ))}
        </Popover>
      }
      {/* {Array.isArray(options) && options.length > 0 && (
				<Menu
					id="long-menu"
					MenuListProps={{
						"aria-labelledby": "long-button",
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,

							width: "400px",
							borderRadius: "10px",

							boxShadow: "0px 0px 20px 5px #34405424",
						},
					}}
				>
					{options.map(({ label, icon, onClick }) => (
						<MenuItem
							key={label}
							onClick={() => {
								onClick();
								handleClose();
							}}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							{label}
						</MenuItem>
					))}
				</Menu>
			)} */}
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Skeleton
        variant="circular"
        height={"40px"}
        width={"40px"}
        sx={{ mr: 2 }}
      />
      <Skeleton
        variant="rounded"
        height="40px"
        width="100%"
        // sx={{ mb: 1 }}
      />
    </Box>
  );
};

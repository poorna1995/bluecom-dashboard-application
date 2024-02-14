import React, { useEffect, useState } from "react";
import Shopify from "public/assets/icons/shopifyListIcon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import Woocommerce from "public/assets/icons/woocommerceListIcon.png";
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
import { List } from "@mui/icons-material";
import channelsOptions from "constants/channelOptions";
import MuiBaseDataGrid from "../Tables/MuiBaseDataGrid";
import BluecomMRTBaseTable from "../Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function ChannelList({ channelDetails = [], ...props }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    handleFetchStores();
  }, []);

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
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };

  // getUniqueDetails channelDetails and shops, remove other which do not have the matching shop_id
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

  console.log({ channelDetails, shops });
  const storeData =
    Array.isArray(getCommonShops) &&
    getCommonShops.length > 0 &&
    getCommonShops.map((item, channel) => {
      return {
        iconImage: channelsOptions[item.channel_id].image,
        title: item.shop,
      };
    });

  const columnData = [
    {
      accessorKey: "Channel ",
      header: "Channel ",
      // flex: 1,
      size: 100,
      muiTableHeaderCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (
        <ListItemIcon
          sx={{
            mr: 2,
            mt: 0.5,
          }}
        >
          <AppImage
            src={cell.row.original.iconImage}
            alt={cell.row.original.title}
            sx={{
              borderRadius: "100%",
              border: "1px solid rgb(208, 213, 221)",
            }}
            width="40"
            height="40"
          />
        </ListItemIcon>
      ),
    },
    {
      accessorKey: "store",
      header: "Store",
      flex: 1,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            maxWidth: "100%",
            wordBreak: "break-word",
            mr: "8px",
          }}
        >
          {cell.row.original.title}
        </Typography>
      ),
    },
  ];

  return (
    <div>
      <BluecomMRTBaseTable
        data={storeData}
        columns={columnData}
        state={{
          showSkeletons: loading,
        }}
        {...props}
      />
    </div>
  );
}

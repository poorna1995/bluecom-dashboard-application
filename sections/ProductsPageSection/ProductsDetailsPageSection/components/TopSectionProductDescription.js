import { AvatarGroup, Box, Typography } from "@mui/material";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function TopSectionProductDescription({
  productType,
  isShrunk,
  data,
}) {
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const productId = router.query.productId;
  // const [data, setData] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]);

  // useEffect(() => {
  // 	if (productId) handleFetchProductDetails();
  // }, [productId]);

  const handleFetchProductDetails = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result[0]);
          setItemsData(json.result[0].items);
        }
      })
      .catch((error) => console.log(error));
  };

  // channel

  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  // useEffect(() => {
  //   handleFetchChannels();
  // }, []);

  const getChannels =
    (Array.isArray(channels) &&
      channels.filter((it) => {
        if (data && it.channel_id === data.channel_id) return it.channel_name;
        return;
      })) ??
    [];

  const getChannelsData =
    (Array.isArray(getChannels) &&
      getChannels.map((item) => {
        const { channel_id, channel_name } = item;
        return {
          "Channel Id": channel_id,
          "Channel Name": channel_name,
        };
      })) ??
    [];
  console.log({ getChannelsData });

  // description text
  const productNames = [
    // `${productType} ID`,
    "SKU",
    "Barcode",
  ];
  const productValue = [
    // productId,
    data.product_sku,
    data.product_barcode,
  ];
  const descriptionText = productNames.map((productPropertyName, index) => {
    const productPropertyDetail = productValue[index];
    console.log(productPropertyDetail);
    return (
      <>
        {productPropertyDetail && (
          <DescriptionText
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              fontWeight: "500",
              fontSize: "14px",
              color: "#222222",
              mt: "8px",
              "& span": {
                fontWeight: "700",
                fontSize: "14px",
                ml: "4px",
              },
            }}
          >
            {productPropertyName}
            {`${": "} `}
            {<span> {productPropertyDetail}</span>}
          </DescriptionText>
        )}{" "}
      </>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.1rem",
      }}
    >
      <SectionTitleText
        sx={{
          fontWeight: "600",
          fontSize: isShrunk ? "18px" : "20px",
          color: (theme) => theme.palette.text.primary,

          transition: "all 0.3s ease-in-out",
          // mt: "16px",
          // paddingLeft: "20px",
          // paddingTop: "20px",
        }}
      >
        {data.product_title}
      </SectionTitleText>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>{descriptionText}</Box>
      </Box>
    </Box>
  );
}

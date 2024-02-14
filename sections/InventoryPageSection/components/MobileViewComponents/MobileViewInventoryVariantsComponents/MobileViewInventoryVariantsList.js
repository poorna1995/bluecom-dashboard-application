import { Box, IconButton, Skeleton, Slide, Typography } from "@mui/material";
import React from "react";
import MobileViewInventoryVariantsCard from "./MobileViewInventoryVariantsCard";
import MobileViewInventoryVariantCardSkeleton from "./MobileViewInventoryVariantCardSkeleton";

const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8];
export default function MobileViewInventoryVariantsList({ data, loading }) {
  // console.log({ data }, "list");
  const [showLocationsList, setShowLocationsList] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const containerRef = React.useRef(null);

  const handleClickItem = (item) => {
    setShowLocationsList(true);
    setSelectedItem(item);
    console.log("clicked", { item });
  };
  const handleClickBack = () => {
    setShowLocationsList(false);

    setSelectedItem({});
  };
  console.log({ showLocationsList });
  return (
    <div ref={containerRef}>
      {showLocationsList ? (
        <InventoryList data={selectedItem} handleClickBack={handleClickBack} />
      ) : (
        <>
          {loading ? (
            <>
              {skeletonData.map((item) => (
                <MobileViewInventoryVariantCardSkeleton key={item} />
              ))}
            </>
          ) : (
            <>
              {Array.isArray(data) &&
                data.map((item) => {
                  return (
                    <MobileViewInventoryVariantsCard
                      key={item.master_item_id}
                      data={item}
                      onClick={() => handleClickItem(item)}
                    />
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
}

const InventoryList = ({ data, handleClickBack }) => {
  const list = data.inventory;
  const title =
    data.item_title ||
    (Array.isArray(data.options) &&
      data.options.map((it) => it.value).join(" / "));
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          py: 2,
          alignItems: "center",
          px: 2,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <IconButton
          onClick={handleClickBack}
          sx={{
            borderRadius: " 4px",
            border: "1px solid rgba(0, 0, 0, 0.30)",
            mr: 2,
          }}
        >
          <ArrowIcon />
        </IconButton>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Box>
      {Array.isArray(list) &&
        list.map((item, key) => {
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                px: 2,
                py: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {item.wh_name}:
              </Typography>
              <Typography
                sx={{
                  color: "#616161",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {item.available} Qty
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clipPath="url(#clip0_12329_2271)">
      <path
        d="M2.42401 7.52876C2.29903 7.65378 2.22882 7.82332 2.22882 8.0001C2.22882 8.17687 2.29903 8.34641 2.42401 8.47143L6.19535 12.2428C6.25684 12.3064 6.33041 12.3572 6.41174 12.3922C6.49308 12.4271 6.58056 12.4455 6.66908 12.4463C6.7576 12.447 6.84538 12.4302 6.92731 12.3966C7.00925 12.3631 7.08368 12.3136 7.14628 12.251C7.20887 12.1884 7.25837 12.114 7.29189 12.0321C7.32541 11.9501 7.34228 11.8623 7.34151 11.7738C7.34074 11.6853 7.32235 11.5978 7.28741 11.5165C7.25247 11.4352 7.20169 11.3616 7.13801 11.3001L4.50468 8.66676L13.3333 8.66676C13.5102 8.66676 13.6797 8.59652 13.8048 8.4715C13.9298 8.34648 14 8.17691 14 8.0001C14 7.82329 13.9298 7.65372 13.8048 7.52869C13.6797 7.40367 13.5102 7.33343 13.3333 7.33343L4.50468 7.33343L7.13801 4.7001C7.25945 4.57436 7.32665 4.40596 7.32513 4.23116C7.32361 4.05636 7.2535 3.88916 7.12989 3.76555C7.00629 3.64195 6.83908 3.57183 6.66428 3.57031C6.48948 3.56879 6.32108 3.63599 6.19535 3.75743L2.42401 7.52876Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_12329_2271">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 16) rotate(-90)"
        />
      </clipPath>
    </defs>
  </svg>
);

/**
 * {
    "channel_id": [
        5
    ],
    "created_at": "2023-07-05T15:06:27+00:00",
    "display_image": "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/574/17cfac39-95de-4c72-a3b2-45e573049793__70443.1688569590.386.513.png?c=1",
    "inventory": [
        {
            "available": 3,
            "channel_id": 1,
            "inventory_item_id": "923046305674230091",
            "shop": "hivepath-third-store",
            "store_id": "139070477004091640",
            "wh_id": "76444270875",
            "wh_name": "Shop location"
        },
        {
            "available": 1,
            "channel_id": 1,
            "inventory_item_id": "923046305674230091",
            "shop": "hivepath-test-store",
            "store_id": "139071302238290340",
            "wh_id": "75970904346",
            "wh_name": "Delhi Cantonment"
        },
        {
            "available": 100,
            "channel_id": 1,
            "inventory_item_id": "923046305674230091",
            "shop": "hivepath-test-store",
            "store_id": "139071302238290340",
            "wh_id": "77204750618",
            "wh_name": "Warehouse 2"
        }
    ],
    "item_display_image": "",
    "item_title": "",
    "master_item_id": "814105221827214029",
    "master_product_id": "913608154360034296",
    "options": [
        {
            "id": 0,
            "name": "Size",
            "sequence": 0,
            "value": "66x47x28"
        },
        {
            "id": 1,
            "name": "Color",
            "sequence": 1,
            "value": "WHITE"
        }
    ],
    "product_description": null,
    "product_title": "Safari Pentagon 65 Cms Medium Check-in Polypropylene Hard Sided 4 Wheels 360 Degree Wheeling System Luggage, Cyan Blue"
}
 */

import { Box, Typography } from "@mui/material";
import React from "react";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

export default function StoreSummaryComponent({
  shop,
  products,
  inventory,
  locations,
  storeDetails,
}) {
  const storeInfo = storeDetails;
  /**
   * {
    "existed_item_sku": 188,
    "existed_product_sku": 0,
    "has_compared": "hivepath-test-store",
    "has_primary_store": true,
    "locations_count": 4,
    "new_item_sku": 61,
    "new_product_sku": 0,
    "products_count": 13,
    "store_id": "139133491663878760",
    "total_inventory": 1413,
    "variants_count": 249
}
   */

  const PRIMARY_STORE = storeInfo.has_compared;
  const EXISTING_PRODUCT_SKU = storeInfo.existed_product_sku;
  // const
  const hasBeenCompared = Boolean(storeDetails.has_compared);
  const hasDuplicateSKU = storeDetails.existed_product_sku > 0;
  const comparedStore = storeDetails.has_compared;

  const data = [
    {
      icon: <ProductsIcon />,
      title: "Total Products",
      count: products,
    },
    {
      icon: <InventoryIcon />,
      title: "Total On-hand",
      count: inventory,
    },
    {
      icon: <LocationIcon />,
      title: "Total Locations",
      count: locations,
    },
  ];
  return (
    <div>
      <Typography
        sx={{
          color: "#4F44E0",
          fontSize: "32px",
          fontWeight: 600,
          // textAlign: "center",
          mt: 4,
          mb: 4,
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        Store Summary
      </Typography>
      <Box
        sx={{
          maxWidth: "800px",
          margin: "auto",
          borderRadius: " 10px",
          // border: " 1px solid rgba(0, 0, 0, 0.20)",
          // p: 4,
        }}
      >
        <Box
          sx={{
            pb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#222",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            {/* Bluecom has successfully established connection with	{shop} */}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: " 18px",
              fontWeight: 500,
              "& span": {
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            Bluecom has successfully established connection with{" "}
            <span>{shop}</span>. Please review the store summary provided below.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            borderRadius: " 10px",
            border: "1px solid #D0D2FC",
            background: "#F6F7FD",
            p: 3,
            maxWidth: "800px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {data.map((item) => (
            <StoreSummaryItem key={item.title} {...item} />
          ))}
        </Box>
        {hasBeenCompared && (
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.1)",
              // p: 2,
              borderRadius: "10px",
              my: 2,
              background: "#FEF7F0",
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "#555",
                fontSize: "16px",
                fontWeight: 500,
                "& b": {
                  color: "#000",
                },
              }}
            >
              Compared <b>{comparedStore}</b> vs <b>{shop}</b>
            </Typography>
            {hasDuplicateSKU && (
              <>
                <Typography
                  sx={{
                    color: "#555",
                    fontSize: "14px",
                    fontWeight: 500,
                    my: 1,
                    "& b": {
                      color: "#000",
                    },
                  }}
                >
                  You have <b>{storeInfo.existed_product_sku}</b> products with
                  same SKU.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    maxWidth: "400px",
                    my: 1,
                    mt: 2,
                    mx: "auto",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    flex: 1,
                    "& div": {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mr: 2,
                      flex: 0.5,
                      "& span": {
                        color: "#555",
                        fontSize: "16px",
                        fontWeight: 500,
                        mr: 2,
                      },
                      "& b": {
                        color: "#000",
                      },
                    },
                  }}
                >
                  <div
                    style={{
                      borderRight: "1px solid rgba(0,0,0,0.1)",
                      paddingRight: "16px",
                    }}
                  >
                    <span> Existing SKU</span>{" "}
                    <b>{storeInfo.existed_product_sku}</b>
                  </div>

                  <div>
                    <span>New SKU</span>
                    <b> {storeInfo.new_product_sku}</b>
                  </div>
                </Box>
              </>
            )}
            {!hasDuplicateSKU && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    "& span": {
                      color: "#555",
                      fontSize: "16px",
                      fontWeight: 500,
                      ml: 2,
                    },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="30"
                    viewBox="0 0 29 30"
                    fill="none"
                  >
                    <path
                      d="M12.47 18.0944L9.31625 14.9406C9.05042 14.6748 8.72417 14.5419 8.3375 14.5419C7.95083 14.5419 7.6125 14.6869 7.3225 14.9769C7.05667 15.2427 6.92375 15.581 6.92375 15.9919C6.92375 16.4027 7.05667 16.741 7.3225 17.0069L11.455 21.1394C11.7208 21.4052 12.0592 21.5381 12.47 21.5381C12.8808 21.5381 13.2192 21.4052 13.485 21.1394L21.7138 12.9106C21.9796 12.6448 22.1125 12.3185 22.1125 11.9319C22.1125 11.5452 21.9675 11.2069 21.6775 10.9169C21.4117 10.651 21.0733 10.5181 20.6625 10.5181C20.2517 10.5181 19.9133 10.651 19.6475 10.9169L12.47 18.0944ZM14.5 29.9844C12.4942 29.9844 10.6092 29.6035 8.845 28.8418C7.08083 28.081 5.54625 27.0481 4.24125 25.7431C2.93625 24.4381 1.90337 22.9035 1.1426 21.1394C0.380867 19.3752 0 17.4902 0 15.4844C0 13.4785 0.380867 11.5935 1.1426 9.82938C1.90337 8.06521 2.93625 6.53063 4.24125 5.22563C5.54625 3.92063 7.08083 2.88726 8.845 2.12552C10.6092 1.36476 12.4942 0.984375 14.5 0.984375C16.5058 0.984375 18.3908 1.36476 20.155 2.12552C21.9192 2.88726 23.4538 3.92063 24.7588 5.22563C26.0638 6.53063 27.0966 8.06521 27.8574 9.82938C28.6191 11.5935 29 13.4785 29 15.4844C29 17.4902 28.6191 19.3752 27.8574 21.1394C27.0966 22.9035 26.0638 24.4381 24.7588 25.7431C23.4538 27.0481 21.9192 28.081 20.155 28.8418C18.3908 29.6035 16.5058 29.9844 14.5 29.9844Z"
                      fill="#4f44e0"
                    />
                  </svg>
                  <span>We have detected no duplicates in your products</span>
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

const StoreSummaryItem = ({ icon, title, count }) => {
  return (
    <Box
      sx={{
        display: "flex",
        "& div": {
          // ml: 2,
          display: "flex",
          flexDirection: "column",
        },
        "& .title": {
          color: (theme) => theme.palette.text.secondary,
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "24px",
          mt: 0.5,
        },
        "& .count": {
          color: (theme) => theme.palette.text.primary,
          // fontFamily: "Lato",
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: "42px",
          mt: 2,
          textAlign: "center",
        },
      }}
    >
      {/* {icon}{" "} */}
      <div>
        <span className="title"> {title}</span>

        <span className="count">{getFormattedNumber(count)}</span>
      </div>
    </Box>
  );
};

const ProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M16.3178 0L2.03954 2.04089L0 16.3199L13.2585 29.5777C13.529 29.8481 13.8958 30 14.2782 30C14.6607 30 15.0275 29.8481 15.298 29.5777L29.5777 15.2987C29.8481 15.0282 30 14.6614 30 14.279C30 13.8965 29.8481 13.5297 29.5777 13.2593L16.3178 0ZM15.298 3.06061L26.5184 14.279L14.2782 26.5171L3.05931 15.2987L4.58825 4.58947L15.298 3.06061ZM12.2401 12.2395C12.7812 11.6983 13.0852 10.9642 13.085 10.1989C13.085 9.81991 13.0103 9.44468 12.8652 9.09459C12.7201 8.7445 12.5074 8.42642 12.2394 8.1585C11.9714 7.89058 11.6532 7.67807 11.3031 7.53311C10.9529 7.38815 10.5776 7.31358 10.1986 7.31365C9.43326 7.31378 8.69928 7.61794 8.15817 8.15922C7.61706 8.7005 7.31314 9.43455 7.31327 10.1999C7.31341 10.9652 7.61759 11.6992 8.15889 12.2403C8.70019 12.7814 9.43428 13.0853 10.1997 13.0851C10.965 13.085 11.699 12.7808 12.2401 12.2395Z"
      fill="#4F44E0"
    />
  </svg>
);

const InventoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M1.4 25.2V9.38C1.00334 9.12333 0.670605 8.79667 0.401805 8.4C0.133005 8.00333 -0.000928489 7.53667 4.84429e-06 7V2.8C4.84429e-06 2.03 0.274405 1.3706 0.823205 0.821802C1.372 0.273002 2.03094 -0.000930956 2.8 2.37691e-06H25.2C25.97 2.37691e-06 26.6294 0.274402 27.1782 0.823202C27.727 1.372 28.0009 2.03094 28 2.8V7C28 7.53667 27.8656 8.00333 27.5968 8.4C27.328 8.79667 26.9957 9.12333 26.6 9.38V25.2C26.6 25.97 26.3256 26.6294 25.7768 27.1782C25.228 27.727 24.5691 28.0009 23.8 28H4.2C3.43 28 2.7706 27.7256 2.2218 27.1768C1.673 26.628 1.39907 25.9691 1.4 25.2ZM4.2 9.8V25.2H23.8V9.8H4.2ZM25.2 7V2.8H2.8V7H25.2ZM9.8 16.8H18.2V14H9.8V16.8Z"
      fill="#4F44E0"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M25.452 15.7388V25.2H26.7246V28H1.2726V25.2H2.5452V15.7388C1.76175 15.1635 1.11952 14.3844 0.675521 13.4705C0.23152 12.5566 -0.000518881 11.5362 8.71237e-07 10.5C8.71237e-07 9.3422 0.285063 8.2264 0.805556 7.2758L4.25684 0.7C4.36853 0.487178 4.52918 0.310449 4.72263 0.187573C4.91608 0.064698 5.13553 6.24291e-06 5.35891 0H22.6395C22.8629 6.24291e-06 23.0824 0.064698 23.2758 0.187573C23.4693 0.310449 23.6299 0.487178 23.7416 0.7L27.1802 7.2548C27.9393 8.64202 28.1834 10.2977 27.8615 11.8778C27.5397 13.4578 26.6767 14.8407 25.452 15.7388ZM22.9068 16.7608C22.0318 16.8688 21.1459 16.7532 20.3182 16.4229C19.4905 16.0927 18.7432 15.5567 18.1345 14.8568C17.6003 15.4715 16.9584 15.9607 16.2475 16.295C15.5367 16.6292 14.7716 16.8015 13.9986 16.8014C13.2257 16.8018 12.4608 16.63 11.7499 16.2962C11.0391 15.9625 10.3971 15.4738 9.86264 14.8596C9.25386 15.5593 8.50652 16.095 7.6788 16.425C6.85107 16.755 5.96529 16.8704 5.09039 16.7622V25.2H22.9068V16.7622V16.7608ZM6.09447 2.8L2.99824 8.6982C2.69737 9.516 2.68834 10.4286 2.97296 11.2535C3.25757 12.0783 3.81484 12.7544 4.53323 13.1466C5.25161 13.5387 6.07811 13.6179 6.84732 13.3683C7.61652 13.1188 8.27168 12.5588 8.68167 11.8006C9.10799 10.6288 10.616 10.6288 11.0436 11.8006C11.2794 12.4508 11.687 13.0082 12.2138 13.4009C12.7406 13.7937 13.3623 14.0036 13.9986 14.0036C14.6349 14.0036 15.2566 13.7937 15.7834 13.4009C16.3101 13.0082 16.7177 12.4508 16.9536 11.8006C17.3799 10.6288 18.8879 10.6288 19.3155 11.8006C19.4806 12.2478 19.7281 12.6526 20.0423 12.9896C20.3565 13.3265 20.7307 13.5883 21.1413 13.7585C21.552 13.9287 21.9901 14.0036 22.4283 13.9786C22.8665 13.9535 23.2953 13.8289 23.6876 13.6128C24.08 13.3966 24.4275 13.0935 24.7082 12.7225C24.9889 12.3515 25.1969 11.9207 25.3189 11.457C25.441 10.9933 25.4746 10.5069 25.4175 10.0283C25.3605 9.54965 25.2141 9.08917 24.9875 8.6758L21.9014 2.8H6.09575H6.09447Z"
      fill="#4F44E0"
    />
  </svg>
);

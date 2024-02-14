import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { PRODUCT } from "constants/API_URL";
import React from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RenderHTML from "components/Common/Typography/RenderHTML";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ReviewChangesDetails({
  product_id,
  accordionImage,
  accordionTitle,
}) {
  const { currentUser } = useSelector(mapState);

  const { data } = useQuery({
    queryKey: ["selectedProductChanges", product_id],
    queryFn: () =>
      appFetch(PRODUCT.FETCH_PRODUCT_CHANGES, {
        user_id: currentUser.merchant_id,
        master_product_id: product_id,
      })
        .then((json) => json)
        .catch((err) => console.error(err)),
  });

  const selectedProductDetails = data?.result;
  const message = data?.message;
  // const handleFetchPublishHistory = (product_id) => {
  // 	const url = PRODUCT.FETCH_PRODUCT_CHANGES;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 		master_product_id: product_id,
  // 	};
  // 	appFetch(url, data)
  // 		.then((json) => {
  // 			// setIsLoading(false);
  // 			if (json.status === "success") {
  // 				setselectedProductDetails(json.result);
  // 			}

  // 			console.log({ publishHistory: json });
  // 		})
  // 		.catch((err) => console.error(err));
  // };

  return (
    <Accordion
      sx={{
        my: "8px",
        boxShadow: "none",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "5px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <AppImage
            src={accordionImage}
            width="50"
            height="50"
            sx={{
              // marginLeft: "30px",
              borderRadius: "5px",
            }}
          />
          <DescriptionText
            sx={{
              color: (theme) => theme.palette.grey[800],
              fontWeight: "600",
              // marginTop: "27px",
              // marginLeft: "80px",
              fontSize: "16px",
              lineHeight: "19px",
              flex: 1,
              ml: 2,
            }}
          >
            {accordionTitle}
          </DescriptionText>
          {message && (
            <Chip
              label={message}
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "16px",
                color: (theme) => theme.palette.primary.main,
                mr: 2,
              }}
            />
          )}
        </Box>
      </AccordionSummary>
      {Array.isArray(selectedProductDetails?.diff) &&
        selectedProductDetails?.diff?.length > 0 && (
          <AccordionDetails>
            <Box>
              <Grid
                container
                sx={{
                  borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.grey[300]}`,
                  py: 2,
                  mb: 2,
                }}
              >
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "17px",
                      color: (theme) => theme.palette.grey[800],
                    }}
                  >
                    Older Version
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "17px",
                      color: (theme) => theme.palette.grey[800],
                    }}
                  >
                    Updated Version
                  </Typography>
                </Grid>
              </Grid>
              {Array.isArray(selectedProductDetails?.diff) &&
                selectedProductDetails?.diff?.length > 0 &&
                selectedProductDetails?.diff?.map((item, index) => {
                  if (item.key === "display_image")
                    return (
                      <Grid container spacing={2} columns={12} key={index}>
                        <Grid item xs={2}>
                          <DescriptionText
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "17px",
                              color: (theme) => theme.palette.grey[800],
                            }}
                          >
                            {item.key} :{" "}
                          </DescriptionText>
                        </Grid>
                        <Grid item xs={5}>
                          <AppImage
                            src={item.old_value}
                            width="100"
                            height="100"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            background: (theme) => theme.palette.blue[50],
                            borderRadius: "5px",
                          }}
                        >
                          <AppImage
                            src={item.new_value}
                            width="100"
                            height="100"
                          />
                        </Grid>
                      </Grid>
                    );
                  if (item.key === "images")
                    return (
                      <Grid container spacing={2} columns={12} key={index}>
                        <Grid item xs={2}>
                          <DescriptionText
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "17px",
                              color: (theme) => theme.palette.grey[800],
                            }}
                          >
                            {item.key} :{" "}
                          </DescriptionText>
                        </Grid>
                        <Grid item xs={5}>
                          {item.old_value.map((image, id) => {
                            return (
                              <AppImage
                                key={id}
                                src={image}
                                width="100"
                                height="100"
                              />
                            );
                          })}
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            background: (theme) => theme.palette.blue[50],
                            borderRadius: "5px",
                          }}
                        >
                          {item.new_value.map((image, id) => {
                            return (
                              <AppImage
                                key={id}
                                src={image}
                                width="100"
                                height="100"
                              />
                            );
                          })}
                        </Grid>
                      </Grid>
                    );

                  if (item.key === "product_desc")
                    return (
                      <Grid container key={index}>
                        <Grid item xs={2}>
                          <DescriptionText
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "17px",
                              color: (theme) => theme.palette.grey[800],
                            }}
                          >
                            {KEYS[item.key]} :{" "}
                          </DescriptionText>
                        </Grid>
                        <Grid item xs={5} sx={{ pr: 2 }}>
                          <RenderHTML content={item.old_value} />
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            background: (theme) => theme.palette.blue[50],
                            borderRadius: "5px",
                          }}
                        >
                          <RenderHTML content={item.new_value} />
                        </Grid>
                      </Grid>
                    );
                  if (KEYS[item.key])
                    return (
                      <Grid container spacing={2} columns={12} key={index}>
                        <Grid item xs={2}>
                          <DescriptionText
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "17px",
                              color: (theme) => theme.palette.grey[800],
                            }}
                          >
                            {KEYS[item.key]} :{" "}
                          </DescriptionText>
                        </Grid>
                        <Grid item xs={5}>
                          <DescriptionText>
                            {item.old_value.toString()}
                          </DescriptionText>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            background: (theme) => theme.palette.blue[50],
                            borderRadius: "5px",
                          }}
                        >
                          <DescriptionText>
                            {item.new_value.toString()}
                          </DescriptionText>
                        </Grid>
                      </Grid>
                    );
                })}
            </Box>
          </AccordionDetails>
        )}
    </Accordion>
  );
}

const KEYS = {
  product_title: "Product Name",
  product_desc: "Product Description",
  unit_retail_price: "Unit retail price",
  product_quantity: "Product Quantity",
  sku: "SKU",
  store_id: "Store ID",
  status: "Status",
};

/**
 * {
    "barcode": "",
    "category": "",
    "channel_id": 3,
    "channels": [
        {
            "channel_id": 1,
            "channel_product_link": "https://hivepath-test-store.myshopify.com/products/womens-wool-runners-ausangate-white-sole-1",
            "store_id": "138957347538000400",
            "store_name": "hivepath-test-store"
        }
    ],
    "collection": "",
    "created_at": "2021-07-28T09:00:47-07:00",
    "display_image": "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_ANGLE_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500",
    "images": [
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_ANGLE_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/Wool_Runner-Women_47e59016-4086-49b8-bc96-322fe4e4cff8.jpg?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_LEFT_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_BACK_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_TOP_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_BOTTOM_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE_c91310ac-ad05-4998-847e-901b7b53568c.png?v=1663022500",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MXXX080_SHOE_PAIR_GLOBAL_MENS_WOOL_RUNNER_AUSANGATE_WHITE.png?v=1663022500"
    ],
    "live_date": "2023-02-26T17:36:51.689316",
    "master_product_id": "6588294332496",
    "product_desc": "<p>The Allbirds Wool Runner is the orginal wool sneaker that started it all. Called the world's most comfortable shoe, it's flexible, supportive, astonishingly soft, and machine washable. The Wool Runner is breathable, lightweight, and can be worn sockless. Best used for walking, cooler weather, and everyday casual wear.</p>",
    "product_title": "Women's Wool Runners - Ausangate (White Sole)",
    "sku": "WR3WAUS050",
    "status": "active",
    "store_id": "",
    "tag": [
        "allbirds::cfId => color-womens-wool-runners-ausangate-white",
        "allbirds::complete => true",
        "allbirds::edition => limited",
        "allbirds::gender => womens",
        "allbirds::hue => red",
        "allbirds::master => womens-wool-runners",
        "allbirds::material => wool",
        "allbirds::price-tier => tier-1",
        "allbirds::silhouette => runner",
        "allbirdskit::kit-discount-2c1bmbSUmqIAxb6DrSxejL => 9",
        "allbirdskit::kit-id => 2c1bmbSUmqIAxb6DrSxejL",
        "allbirdskit::kit-size-2c1bmbSUmqIAxb6DrSxejL => 2",
        "loop::returnable => true",
        "shoprunner",
        "YCRF_womens-move-shoes",
        "YGroup_ygroup_womens-wool-runners"
    ],
    "type": "Shoes",
    "unit_cost_price": null,
    "unit_retail_price": 99,
    "updated_at": "2023-02-26T17:36:51.689304",
    "user_id": "138944605333795140",
    "weight": "",
    "weight_unit": ""
}
 */

/**
 * [
    {
        "key": "channel_id",
        "new_value": 1,
        "old_value": 3
    },
    {
        "key": "created_at",
        "new_value": "2023-02-27T13:24:07.761466",
        "old_value": "2023-02-27T13:20:37.875845"
    },
    {
        "key": "product_desc",
        "new_value": "<ul>\n<li>Product Dimensions ‏ : ‎ 81.3 x 20.3 x 3.8 cm; 650 Grams</li>\n<li>Date First Available ‏ : ‎ 6 January 2022</li>\n<li>Manufacturer ‏ : ‎ Best Sellers Apparels Pvt Ltd</li>\n<li>ASIN ‏ : ‎ B09PVNC3GM</li>\n<li>Item model number ‏ : ‎ A3225-0001</li>\n<li>Country of Origin ‏ : ‎ India</li>\n<li>Department ‏ : ‎ Men</li>\n<li>Manufacturer ‏ : ‎ Best Sellers Apparels Pvt Ltd, Best Sellers Apparels Pvt Ltd, Bangalore, Bajal Street Manipal - 576104 Mangalore, India</li>\n<li>Packer ‏ : ‎ Best Sellers Apparels Pvt Ltd, Bangalore, Bajal Street Manipal - 576104 Mangalore, India</li>\n<li>Item Weight ‏ : ‎ 650 g</li>\n<li>Item Dimensions LxWxH ‏ : ‎ 81.3 x 20.3 x 3.8 Centimeters</li>\n<li>Generic Name ‏ : ‎ Jeans</li>\n</ul>\n",
        "old_value": "<ul>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Product Dimensions ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">81.3 x 20.3 x 3.8 cm; 650 Grams</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Date First Available ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">6 January 2022</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Manufacturer ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Best Sellers Apparels Pvt Ltd</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">ASIN ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">B09PVNC3GM</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Item model number ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">A3225-0001</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Country of Origin ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">India</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Department ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Men</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Manufacturer ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Best Sellers Apparels Pvt Ltd, Best Sellers Apparels Pvt Ltd, Bangalore, Bajal Street Manipal - 576104 Mangalore, India</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Packer ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Best Sellers Apparels Pvt Ltd, Bangalore, Bajal Street Manipal - 576104 Mangalore, India</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Item Weight ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">650 g</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Item Dimensions LxWxH ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">81.3 x 20.3 x 3.8 Centimeters</span></li>\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Generic Name ‏ : ‎</span> <span style=\"color: rgb(15,17,17);background-color: rgb(255,255,255);font-size: 14px;font-family: Amazon Ember\", Arial, sans-serif;\">Jeans</span>&nbsp;</li>\n</ul>\n"
    },
    {
        "key": "tag",
        "new_value": "jeans",
        "old_value": ""
    },
    {
        "key": "type",
        "new_value": {
            "label": "Jeans",
            "value": "Jeans"
        },
        "old_value": "Jeans"
    }
]
 */

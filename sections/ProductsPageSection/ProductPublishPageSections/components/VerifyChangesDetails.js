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
export default function VerifyChangesDetails({
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

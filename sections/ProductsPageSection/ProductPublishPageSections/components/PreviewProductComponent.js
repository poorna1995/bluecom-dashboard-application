/* eslint-disable @next/next/no-img-element */
import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import CheckCircleIcon from "components/Common/Icons/CheckCircleIcon";
import ErrorIcon from "components/Common/Icons/ErrorIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
import appFetch from "utils/appFetch";
import EditProductComponent from "./EditProductComponent";
import NewEditProductComponent from "./NewEditProductComponent";
import PublishPageDrawerHeader from "./PublishPageDrawerHeader";
import ImageSlider from "components/Common/ImageSlider";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import EyeIcon from "components/Common/Icons/PublishProduct/EyeIcon";

// mapstate user data
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function PreviewProductComponent({
  display_image,
  product_title,
  productId,
  publishLoading,
  errors,
  product,
  isSinglePublish,
  hideProductControls,
  isLoading,
  data,
  publishFailedMessage,
  handleRefetch,
  item_unit_cost_price,
  unit_retail_price,
  sku,
  product_barcode,
}) {
  const { currentUser } = useSelector(mapState);

  const formattedProduct = {
    ...product,
    price: product && product?.unit_retail_price,
  };
  // const [data, setData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const drawerOpen = router.query.drawerOpen;
  const edit = router.query.edit;
  const publishProductId = router.query.publishProductID;
  const [openDrawer, setOpenDrawer] = useState(drawerOpen);

  const [productList, setProductList] = React.useState([]);
  const [productDetails, setProductDetails] = React.useState({});

  const handleFetchProductDetails = () => {
    // fetch the product details using appFetch
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      master_product_id: publishProductId,
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          // set the product details to the state
          setProductList(json.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // call the function to fetch the product details
  // React.useEffect(() => {
  // 	handleFetchProductDetails();
  // }, []);

  // useEffect(() => {
  // 	if (product) handleCheckFields();
  // }, [product]);
  const handleCheckFields = () => {
    setIsLoading(true);
    setData({});
    appFetch(PRODUCT.CHECK_PRODUCT_FIELDS, [formattedProduct])
      .then((json) => {
        console.log("json", json);
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result[0]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOnClickUpdateButton = () => {
    console.log("handleOnClickUpdateButton");
    setOpenDrawer(true);
    if (isSinglePublish) {
      return router.push(
        `/app/products/publish/${publishProductId}/publish?productId=${publishProductId}&drawerOpen=true&edit=true`
      );
    }
    router.push(
      `${router.pathname}?step=publish-bulk&productId=${productId}&drawerOpen=true&edit=true`
    );
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductId}/publish?productId=${publishProductId}&drawerOpen=true`
    );
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    if (hideProductControls) {
      if (isSinglePublish) {
        handleRefetch();
        return router.push(`/app/products/publish/${publishProductId}/publish`);
      }
      handleRefetch();
      return router.push(`${router.pathname}?step=publish-bulk`);
    }

    router.push(`/app/products/publish/${publishProductId}/publish`);
  };
  const handleEditButtonClick = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductId}/publish?productId=${publishProductId}&drawerOpen=true&edit=true`
    );
  };

  const filteredData =
    Array.isArray(productList) &&
    productList.filter((item) => {
      return item.master_product_id === publishProductId;
    });
  const getProductDetails =
    Array.isArray(filteredData) && filteredData.length > 0 && filteredData[0];

  // const imageSlider = item.display_image
  const [isOverCard, setIsOverCard] = React.useState(false);

  const handleCursorIsOverCard = () => {
    setIsOverCard(true);
  };
  const handleCursorIsNotOverCard = () => {
    setIsOverCard(false);
  };

  function getStrforProduct(str = "") {
    if (str.length > 75) {
      return str.slice(0, 75) + "...";
    } else {
      return str;
    }
  }

  function getStrforSku(str = "") {
    if (str.length > 22) {
      return str.slice(0, 22) + "...";
    } else {
      return str;
    }
  }

  return (
    <BaseCard
      variant="outlined"
      sx={{
        cursor: "pointer",
        padding: "10px",
        // minHeight: "300px",
        minWidth: "150px",
        maxWidth: "250px",
      }}
      // onClick={() => router.push(`/app/products/${productId}?tab=overview`)}
      onMouseEnter={handleCursorIsOverCard}
      onMouseLeave={handleCursorIsNotOverCard}
    >
      <BaseCard
        sx={{
          // border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "none",
          // my: "16px",
          // maxWidth: "600px",
          // padding: "16px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <Grid item xs={12} md={2}>
            <AppImage
              src={display_image}
              width="150"
              height="150"
              sx={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "24px",
                color: (theme) => theme.palette.grey[800],
              }}
            >
              {product_title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
                // marginLeft: "-52px",
                fontSize: "14px",
                // justifyContent:"space-between",
                fontWeight: 600,
              }}
            >
              Product ID:{" "}
              <DescriptionText
                sx={{
                  marginLeft: "12px",
                  fontSize: "14px",
                  color: "#313D4E",
                  fontWeight: 500,
                }}
              >
                {productId}
              </DescriptionText>
            </Box>

            {!hideProductControls && (
              <Stack
                direction="row"
                sx={{
                  maxWidth: "400px",
                  mt: 2,
                  // justifyContent: "space-between",
                }}
              >
                <OutlinedButton onClick={handleOpenDrawer} sx={{ mr: 2 }}>
                  View Product
                </OutlinedButton>
                <OutlinedButton onClick={handleEditButtonClick}>
                  Edit Product
                </OutlinedButton>
              </Stack>
            )}
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                borderRadius: "10px",
                position: "relative",
                textAlign: "center",
              }}
            >
              {/* {!isOverCard ? ( */}

              {isLoading ? (
                <Skeleton variant="rectangular" width={228} height={228} />
              ) : (
                <AppImage
                  sx={{
                    // width: "100%",
                    // maxWidth: "20%",
                    // maxHeight: "320px",
                    // minHeight: "320px",
                    // overflow: "hidden",
                    // borderRadius: "5px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    maxWidth: "10",
                    width: 228,
                    height: 228,

                    // maxHeight: "10",
                    // minHeight: "10",
                  }}
                  width="228"
                  height="228"
                  src={display_image}
                  alt="product image"
                />
              )}

              {/* ) : (
          <>
            {imageSlider.length > 1 ? (
              <ImageSlider images={imageSlider} />
            ) : (
              <img
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "320px",
                  minHeight: "320px",
                  overflow: "hidden",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                src={display_image}
                alt="product image"
              />
            )}
          </>
        )} */}

              <Box
                className="image_delete_icon"
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "10px",
                  width: "200px",
                  display: "flex",
                  justifyContent: "flex-end",
                  py: 1.5,
                  px: 0.5,
                }}
              >
                {/* <StatusAsChip status={status} /> */}
              </Box>
            </Box>

            <Stack>
              <DescriptionText
                sx={{
                  // color: "#313D4E",
                  fontWeight: "700",
                  paddingTop: "8px",
                  // marginLeft: "10px",
                  fontSize: "16px",
                  color: "#222222",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    sx={{
                      width: "200px",
                      height: "50px",
                      variant: "rounded",
                    }}
                  />
                ) : (
                  <>
                    <Tooltip title={product_title}>
                      <span>{getStrforProduct(product_title)}</span>
                    </Tooltip>
                  </>
                )}
              </DescriptionText>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "8px",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    sx={{
                      width: "200px",
                      height: "30px",
                      variant: "rounded",
                    }}
                  />
                ) : (
                  <>
                    <DescriptionText
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        color: "#222222",
                        fontWeight: "500",
                        fontSize: "14px",
                        // marginLeft: "10px",
                      }}
                    >
                      Retail Price:
                    </DescriptionText>
                    <Typography
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      $ {unit_retail_price}
                    </Typography>
                  </>
                )}
              </Box>
              {/* <Box sx={{ display: "flex", alignItems: "center", pt: "8px" }}>
                <DescriptionText
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "#222222",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Product Id:
                </DescriptionText>
                <Typography
                  sx={{
                    color: "#19235A",
                    fontWeight: "700",
                    marginLeft: "10px",
                    fontSize: "14px",
                  }}
                >
                  {productId}
                </Typography>
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "8px",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    sx={{
                      width: "200px",
                      height: "30px",
                      variant: "rounded",
                    }}
                  />
                ) : (
                  <>
                    <DescriptionText
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        color: "#222222",
                        fontWeight: "500",
                        // paddingTop: "7px",
                        // marginLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      SKU:
                    </DescriptionText>
                    <Typography
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        // paddingTop: "1px",
                        marginLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      <>
                        <Tooltip title={sku}>
                          <span>{getStrforSku(sku)}</span>
                        </Tooltip>
                      </>
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "8px",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    sx={{
                      width: "200px",
                      height: "30px",
                      variant: "rounded",
                    }}
                  />
                ) : (
                  <>
                    <DescriptionText
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        color: "#222222",
                        fontWeight: "500",
                        // paddingTop: "7px",
                        // marginLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      Barcode:
                    </DescriptionText>
                    <Typography
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        // paddingTop: "1px",
                        marginLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      {product_barcode}
                    </Typography>
                  </>
                )}
              </Box>
              {/* <Box sx={{ display: "flex", alignItems: "center", pt: "2px" }}>
          <DescriptionText
            sx={{
              display: "flex",
              flexDirection: "row",
              mr: "8px",
              color: "#313D4E",
              fontWeight: "700",
              // paddingTop: "7px",
              marginLeft: "10px",
              fontSize: "14px",
            }}
          >
            Channel Name:
          </DescriptionText>
          <RenderChannelAsIcon value={channel_id} />
        </Box> */}
              <OutlinedButton
                sx={{
                  marginTop: "8px",
                }}
                // onClick={() => router.push(`/app/products/${productId}?tab=overview`)}
                onClick={() => handleOpenDrawer()}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                >
                  <EyeIcon />
                </span>
                Review Product
              </OutlinedButton>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* {isLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                <CircularProgress />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "150%",
                    color: (theme) => theme.palette.grey[800],
                  }}
                >
                  Checking for missing details...
                </Typography>
              </div>
            )}

            <div>
              {publishLoading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <CircularProgress />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: (theme) => theme.palette.grey[800],
                    }}
                  >
                    Publishing...
                  </Typography>
                </div>
              )}
              {publishFailedMessage && (
                <Typography
                  sx={{
                    color: "#CC3300",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "150%",
                  }}
                >
                  <ErrorIcon />{" "}
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {publishFailedMessage}
                  </span>
                </Typography>
              )}
              {data && data.error && (
                <div>
                  {Array.isArray(data.missing_fields) &&
                    data.missing_fields.length > 0 && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "150%",
                              display: "flex",
                              "& svg path": {
                                color: "#9D9D9D",
                                fill: "#9D9D9D",
                              },
                            }}
                          >
                            <span
                              style={{
                                marginRight: "8px",
                              }}
                            >
                              {" "}
                              {data.missing_fields.length} Items are Missing
                            </span>
                            <ErrorIcon />
                          </Typography>
                          <OutlinedButton
                            onClick={() => handleOnClickUpdateButton()}
                          >
                            Update Details
                          </OutlinedButton>
                        </div>
                        {data.missing_fields?.map((item, index) => (
                          <Typography
                            sx={{
                              color: "#CC3300",
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 500,
                              fontSize: "14px",
                              lineHeight: "150%",
                            }}
                            key={index}
                          >
                            <ErrorIcon />{" "}
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {item}
                            </span>
                          </Typography>
                        ))}
                      </>
                    )}
                </div>
              )}
              {data &&
                data.error === false &&
                !isLoading &&
                hideProductControls &&
                !publishFailedMessage &&
                !publishLoading && (
                  <DescriptionText
                    sx={{
                      color: "#0FA958",
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                    }}
                  >
                    {" "}
                    <CheckCircleIcon />
                    <span
                      style={{
                        marginLeft: "16px",
                      }}
                    >
                      {" "}
                      No Errors Found !
                    </span>{" "}
                  </DescriptionText>
                )}
            </div> */}
          </Grid>
        </Grid>
        <BottomDrawer openDrawer={openDrawer} handleClose={handleCloseDrawer}>
          <Box>
            {edit ? (
              <NewEditProductComponent
                handleCloseDrawer={handleCloseDrawer}
                handleEditButtonClick={handleEditButtonClick}
                edit={edit}
                productTitle={getProductDetails.product_title}
              />
            ) : (
              <Box>
                <PublishPageDrawerHeader
                  edit={edit}
                  handleCloseDrawer={handleCloseDrawer}
                  handleEditButtonClick={handleEditButtonClick}
                  productTitle={getProductDetails.product_title}
                />

                <ProductsDetailsPageSection isUsedOnReviewPage />
              </Box>
            )}
          </Box>
        </BottomDrawer>
      </BaseCard>
    </BaseCard>
  );
}

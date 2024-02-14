import { Box, Grid, TextField } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import LinkIcon from "components/Common/Icons/LinkIcon";
import React, { useEffect, useState } from "react";
import placeholderImage from "public/assets/t-shirt.png";
import PublishPageCard from "./components/PublishPageCard";
import PublishPageNavBar from "./components/PublishPageNavBar";
import { useDispatch, useSelector } from "react-redux";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import CheckCircleIcon from "components/Common/Icons/CheckCircleIcon";
const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
});
export default function ProductPublishPagePublishSuccessSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
  productsList = [],
}) {
  const router = useRouter();
  const publishProductID = router.query.publishProductID;
  const status = router.query.status;
  const { pageView, currentUser, selectedProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  console.log({ selectedProducts });
  const handleFetchProducts = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: publishProductID,
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  // 	const filteredData =
  // 	Array.isArray(data) &&
  // 	data.filter((item) => {
  // 		const { master_item_id } = item;
  // 		if (selectedProducts.includes(master_item_id)) return item;
  // 		return;
  // 	});
  console.log({ data });
  const productDetails = Array.isArray(data) && data.length > 0 && data[0];
  const handleClickViewButton = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div>
      <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={"Success "}
      />
      <PublishPageCard>
        <Box
          sx={{
            display: "flex",
            marginBottom: "30px",
            flex: 1,
            textAlign: "center",
            "& svg path": {
              fill: "#32DB25",
            },
            width: "100%",
            minWidth: "100%",
          }}
        >
          <SectionTitleText
            sx={{
              marginLeft: "8px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              // flex: 1,

              "& svg ": {
                mr: 2,
              },
            }}
          >
            <CheckCircleIcon />
            <span>Your product has now been successfully published.</span>
          </SectionTitleText>
        </Box>

        {!publishProductID &&
          Array.isArray(productsList) &&
          productsList.length > 0 &&
          productsList.map((item, index) => (
            <BaseCard
              sx={{
                border: "1px solid rgba(49, 61, 78, 0.1)",
                borderRadius: "5px",
                boxShadow: "none",
                marginLeft: "8px",
                my: "16px",
                height: "174",
                padding: "16px",
                marginTop: "16px",
              }}
              key={index}
            >
              <Grid container>
                <Grid item xs={12} md={1.5}>
                  <AppImage
                    src={item.display_image}
                    width="120"
                    height="125"
                    sx={{ borderRadius: "5px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <DescriptionText
                    sx={{
                      marginTop: "4px",
                      // marginLeft: "-52px",
                      fontSize: "18px",
                      color: "#313D4E",
                      fontWeight: 600,
                    }}
                  >
                    {item.product_title}
                  </DescriptionText>
                  {/* add description text with master item id as sx={{}} fontweight:600 */}

                  {/* Product id with fontweight 600 */}
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
                      {item.master_product_id}
                    </DescriptionText>
                  </Box>
                </Grid>
                <Grid item xs={12} md={2.5}>
                  {Array.isArray(item.channels) &&
                    item.channels[0].channel_product_link && (
                      <OutlinedButton
                        startIcon={<LinkIcon />}
                        onClick={() =>
                          handleClickViewButton(
                            item.channels[0].channel_product_link
                          )
                        }
                      >
                        View on Shopify
                      </OutlinedButton>
                    )}
                </Grid>
              </Grid>
            </BaseCard>
          ))}
        {publishProductID && productDetails && (
          <BaseCard
            sx={{
              border: "1px solid rgba(49, 61, 78, 0.1)",
              borderRadius: "5px",
              boxShadow: "none",
              marginLeft: "8px",
              my: "16px",
              // maxWidth: "611px",
              height: "174",
              padding: "16px",
              marginTop: "16px",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={1.5}>
                <AppImage
                  src={productDetails.display_image}
                  width="120"
                  height="125"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <DescriptionText
                  sx={{
                    marginTop: "4px",
                    // marginLeft: "-52px",
                    fontSize: "18px",
                    color: "#313D4E",
                    fontWeight: 600,
                  }}
                >
                  {productDetails.product_title}
                </DescriptionText>
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
                    {productDetails.master_product_id}
                  </DescriptionText>
                </Box>
              </Grid>
              <Grid item xs={12} md={2.5}>
                {Array.isArray(productDetails.channels) &&
                  productDetails.channels[0].channel_product_link && (
                    <OutlinedButton
                      startIcon={<LinkIcon />}
                      onClick={() =>
                        handleClickViewButton(
                          productDetails.channels[0].channel_product_link
                        )
                      }
                    >
                      View on Shopify
                    </OutlinedButton>
                  )}
              </Grid>
            </Grid>
          </BaseCard>
        )}

        {/* <DescriptionText
					sx={{
						//  maxWidth: "850px",
						fontSize: "16px",
						color: "#313D4E",
						marginTop: "36px",
						marginLeft: "8px",
						fontWeight: 600,
					}}
				>
					Check your product by visiting the link below.
				</DescriptionText>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<TextField
						sx={{
							width: "750px",
							marginTop: "16px",
							marginLeft: "8px",
						}}
						id="outlined-basic"
						variant="filled"
					/>
					<PrimaryButton
						sx={{
							height: "55px",
							marginTop: "16px",
							borderRadius: "0px",
							width: "120px",
						}}
					>
						Copy Link
					</PrimaryButton>
				</Box> */}
      </PublishPageCard>
    </div>
  );
}

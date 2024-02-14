import { Box, Stack } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ChippedTabs from "components/Common/Tabs/ChippedTabs";
import { Chip, Grid } from "@mui/material";
import CustomChip from "components/Common/Chip/CustomChip";
import BaseCard from "components/Common/Cards/BaseCard";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

import PublishPageCard from "../components/PublishPageCard";
import PublishPageNavBar from "../components/PublishPageNavBar";
import ProductPublishPagePublishSuccessSection from "../ProductPublishPagePublishSuccessSection";
import ReviewChangesDetails from "../components/ReviewChangesDetails";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import ShowProductDetails from "../components/ShowProductDetails";
import VerifyChangesDetails from "../components/VerifyChangesDetails";

const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
});

export default function BulkProductPublishReviewChangesPageSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  const router = useRouter();
  const publishProductID = router.query.publishProductID;
  const status = router.query.status;
  const { pageView, currentUser, selectedProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedProductDetails, setselectedProductDetails] = useState({});
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

  const filteredData =
    Array.isArray(data) &&
    data.filter((item) => {
      const { master_product_id } = item;
      if (selectedProducts.includes(master_product_id)) return item;
      return;
    });
  console.log({ filteredData });
  const getMasterProductID = filteredData.map((item) => {
    const {
      master_product_id,
      display_image,
      product_title,
      sku,
      unit_retail_price,
      product_barcode,
    } = item;
    return {
      ...item,
      "Master Item Id": master_product_id,
      "Display Image": display_image,
      "Product Title": product_title,
      "Product SKU": sku,
      "Unit Retail Price": unit_retail_price,
      "product barcode": product_barcode,
    };
  });

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
  // useEffect(() => {
  //   handleFetchPublishHistory();
  // }, []);
  console.log({ selectedProductDetails });
  if (status === "success") return <ProductPublishPagePublishSuccessSection />;

  const SelectedProductColumnData = [
    {
      field: "Product",
      headerName: "Product",
      renderCell: (params) => (
        <ShowProductDetails
          // unit_retail_price={unit_retail_price}
          display_image={params.row.display_image}
          product_title={params.row.product_title}
          sku={params.row.sku}
          barcode={params.row.product_barcode}
        />
      ),
      minWidth: 450,
      flex: 1,
      valueGetter: ({ value }) => value,
    },
  ];

  return (
    <div>
      {isLoading && <PageLoader />}
      {/* <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={pageLabel}
      /> */}
      <PublishPageCard>
        <SectionTitleText
          sx={{
            fontSize: "26px",
            fontWeight: "700px",
            color: "#484A9E",
          }}
        >
          Verifying Changes
        </SectionTitleText>
        {filteredData.map((item, index) => {
          const {
            product_description,
            master_product_id,
            product_title,
            item_title,
            status,
            unit_retail_price,
            display_image,
          } = item;
          return (
            <>
              <ReviewChangesDetails
                key={index}
                product_id={master_product_id}
                accordionTitle={product_title || item_title}
                accordionImage={display_image}
              />
            </>
          );
        })}

        <div>
          {data.length > 0 && (
            <MuiBaseDataGrid
              // rowIdkey={"Master Item Id"}
              rowIdkey={"master_product_id"}
              columnDefData={SelectedProductColumnData}
              data={filteredData}
              checkboxSelection={false}
            />
          )}
        </div>

        <Box
          sx={{
            display: "flex",
            position: "fixed",
            bottom: "0",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "white",
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
            padding: "8px",
            gap: "16px",
            ml: -20,
          }}
        >
          <SecondaryButton onClick={() => handleClickBackButton()}>
            Back
          </SecondaryButton>
          <PrimaryButton onClick={() => handleClickContinueButton()}>
            Continue
          </PrimaryButton>
        </Box>
      </PublishPageCard>
    </div>
  );
}

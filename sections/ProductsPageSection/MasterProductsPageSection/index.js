import { Box } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import ProductsPageTable from "../ProductsPageTable";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function MasterProductsPageSection() {
  const { currentUser } = useSelector(mapState);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetchProductsMaster = () => {
    setIsLoading(true);
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log(json);
        setIsLoading(false);
        setData(json.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleFetchProductsMaster();
  }, []);
  const formattedData =
    Array.isArray(data) &&
    data.map((item) => {
      const {
        master_item_id,
        master_product_id,
        channel_id,
        channel_item_id,
        channel_product_id,
      } = item;
      return {
        "Channel Item Id": channel_item_id,
        "Master Item Id": master_item_id,
        "Channel product Id": channel_product_id,
        "Master Product Id": master_product_id,
        "Channel Id": channel_id,
      };
    });

  return (
    <div>
      {" "}
      <Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            padding: "16px",
            // marginTop: "16px",
            aliginItems: "center",
            boxShadow: "none",
          }}
        >
          <SectionTitleText>Master List</SectionTitleText>
          <div style={{ flex: 1, width: "100%" }} />
          <PrimaryButton onClick={() => handleAddProducts()}>
            Add new product
          </PrimaryButton>
        </Box>
      </Box>
      <Box sx={{}}>
        {isLoading && <SectionLoader />}
        {Array.isArray(data) && data.length > 0 && (
          <ProductsPageTable
            data={formattedData}
            url="/app/products"
            itemKey={"Master Product Id"}
          />
        )}
      </Box>
    </div>
  );
}

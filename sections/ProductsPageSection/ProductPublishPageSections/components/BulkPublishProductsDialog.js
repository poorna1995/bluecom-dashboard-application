import { Box, CircularProgress, Divider } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import useInterval from "customHooks/useInterval";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPublishableProductsStatusStart,
  setPublishableProductsStatus,
  setPublishStatus,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";

const mapState = ({ productsData }) => ({
  productsData,
});
export default function BulkPublishProductsDialog({ open, handleClose }) {
  const { productsData } = useSelector(mapState);
  const taskID = productsData.publishTaskID;
  const publishTaskProducts = productsData.publishTaskProducts;
  const publishStatus = productsData.publishableProductsStatus;
  const isCompleted = publishStatus.task_percentage === 100;

  const mergeTwoArrays = (a1 = [], a2 = [], key) =>
    a1.map((itm) => ({
      ...a2.find((item) => item[key] === itm[key] && item),
      ...itm,
    }));
  const mergedArray = mergeTwoArrays(
    publishTaskProducts,
    publishStatus.result,
    "master_product_id"
  );
  const dispatch = useDispatch();
  const handleFetchPublishStatus = () => {
    const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
    const data = {
      task_id: taskID,
    };

    // dispatch(fetchPublishableProductsStatusStart({ url: URL, data }));

    appFetch(URL, data).then((res) => {
      console.log({ res });
      dispatch(setPublishStatus(res));
    });
  };
  React.useEffect(() => {
    // if (!isCompleted) {
    // handleFetchPublishStatus();
    // }
  }, [taskID, isCompleted]);
  useInterval(handleFetchPublishStatus, 2000);

  console.log({ publishTaskProducts, mergedArray });
  return (
    <BaseDialog open={open} handleClose={handleClose}>
      <SectionTitleText>Publishing Products</SectionTitleText>
      <Divider />
      <Box sx={{ maxHeight: "600px", overflowY: "scroll" }}>
        {" "}
        {mergedArray.map((item, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                padding: "8px",
                flex: 1,
              }}
              key={index}
            >
              <AppImage src={item.display_image} width="100" height="100" />
              <p style={{ flex: 1, marginLeft: "8px" }}>{item.product_title}</p>
              <CircularProgress value={item.percentage} variant="determinate" />
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <PrimaryButton>Go To Home</PrimaryButton>
      </Box>
    </BaseDialog>
  );
}

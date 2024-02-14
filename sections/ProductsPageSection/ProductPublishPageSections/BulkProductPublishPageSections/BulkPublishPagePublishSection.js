import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPublishStatus,
  setPublishTaskID,
  setPublishTaskProducts,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import BulkPublishProductsDialog from "../components/BulkPublishProductsDialog";
import PreviewProductComponent from "../components/PreviewProductComponent";
import PublishPageCard from "../components/PublishPageCard";
import PublishPageNavBar from "../components/PublishPageNavBar";
import ProductPublishPagePublishSuccessSection from "../ProductPublishPagePublishSuccessSection";
import { Box } from "@mui/material";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import ProductPublishSection from "../components/ProductPublishSection";
import { updateBulkProductPublishOnboardingSteps } from "redux/onboarding/onboardingSlice";

const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
  selectedStore: productsData?.selectedStore,
});

export default function BulkPublishPagePublishSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  const { pageView, currentUser, selectedProducts, selectedStore } =
    useSelector(mapState);

  const router = useRouter();
  const publishProductID = router.query.publishProductID;
  const status = router.query.status;
  const [products, setProducts] = useState([]);
  const [reviewdProducts, setReviewdProducts] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [checkFieldsLoading, setCheckFieldsLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [publishFailedMessage, setPublishFailedMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleFetchProductDetails = () => {
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          setProducts(json.result);
        }
        handleFetchReviewDetails();
      })
      .catch((error) => console.log(error));
  };
  const getFilteredData = (products = []) => {
    const data = products.filter((product) => {
      return selectedProducts.includes(product.master_product_id);
    });
    return data;
  };
  const filteredData = useMemo(() => getFilteredData(products), [products]);
  // Array.isArray(products) &&
  // products.length > 0 &&
  // products.filter((product) => {
  // 	return selectedProducts.includes(product.master_item_id);
  // });
  const getFilterData = (products = []) => {
    const data =
      products.length > 0 &&
      products.map((product) => {
        return product.master_product_id;
      });
    return data;
  };
  const masterProductsIds = getFilterData(filteredData);
  //  useMemo(
  // 	() => getFilterData(filteredData),
  // 	[filteredData],
  // );
  const requestData = {
    user_id: currentUser.merchant_id,
    master_product_id: masterProductsIds,
  };
  const requestUrl = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;

  //  use react query to fetch reviewed products details
  const {
    data: reviewedProducts,
    isLoading: isReviewedProductsLoading,
    refetch: refetchReviewedProducts,
    error,
  } = useQuery({
    queryKey: ["reviewedProducts", masterProductsIds],
    queryFn: () =>
      appFetch(requestUrl, requestData).then((json) => json.result),
  });
  // const masterProductID =
  // 	Array.isArray(data) && data.length > 0 && data[0].master_product_id;
  // const {
  // 	data: reviewedProduct,
  // 	isLoading: isReviewedProductLoading,
  // 	error: error1,
  // } = useQuery({
  // 	queryKey: ["reviewProduct", publishProductID],
  // 	queryFn: () =>
  // 		appFetch(requestUrl, {
  // 			user_id: currentUser.merchant_id,
  // 			master_product_id: [publishProductID],
  // 		}).then((json) => json.result[0]),
  // });

  // const handleFetchConnectedApps = () => {
  // 	const url = CHANNEL.FETCH_CONNECTED_APPS;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 	};
  // 	appFetch(url, data).then((json) => {
  // 		if (json.status === "success") {
  // 			console.log(json);
  // 			// setConnectedApps(json.result);
  // 		}
  // 	});
  // };

  const { data: connectedApps } = useQuery({
    queryKey: ["connectedApps"],
    queryFn: () =>
      appFetch(CHANNEL.FETCH_CONNECTED_APPS, {
        user_id: currentUser.merchant_id,
      }).then((json) => json.result),
  });
  const getConnectedStoreInfo =
    Array.isArray(connectedApps) &&
    connectedApps.filter((app) => {
      return app.shop === selectedStore;
    });
  // console.log({ getConnectedStoreInfo });
  const connectedStoreInfo =
    getConnectedStoreInfo.length > 0 && getConnectedStoreInfo[0];

  // console.log({ reviewedProducts, reviewedProduct });

  const handleFetchReviewDetails = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: masterProductsIds,
    };
    appFetch(url, data).then((json) => {
      setIsLoading(false);
      // setProducts(json.result);
      setReviewdProducts(json.result);
    });
  };

  const formattedReviewProducts =
    Array.isArray(reviewedProducts) &&
    reviewedProducts.map((product) => {
      return {
        ...product,
        price: product.unit_retail_price,
        store_id: connectedStoreInfo?.store_id,
      };
    });

  const handleBulkFieldsCheck = () => {
    const CHECK_FIELDS_URL = PRODUCT.CHECK_PRODUCT_FIELDS;

    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: masterProductsIds,
      shop: [selectedStore],
    };
    setCheckFieldsLoading(true);
    appFetch(CHECK_FIELDS_URL, data)
      .then((json) => {
        if (json.status === "success") {
          setCheckFieldsLoading(false);
          setPublishLoading(false);

          console.log({ json });
          setErrors(
            json.message
            //     (prevErrors) => {
            // 	const newErrors = [...prevErrors, json.result[0]];
            // 	return newErrors;
            // }
          );
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (formattedReviewProducts.length > 0) {
      handleBulkFieldsCheck();
    }
  }, [formattedReviewProducts.length]);

  const handleRefetchProduct = async () => {
    await refetchReviewedProducts();
    handleBulkFieldsCheck();
  };

  const bulkPublishProduct = () => {
    // setIsLoading(true);

    const url = PRODUCT.BULK_PRODUCT_PUBLISH;
    const data = {
      user_id: currentUser.merchant_id,
      shop: [selectedStore],
      product: formattedReviewProducts,
    };
    if (formattedReviewProducts.length === 0) {
      enqueueSnackbar("Please add product details");
      return;
    }
    // setCheckFieldsLoading(true);
    setPublishLoading(true);
    setPublishFailedMessage("");
    dispatch(setPublishTaskProducts(formattedReviewProducts));
    // use the follwoing code t publish bulk product
    // we have formattedReviewProducts array which contains all the product details and we want to publish them one by one
    // suggest me how we can publish the products one by one only when the previous is completed
    // we can use async await or promise.all or any other way

    // const publishProductsOneByOne = async () => {
    // 	for (let i = 0; i < formattedReviewProducts.length; i++) {
    // 		const product = formattedReviewProducts[i];
    // 		await appFetch(url, {
    // 			user_id: currentUser.merchant_id,
    // 			shop: [selectedStore],
    // 			product: [product],
    // 		})
    // 			.then((res) => {
    // 				enqueueSnackbar(res.result.message, {
    // 					variant: "error",
    // 				});
    // 				setIsLoading(false);
    // 				setPublishLoading(false);
    // 				setPublishFailedMessage(res.result.message);
    // 				// if (res.result.status === "success") {
    // 				// 	handlePublishBulkProductSuccess();
    // 				// }
    // 			})
    // 			.catch((error) => {
    // 				setIsLoading(false);
    // 				setPublishLoading(false);
    // 				setPublishFailedMessage(error);
    // 			});
    // 	}
    // };

    // publishProductsOneByOne();

    // formattedReviewProducts.map((item) => {
    // 	return appFetch(url, {
    // 		user_id: currentUser.merchant_id,
    // 		shop: [selectedStore],
    // 		product: [item],
    // 	})
    // 		.then((res) => {
    // 			enqueueSnackbar(res.result.message, { variant: "error" });
    // 			setIsLoading(false);
    // 			setPublishLoading(false);
    // 			setPublishFailedMessage(res.result.message);
    // 			// if (res.result.status === "success") {
    // 			// 	handlePublishBulkProductSuccess();
    // 			// }
    // 		})
    // 		.catch((error) => {
    // 			setIsLoading(false);
    // 			setPublishLoading(false);
    // 			enqueueSnackbar("Something went wrong!", {
    // 				variant: "error",
    // 			});
    // 			console.log(error);
    // 			setPublishFailedMessage("Something went wrong!");
    // 		});
    // });

    appFetch(url, {
      user_id: currentUser.merchant_id,
      shop: [selectedStore],
      master_product_id: masterProductsIds,
    })
      .then((res) => {
        // enqueueSnackbar(res.result.message, { variant: "error" });
        // setIsLoading(false);
        // setPublishLoading(false);
        console.log(res);
        // handleDialogOpen();
        router.push(`/app/jobs/${res.task_id}`);
        dispatch(setPublishTaskID(res.task_id));
        dispatch(setPublishStatus({}));
        dispatch(
          updateBulkProductPublishOnboardingSteps({
            step: "publish-bulk",
          })
        );
        // dispatch
        // setPublishFailedMessage(res.result.message);
        // if (res.result.status === "success") {
        // 	handlePublishBulkProductSuccess();
        // }
      })
      .catch((error) => {
        setIsLoading(false);
        setPublishLoading(false);
        enqueueSnackbar("Something went wrong!", { variant: "error" });
        console.log(error);
        // setPublishFailedMessage("Something went wrong!");
      });
  };
  // const formattedReviewProduct = {
  // 	...reviewedProduct,
  // 	price: reviewedProduct?.unit_retail_price,
  // 	store_id: connectedStoreInfo?.store_id,
  // };

  useEffect(() => {
    handleFetchProductDetails();
    // if (Array.isArray(masterProductsIds) && masterProductsIds.length > 0) {
    // 	handleFetchReviewDetails();
    // }
  }, []);

  // console.log({ selectedProducts });
  const handleFetchProducts = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
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
      })
      .catch((err) => console.error(err));
  };
  // console.log({
  // 	reviewdProducts,
  // 	formattedReviewProducts,
  // 	masterProductsIds,
  // });
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
  const productDetails = Array.isArray(data) && data.length > 0 && data[0];
  const mergeTwoArrays = (a1 = [], a2 = [], key) =>
    a1.map((itm) => ({
      ...a2.find((item) => item[key] === itm[key] && item),
      ...itm,
    }));
  const getProductsDataWithErrors = mergeTwoArrays(
    filteredData,
    errors,
    "master_product_id"
  );
  // get the error count from the merged array
  const getErrorCount = getProductsDataWithErrors.filter(
    (item) => item.error === true
  ).length;
  console.log({ getErrorCount });
  console.log({ getProductsDataWithErrors });
  const handlePublishSingleProductSuccess = () => {
    router.push(
      `/app/products/publish/${publishProductID}/publish?status=success`
    );
  };
  const handlePublishBulkProductSuccess = () => {
    router.push(`/app/products/publish/bulk?step=publish&status=success`);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (status === "success")
    return (
      <ProductPublishPagePublishSuccessSection productsList={filteredData} />
    );

  return (
    <div style={{ cursor: isLoading && "wait" }}>
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
            mb: "8px",
          }}
        >
          Publish
        </SectionTitleText>
        <DescriptionText
          sx={{
            lineHeight: "150%",

            maxWidth: "750px",
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 1800,
            color: "#19235A",
          }}
        >
          Product details have been updated successfully. You can now publish
          your product using the Publish Products button.
        </DescriptionText>
        {/* <BaseCard
            sx={{
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "none",
                my: "16px",
                maxWidth: "600px",
                padding: "16px",
            }}
        > */}
        {/* Create a Grid Container and inside create two Grid items with md={3} and md={9} */}
        {Array.isArray(getProductsDataWithErrors) &&
          getProductsDataWithErrors.length > 0 &&
          getProductsDataWithErrors.map((product, index) => {
            return (
              <ProductPublishSection
                key={index}
                display_image={product.display_image}
                product_title={product.product_title}
                productId={product.master_product_id}
                item_unit_cost_price={product.item_unit_cost_price}
                unit_retail_price={product.unit_retail_price}
                sku={product.sku}
                product_barcode={product.product_barcode}
                errors={product?.missing_fields || []}
                isLoading={checkFieldsLoading}
                publishLoading={publishLoading}
                // product={product}
                hideProductControls
                data={product}
                publishFailedMessage={publishFailedMessage}
                handleRefetch={handleRefetchProduct}
              />
            );
          })}
        {/* {getErrorCount === 0 && ( */}
        <>
          {/* <PrimaryButton
            sx={{
              marginTop: "15px",
              marginLeft: "8px",
              height: "42px",
              width: "159px",
              fontSize: "14px",
            }}
            onClick={() => bulkPublishProduct()}
            disabled={isLoading}
          >
            Publish Product
          </PrimaryButton> */}

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
            <PrimaryButton
              sx={
                {
                  // marginTop: "15px",
                  // marginLeft: "8px",
                  // height: "42px",
                  // width: "159px",
                  // fontSize: "14px",
                }
              }
              onClick={() => bulkPublishProduct()}
              disabled={isLoading || getErrorCount > 0 || publishLoading}
            >
              Publish Product
            </PrimaryButton>
          </Box>
        </>
        {/* )} */}
      </PublishPageCard>
      {/* <BulkPublishProductsDialog
				open={dialogOpen}
				handleClose={handleCloseDialog}
			/> */}
    </div>
  );
}

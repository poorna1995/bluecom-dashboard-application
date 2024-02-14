import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCreateProductData } from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingPriceInfoSection from "../ProductOnboardingSection/components/ProductOnboardingPriceInfoSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  createProductData: productsData.createProductData,
});
export default function NewProductOnboardingPriceInfoSection() {
  const { currentUser, createProductData } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;

  const unitRetailPriceFromState = createProductData.unit_retail_price;
  const unitCostPriceFromState = createProductData.unit_cost_price;

  const [unitRetailPrice, setUnitRetailPrice] = useState(
    unitRetailPriceFromState ?? 0
  );
  const [unitCostPrice, setUnitCostPrice] = useState(
    unitCostPriceFromState ?? 0
  );

  // console.log({ productOptions });

  const [loading, setLoading] = useState(false);

  const handleUpdateProduct = async () => {
    // const url = PRODUCT.MERCHANT.ADD_PRODUCT;

    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,

      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        handleNextButton();
        dispatch(updateCreateProductData(data));
      }
    });
  };

  const disableButton = loading;
  // productDescription.length === 0 ||
  // unitRetailPrice === 0;

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };
  const handleNextButton = () => {
    router.push(`/onboarding/products/${pageId}?step=inventory-info&id=2`);
  };
  return (
    <div>
      {" "}
      <ProductOnboardingPriceInfoSection
        setUnitCostPrice={setUnitCostPrice}
        unitCostPrice={unitCostPrice}
        setUnitRetailPrice={setUnitRetailPrice}
        unitRetailPrice={unitRetailPrice}
        containerStyles={containerStyles}
      />{" "}
      <NewProductOnboardingBottomNavButtons
        disableSaveButton={disableButton}
        saveButtonClick={() => handleUpdateProduct()}
        maxWidthPage={"800px"}
      />
    </div>
  );
}

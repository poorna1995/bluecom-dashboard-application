import { CHANNEL, PRODUCT, WAREHOUSE } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCreateProductData } from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingInventoryInfoSection from "../ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import ProductOnboardingShippingInfoSection from "../ProductOnboardingSection/components/ProductOnboardingShippingInfoSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  createProductData: productsData.createProductData,
});
export default function NewProductOnboardingInventoryInfoSection() {
  const { currentUser, createProductData } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;
  const skuFromState = createProductData.sku;
  const productBarCodeFromState = createProductData.barcode;
  const weightFromState = createProductData.weight;
  const weightUnitFromState = createProductData.weight_unit;

  const weightUnitWithLabel = {
    label: weightUnitFromState,
    value: weightUnitFromState,
  };

  const inventoryFromState = createProductData.inventory;

  const [sku, setSKU] = useState(skuFromState ?? "");
  const [productBarCode, setProductBarCode] = useState(
    productBarCodeFromState ?? ""
  );
  const [warehouseList, setWarehouseList] = useState([]);
  const [productWarehouseInventory, setProductWarehouseInventory] = useState(
    inventoryFromState ?? []
  );
  const [trackQuantity, setTrackQuantity] = useState(false);
  const [continueSelling, setContinueSelling] = useState(false);
  const [weight, setWeight] = useState(weightFromState ?? 0);
  const [weightUnit, setWeightUnit] = useState(weightUnitWithLabel ?? "");

  // console.log({ productOptions });

  const [loading, setLoading] = useState(false);

  const handleWarehouseInventoryChange = (field) => {
    return (e) => {
      const { value } = e.target;
      setProductWarehouseInventory((prevState) => {
        const data = prevState.filter((item) => item.wh_id !== field);
        return [
          ...data,
          {
            wh_id: field,
            available: value,
            // [field]: value,
          },
        ];
      });
    };
  };

  // console.log({ selectedFile });
  const resetForm = () => {
    setTitle("");
    // setDescription("");
  };

  const handleAddProduct = async (status) => {
    const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,

      sku: sku,
      barcode: productBarCode,
      weight: weight,
      weight_unit: weightUnit.value,
      inventory: productWarehouseInventory,
    };
    appFetch(url, data).then((json) => {
      if (json.status === "success") {
        // enqueueSnackbar("Product Updated Successfully", {
        // 	variant: "success",
        // });
        dispatch(updateCreateProductData(data));
        handleNextButton();
      }
    });
  };

  useEffect(() => {
    handleFetchWarehouse();
  }, []);

  const handleFetchWarehouse = () => {
    const URL = WAREHOUSE.FETCH_LKP;

    const data = {
      user_id: currentUser.merchant_id,
    };

    appFetch(URL, data).then((json) => {
      setWarehouseList(json.result);
    });
  };

  const mergeTwoArrays = (arr1 = [], arr2 = []) => {
    const result =
      Array.isArray(arr1) &&
      arr1.map((item) => {
        const data =
          Array.isArray(arr2) &&
          arr2.find((item2) => item2.wh_id === item.wh_id);
        return {
          ...item,
          ...data,
        };
      });
    return result ?? [];
  };
  const mergedWarehouseList = mergeTwoArrays(
    warehouseList,
    productWarehouseInventory
  );
  console.log({
    warehouseList,
    productWarehouseInventory,
    mergedWarehouseList,
  });
  const disableButton = loading;

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };
  const handleNextButton = () => {
    router.push(`/onboarding/products/${pageId}?step=variants&id=3`);
  };
  return (
    <div>
      {" "}
      <ProductOnboardingInventoryInfoSection
        barcode={productBarCode}
        setBarcode={setProductBarCode}
        setSKU={setSKU}
        sku={sku}
        // quantity={quantity}
        // setQuantity={setQuantity}
        handleWarehouseInventoryChange={handleWarehouseInventoryChange}
        // warehouseInventory={warehouseInventory}
        setTrackQuantity={setTrackQuantity}
        trackQuantity={trackQuantity}
        warehouseList={mergedWarehouseList}
        continueSelling={continueSelling}
        setContinueSelling={setContinueSelling}
        containerStyles={containerStyles}
      />
      <ProductOnboardingShippingInfoSection
        setWeight={setWeight}
        setWeightUnit={setWeightUnit}
        weight={weight}
        weightUnit={weightUnit}
        containerStyles={containerStyles}
      />
      <NewProductOnboardingBottomNavButtons
        disableSaveButton={disableButton}
        saveButtonClick={() => handleAddProduct()}
        maxWidthPage={"800px"}
      />
    </div>
  );
}

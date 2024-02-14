import { Box, Divider } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import { Typography } from "@mui/material";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProductsForPO,
  updateSelectedProductsForPO,
} from "redux/purchaseOrders/purchaseOrdersSlice";

const mapState = ({ purchaseOrdersData }) => ({
  poData: purchaseOrdersData.purchaseOrderData,
});
export default function EditPOProductDialog({ open, handleClose, product }) {
  console.log({ product });
  const { poData } = useSelector(mapState);
  const selectedProducts = poData.selectedProducts;
  const dispatch = useDispatch();
  const items =
    Array.isArray(product.items) && product.items.length > 0
      ? product.items
      : [];
  const moq = items.length > 0 ? items[0].moq : 0;
  const qty_ordered =
    items.length > 0 ? (items[0].qty_ordered ? items[0].qty_ordered : 0) : 0;
  const item_unit_cost_price =
    items.length > 0 ? items[0].item_unit_cost_price : 0;

  const [values, setValues] = React.useState({
    moq: moq,
    qty_ordered: qty_ordered,
    item_unit_cost_price: item_unit_cost_price,
  });
  React.useEffect(() => {
    setValues({
      moq: moq,
      qty_ordered: qty_ordered,
      item_unit_cost_price: item_unit_cost_price,
    });
  }, [open]);

  const handleChangeValues = (e, key) => {
    const { name, value } = e.target;
    if (value >= 0) {
      return setValues({
        ...values,
        [key]: value,
      });
    }
    return;
  };

  const products = items.map((item) => {
    return {
      ...item,
      moq: values.moq,
      qty_ordered: values.qty_ordered,
      item_unit_cost_price: values.item_unit_cost_price,
    };
  });

  // we need to update the selectedProducts in the redux store , so that the table can be updated
  //  for that we need to replace the products with the same master_item_id in the selectedProducts array with the products array

  const newProducts = selectedProducts.map((selectedProduct) => {
    const product = products.find(
      (product) => product.master_item_id === selectedProduct.master_item_id
    );
    if (product) {
      return product;
    }
    return selectedProduct;
  });
  console.log({ newProducts });
  // const latestProducts

  const handleUpdate = () => {
    dispatch(updateSelectedProductsForPO(newProducts));
    handleClose();
  };
  return (
    <BaseDialog
      margin={0}
      open={open}
      handleClose={handleClose}
      title={`Update Quantity`}
      dialogActions={
        <>
          <SecondaryButton onClick={() => handleClose()}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={() => handleUpdate()}>
            Update Quantity
          </PrimaryButton>
        </>
      }
    >
      <Divider />
      <Box
        sx={{
          mt: 2,
          minWidth: "800px",
          maxWidth: "800px",
          maxHeight: "400px",
          minHeight: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            // ml: 2,
          }}
        >
          <AppImage
            src={product.display_image}
            width={80}
            height={80}
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "4px",
            }}
          />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#19235A",
            }}
          >
            {product.product_title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // alignItems: "flex-start",
              gap: "8px",
              width: "800px",
              // flexWrap: "wrap",
            }}
          >
            <TextInput
              type="number"
              value={Number(values.moq).toString()}
              onChange={(e) => handleChangeValues(e, "moq")}
              title={`MOQ`}
              // containerStyles={{
              //   width: "400px",
              // }}
            />
            <TextInput
              type="number"
              value={Number(values.qty_ordered).toString()}
              onChange={(e) => handleChangeValues(e, "qty_ordered")}
              title={`Order Quantity`}
              // containerStyles={{
              //   width: "400px",
              // }}
            />
          </Box>
          <Box
            sx={{
              width: "396px",
            }}
          >
            <TextInput
              type="number"
              value={Number(values.item_unit_cost_price).toString()}
              onChange={(e) => handleChangeValues(e, "item_unit_cost_price")}
              title={`Unit Cost`}
              // containerStyles={{
              //   width: "50%",
              // }}
            />
          </Box>
        </Box>
      </Box>
    </BaseDialog>
  );
}

/**
 * {
    "master_product_id": "1688047093800",
    "items": [
        {
            "available_qty": 0,
            "currency": null,
            "currency_id": null,
            "display_image": "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/5d99392e-ca70-4250-886b-83a72ab80d5d.jpg",
            "images": [
                "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/5d99392e-ca70-4250-886b-83a72ab80d5d.jpg",
                "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/a8fd5a01-b962-4957-9130-af6c9256b8c0.jpg",
                "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/10c6edcb-a30b-4b80-8a94-8384f39d80ea.jpg"
            ],
            "item_title": "25cmsx15cmsx35cms / GREEN",
            "item_unit_cost_price": 2849,
            "master_item_id": "139078569982765300",
            "master_product_id": "1688047093800",
            "moq": 20,
            "po_line_id": "139106775850244860",
            "po_order_line_id": "139107086796666330",
            "product_desc": "<ul>\n<li>Outer Material: Polycarbonate, Casing: Hard, Color: Blue</li>\n<li>Not water resistant</li>\n<li>Capacity: 28 liters; Weight: 2360 grams; Dimensions: 38 cms x 21 cms x 55 cms (LxWxH)</li>\n<li>Lock Type: Number Lock, Number of Wheels: 4</li>\n<li>Laptop Compatibility: No. Closure: Zipper</li>\n<li>Warranty type: Manufacturer; 1 Year international warranty</li>\n<li>Outer Material Is Textured With A Micro-Diamond Finish For Scratch-Resistance And Reduced Abrasion Visibility.</li>\n<li>Durable Blend Of Polycarbonate And 100 Percent Virgin Hard Case Outer Material Is Designed To Absorb Impact Under Stress And 'Flex' Back Into Its Original Shape.</li>\n<li>Premium Polycarbonate, Adjustable Straps, 360 Roatating Wheels, Stainless Steel Strolly, Limited Edition Skybags Logo.</li>\n<li>Cross Straps - Secure The Contents Of Your Luggage To Help Prevent Shifting That Can Cause Damage They Also Help Keep The Contents Of Your Luggage Organized.</li>\n</ul>\n",
            "product_sku": "B07R5PKDLQ",
            "product_title": "Skybags Trooper 55 Cms Polycarbonate Blue Hardsided Cabin Luggage",
            "qty_ordered": 0,
            "received_qty": 0,
            "sku": "B07R5PKDLQ_25cmsx15cmsx35cms_GREEN",
            "sl_no": 0,
            "symbol": "＄",
            "total_cost": 0
        }
    ],
    "product_title": "Skybags Trooper 55 Cms Polycarbonate Blue Hardsided Cabin Luggage",
    "product_sku": "B07R5PKDLQ",
    "display_image": "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/5d99392e-ca70-4250-886b-83a72ab80d5d.jpg"
}
 */

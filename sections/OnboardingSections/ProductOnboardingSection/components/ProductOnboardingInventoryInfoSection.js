import { Box, Grid, Stack } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useRef } from "react";
import InventoryAvailableItem from "../InventoryAvailableItem";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

export default function ProductOnboardingInventoryInfoSection({
  sku,
  setSKU,
  barcode,
  setBarcode,
  trackQuantity,
  setTrackQuantity,
  continueSelling,
  setContinueSelling,
  warehouseList,
  handleWarehouseInventoryChange,
  containerStyles,
  isOnlyWarehouse,
  hideSectionTitle,
}) {
  const inventoryRef = useRef(null);
  const scrollToRef = (ref) =>
    typeof window !== undefined && window?.scrollTo(0, ref?.current?.offsetTop);

  let executeScroll = (ref) => scrollToRef(ref);

  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      // sx={{
      // 	padding: "16px",
      // 	// paddingBottom: "64px",
      // 	// maxWidth: "600px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // }}
    >
      {!isOnlyWarehouse && (
        <>
          {!hideSectionTitle && (
            <SectionTitleText
              sx={{
                color: (theme) => theme.palette.text.heading,
                pb: 2,
                // borderBottom: "1px solid rgba(0,0,0,0.1)",
                // paddingBottom: "16px",
              }}
            >
              Inventory
            </SectionTitleText>
          )}
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={6}>
              <TextInput
                title="SKU (Stock Keeping Unit)"
                // sx={{
                // 	"& .MuiFormHelperText-root": {
                // 		color: "#D92D20 !important",
                // 	},
                // }}
                value={sku}
                required
                onChange={(e) => setSKU(e.target.value)}
                helperText={
                  sku.includes(" ") &&
                  "SKU cannot contain spaces. Remove Spaces"
                }
                error={sku.includes(" ")}
                // type="number"
                containerStyles={{
                  marginTop: "0px",
                }}
                // inputRef={inventoryRef}
                // onFocus={() => executeScroll(inventoryRef)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                title="Barcode (ISBN, UPC, GTIN, etc.)"
                // sx={{
                // 	"& .MuiFormHelperText-root": {
                // 		color: "#D92D20 !important",
                // 	},
                // }}
                value={barcode}
                required
                onChange={(e) => setBarcode(e.target.value)}
                helperText={
                  barcode.length > 13 &&
                  "Barcode should be less than or equal to 13 characters"
                }
                error={barcode.length > 13}
                // type="number"
                containerStyles={{
                  marginTop: "0px",
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
      {Array.isArray(warehouseList) && warehouseList.length > 0 && (
        <Stack
          sx={{
            marginTop: "16px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            paddingBottom: "16px",
          }}
        >
          <CheckboxInput
            label={"Track quantity"}
            value={trackQuantity}
            setValue={setTrackQuantity}
          />
          {trackQuantity && (
            <CheckboxInput
              label={"Continue selling when out of stock"}
              value={continueSelling}
              setValue={setContinueSelling}
            />
          )}
        </Stack>
      )}
      {Array.isArray(warehouseList) && warehouseList.length > 0 && (
        <>
          <SectionTitleText
            sx={{
              marginTop: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            Quantity
          </SectionTitleText>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Box>
              <DescriptionText sx={{ color: "#313D4E" }}>
                Location
              </DescriptionText>
            </Box>
            <Box>
              <DescriptionText sx={{ color: "#313D4E" }}>
                Available
              </DescriptionText>
            </Box>
          </Box>
          {Array.isArray(warehouseList) &&
            warehouseList.length > 0 &&
            warehouseList.map((warehouse, index) => {
              return (
                <InventoryAvailableItem
                  key={index}
                  wh_name={warehouse.wh_name}
                  wh_id={warehouse.wh_id}
                  wh_qty={warehouse.wh_qty || warehouse.available}
                  onChange={handleWarehouseInventoryChange(warehouse.wh_id)}
                />
              );
            })}
        </>
      )}

      {/* <PrimaryButton
				sx={{
					marginTop: "16px",
				}}
			>
				Add Inventory
			</PrimaryButton> */}
    </ProductOnboardingSectionContainer>
  );
}

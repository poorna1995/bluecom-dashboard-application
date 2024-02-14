import { Box, Grid } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

export default function ProductOnboardingShippingInfoSection({
  weight,
  setWeight,
  weightUnit,
  setWeightUnit,
  containerStyles,
}) {
  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      // sx={{
      // 	padding: "16px",
      // 	paddingBottom: "64px",
      // 	// maxWidth: "600px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // 	overflow: "unset",
      // }}
    >
      <SectionTitleText
        sx={
          {
            // paddingBottom: "16px",
            // borderBottom: "1px solid rgba(0,0,0,0.1)",
          }
        }
      >
        Shipping
      </SectionTitleText>
      <DescriptionText
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          color: "#313D4E",
          marginTop: "16px",
        }}
      >
        Weight
      </DescriptionText>
      <DescriptionText
        sx={{
          color: "rgba(49, 61, 78, 0.6)",
        }}
      >
        Used to calculate shipping rates at checkout and label prices during
        fulfillment. See guidelines for estimating product weight.
      </DescriptionText>
      <Grid container columnSpacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={8}>
          <TextInput
            sx={{ maxWidth: "600px" }}
            title={"Weight"}
            type="number"
            containerStyles={{ marginTop: "0" }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ paddingTop: "8px" }}>
          <FormSelectInput
            label={"Unit"}
            options={[
              { label: "KG", value: "KG" },
              {
                label: "GM",
                value: "GM",
              },
            ]}
            value={weightUnit}
            onChange={(e) => setWeightUnit(e)}
            placeholder="KG"
          />
        </Grid>
      </Grid>
    </ProductOnboardingSectionContainer>
  );
}

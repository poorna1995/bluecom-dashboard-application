import { Box, Grid, InputAdornment } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useRef, useState } from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";
import Cookies from "universal-cookie";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
import getCurrentCountry from "utils/currencyConversion/getCurrentCountry";
import getCurrentLocation from "utils/locationUtils/getCurrentLocation";
import RenderCurrencyForForm from "components/Common/Tables/RenderComponents/RenderCurrencyForForm";
import PriceInputComponent from "components/Common/Inputs/TextInput/PriceInputComponent";

export default function ProductOnboardingPriceInfoSection({
  unitRetailPrice,
  setUnitRetailPrice,
  unitCostPrice,
  setUnitCostPrice,
  containerStyles,
}) {
  const priceRef = useRef(null);

  const scrollToRef = (ref) =>
    typeof window !== undefined && window?.scrollTo(0, ref?.current?.offsetTop);

  let executeScroll = (ref) => scrollToRef(ref);

  // const [isError, setIsError] = useState(false);
  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      // sx={{
      // 	padding: "16px",
      // 	paddingBottom: "32px",
      // 	// maxWidth: "600px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // }}
    >
      <SectionTitleText
        sx={{
          color: (theme) => theme.palette.text.heading,
          pb: 1,
          // paddingBottom: "16px",
          // borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        Price
      </SectionTitleText>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item md={6}>
          {" "}
          <PriceInputComponent
            // sx={{
            //   "& .MuiOutlinedInput-input": {
            //     marginLeft: "18px",
            //   },
            // }}
            title="Selling price"
            required
            value={unitRetailPrice}
            error={parseInt(unitRetailPrice) <= parseInt(unitCostPrice)}
            onChange={(e) => setUnitRetailPrice(e.target.value)}
            containerStyles={{
              maxWidth: "100%",
              marginTop: "8px",
            }}
            min={0}
            type="number"
            // onBlur={() => setIsError(true)}
            // error={unitRetailPrice <= unitCostPrice}
            helperText={
              // parseInt(unitRetailPrice) <= parseInt(unitCostPrice) &&
              "Selling price should be greater than cost price"
            }
            // inputRef={priceRef}
            // onFocus={() => executeScroll(priceRef)}
          />
        </Grid>
        <Grid item md={6}>
          <PriceInputComponent
            // sx={{
            //   "& .MuiOutlinedInput-input": {
            //     marginLeft: "8px",
            //   },
            // }}
            title="Cost price"
            required
            value={unitCostPrice}
            onChange={(e) => setUnitCostPrice(e.target.value)}
            containerStyles={{
              maxWidth: "100%",
              marginTop: "8px",
            }}
            min={0}
            type="number"
          />
        </Grid>
      </Grid>

      {/* {unitRetailPrice !== 0 && unitCostPrice !== 0 && (
				<Grid container sx={{ marginTop: "16px" }}>
					<Grid item xs={6}>
						<DescriptionText
							sx={{
								color: (theme) => theme.palette.grey[600],
								fontSize: "16px",
								lineHeight: "20px",
								fontWeight: 500,
							}}
						>
							Margin
						</DescriptionText>
						{unitRetailPrice && unitRetailPrice && (
							<DescriptionText
								sx={{
									fontSize: "16px",
									lineHeight: "20px",
									fontWeight: "600",
									color: (theme) => theme.palette.grey[800],
								}}
							>
								{((unitRetailPrice - unitCostPrice) /
									unitCostPrice) *
									100}{" "}
								%
							</DescriptionText>
						)}{" "}
					</Grid>
					<Grid item xs={6}>
						<DescriptionText
							sx={{
								color: (theme) => theme.palette.grey[600],
								fontSize: "16px",
								lineHeight: "20px",
								fontWeight: 500,
							}}
						>
							Profit
						</DescriptionText>
						{unitRetailPrice && unitCostPrice && (
							<DescriptionText
								sx={{
									fontSize: "16px",
									lineHeight: "20px",
									fontWeight: "600",
									color: (theme) => theme.palette.grey[800],
								}}
							>
								Rs. {unitRetailPrice - unitCostPrice}
							</DescriptionText>
						)}
					</Grid>
				</Grid>
			)} */}
    </ProductOnboardingSectionContainer>
  );
}

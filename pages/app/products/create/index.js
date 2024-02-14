import { Box, Grid, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BundleIcon from "components/Common/Icons/NewIcons/ProductPageIcons/BundleIcon";
import ProductIcon from "components/Common/Icons/NewIcons/ProductPageIcons/ProductIcon";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetBundleOnboardingSteps,
  resetProductOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import { resetCreateBundleData } from "redux/products/productsSlice";
import dynamic from "next/dynamic";
import DrawerLayout from "layouts/DrawerLayout";
import { resetCreateProductData } from "redux/products/productsSlice";
import CreateSelectCard from "sections/OnboardingSections/NewProductOnboardingSections/components/CreateSelectCard";
// const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"), {
//   ssr: false,
// });

// const CreateSelectCard = dynamic(() =>
//   import(
//     "sections/OnboardingSections/NewProductOnboardingSections/components/CreateSelectCard"
//   )
// );
// const PageSpinner = dynamic(() =>
//   import("components/Common/LoadingIndicators/PageSpinner")
// );

export default function CreateProductPage() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const newDate = new Date();
  const getTimeInMilliseconds = newDate.getTime();
  const [createId, setCreateId] = React.useState(getTimeInMilliseconds);
  useEffect(() => {
    setCreateId(getTimeInMilliseconds);
  }, []);

  const disableButton = !selectedCard;

  const handleCardClick = () => {
    dispatch(resetBundleOnboardingSteps());
    dispatch(resetProductOnboardingSteps());
    dispatch(resetCreateProductData());

    dispatch(resetCreateBundleData());
    router.push(
      `/app/products/create/${selectedCard}/${createId}?step=general-info&id=0`
    );
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    console.log({ card });
  };

  return (
    // <Suspense fallback={<PageSpinner />}>
    <DrawerLayout>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          maxHeight: "90vh",
          width: "100%",
          minHeight: "90vh",
        }}
      >
        <Box sx={{ maxWidth: "800px", margin: "auto" }}>
          <SectionTitleText
            sx={{
              mb: 6,
              fontSize: "32px",
              textAlign: "center",
              color: "#484A9E",
            }}
          >
            Choose Product Type{" "}
          </SectionTitleText>
          <Grid
            container
            spacing={4}
            sx={{
              // marginTop: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {create.map((card, index) => {
              return (
                <Grid item xs={6} md={6} key={index} sm={6}>
                  <CreateSelectCard
                    title={card.title}
                    description={card.description}
                    isSelected={selectedCard === card.key}
                    onClick={() => handleSelectCard(card.key)}
                    icon={card.icon}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "19px",
              fontWeight: 500,

              "& span": {
                color: "#484A9E",
                fontWeight: 700,
              },
              mt: 6,
            }}
          >
            <span>Bundle:</span> Group of products or that are packaged together
            and sold as a single offering
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          // mt: 6,
          justifyContent: "center",
          position: "fixed",
          bottom: "0",
          width: "100%",
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          ml: "-36px",
          backgroundColor: "#fff",
        }}
      >
        {" "}
        <PrimaryButton
          onClick={() => handleCardClick()}
          sx={{ width: "200px" }}
          disabled={disableButton}
        >
          Next Step
        </PrimaryButton>
      </Box>
    </DrawerLayout>
    // </Suspense>
  );
}

const create = [
  {
    title: "Product",
    key: "product",
    description: `Product represents a single item or can contain variations such as size, color, or type, providing customers with different options to choose from`,
    icon: <ProductIcon />,
  },
  {
    title: "Bundle",
    key: "bundle",
    description:
      "Bundle refers to a collection or combination of multiple products packaged together, offering customers a convenient and value-added solution",
    icon: <BundleIcon />,
  },
];

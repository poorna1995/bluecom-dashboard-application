import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import placeholder from "public/assets/placeholder/empty_state1.png";

export default function EmptyStateForVendor({
  text,
  primaryButton,
  outlinedButton,
  bodyText,
  image,
  children,
  containerStyles,
  imageStyles,
}) {
  return (
    <Box
      sx={{
        height: "500px",
        display: "grid",
        placeItems: "center",
        mt: 5,
        // ...containerStyles,
      }}
    >
      <AppImage src={placeholder} width="150" height="150" />

      {/* <AppImage
          src={image}
          width="190"
          height="180"
          sx={{ mb: 1, ...imageStyles }}
        /> */}
      <DescriptionText
        sx={{
          paddingBottom: "0px",
          marginBottom: "-25px",
          color: "#000000",
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        {text || "No Products! "}
      </DescriptionText>
      <Typography
        sx={{
          marginTop: "-25px",
          marginBottom: "-25px",
          color: "#000000",
          fontWeight: 500,
          fontSize: "16px",
          width: "450px",
          textAlign: "center",
        }}
      >
        {bodyText ||
          "Looks like you have not added any product. You can add new product by clicking below add product button"}
      </Typography>
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {/* <PrimaryButton>Add New Product</PrimaryButton>
          <OutlinedButton>Add New Store</OutlinedButton> */}
      </Box>
      {/* <PrimaryButton>{primaryButton}</PrimaryButton> */}
      {/* <OutlinedButton>{outlinedButton}</OutlinedButton> */}
    </Box>
  );
}

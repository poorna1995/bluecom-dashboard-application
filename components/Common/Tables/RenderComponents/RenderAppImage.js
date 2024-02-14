import AppImage from "components/Common/AppImage";
import React from "react";

function RenderAppImage({ display_image, ...props }) {
  return (
    <AppImage
      // sx prop to fit app image to a definite size
      sx={{
        objectFit: "cover",
        borderRadius: "5px",
        cursor: "pointer",
        border: "1px solid #E0E0E0",
      }}
      width="40"
      height="40"
      src={display_image}
      {...props}
    />
  );
}

export default RenderAppImage;

import { Box, Container, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useState, useEffect } from "react";

export default function ProductThumbnailsSlider({ data = [], title }) {
  const [currentImage, setCurrentImage] = useState(data[0]);
  const [thumbnailList, setThumbnailList] = useState(data);
  const handleClickImage = (image) => {
    setCurrentImage(image);
  };
  useEffect(() => {
    setCurrentImage(data[0]);
  }, [data]);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: title ? "space-between" : "flex-end",
          flex: 1,
          marginBottom: "8px",
        }}
      >
        {title && (
          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
              },
              fontWeight: "700",
              fontSize: "18px",
              // paddingLeft: "15px",
              flex: 0.8,
              lineHeight: "38px",
              letterSpacing: ` -0.01em`,
              color: "#484A9E",
              // color: (theme) => theme.palette.text.primary,
            }}
          >
            {title} ({data.length})
          </Typography>
        )}
      </div>

      <Box
        className="slider-wrapper"
        sx={{
          "& .preview-image": {
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "8px",
          },
          overflow: "hidden",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        {currentImage && (
          <AppImage
            src={currentImage && currentImage}
            className="preview-image"
            width={400}
            height={400}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .thumbnail": {
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              mr: 1,
              ml: 1,
            },
            "& .active": {
              border: "2px solid #484A9E",
              transform: "scale(1.2)",
              m: 2,
            },
            maxWidth: "100%",
            overflowX: "scroll",
            margin: "auto",
            mt: 4,
            maxHeight: "128px",
            minHeight: "120px",
            width: "100%",
            px: 2,
          }}
        >
          {Array.isArray(data) &&
            data.map((item, index) => (
              <AppImage
                onClick={() => handleClickImage(item)}
                src={item}
                key={index}
                className={
                  item === currentImage ? "active thumbnail" : "thumbnail"
                }
                width={60}
                height={60}
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
}

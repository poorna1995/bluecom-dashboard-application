/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useState } from "react";
import Slider from "react-slick";

const ImageSlider = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    // autoPlay: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    // afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <Box
      sx={{
        "& .slick-dots": {
          bottom: "0px",
          margin: "16px 0",
        },
      }}
    >
      <Slider autoplaySpeed={1500} autoplay pauseOnHover={false} {...settings}>
        {Array.isArray(images) &&
          images.map((image, index) => (
            <div key={index}>
              <AppImage
                src={image}
                alt={`product image ${index}`}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "320px",
                  minHeight: "320px",
                  overflow: "hidden",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                width={300}
                height={320}
              />
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;

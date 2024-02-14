import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppImage from "../AppImage";
import RenderAppImage from "../Tables/RenderComponents/RenderAppImage";
import { Box, Popover } from "@mui/material";

function ClickPopover({ src, slides }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [activeSlideId, setActiveSlideId] = React.useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,

    customPaging: (i) => (
      <div
        style={{
          width: activeSlideId === i ? "10px" : "8px",
          height: activeSlideId === i ? "10px" : "8px",
          borderRadius: "50%",
          backgroundColor: activeSlideId === i ? "#4F44E0" : "gray",
          display: "inline-block",

          margin: "0",
        }}
      />
    ),
    afterChange: (index) => setActiveSlideId(index),
  };

  const sliderStyle = {
    width: "250px",
    height: "350px",
    margin: "0 2px",
  };

  return (
    <div>
      <RenderAppImage src={src} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            ...sliderStyle,
            "& .slick-dots li": {
              margin: "0px",
            },
          }}
        >
          <Slider
            {...settings}
            autoplay={true}
            autoplaySpeed={1500}
            pauseOnHover={false}
          >
            {Array.isArray(slides) &&
              slides.map((slide, index) => (
                <div key={`slide-${index}`}>
                  <AppImage
                    sx={{ objectFit: "fit" }}
                    width="250"
                    height="300"
                    src={slide}
                  />
                </div>
              ))}
          </Slider>
        </Box>
      </Popover>
    </div>
  );
}

export default ClickPopover;

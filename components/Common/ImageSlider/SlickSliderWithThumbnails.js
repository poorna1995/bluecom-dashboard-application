/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// App.js
import React, { useState, useEffect } from "react";
// import "./App.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SlickSliderWithThumbnails({ slidesData = [], title }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  const [index, setIndex] = useState(0);
  const beforeChange = (prev, next) => {
    setIndex(next);
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    beforeChange: beforeChange,
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };
  console.log({ slider1, slider2, nav1, nav2 });

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
            {title} ({slidesData.length})
          </Typography>
        )}
        {/* {slidesData.length > 0 && (
					<div style={{ display: "flex", alignSelf: "flex-end" }}>
						<div className="controls">
							<IconButton
								onClick={slider2?.slickPrev}
								disabled={index === 0}
							>
								<MdChevronLeft />
							</IconButton>
							<IconButton
								onClick={slider2?.slickNext}
								disabled={index === slidesData.length - 2}
							>
								<MdChevronRight />
							</IconButton>
						</div>
					</div>
				)} */}
      </div>

      <Box className="slider-wrapper">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {slidesData.map((slide, index) => (
            <div className="slick-slide" key={index}>
              {/* <h2 className="slick-slide-title">{slide.title}</h2> */}
              <img
                className="slick-slide-image"
                src={slide}
                style={{
                  maxHeight: "320px",
                  objectFit: "contain",
                  width: "100%",
                }}
              />
              {/* <label className="slick-slide-label">
								{slide.label}
							</label> */}
            </div>
          ))}
        </Slider>
        <Box
          sx={{
            "& .slick-current img": {
              border: "1px solid rgba(0, 0, 0, 0.5) !important",
              borderRadius: "10px",
              // transform: "scale(1.1)",
            },
            "& .slick-slider ": {
              minHeight: "100px",
            },
            "& .slick-slide": {
              maxWidth: "100px !important",
            },
            minHeight: "120px",
          }}
          className="thumbnail-slider-wrap"
        >
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {slidesData.map((slide, index) => (
              <div
                className="slick-slide"
                key={index}
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  minHeight: "120px",
                  maxWidth: "100px",
                }}
              >
                <img
                  className="slick-slide-image"
                  src={slide}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid  rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
}

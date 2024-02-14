/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

export default function ImageSliderWithThumbnails({ slidesData = [] }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
    arrows: true,
  };

  return (
    <Box
      sx={{
        "& .thumbnail-slider-wrap": {
          marginTop: "16px",
          // height: " 85px",
          // width: "100px",
          marginRight: "24px",
        },
        "& .thumbnail-slider-wrap .slick-track .slick-slide": {
          textAlign: "center",
        },
        "& .thumbnail-slider-wrap .slick-track .slick-slide img": {
          width: "80px",
          height: "80px",
          objectFit: "contain",
          mt: 2,
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,0.1)",
          "&:hover": {
            cursor: "pointer",
            border: "1px solid rgba(0,0,0,0.5)",
          },
        },
        "& .slider-wrapper": {
          display: "flex",
          maxWidth: "500px",
          flex: 1,
          alignItems: "center",
          maxHeight: "300px",
        },
        "& .slick-current img": {
          border: "1px solid rgba(0,0,0,0.5) !important",
        },
      }}
    >
      {/* {slidesData.length} */}
      <div className="slider-wrapper">
        <div className="thumbnail-slider-wrap">
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
            vertical
            verticalSwiping
            style={{
              maxHeight: "400px",
            }}
          >
            {slidesData.map((slide) => (
              <div className="slick-slide" key={slide}>
                <img
                  className="slick-slide-image"
                  src={slide}
                  alt=""
                  onClick={() => {
                    slider1.slickGoTo(slidesData.indexOf(slide));
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
          style={{
            width: "400px",
            flex: 1,
            maxHeight: "300px",
          }}
        >
          {slidesData.map((slide) => (
            <div
              className="slick-slide"
              style={{
                textAlign: "center",
                maxWidth: "400px",
                margin: "auto",
              }}
              key={slide}
            >
              {/* <h2 className="slick-slide-title">{slide.title}</h2> */}
              <img
                className="slick-slide-image"
                src={slide}
                alt=""
                style={{
                  maxHeight: "300px",
                  maxWidth: "400px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                }}
              />
              {/* <label className="slick-slide-label">
								{slide.label}
							</label> */}
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
}

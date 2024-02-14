import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AppImage from "../AppImage";
import EmptyState from "../EmptyState";

export default function ImageSlider({ data = [], title }) {
  const [sliderRef, setSliderRef] = useState(null);
  const [index, setIndex] = useState(0);
  const beforeChange = (prev, next) => {
    setIndex(next);
  };

  const settings = {
    // focusOnSelect:   true,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    width: "inherit",
    height: "inherit",
    beforeChange: beforeChange,
    // afterChange: current => this.setState({ activeSlide2: current })

    speed: 500,
    responsive: [
      {
        breakpoint: 8,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // beforeChange: (current, next) => setCurrentSlide(current),
  };

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
              fontWeight: "700",
              fontSize: "18px",
              // paddingLeft: "15px",
              flex: 0.8,
              lineHeight: "38px",
              letterSpacing: ` -0.01em`,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {title} ({data.length})
          </Typography>
        )}
        {data.length > 0 && (
          <div style={{ display: "flex", alignSelf: "flex-end" }}>
            <div className="controls">
              <IconButton onClick={sliderRef?.slickPrev} disabled={index === 0}>
                <MdChevronLeft />
              </IconButton>
              <IconButton
                onClick={sliderRef?.slickNext}
                disabled={index === data.length - 2}
              >
                <MdChevronRight />
              </IconButton>
            </div>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <Slider ref={setSliderRef} {...settings} arrows={false}>
          {Array.isArray(data) &&
            data.map((item, index) => {
              // const {title} = item;
              return (
                <>
                  <AppImage
                    src={item}
                    width="250"
                    height="280"
                    sx={{
                      // paddingRight: "16px",
                      borderRadius: "8px",
                    }}
                  />
                </>
              );
            })}
        </Slider>
      )}
      {data.length === 0 && <EmptyState text={"No images found"} />}
    </Container>
  );
}

import { styled } from "@mui/material";
import Image from "next/image";
import React from "react";
import placeholder from "public/assets/imageList.png";
const StyledImage = styled(Image, {})(({ theme }) => ({}));

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const AppImage = ({ src, alt, style, sx, ...props }) => {
  const imgURL = src === "" ? placeholder : src;

  const [errorImage, setErrorImage] = React.useState(null);
  const errorImageUrl = placeholder;

  const url = errorImage ? errorImageUrl : src;
  return (
    <StyledImage
      src={url}
      alt={alt || " "}
      sx={sx}
      style={style}
      unoptimized={true}
      // loading="lazy"
      // onLoadingComplete={() => console.log("loaded")}
      // blurDataURL={rgbDataURL(255, 255, 255)}
      // placeholder="blur"
      loading="lazy"
      placeholder="empty"
      blurDataURL={rgbDataURL(85, 85, 85)}
      onError={(e) => {
        if (!errorImage) {
          setErrorImage(true);
        }
      }}
      // blurDataURL={`data:image/svg+xml;base64,${toBase64(
      //   shimmer(700, 475),
      // )}`}
      {...props}
    />
  );
};

export default AppImage;

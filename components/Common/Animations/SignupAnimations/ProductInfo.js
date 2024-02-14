import React from "react";
import Product from "./product.json";
import Lottie from "lottie-react";

export default function ProductInfo({ ...props }) {
  return (
    <div style={{ background: "white", borderRadius: "5px" }} {...props}>
      {" "}
      <Lottie
        animationData={Product}
        style={{
          width: "50px",
          height: "50px",
        }}
      />
    </div>
  );
}

import React from "react";
import Purchase from "./purchase.json";
import Lottie from "lottie-react";

export default function POManage({ ...props }) {
  return (
    <div style={{ background: "white", borderRadius: "5px" }} {...props}>
      {" "}
      <Lottie
        animationData={Purchase}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
}

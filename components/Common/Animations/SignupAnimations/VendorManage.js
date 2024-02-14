import React from "react";
import Vendor from "./vendor.json";
import Lottie from "lottie-react";

export default function VendorManage({ ...props }) {
  return (
    <div style={{ background: "white", borderRadius: "5px" }} {...props}>
      {" "}
      <Lottie
        animationData={Vendor}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
}

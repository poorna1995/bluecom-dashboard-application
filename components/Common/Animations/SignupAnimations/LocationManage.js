import React from "react";
import Location from "./location.json";
import Lottie from "lottie-react";

export default function LocationManage({ ...props }) {
  return (
    <div style={{ background: "white", borderRadius: "5px" }} {...props}>
      {" "}
      <Lottie
        animationData={Location}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
}

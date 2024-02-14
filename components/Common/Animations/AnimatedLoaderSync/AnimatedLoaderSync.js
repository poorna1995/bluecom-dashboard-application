import React from "react";
import Animation from "./animation.json";
import Lottie from "lottie-react";

export default function AnimatedLoaderSync({ ...props }) {
  return (
    <div style={{ background: "white" }} {...props}>
      {" "}
      <Lottie
        animationData={Animation}
        style={{ width: "40px", height: "40px" }}
      />
    </div>
  );
}

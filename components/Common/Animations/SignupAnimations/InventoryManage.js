import React from "react";
import Inventory from "./inventory.json";
import Lottie from "lottie-react";

export default function InventoryManage({ ...props }) {
  return (
    <div style={{ background: "white", borderRadius: "5px" }} {...props}>
      {" "}
      <Lottie
        animationData={Inventory}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
}

import { Avatar } from "@mui/material";
import React from "react";

export default function ColorAvatar() {
  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }
}

import React from "react";
import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import Button from "@mui/material/Button";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import RenderAppImage from "../Tables/RenderComponents/RenderAppImage";
import AppImage from "../AppImage";

const HoverPopoverPopupState = ({ classes, src }) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });
  return (
    <div>
      <RenderAppImage {...bindHover(popupState)} src={src} />
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "right",
          horizontal: "center",
        }}
      >
        <AppImage
          sx={{
            objectFit: "cover",
          }}
          width="300"
          height="300"
          {...bindHover(popupState)}
          src={src}
        />
      </HoverPopover>
    </div>
  );
};

export default HoverPopoverPopupState;

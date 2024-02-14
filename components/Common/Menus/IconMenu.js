import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon } from "@mui/material";

export default function IconMenu({ options, buttonIcon }) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {buttonIcon}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,

            // width: "22ch",
            borderRadius: "3px",

            // boxShadow: "0px 0px 0.1px 1px #34405424",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 10px",
          },
        }}
      >
        {options.map(({ label, icon, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              onClick();
              handleClose();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "3px",
              marginLeft: "12px",
              marginRight: "12px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              padding: "12px 8px",
              color: "#212121",
              "&:hover": {
                color: "#4F44E0",
                backgroundColor: "#F5F4FD",
                "& svg path": {
                  stroke: "#4F44E0",
                  // color: "#4F44E0",
                  background: "#F5F4FD",
                },
              },
            }}
          >
            {icon}
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

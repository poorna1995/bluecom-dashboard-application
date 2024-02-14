import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TickIcon from "components/Common/Icons/DropDownIcons/TickIcon";
import { Provider } from "react-redux";

export default function SelectLocationDropdown({
  options,
  handleToggle,
  anchorRef,
  open,
  handleClose,
  handleMenuItemClick,
  selectedIndex,
}) {
  return (
    <React.Fragment>
      {/* <ButtonGroup
				// variant="contained"
				ref={anchorRef}
				aria-label="split button"
			> */}
      <Button
        // onClick={handleClick}
        onClick={handleToggle}
        ref={anchorRef}
        endIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
          >
            <path
              d="M13.3333 1.25814L6.66667 7.9248L7.94992e-08 1.25814L1.18333 0.0748048L6.66667 5.55814L12.15 0.0748049L13.3333 1.25814Z"
              fill="#595959"
            />
          </svg>
        }
        sx={{
          border: "1px solid #E0E0E0",
          textTransform: "capitalize",
          color: "#4F44E0",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          borderRadius: "7px",
          height: "40px",
          pl: "10px",
          pr: "10px",
        }}
        disableRipple
      >
        {options[selectedIndex]?.wh_name}
      </Button>
      {/* <Button
					size="small"
					aria-controls={open ? "split-button-menu" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
				></Button> */}
      {/* </ButtonGroup> */}
      <Popper
        sx={{
          zIndex: 1000,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                borderRadius: "7px",
                background: " #FFF",
                boxShadow: " 0px 0px 32px 0px rgba(79, 68, 224, 0.10)",
                pt: 2,
                pb: 2,
                pl: 2,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  sx={{
                    overflow: "scroll",
                    maxHeight: "400px",
                    // minHeight: "100px",
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "7px",
                        p: "12px",
                        mb: "4px",
                        mr: "12px",
                        color: index === selectedIndex ? "#4F44E0" : "#212121",
                        fontSize: " 16px",
                        fontWeight: index === selectedIndex ? 600 : 500,
                        // fontWeight: 600,
                        lineHeight: "20px",
                        "&:hover": {
                          color: "#4F44E0",
                          borderRadius: "7px",
                          background:
                            index === selectedIndex ? "#E0E0E0" : "#E0E0E0",
                          transition: "all 0.3s ease-in-out",
                        },
                        "& svg": {
                          visibility:
                            index === selectedIndex ? "visible" : "hidden",
                          mr: 2,
                        },
                        // overflow: "scroll",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2.75 8.75L6.25 12.25L13.25 4.75"
                          stroke="#4F44E0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {option.wh_name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

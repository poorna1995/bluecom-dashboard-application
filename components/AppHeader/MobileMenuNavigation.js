import { ExpandMore } from "@mui/icons-material";
import { ExpandLess } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import React from "react";
import { menuItems } from "./NewHeaderForDrawer";
import { useRouter } from "next/router";
import { MdChevronRight } from "react-icons/md";

const styles = {
  primaryTextStyles: {
    fontWeight: "600",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    color: "#151515",
    fontSize: "16px",
  },
};
export default function MobileMenuNavigation({
  openDrawer,
  handleDrawerClose,
  handleDownloadWhitePaper,
  isBannerVisible,
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpenSubMenu = () => {
    setOpen(!open);
  };
  const handleNavigation = (route) => {
    router.push(route);
    handleDrawerClose();
  };
  const isLinkActive = (menuItem = "") => {
    const route = menuItem.route;
    const basePath = route.split("?")[0];
    // console.log({ basePath, menuItem });
    const isHome = menuItem.name === "Home";

    if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
      const isActive =
        basePath !== "" && router.asPath.startsWith(menuItem.route);
      return isActive;
    }
    const isActive = basePath !== "" && router.asPath === basePath;
    // router.asPath.startsWith(basePath)
    return isActive;
    // return router.asPath === route;
  };
  const isMenuActive = (item) => {
    const route = item.route;
    const basePath = route.split("?")[0];
    // console.log({ basePath, item });
    const isActive =
      // basePath
      //  !== "" && router.asPath.startsWith(basePath);

      basePath === router.asPath || basePath === router.asPath.split("?")[0];
    return isActive;
    // return router.asPath === route;
  };

  return (
    <div>
      {" "}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            // alignItems: "center",
            // textAlign: "center",
            // margin: "auto",
            // minHeight: "600px",
            // maxHeight: "600px",
            height: "100%",
            width: "100%",
            // top: "80px",
            border: "none",
            borderRadius: "0px 0px 20px 20px",
            overflow: "scroll",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "300px",
            width: "100%",
            mt: isBannerVisible ? "120px" : "80px",
            px: "8px",
            "& .show-on-tablet": {
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "none",
              },
              mt: {
                md: 2,
              },
            },
            "& .show-on-mobile": {
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
              },
            },
          }}
        >
          <List className="show-on-mobile">
            {menuItems.map((item, index) => {
              const { items } = item;
              if (Array.isArray(items) && items.length > 0) {
                return (
                  <React.Fragment key={`${item.name}-${index}`}>
                    <ListItemButton
                      onClick={handleClickOpenSubMenu}
                      sx={{
                        background: isLinkActive(item)
                          ? "rgba(79, 68, 224, 0.10)"
                          : "",
                        borderRadius: "8px",
                        ml: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          "& svg path": {
                            stroke: isLinkActive(item) ? "#4F44E0" : "#222",
                          },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          ...styles.primaryTextStyles,
                          color: isLinkActive(item) ? "#4F44E0" : "#222",
                        }}
                      />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {items.map((subItem, id) => (
                          <ListItemButton
                            key={id}
                            onClick={() => handleNavigation(subItem.route)}
                            sx={{
                              pl: 4,
                              background: isMenuActive(subItem)
                                ? "rgba(79, 68, 224, 0.10)"
                                : "",

                              borderRadius: "8px",
                              ml: 1,
                            }}
                          >
                            <ListItemIcon>
                              <MdChevronRight
                                fontSize={"18px"}
                                color={
                                  isMenuActive(subItem) ? "#4F44E0" : "#222"
                                }
                                fontWeight={600}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.name}
                              primaryTypographyProps={{
                                ...styles.primaryTextStyles,
                                color: isMenuActive(subItem)
                                  ? "#4F44E0"
                                  : "#222",
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              }
              return (
                <ListItemButton
                  key={`${item.name}-${index}`}
                  onClick={() => handleNavigation(item.route)}
                  sx={{
                    background: isLinkActive(item)
                      ? "rgba(79, 68, 224, 0.10)"
                      : "",
                    borderRadius: "8px",
                    ml: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      "& svg path": {
                        stroke: isLinkActive(item) ? "#4F44E0" : "#222",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      ...styles.primaryTextStyles,
                      color: isLinkActive(item) ? "#4F44E0" : "#222",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

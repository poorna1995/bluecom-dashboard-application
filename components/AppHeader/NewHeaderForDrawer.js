import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import { useRouter } from "next/router";
import {
  Box,
  Grow,
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from "@mui/material";

import DrawerHeaderDropdownIcon from "components/Common/Icons/DrawerHeaderDropdownIcon";

import DashboardIcon from "components/Common/Icons/HeaderIcons/DashboardIcon";
import ProductIcon from "components/Common/Icons/HeaderIcons/ProductIcon";
import InventoryIcon from "components/Common/Icons/HeaderIcons/InventoryIcon";

import VendorIcon from "components/Common/Icons/HeaderIcons/VendorIcon";
import WareHouseIcon from "components/Common/Icons/HeaderIcons/WareHouseIcon";
import PurchaseOrderIcon from "components/Common/Icons/HeaderIcons/PurchaseOrderIcon";
import JobPageIcon from "components/Common/Icons/NavigationIcons/JobPageIcon";
import ReplenishmentIcon from "components/Common/Icons/HeaderIcons/ReplenishmentIcon";
import StoreIcon from "components/Common/Icons/HeaderIcons/StoreIcon";
import ForecastIcon from "components/Common/Icons/HeaderIcons/ForecastIcon";
import RightArrowIcon from "components/Common/Icons/RightArrowIcon";
import ListIcon from "components/Common/Icons/list";
import ProductIconNew from "components/Common/Icons/HeaderIcons/ProductIconNew";
import InventoryIconNew from "components/Common/Icons/HeaderIcons/InventoryIconNew";
import VendorIconNew from "components/Common/Icons/HeaderIcons/VendorIconNew";
import LocationIconNew from "components/Common/Icons/HeaderIcons/LocationIconNew";
import PONewIcon from "components/Common/Icons/HeaderIcons/PONewIcon";
import DashboardIconFilled from "components/Common/Icons/HeaderIcons/DashboardIconFilled";
import ProductIconFill from "components/Common/Icons/HeaderIcons/ProductIconFill";
import InventoryIconFill from "components/Common/Icons/HeaderIcons/InventoryIconFill";
import LocationIconFill from "components/Common/Icons/HeaderIcons/LocationIconFill";
import VendorIconFill from "components/Common/Icons/HeaderIcons/VendorIconFill";
import POIconFill from "components/Common/Icons/HeaderIcons/POIconFill";
import JobsIconFill from "components/Common/Icons/HeaderIcons/JobsIconFill";
import ProductDropIcon from "components/Common/Icons/HeaderIcons/PublishDropIconFill";
import PublishDropIcon from "components/Common/Icons/HeaderIcons/PublishDropIcon";
import PublishDropIconFill from "components/Common/Icons/HeaderIcons/PublishDropIconFill";
import CreateDropIconFill from "components/Common/Icons/HeaderIcons/CreateDropIconFill";
import CreateDropIcon from "components/Common/Icons/HeaderIcons/CreateDropIcon";
import AppLink from "components/Common/AppLink";
import OrdersIcon from "components/Common/Icons/NavigationIcons/OrdersIcon";
import OrdersFilledIcon from "components/Common/Icons/NavigationIcons/OrdersFilledIcon";

const newDate = new Date();
const getTimeinMiliseconds = newDate.getTime();
const time = new Date().getTime();

export const menuItems = [
  {
    name: "Dashboard",
    id: "dashboard-button",
    menuId: "dashboard-menu",
    route: "/home",
    icon: <DashboardIcon />,
    iconFill: <DashboardIconFilled />,
  },
  {
    name: "Manage Products",
    id: "product-button",
    menuId: "product-menu",
    route: "/app/products",
    icon: <ProductIconNew />,
    iconFill: <ProductIconFill />,
    items: [
      {
        name: "Products",
        route: "/app/products?currentPage=1",
        icon: <ProductIconNew />,
        iconFill: <ProductIconFill />,
        desc: "View and Modify Product Information Across Stores.",
      },
      {
        name: "Create",
        // route: "/app/products/create",
        // route: `/onboarding/products/${getTimeinMiliseconds}?step=general-info&id=0`,
        route: `/app/products/create/product/${time}?step=general-info&id=0`,
        icon: <CreateDropIcon />,
        iconFill: <CreateDropIconFill />,
        desc: "Create and Manage New Products in Bluecom.",
      },
      {
        name: "Publish Products",
        route: "/app/products/publish?currentPage=1",
        icon: <PublishDropIcon />,
        iconFill: <PublishDropIconFill />,
        desc: "List and Sync Products Across Multiple Channels.",
      },
    ],
  },
  {
    name: "Orders",
    id: "order-button",
    menuId: "order-menu",
    route: "/app/orders?tab=all",
    icon: <OrdersIcon />,
    iconFill: <OrdersFilledIcon />,
  },
  {
    name: "Manage Inventory",
    id: "inventory-button",
    icon: <InventoryIconNew />,
    iconFill: <InventoryIconFill />,
    menuId: "inventory-menu",
    route: "/app/inventory",
  },
  {
    // name: "Warehouse",
    name: "Location",
    id: "warehouse-button",
    icon: <LocationIconNew />,
    iconFill: <LocationIconFill />,
    menuId: "warehouse-menu",
    route: "/app/warehouse",
  },
  {
    name: "Vendor",
    id: "vendor-button",
    icon: <VendorIconNew />,
    iconFill: <VendorIconFill />,
    menuId: "vendor-menu",
    route: "/app/vendors",
  },
  {
    name: "Purchase Order",
    id: "purchase-order-button",
    icon: <PONewIcon />,
    iconFill: <POIconFill />,
    menuId: "purchase-order-menu",
    route: "/app/purchase-orders?tab=all",
  },
  // {
  //   name: "Replenishment",
  //   id: "replenishment-button",
  //   icon: <ReplenishmentIcon />,
  //   menuId: "replenishment-menu",
  //   route: "/app/replenishment?tab=pending",
  // },
  {
    name: "Job",
    id: "job-button",
    menuId: "job-menu",
    icon: <JobPageIcon />,
    iconFill: <JobsIconFill />,
    route: "/app/jobs",
  },
  // {
  //   name: "Stores",
  //   id: "stores-button",
  //   icon: <StoreIcon />,
  //   menuId: "stores-menu",
  //   route: "/app/stores",
  // },
  // {
  //   name: "Plans",
  //   id: "pricing-button",
  //   menuId: "pricing-menu",
  //   icon: <ForecastIcon />,
  //   route: "/plans",
  // },
  // {
  //   name: "Forecast",
  //   id: "forecast-button",
  //   menuId: "forecast-menu",
  //   icon: <ForecastIcon />,
  //   route: "/app/forecast",
  //   items: [
  //     { name: "Forecast", route: `/app/forecast/blank` },
  //     {
  //       name: "Component Forecast",
  //       route: `/app/forecast/component`,
  //     },
  //     {
  //       name: "Open to buy Forecast",
  //       route: `/app/forecast/open-to-buy`,
  //     },
  //   ],
  // },
  // {
  //   name: "Pricing",
  //   id: "pricing-button",
  //   menuId: "pricing-menu",
  //   icon: <ForecastIcon />,
  //   route: "/pricing",
  // },
  // {
  // 	name: "Setting",
  // 	id: "setting-button",
  // 	menuId: "setting-menu",
  // 	route: "/settings",
  // },
  // {
  // 	name: "Setting",
  // 	id: "setting-button",
  // 	menuId: "setting-menu",
  // 	route: "/settings",
  // },
];

function NewHeaderForDrawer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);
  const router = useRouter();

  const handleClick = (event, menuItem) => {
    if (menuItem.items) {
      setAnchorEl(event.currentTarget);
    } else {
      router.push(menuItem.route);
    }
    setSelectedMenuItem(menuItem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    router.push(route);
    handleClose();
  };
  // console.log({ router: router });
  const isLinkActive = (route = "") => {
    const basePath = route.split("?")[0];
    // console.log({ basePath });
    const isActive = basePath !== "" && router.asPath.startsWith(basePath);
    return isActive;
    // return router.asPath === route;
  };

  const isMenuActive = (route = "") => {
    const basePath = route.split("?")[0];
    // console.log({ basePath });
    const isActive =
      // basePath
      //  !== "" && router.asPath.startsWith(basePath);

      basePath === router.asPath || basePath === router.asPath.split("?")[0];
    return isActive;
    // return router.asPath === route;
  };
  // console.log({
  //   currentPath: router.asPath,
  //   isMenuActive: isMenuActive("/app/products/publish?currentPage=1"),
  // });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",

        paddingLeft: "12px",
        flex: 1,
        // "&:hover": {
        //   background: "#4F44E0",
        // },
      }}
    >
      {menuItems.map((menuItem) => {
        if (Array.isArray(menuItem.items) && menuItem.items.length > 0)
          return (
            <React.Fragment key={menuItem.id}>
              <Button
                size="medium"
                disableRipple
                // LinkComponent={AppLink}
                // href={menuItem.route}
                id={menuItem.id}
                aria-controls={anchorEl ? menuItem.menuId : undefined}
                aria-haspopup={menuItem.items ? "true" : undefined}
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={(event) => handleClick(event, menuItem)}
                // onMouseEnter={(e) => handleClick(e, menuItem)}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "0px",
                  transition: "all 0.3s ease-in-out",

                  color: (theme) =>
                    // selectedMenuItem === menuItem &&
                    isLinkActive(menuItem.route) ? "#4F44E0" : "#2a2a2f",

                  "&:hover": {
                    color: "#4F44E0",
                    backgroundColor: "transparent",
                    transition: "all .3s ease-in-out",
                  },
                  px: 2,
                  pb: 4,
                  pt: 4,
                  mr: 1,

                  position: "relative",
                  textDecoration: "none",

                  "&::after": {
                    content: '""',
                    borderBottom: "4px solid #4F44E0",
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: "100%",
                    height: 4,
                    borderRadius: "none",
                    background: "transparent",
                    bottom: 0,
                    left: 0,
                    transformOrigin: "left",
                    transform: isLinkActive(menuItem.route)
                      ? "scaleX(1)"
                      : "scaleX(0)",
                    transition: "transform 0.3s ease-in-out",
                    // transition:
                    //   "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
                  },

                  "&:hover::after": {
                    transformOrigin: "left",
                    transform: "scaleX(1)",
                    // width: "100%",
                    // backgroundColor: "#4F44E0",
                  },

                  "& svg path": {
                    // stroke: isLinkActive(menuItem.route) && "#4F44E0",
                    fill: isLinkActive(menuItem.route) ? "#4F44E0" : "#2a2a2f",
                    transition: "all 0.3s ease-in-out",
                  },

                  "&:hover svg path": {
                    // stroke: "#4F44E0",
                    fill: "#4F44E0",
                    // stroke: isLinkActive(menuItem.route) ? "#222" : "#4F44E0",

                    transition: "all 0.3s ease-in-out",
                  },
                }}
                // endIcon={
                //   menuItem.items &&
                //   menuItem.items.length > 0 && <DrawerHeaderDropdownIcon />
                // }
                // startIcon={menuItem.icon && menuItem.icon}
                startIcon={
                  isLinkActive(menuItem.route)
                    ? menuItem.iconFill
                    : menuItem.icon
                }
              >
                {menuItem.name}
              </Button>

              {menuItem.items && (
                <Menu
                  id={menuItem.menuId}
                  MenuListProps={{
                    "aria-labelledby": menuItem.id,
                  }}
                  anchorEl={anchorEl}
                  // onMouseOver={Boolean(anchorEl && anchorEl.id === menuItem.id)}
                  // onMouseLeave={handleClose}
                  open={Boolean(anchorEl && anchorEl.id === menuItem.id)}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  // direction='bottom'
                  transitionDuration={700}
                  PaperProps={{
                    sx: {
                      mt: "5px",
                      boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 10px !important",
                    },
                  }}
                >
                  {menuItem.items.map((item, index) => (
                    <ListItemButton
                      disableRipple
                      key={index}
                      // LinkComponent={AppLink}
                      // slot={AppLink}
                      LinkComponent={AppLink}
                      href={item.route}
                      // disableGutters

                      // onClick={() =>
                      // 	handleMenuItemClick(item.route)
                      // }
                      sx={{
                        // ml: "24px",
                        mx: 2,
                        mb: "8px",
                        width: "300px",
                        // width: "100%",
                        "&:hover": {
                          color: "#4F44E0",
                          background: "#F5F4FD",
                          borderRadius: "7px",

                          "& svg path": {
                            fill: "#4F44E0",
                            // stroke: "#4F44E0",
                            transition: "all 0.3s ease-in-out",
                          },
                        },
                        background: isMenuActive(item.route) && "#F5F4FD",
                        borderRadius: "7px",
                        transition: "all 0.3s ease-in-out",
                        alignItems: "flex-start",
                        textWrap: "wrap",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          mr: -2,
                          mt: "10px",
                          "& svg path": {
                            // fill: (theme) =>
                            //   isMenuActive(item.route) &&
                            //   theme.palette.primary.main,
                            // stroke: (theme) =>
                            //   isMenuActive(item.route) &&
                            //   theme.palette.primary.main,
                          },
                        }}
                      >
                        {isMenuActive(item.route) ? item.iconFill : item.icon}
                        {/* <RightArrowIcon /> */}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ ml: -1 }}
                        primary={item.name}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#2a2a2f",

                            color: (theme) =>
                              isMenuActive(item.route) &&
                              theme.palette.primary.main,
                          },
                        }}
                        secondary={item.desc}
                        secondaryTypographyProps={{
                          sx: {
                            color: "#626266",
                            fontWeight: 400,
                            fontSize: "13px",
                            textWrap: "wrap",
                          },
                        }}
                      />
                      {/* <Typography
												sx={{
													display: "flex",
													flexDirection: "column",
													// marginLeft: "10px",
													marginY: "8px",
													fontSize: "18px",
													fontWeight: "600",
													color: "#222",

													color: (theme) =>
														isMenuActive(
															item.route,
														) &&
														theme.palette.primary
															.main,
												}}
											>
												{item.name}
												<span
													style={{
														color: "#626266",
														fontWeight: 400,
														fontSize: "16px",
														textWrap: "wrap",
													}}
												>
													{item.desc}
												</span>
											</Typography> */}
                    </ListItemButton>
                  ))}
                </Menu>
              )}
            </React.Fragment>
          );
        return (
          <React.Fragment key={menuItem.id}>
            <Button
              size="medium"
              disableRipple
              LinkComponent={AppLink}
              href={menuItem.route}
              id={menuItem.id}
              aria-controls={anchorEl ? menuItem.menuId : undefined}
              aria-haspopup={menuItem.items ? "true" : undefined}
              aria-expanded={anchorEl ? "true" : undefined}
              onClick={(event) => handleClick(event, menuItem)}
              sx={{
                textTransform: "capitalize",
                borderRadius: "0px",
                transition: "all 0.3s ease-in-out",
                fontSize: "16px",
                // fontWeight: "600",

                color: (theme) =>
                  // selectedMenuItem === menuItem &&
                  isLinkActive(menuItem.route) ? "#4F44E0" : "#2a2a2f",

                "&:hover": {
                  color: "#4F44E0",
                  backgroundColor: "transparent",
                  transition: "all .3s ease-in-out",
                },
                px: 2,
                pb: 4,
                pt: 4,
                mr: 1,

                position: "relative",
                textDecoration: "none",

                "&::after": {
                  content: '""',
                  borderBottom: "4px solid #4F44E0",
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: "100%",
                  height: 4,
                  borderRadius: "none",
                  background: "transparent",
                  bottom: 0,
                  left: 0,
                  transformOrigin: "left",
                  transform: isLinkActive(menuItem.route)
                    ? "scaleX(1)"
                    : "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },

                "&:hover::after": {
                  transformOrigin: "left",
                  transform: "scaleX(1)",
                },

                "& svg path": {
                  // stroke: isLinkActive(menuItem.route) && "#4F44E0",
                  fill: isLinkActive(menuItem.route) ? "#4F44E0" : "#2a2a2f",
                  transition: "all 0.3s ease-in-out",
                },

                "&:hover svg path": {
                  fill: "#4F44E0",

                  transition: "all 0.3s ease-in-out",
                },
              }}
              startIcon={
                isLinkActive(menuItem.route) ? menuItem.iconFill : menuItem.icon
              }
            >
              {menuItem.name}
            </Button>
          </React.Fragment>
        );
      })}
      <div style={{ flex: 1 }} />
    </Box>
  );
}

export default NewHeaderForDrawer;

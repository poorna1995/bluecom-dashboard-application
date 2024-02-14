import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PortraitIcon from "@mui/icons-material/Portrait";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";

const drawerWidth = 200;

export default function AppNavigationDrawer({ children, links }) {
  const router = useRouter();
  const handleNavigation = (link) => {
    router.push(link);
  };

  // const links = [
  // 	{
  // 		title: "Dashboard",
  // 		url: "/",
  // 		icon: <HomeIcon sx={{ mx: 2 }} />,
  // 	},
  // 	{
  // 		title: "Master Products List",
  // 		url: "/app/products/master",
  // 		icon: <ListIcon sx={{ mx: 2 }} />,
  // 	},
  // 	{
  // 		title: "All Products ",
  // 		url: "/app/products",
  // 		icon: <CategoryIcon sx={{ mx: 2 }} />,
  // 	},
  // 	{
  // 		title: "Profile",
  // 		url: "/onboarding/merchant",
  // 		icon: <PortraitIcon sx={{ mx: 2 }} />,
  // 	},
  // 	{
  // 		title: "Vendors",
  // 		url: "/onboarding/vendor",
  // 		icon: <StorefrontIcon sx={{ mx: 2 }} />,
  // 	},{
  // 		title: "Warehouse",
  // 		url: "/onboarding/vendor",
  // 		icon: <StorefrontIcon sx={{ mx: 2 }} />,
  // 	},
  //     {
  // 		title: "Purchase Order",
  // 		url: "/onboarding/vendor",
  // 		icon: <StorefrontIcon sx={{ mx: 2 }} />,
  // 	},
  // 	// {
  // 	// 	title: "Calendar",
  // 	// 	url: "/calendar",
  // 	// },
  // ];

  return (
    <Box sx={{ display: "flex", maxWidth: "100%" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {links.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => handleNavigation(item.url)}
            >
              <ListItemButton>
                {/* <HomeIcon/> */}
                <ListItemIcon>
                  {" "}
                  <item.icon sx={{ mx: 2 }} />
                </ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 1,
          minHeight: "100vh",
          maxWidth: "85%",
        }}
      >
        {" "}
        <Toolbar />
        {children}{" "}
      </Box>
    </Box>
  );
}

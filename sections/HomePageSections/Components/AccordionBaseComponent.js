import { Box } from "@mui/material";
import React from "react";
import TaskComponent from "./TaskComponent";
export default function AccordionBaseComponent() {
  const TaskCardsDetails = [
    {
      step: "Task",
      status: "Pending",
      title: "Onboarding to Bluecom.ai",
      description:
        "Use this personalized guide to get your store up and running.",
      stepsLeft: "5 steps",
      progressValue: "0",
      steps: [
        {
          label: "Connect Channel",
          description:
            "By following these simple steps, you can use Connect channel to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Connect Products",
          description:
            " Sync your products from multiple channels, single source of truth will be bluecom.ai ",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Connect Vendor",
          description:
            "Connect with vendors to access their products and manage inventory.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Connect Warehouses",
          description:
            "Sync your warehouse inventory to ensure accurate product availability.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Inventory ",
          description:
            "Keep track of inventory levels across all channels to avoid overselling and stockouts.",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
    {
      step: "Task",
      status: "Pending",
      title: "Product Information Mangement",
      description:
        "Manage product data across multiple channels and touchpoints for accurate and consistent information.",
      stepsLeft: "4 steps",
      progressValue: "0",
      steps: [
        {
          label: "Create",
          description: `Use this personalized guide to get your store up and running.`,
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "View",
          description:
            " Get an overview of all your products in one place, both list and grid view",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Publish",
          description: " Quickly publish your products to multiple channels",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Product Description",
          description:
            "View detailed product description include description, images, inventory, variants",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
    {
      step: "Task",
      status: "Pending",
      title: "Inventory Management",
      description:
        "Real-time inventory visibility, demand forecasting, and inventory management process optimization to improve efficiency and reduce costs.",
      stepsLeft: "5 steps",
      progressValue: "0",
      steps: [
        {
          label: "Connect channel",
          description: `Use this personalized guide to get your store up and running.`,
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Products",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Vendor",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Warehouses",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Inventory ",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
    {
      step: "Task",
      status: "Pending",
      title: "Vendor  Management",
      description:
        "Optimize supply chain by managing relationships with suppliers.",
      stepsLeft: "4 steps",
      progressValue: "0",
      steps: [
        {
          label: "Vendor Onboarding",
          description: `Simplify the onboarding process for new vendors`,
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "View",
          description:
            "Store all vendor information in one centralized database for easy access and management.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Add Products to Vendor",
          description:
            "Easily add and manage products associated with each vendor",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: " Vendor Detail",
          description:
            "Easily add and manage products associated with each vendor",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
    {
      step: "Task",
      status: "Pending",
      title: "Warehouse  Management",
      description:
        "Real-time inventory visibility across multiple locations and warehouses to optimize inventory management and improve order fulfillment.",
      stepsLeft: "5 steps",
      progressValue: "0",
      steps: [
        {
          label: "Connect channel",
          description: `Use this personalized guide to get your store up and running.`,
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Products",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Vendor",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Warehouses",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Sync Inventory ",
          description:
            "Use this personalized guide to get your store up and running.",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
    {
      step: "Task",
      status: "Pending",
      title: "Purchase Order (PO) Management",
      description:
        "Effectively manage your purchase orders and ensure timely delivery of goods while maintaining accurate inventory levels.",
      stepsLeft: "5 steps",
      progressValue: "0",
      steps: [
        {
          label: "Create",
          description: `Easily create new purchase orders with all relevant details, including vendor information, product line items, and delivery date.`,
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "View",
          description:
            "Get an overview of all purchase orders in one place, including status, expected delivery dates, and products ordered.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Update Inventory Levels",
          description:
            "Manually update inventory levels when products are delivered.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Cancel",
          description:
            "Cancel purchase orders that are no longer needed or have been placed in error.",
          button: "Complete",
          // remainingTime: "~2min",
        },
        {
          label: "Delete",
          description:
            "Permanently delete purchase orders that are no longer required.",
          button: "Complete",
          // remainingTime: "~2min",
        },
      ],
    },
  ];
  const TaskCards = TaskCardsDetails.map((card, index) => {
    return <TaskComponent card={card} key={index} index={index} />;
  });
  return <Box>{TaskCards}</Box>;
}

import { Box, Container } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import BaseLayout from "layouts";
import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import MasterProductsPageSection from "sections/ProductsPageSection/MasterProductsPageSection";
import ProductsPageTable from "sections/ProductsPageSection/ProductsPageTable";

export default function MasterPage() {
  return (
    <DrawerLayout>
      <MasterProductsPageSection />
    </DrawerLayout>
  );
}

const tableData = [
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
  {
    "Master Item ID": "A0B1C024",
    "Master Product ID": "39235",
    "Channel ID": "16415",
    "Channel Item": "ANTILOP",
    "Channel Product ID": "10059501",
  },
];

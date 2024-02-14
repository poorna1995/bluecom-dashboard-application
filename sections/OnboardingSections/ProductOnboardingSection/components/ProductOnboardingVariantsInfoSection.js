import { Box, Checkbox, Grid } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect } from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

/**
 * 
 * {[
    {
        "wh_id": "75970904346",
        "available": "45"
    }
]}  
 */
export default function ProductOnboardingVariantsInfoSection({
  items,
  warehouseCount,
  containerStyles,
}) {
  // create a function that will sum the available items
  const sumItems = (arr = []) => {
    let sum = 0;
    Array.isArray(arr) &&
      arr.forEach((item) => {
        sum += (item.available && parseInt(item.available)) || 0;
      });
    return sum;
  };

  const columnData = [
    {
      field: "title",
      headerName: "Variant",
      value: (params) => params.value,
    },
    {
      filed: "inventory",
      headerName: "Inventory",
      renderCell: (params) => (
        <span>
          {sumItems(params.row.inventory) || 0} available at {warehouseCount}{" "}
          locations
        </span>
      ),
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
  ];

  // console.log({
  // 	items,
  // 	countByWHID: countByWHID(items),
  // 	sum: sumByAvailable(items),
  // });

  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      // sx={{
      // 	padding: "16px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // }}
    >
      <SectionTitleText
        sx={{
          paddingBottom: "16px",
          // borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        Variants ({items.length})
      </SectionTitleText>

      <MuiBaseDataGrid
        containerStyles={{
          maxHeight: "500px",
        }}
        data={items}
        columnDefData={columnData}
        rowIdkey={"title"}
      />
    </ProductOnboardingSectionContainer>
  );
}

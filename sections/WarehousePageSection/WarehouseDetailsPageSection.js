import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection";

export default function WarehouseDetailsPageSection() {
  const router = useRouter();
  // const { currentUser } = useSelector(mapState);
  const productId = router.query.pageTypeID;

  const [data, setData] = useState({});

  const productsData = [
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
  ];

  const product_desc = "Section for adding warehouse description";
  const staticData = [
    {
      label: "Summary",
      component:
        product_desc || "No description added, add an empty state for this, ",
    },
    {
      label: "Inventory",
      component: <MuiBaseTable newData={productsData} />,
    },
  ];
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    if (data) {
      setTabsData(staticData);
    }
  }, [data]);
  return (
    <div>
      <AppDetailsPageSection
        title={"Location detail page"}
        tabsData={tabsData}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import LineChart from "components/Common/Graph/LineChart";

const data = [
  {
    title: "Option 1",

    value: "",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
  {
    title: "Option 2",
    key: "channelName",
    value: "",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
  {
    title: "Option 3",
    key: "channelName",
    value: "",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
  {
    title: "Option 4",
    key: "channelName",
    value: "",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
];
const columnData = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "Year Mon",
    headerName: "Year Mon",
    headerAlign: "center",
    align: "center",
  },

  {
    field: "Option1",
    headerName: "Option1",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Option2",
    headerName: "Option2",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Option3",
    headerName: "Option3",
    flex: 0.5,
  },
  {
    field: "Option4",
    headerName: "Option4",
    // minWidth: "140px",
    flex: 1,
  },
  {
    field: "Avg Forecast",
    headerName: "Avg Forecast",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
  },
  {
    field: "LB Forecast",
    headerName: "LB Forecast",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "UB Forecast",
    headerName: "UB Forecast",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Actuals",
    headerName: "Actuals",
    headerAlign: "center",
    align: "center",
  },
];

const rowData = [
  {
    id: 1,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 2,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 3,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 4,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 5,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 6,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 7,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 8,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 9,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 10,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 11,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
  {
    id: 12,
    "Year Mon": "2022-03",
    Option1: "NTP",
    Option2: "MLS",
    Option3: "PHOENIX SUNS",
    Option4: "90130-Las Vegas Raiders Women's Nike Team Color - Black",
    "Avg Forecast": "192",
    "LB Forecast": "155",
    "UB Forecast": "155",
    Actuals: "",
  },
];

export default function BlankLevelForecastPageSections() {
  const [filter, setFilter] = React.useState([]);

  const handleChange = (event, title) => {
    // set the filter value inside the filter array as
    // {
    // 	title: title,
    // 	value: event.target.value

    // }
    // if the title is already present in the filter array, then update the value
    // else add the new object to the filter array then update the value and remove the copied element
    const filterIndex = filter.findIndex((item) => item.title === title);
    if (filterIndex !== -1) {
      const copiedFilter = [...filter];
      copiedFilter[filterIndex].value = event.value;
      setFilter(copiedFilter);
    }
  };
  const dataWithLabel = data.map((item) => {
    const { title, options } = item;
    const optionWithLabel = options.map((option) => {
      return {
        label: option,
        value: option,
      };
    });
    return {
      ...item,
      options: optionWithLabel,
    };
  });

  const maxHeight = typeof window !== "undefined" && window.innerHeight - 180;
  const maxWidth = typeof window !== "undefined" && window.innerWidth - 320;
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          // position: "fixed",
          top: "98px",
          zIndex: 100,
          backgroundColor: "white",
          px: "16px",
          mt: "8px",

          borderBottom: "1px solid #e0e0e0",

          // width: maxWidth,
          // height: "auto"
        }}
      >
        <SectionTitleText sx={{ fontSize: "28px", py: "2px", mt: "8px" }}>
          Forecast
        </SectionTitleText>
        <Grid container spacing={2} sx={{ pb: 1 }}>
          {dataWithLabel.map((item, index) => (
            <Grid item md={3} key={index}>
              <FormSelectInput
                title={item.title}
                // value={item.value}
                options={item.options}
                onChange={(e) => handleChange(e, item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ overflowY: "scroll" }}>
        <Box sx={{ px: "16px", mt: "24px" }}>
          <LineChart />
        </Box>

        <Box sx={{ px: "16px", mt: "12px" }}>
          <MuiBaseDataGrid
            rowHeight={40}
            sx={{
              borderBottom: "none",
            }}
            rowIdkey={"id"}
            columns={columnData}
            rows={rowData}
            checkboxSelection={false}
            containerStyles={{ height: maxHeight }}
            colHeaderHeight={20}
            hideFooter={true}
          />
        </Box>
      </Box>
    </>
  );
}

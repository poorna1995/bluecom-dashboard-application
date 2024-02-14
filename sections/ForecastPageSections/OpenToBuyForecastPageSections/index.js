import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import Filter from "components/Common/Icons/filter";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";

export default function OpenToBuyForecastPageSections() {
  const data = [
    {
      title: "Option 1",

      value: "",
      options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
    },
  ];
  const tableData = [
    {
      id: 1,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 2,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 3,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 4,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 5,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 6,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 7,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 8,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 9,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
    {
      id: 10,
      year: 2023,
      department: "NTP",
      source: "Component Forecast CY",
      jan: 725579,
      feb: 725579,
      mar: 725579,
      apr: 725579,
      may: 725579,
      jun: 725579,
      jul: 725579,
      aug: 725579,
      sep: 725579,
      oct: 725579,
      nov: 725579,
      dec: 725579,
    },
  ];

  const columnsData = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 70,
    // },
    {
      field: "year",
      headerName: "YEAR",
    },

    {
      field: "department",
      headerName: "DEPARTMENT",
      flex: 1,
      // minWidth: "150px",
    },
    {
      field: "source",
      headerName: "SOURCE",
      flex: 1,
      // minWidth: "120px",
    },
    {
      field: "jan",
      headerName: "JAN",
    },
    {
      field: "feb",
      headerName: "FEB",
    },
    {
      field: "mar",
      headerName: "MAR",
    },
    {
      field: "apr",
      headerName: "APR",
    },
    {
      field: "may",
      headerName: "MAY",
    },
    {
      field: "jun",
      headerName: "JUN",
    },
    {
      field: "jul",
      headerName: "JUL",
    },
    {
      field: "aug",
      headerName: "AUG",
    },
    {
      field: "sep",
      headerName: "SEP",
    },
    {
      field: "oct",
      headerName: "OCT",
    },
    {
      field: "nov",
      headerName: "NOV",
    },
    {
      field: "dec",
      headerName: "DEC",
    },
  ];

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

  return (
    <>
      <Box
        sx={{
          display: "flex",

          flexDirection: "column",
          backgroundColor: "#fff",
          position: "sticky",
          top: "98px",

          zIndex: 1,
        }}
      >
        <Box>
          <SectionTitleText sx={{ fontSize: "28px", px: "16px", mt: "10px" }}>
            Open to Buy Forecast
          </SectionTitleText>
        </Box>
        {/* <Box>
          <OutlinedButton startIcon={<Filter />}>Hide Filter</OutlinedButton>
        </Box> */}

        <Grid container spacing={2} sx={{ px: "16px", pb: 1 }}>
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
      <Box sx={{ px: "16px", mt: "12px" }}>
        <MuiBaseDataGrid
          rowIdkey={"id"}
          rowHeight={40}
          data={tableData}
          columns={columnsData}
          checkboxSelection={false}
          hideFooter={true}
          containerStyles={{
            height: "calc(100vh - 300px)",
          }}
        />
      </Box>
    </>
  );
}

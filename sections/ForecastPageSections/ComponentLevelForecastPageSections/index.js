import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";

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
  {
    title: "Option 5",
    key: "channelName",
    value: "",
    options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
  },
];

const BaseData = [
  {
    title: "Forecast",
    description: "Avg Forecast",
    date: "2022-10-31 to 2022-12-30",
    label: "28883342",
  },
  {
    title: "Recommendation",
    description: "Avg Recommended Buy ",
    date: "2022-10-31 to 2022-12-30",
    label: "2467890",
  },
];

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

export default function ComponentLevelForecastPageSections() {
  const [filter, setFilter] = React.useState([]);

  const handleChange = (event, title) => {
    const filterIndex = filter.findIndex((item) => item.title === title);
    if (filterIndex !== -1) {
      const copiedFilter = [...filter];
      copiedFilter[filterIndex].value = event.value;
      setFilter(copiedFilter);
    }
  };

  const columnData = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "SKU",
      headerName: "SKU",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "Option1",
      headerName: "Option1",
    },
    {
      field: "Option2",
      headerName: "Option2",
      width: 180,
    },
    {
      field: "Qty In-stock",
      headerName: "Qty In-stock",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Available to Sell",
      headerName: "Available to Sell",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l10",
      headerName: "l10",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l20",
      headerName: "l20",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l30",
      headerName: "l30",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l60",
      headerName: "l60",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l90",
      headerName: "l90",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l365",
      headerName: "l365",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "On PO",
      headerName: "On PO",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "On PO 365",
      headerName: "On PO 365",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "Comp Forecast Avg",
      headerName: "Comp Forecast Avg",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "Recommended Buy Avg OO",
      headerName: "Recommended Buy Avg OO",
      headerAlign: "center",
      align: "center",
      width: 210,
    },
    {
      field: "Self Off",
      headerName: "Self Off",
      headerAlign: "center",
      align: "center",
    },
  ];

  const rowData = [
    {
      id: 1,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 2,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 3,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 4,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 5,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 6,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 7,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 8,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 9,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 10,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 11,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 12,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 13,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 14,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
    {
      id: 15,
      SKU: "635 IDR",
      Title: "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
      Option1: "NBA",
      Option2: "New England Patriots",
      "Qty In-stock": "1434",
      "Available to Sell": "38318",
      l10: "3807",
      l20: "39815",
      l30: "2174",
      l60: "39534",
      l90: "238",
      l365: "l365",
      "On PO": "238",
      "On PO 365": "238",
      "Comp Forecast Avg": "238",
      "Recommended Buy Avg OO": "238",
      "Self Off": "238",
    },
  ];

  const maxHeight = typeof window !== "undefined" && window.innerHeight - 210;
  const minWidth = typeof window !== "undefined" && window.innerWidth - 310;
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "98px",
          zIndex: 100,
          backgroundColor: "white",
          px: "16px",
          // mt: "24px",
          mb: "8px",
          // width: minWidth,
        }}
      >
        <SectionTitleText sx={{ fontSize: "28px", py: "2px", mt: "8px" }}>
          Recommended Buy
        </SectionTitleText>
        <Grid container spacing={2} sx={{ pb: 1 }}>
          {dataWithLabel.map((item, index) => (
            <Grid item md={2.4} key={index}>
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
      <Grid container spacing={4} sx={{ padding: "16px" }}>
        {BaseData.map((item, index) => (
          <Grid item md={4} key={index}>
            <BaseCard
              sx={{
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid #DADEE6",
                cursor: "pointer",
                "&:hover": {
                  background: "rgba(256,256,256,0.2)",
                },
                boxShadow: "none",
              }}
            >
              <SectionTitleText
                sx={{
                  mb: "12px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                {item.title}
              </SectionTitleText>
              <Box sx={{ display: "flex" }}>
                <Grid item xs={12}>
                  {" "}
                  <DescriptionText
                    sx={{
                      mb: "12px",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {item.description}
                  </DescriptionText>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {item.date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      backgroundColor: "#FFE5E7",
                      width: "120px",
                      height: "50px",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#E4000C",
                        fontWeight: "600",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </BaseCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ px: "16px", mt: "8px" }}>
        <MuiBaseDataGrid
          rowIdkey={"id"}
          columns={columnData}
          rows={rowData}
          checkboxSelection={false}
          // containerStyles={{ height: maxHeight }}
          rowHeight={40}
          hideFooter={true}
        />
      </Box>
    </>
  );
}

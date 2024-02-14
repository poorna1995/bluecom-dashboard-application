import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  series: [
    {
      name: "Avg Forecast",
      data: [null, null, null, null, null, null, 30, 28, 36, 32, 32, 33],
    },
    {
      name: "Actuals",
      data: [17, 13, 13, 15, 21, 20, 18, 23, 18, 16, 20, 16],
    },
    {
      name: "LB Forecast",
      data: [null, null, null, null, null, null, 12, 9, 7, 8, 9, 8],
    },
    {
      name: "UB Forecast",
      data: [null, null, null, null, null, null, 6, 7, 3, 2, 8, 9],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",

      toolbar: {
        show: false,
      },
      background: "#ffff",
    },

    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    stroke: {
      // curve: "smooth",
      width: 1,

      // width: [5, 7, 5],
      curve: "straight",
      dashArray: [8, 0, 8, 8],
    },
    title: {
      text: "Forecast",
      align: "left",
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],

    grid: {
      show: true,
      borderColor: "#000",
      row: {
        // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        // opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: true,
        color: "#78909C",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Sales Qty",
      },
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      min: 0,
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  },
};
function LineChart() {
  const [state, setState] = useState(chartData ?? {});

  useEffect(() => {
    setState(chartData);
  }, []);

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;

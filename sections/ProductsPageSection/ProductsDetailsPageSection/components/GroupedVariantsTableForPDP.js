import React, { useState } from "react";
import CustomTableWithDynamicGrouping from "../../../OnboardingSections/NewProductOnboardingSections/components/CustomGroupedTable/CustomTableWithDynamicGrouping";
import AppImage from "components/Common/AppImage";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import { groupBy, uniqBy } from "lodash";
import CustomTableForGroupedVariants from "./CustomTableForGroupedVariants";
import MultipleSelect from "components/Common/Inputs/SelectInput/MultipleSelect";
import { Box, Typography } from "@mui/material";
import MRTGroupedTableForVariants from "./MRTGroupedTableForVariants";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import VariantsMobileView from "./MobileViewComponents/VariantsMobileView";

export default function GroupedVariantsTableForPDP({ tableData }) {
  function convertStringArrayToObjectArray(array = []) {
    const getOptions =
      Array.isArray(array) && array.map((item) => item.options).flat();
    const optionNames = getOptions.map((item) => item.name);
    // console.log({ getOptions, optionNames });
    const groupedByName = groupBy(getOptions, "name");
    // console.log({ groupedByName });

    return { options: getOptions };
  }

  const selectedOptionsFromItems =
    convertStringArrayToObjectArray(tableData).options;
  const groupSelectedOptions = groupBy(selectedOptionsFromItems, "name");
  console.log({ groupSelectedOptions });
  const getSelectedOptions = Object.entries(groupSelectedOptions).map(
    ([name, options]) => {
      return {
        name,
        options: uniqBy(options.map((item) => item.value)).join(", "),
      };
    }
  );

  const selectedOptions = getSelectedOptions;
  const columnSelected =
    Array.isArray(selectedOptions) && selectedOptions.map((item) => item.name);
  const columnsFromColumnGroups = selectedOptions.map((item) => {
    return {
      accessorKey: item.name,
      header: item.name,
      cell: (info) => info.getValue(),
      size: 120,
    };
  });
  const columns = [
    ...columnsFromColumnGroups,
    {
      accessorKey: "item_display_image",
      enableGrouping: false,
      header: "Image",
      cell: ({ cell }) => (
        <AppImage
          src={cell.getValue()}
          alt="item image"
          width={40}
          height={40}
          sx={{
            cursor: "pointer",
            borderRadius: "5px",
            border: "1px solid rgb(0,0,0,0.1)",
          }}
          // onClick={(e) =>
          // 	handleOpenDialog(e, info.row.original.master_item_id)
          // }
        />
      ),
      size: 100,
    },
    {
      accessorKey: "item_title",
      header: "Variant Title",
      cell: (info) => (
        <>
          {info.getValue()}

          {/* {console.log({ info })} */}
        </>
      ),
      enableGrouping: false,
      size: 100,
    },
    {
      accessorKey: "sku",
      header: "Variant SKU",
      // id: "sku",
      // cell: (info) => info.getValue(),
      enableGrouping: false,
      size: 100,
    },
    {
      accessorKey: "item_unit_retail_price",
      header: "Retail Price",
      // id: "item_unit_retail_price",
      cell: ({ cell }) => (
        <RenderCurrency
          value={cell.row.original.item_unit_retail_price}
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "open sans",
          }}
        />
      ),
      size: 100,
      // aggregatedCell: ({ cell }) => (
      //   <RenderCurrency
      //     value={cell.getValue()}
      //     sx={{
      //       fontSize: "16px",
      //       fontWeight: 500,
      //     }}
      //   />
      // ),
      // aggregationFn: "mean",
    },
    {
      accessorKey: "item_unit_cost_price",
      header: "Cost Price",
      align: "right",
      id: "item_unit_cost_price",
      enableGrouping: false,

      cell: ({ cell }) => (
        <RenderCurrency
          value={cell.getValue()}
          sx={{
            fontSize: "15px",
            fontWeight: 500,
          }}
        />
      ),
      size: 100,
      // aggregatedCell: ({ cell }) => (
      //   <RenderCurrency
      //     value={cell.getValue()}
      //     sx={{
      //       fontSize: "16px",
      //       fontWeight: 500,
      //     }}
      //   />
      // ),
      // aggregationFn: "mean",
      // <RenderTextInput
      // 	// defaultValue={info.getValue()}
      // 	value={info.row.original.item_unit_cost_price}
      // 	onChange={(e) =>
      // 		handleChangeValue(
      // 			e,
      // 			"item_unit_cost_price",
      // 			info.row.original.master_item_id,
      // 		)
      // 	}
      // 	onBlur={(e) =>
      // 		handleBlurValue(
      // 			e,
      // 			"item_unit_cost_price",
      // 			info.row.original.master_item_id,
      // 		)
      // 	}
      // />
    },
    // ...columnsData,
  ];

  const customTableData =
    Array.isArray(tableData) &&
    tableData.map((item) => {
      const { options } = item;
      // const mappedOptions = options.map((it) => {
      // 	return { ...item, ...it };
      // });

      const mapOptions = options.map((it) => {
        const { name, value } = it;
        return { name, value };
      });

      const groupedOptions = groupBy(mapOptions, "name");
      const mapIt = Object.entries(groupedOptions).map(([key, value]) => {
        const getVal = value.map((it) => it.value)[0];
        return { [key]: getVal };
      });
      // extract all the objects from the array and merge them into one object
      const merged = Object.assign({}, ...mapIt);
      // console.log({ merged });
      return { ...item, ...merged };
    });

  console.log({ tableData });

  //  we have removed the condition for auto grouping on load
  //  if required in future we can uncomment the "columnSelected" field in useState
  const [columnGroups, setColumnGroups] = useState(
    // columnSelected ??
    []
  );

  const handleGroupDataChange = (e) => {
    const groups = e.map((item) => item.value);

    setColumnGroups(groups);
  };
  const columnGroupWithLabels = columnGroups.map((colGroup) => {
    return {
      label: colGroup,
      value: colGroup,
    };
  });
  const optionsToShow = selectedOptions.map((option) => {
    return {
      label: option.name,
      value: option.name,
    };
  });

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
            pb: 2,
          }}
        >
          <Typography
            sx={{
              mr: {
                xs: 1,
                sm: 1,
                md: 2,
              },
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "24px",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            View By:
          </Typography>
          <MultipleSelect
            value={columnGroupWithLabels}
            options={optionsToShow}
            onChange={(e) => handleGroupDataChange(e)}
            containerStyles={{
              maxWidth: "400px",
              minWidth: "280px",
              paddingTop: "0px",
            }}
            placeholder="Select Columns to Group"
          />
        </Box>

        <CustomTableForGroupedVariants
          columnGroups={columnGroups}
          columnsData={columns}
          tableData={customTableData}
        />
        {/* <MRTGroupedTableForVariants
        columnGroups={columnGroups}
        columnsData={columns}
        tableData={customTableData}
      /> */}
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        <VariantsMobileView tableData={tableData} />
      </Box>
    </>
  );
}

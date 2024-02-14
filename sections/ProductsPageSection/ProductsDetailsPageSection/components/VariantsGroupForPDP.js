import { Box, Chip, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import VariantChipGroup from "components/Common/Chip/VariantChipGroup";
import { groupBy, uniqBy } from "lodash";
import React from "react";

export default function VariantsGroupForPDP({ tableData = [] }) {
  function convertStringArrayToObjectArray(array = []) {
    const getOptions =
      Array.isArray(array) && array.map((item) => item.options).flat();
    // const optionNames = getOptions.map((item) => item.name);
    // console.log({ getOptions, optionNames });
    // const groupedByName = groupBy(getOptions, "name");
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
  const getOptionsArray = (options) => {
    // removethe spaces from the options and split them by comma and do not have empty strings
    // remove any empty arrays

    // replace all spaces in empty strings not in strings with values
    // const replace

    const removedSpacesFromOptions = options.replace(/\s/g, "");

    // console.log({ options });
    // const optionsArray = options.split(",").filter((option) => option !== "");
    const optionsArray =
      // options
      removedSpacesFromOptions.split(",").filter((option) => option !== "");

    // const optionsArray = options.split(",");
    return optionsArray;
  };
  return (
    <div>
      {Array.isArray(selectedOptions) &&
        selectedOptions.length > 0 &&
        selectedOptions.map((item, index) => {
          const { name, options } = item;
          // console.log({ selectOption: item });
          const optionsArray =
            // options;
            getOptionsArray(options);
          return (
            <div key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                  },
                  flex: 1,
                  marginTop: "16px",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  pb: 2,
                  pl: 2,
                  gap: {
                    xs: 2,
                    sm: 2,
                    md: 8,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "24px",
                    // flex: 1,
                    // background: "#f4f4f4",
                    minWidth: "150px",
                    mr: 8,
                    p: 1,
                    color: (theme) => theme.palette.grey[800],
                    height: "42px",
                  }}
                >
                  {item.name}
                </Typography>
                <VariantChipGroup data={optionsArray} />
                {/* <div
                  style={{
                    flex: 1,
                    gap: 16,
                    display: "flex",
                    flexWrap: "wrap",
                    rowGap: 16,
                  }}
                >
                  {optionsArray.map((it, id) => {
                    return (
                      <Chip
                        key={id}
                        label={it}
                        sx={{
                          // mr: 2,
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: (theme) => theme.palette.grey[800],
                          p: "10px 18px",
                          height: "42px",
                          borderRadius: "54px",
                          // mt: 2,
                        }}
                      />
                    );
                  })}
                </div> */}
              </Box>
            </div>
          );
        })}
    </div>
  );
}

import { Grid } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { uniqBy } from "lodash";
export default function FiltersComponent({ usedInPath }) {
  const router = useRouter();
  const chName = router.query.channelName;
  const productStatus = router.query.productStatus;
  const channelName = {
    label: chName,
    value: chName,
  };

  const status = {
    label: productStatus,
    value: productStatus,
  };
  const [selectedValues, setSelectedValues] = useState([]);
  // useEffect(() => {
  // 	setChannelName({ label: chName, value: chName });
  // 	setStatus({ label: productStatus, value: productStatus });
  // }, [chName, productStatus]);
  // const handleChangeChannelName = (e) => {
  // 	setChannelName(e);
  // 	router.push(`/app/products?channelName=${e.value}`);
  // };
  // const handleChangeStatus = (e) => {
  // 	setStatus(e);
  // 	router.push(`/app/products?productStatus=${e.value}`);
  // };
  const uniqueSelectedValues = uniqBy(selectedValues, "filterTitle");

  const newFilters =
    Array.isArray(uniqueSelectedValues) &&
    selectedValues
      .map((item) => {
        const { filterTitle, valueSelected } = item;
        return `${filterTitle}=${valueSelected}`;
      })
      .flat();
  const joinThePath = Array.isArray(newFilters) && newFilters.join("&");

  const handleValueChanges = (e, item) => {
    setSelectedValues((prevState) => {
      const data = prevState.filter((it) => item.key !== it.filterTitle);
      return [
        ...data,
        {
          filterTitle: item.key,
          valueSelected: e.value,
          // [field]: value,
        },
      ];
    });
  };
  useEffect(() => {
    router.push(`${router.pathname}/?${joinThePath}`);
  }, [selectedValues]);
  console.log({ router });
  const data = [
    {
      title: "Status",
      key: "productStatus",
      value: status,
      options: [
        { label: "draft", value: "draft" },
        { label: "active", value: "active" },
      ],
    },
    {
      title: "Channel Name",
      key: "channelName",
      value: channelName,
      options: [
        { label: "shopify", value: "shopify" },
        { label: "native", value: "native" },
      ],
    },
  ];

  return (
    <div>
      <Grid container spacing={2} sx={{ px: "16px", pb: 1 }}>
        {data.map((item, index) => (
          <Grid item md={12} key={index}>
            <FormSelectInput
              title={item.title}
              placeholder={item.title}
              value={item.value}
              onChange={(e) => handleValueChanges(e, item)}
              options={item.options}
              containerStyles={{
                marginTop: "0px",
                paddingTop: "0px",
              }}
            />
          </Grid>
        ))}
        {/* <Grid item md={3}>
					<FormSelectInput
						title={"Channel Name"}
						placeholder="Channel name"
						value={channelName}
						onChange={(e) => handleChangeChannelName(e)}
						options={[{ label: "shopify", value: "shopify" }]}
					/>
				</Grid>
				<Grid item md={3}>
					<FormSelectInput
						title={"Status"}
						placeholder="Status"
						value={status}
						onChange={(e) => handleChangeStatus(e)}
						options={}
					/>
				</Grid> */}
      </Grid>
    </div>
  );
}

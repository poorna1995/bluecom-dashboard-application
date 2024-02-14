import {
  Box,
  Chip,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { setNewProductOptions } from "redux/products/productsSlice";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";
import ProductOptionsItem from "./ProductOptionsItem";

const options = [
  { label: "Size", value: "Size" },
  { label: "Color", value: "Color" },
  {
    label: "Material",
    value: "Material",
  },
  { label: "Style", value: "Style" },
];

const mapState = ({ productsData }) => ({
  selectedOptions: productsData.newProductData.productOptions,
});
export default function ProductOnboardingOptionsInfoSection({
  hasOptions,
  setHasOptions,
  handleAddAnotherOption,
  handleRemoveOption,
  productOptions,
  handleChangeProductOptionsFields,
  handleChangeProductOptionsName,
  handleEditButtonClick,
  containerStyles,
}) {
  const ref = useRef();
  const [fields, setFields] = useState([{ id: 0, value: null }]);
  const { selectedOptions } = useSelector(mapState);
  const dispatch = useDispatch();
  function handleChange(event, id, index) {
    const values = [...productOptions[index].fields];
    // values[id].value = event.target.value;
    let clonedObject = { ...values[id] };
    clonedObject.value = event.target.value;

    // const data = values.filter((item) => item.id !== id);
    setFields([...values, clonedObject]);
    handleChangeProductOptionsFields(event, id, index, values);
  }

  function handleAdd(e, index) {
    const values = [...productOptions[index].fields];
    // const values = [...fields];
    values.push({ id: 0, value: null });
    setFields(values);
    handleChangeProductOptionsFields(e, 0, index, values);
  }
  function handleRemove(e, i, index) {
    const values = [...productOptions[index].fields];
    values.splice(i, 1);
    setFields(values);
    handleChangeProductOptionsFields(e, i, index, values);
  }

  const allOptions = productOptions.map((option) => {
    return {
      ...option,
      done: false,
    };
  });
  const [optionsDone, setOptionsDone] = useState(productOptions);
  useEffect(() => {
    setOptionsDone(productOptions);
  }, [productOptions]);
  const handleClickDone = (e, index) => {
    const addValues = [...optionsDone];
    const getOptions = optionsDone[index];
    addValues.splice(index, 1);
    dispatch(setNewProductOptions({ ...getOptions }));
    // handleRemove(e, index, index);
    handleRemoveOption(index);
    setOptionsDone(addValues);
  };
  console.log({ optionsDone, allOptions, productOptions });
  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      // sx={{
      // 	padding: "16px",
      // 	// paddingBottom: "64px",
      // 	// maxWidth: "600px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // }}
    >
      <SectionTitleText>Options</SectionTitleText>
      <DescriptionText>
        <CheckboxInput
          label="This product has options, like size
      or color"
          value={hasOptions}
          setValue={setHasOptions}
        />
      </DescriptionText>
      {hasOptions && (
        <>
          {Array.isArray(selectedOptions) &&
            selectedOptions.length > 0 &&
            selectedOptions.map((item, index) => {
              // if (item.done === true)
              return (
                <div key={index}>
                  <ProductOptionsItem
                    item={item}
                    handleEdit={handleEditButtonClick}
                  />
                </div>
              );
            })}
          {Array.isArray(productOptions) &&
            productOptions.length > 0 &&
            optionsDone.map((item, index) => {
              // if (!item.done)
              return (
                <div key={index}>
                  {console.log({ item })}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <FormSelectInput
                      title={`Option name`}
                      containerStyles={{
                        marginTop: "8px",
                        marginBottom: "8px",
                        maxWidth: "600px",
                        paddingTop: "8px",
                      }}
                      options={options}
                      value={{
                        label: item.name,
                        value: item.name,
                      }}
                      onChange={(e, newValue) =>
                        handleChangeProductOptionsName(e, index, newValue)
                      }
                    />
                    {productOptions.length > 0 && (
                      <IconButton
                        onClick={handleRemoveOption}
                        sx={{
                          marginTop: "48px",
                          marginLeft: "16px",
                        }}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    )}
                  </div>
                  {Array.isArray(item.fields) &&
                    item.fields.map((field, idx) => {
                      return (
                        <div
                          key={`${field}-${idx}`}
                          style={{
                            paddingBottom: "8px",
                          }}
                        >
                          <OutlinedInput
                            value={field.value || ""}
                            onChange={(e) => handleChange(e, idx, index)}
                            sx={{
                              maxWidth: "600px",
                            }}
                            placeholder="Enter Option Value"
                            fullWidth
                            ref={ref}
                            // endAdornment={
                            // }
                          />
                          <>
                            {" "}
                            {item.fields.length > 1 && field.value && (
                              // field.value.length > 0 && (
                              <IconButton
                                onClick={(e) => handleRemove(e, idx, index)}
                                sx={{
                                  marginLeft: "16px",
                                }}
                              >
                                <MdDeleteOutline />
                              </IconButton>
                            )}
                          </>
                        </div>
                      );
                    })}
                  <Stack
                    // direction={"row"}
                    // alignItems="center"
                    // maxWidth={"xs"}
                    sx={{ maxWidth: "300px" }}
                  >
                    <OutlinedButton
                      onClick={(e) => handleAdd(e, index)}
                      style={{
                        marginTop: "8px",
                        textTransform: "capitalize",
                      }}
                    >
                      Add Another value
                    </OutlinedButton>

                    <PrimaryButton
                      sx={{ marginTop: "16px" }}
                      onClick={(e) => handleClickDone(e, index)}
                      disabled={!item.name}
                    >
                      Done
                    </PrimaryButton>
                  </Stack>
                </div>
              );
            })}
          <div
            style={{
              padding: "",
              marginTop: "16px",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              paddingTop: "8px",
            }}
          >
            <OutlinedButton
              onClick={handleAddAnotherOption}
              style={{
                marginTop: "8px",
                textTransform: "capitalize",
              }}
            >
              Add Another Option
            </OutlinedButton>
          </div>
        </>
      )}
    </ProductOnboardingSectionContainer>
  );
}

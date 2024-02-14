import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import CreatableMultiSelect from "components/Common/Inputs/SelectInput/CreatableMultiSelect";
import TextInput from "components/Common/Inputs/TextInput";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { groupBy, orderBy, uniqBy } from "lodash";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProductOnboardingSteps } from "redux/onboarding/onboardingSlice";
import {
  removeAllProductImages,
  fetchProductDataStart,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
// import AddVariantImageDialog from "./AddVariantImageDialog";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
// import CustomGroupedTable from "sections/OnboardingSections/NewProductOnboardingSections/components/CustomGroupedTable";
// import MultipleSelect from "components/Common/Inputs/SelectInput/MultipleSelect";
// import VariantChipGroup from "components/Common/Chip/VariantChipGroup";
import dynamic from "next/dynamic";
import EditIcon from "components/Common/Icons/EditIcon";
import UpdateVariantGroupDialog from "./components/UpdateVariantGroupDialog";
const VariantChipGroup = dynamic(
  () => import("components/Common/Chip/VariantChipGroup")
  // { ssr: false }
);
const MultipleSelect = dynamic(
  () => import("components/Common/Inputs/SelectInput/MultipleSelect")
  // { ssr: false }
);
const CustomGroupedTable = dynamic(
  () =>
    import(
      "sections/OnboardingSections/NewProductOnboardingSections/components/CustomGroupedTable"
    )
  // { ssr: false }
);
const AddVariantImageDialog = dynamic(
  () => import("./AddVariantImageDialog")
  // { ssr: false }
);

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  // createProductData: productsData.createProductData,
  productsData,
});
export default function NewProductOnboardingGroupedInventorySection({
  keyForReduxStateData,
  hideContinueNavigation,
}) {
  const { currentUser, productsData } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.productId;
  const step = router.query.step;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;
  const createProductData = productsData[keyForReduxStateData];
  const itemsFromState = createProductData?.items;

  //  get the selected options from the itemsFromState if each item has option_name and option_value, map that to an array of objects with name and options

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
    convertStringArrayToObjectArray(itemsFromState).options;
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

  const selectedOptionsFromState = createProductData?.selectedOptions;
  const skuFromState = createProductData?.product_sku;
  const retailPriceFromState = createProductData?.unit_retail_price;
  const costPriceFromState = createProductData?.unit_cost_price;
  const displayImageFromState = createProductData?.display_image;
  const hasDefaultSKUFromState = createProductData?.has_default_sku;
  const hasDefaultRetailPriceFromState =
    createProductData?.has_default_unit_retail_price;
  const hasDefaultCostPriceFromState =
    createProductData?.has_default_unit_cost_price;

  const [selectedOptions, setSelectedOptions] = useState(
    getSelectedOptions ?? []
  );
  const [hasDefaultSKU, setHasDefaultSKU] = useState(hasDefaultSKUFromState);
  const [hasDefaultRetailPrice, setHasDefaultRetailPrice] = useState(
    hasDefaultRetailPriceFromState
  );
  const [hasDefaultCostPrice, setHasDefaultCostPrice] = useState(
    hasDefaultCostPriceFromState
  );
  useEffect(() => {
    setHasDefaultSKU(hasDefaultSKUFromState);
    setHasDefaultRetailPrice(hasDefaultRetailPriceFromState);
    setHasDefaultCostPrice(hasDefaultCostPriceFromState);
  }, [
    hasDefaultCostPriceFromState,
    hasDefaultRetailPriceFromState,
    hasDefaultSKUFromState,
  ]);

  const productOptionsValue =
    Array.isArray(selectedOptions) && selectedOptions.length > 0
      ? []
      : [{ name: "", options: "" }];
  const [productOptions, setProductOptions] = useState(productOptionsValue);

  const [loading, setLoading] = useState(false);
  const resetForm = () => {
    setTitle("");
    // setDescription("");
    setUnitRetailPrice("");
    setEditorState(EditorState.createEmpty());
    dispatch(removeAllProductImages());

    setSelectedFile("");
    setShowSelectedFile(false);
    setLoading(false);
  };

  const handleAddProduct = async (blur) => {
    const url = PRODUCT.MERCHANT.ADD_PRODUCT_ITEM;

    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: createProductData.master_product_id,

      items: inventoriesToAdd,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          // dispatch(updateCreateProductData(data));
          handleFetchProductData();
          // handleNextButtonClick();
          blur && handleBlurValue(blur);
        }
      })
      .catch((err) => console.log(err));
    // await addProduct(data, enqueueSnackbar);
  };
  const handleFetchProductData = async () => {
    const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: USER_ID,
      master_product_id: createProductData.master_product_id,
    };
    dispatch(fetchProductDataStart({ url, data, keyForReduxStateData }));
  };
  useEffect(() => {
    handleFetchProductData();
  }, []);

  const disableButton = loading;

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };
  const handleNameChange = (e, index) => {
    const values = [...productOptions];
    values[index].name = e.value;

    setProductOptions(values);
  };
  const [error, setError] = useState("");
  const handleValueChange = (e, index) => {
    const values = [...productOptions];
    values[index].options = e.target.value;
    // check if options item already exists in the array and the length of the text is greater than 40, then show an error message
    setProductOptions(values);
  };
  const handleAddOptions = () => {
    const values = [...productOptions];
    values.push({ name: "", options: "" });
    setProductOptions(values);
  };
  const handleClickDoneButton = async () => {
    // write the logic to add the productOptions to selectedOptions and clear the productOptions and also save the previous state of selectedOptions to a variable
    const newSelectedOptions = [...selectedOptions, ...productOptions];

    setSelectedOptions(newSelectedOptions);
    setProductOptions([]);
    handleAddProduct();
  };

  const handleEditButtonClick = (item) => {
    // write the logic to remove the item from selectedOptions and add to productOptions and check it does not exist in productOptions

    const newProductOptions = [...productOptions, item];
    const newSelectedOptions = selectedOptions.filter(
      (option) => option.name !== item.name
    );
    setProductOptions(newProductOptions);
    setSelectedOptions(newSelectedOptions);
  };

  const handleDeleteButtonClick = (e, item) => {
    //write the logic to remove the item from productOptions
    const newProductOptions = productOptions.filter(
      (option) => option.name !== item.name
    );
    setProductOptions(newProductOptions);
  };
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
    const filterOptionsItems = optionsArray.map((option) =>
      option.length > 40 ? option.slice(0, 40) + "..." : option
    );
    console.log({ optionsArray, filterOptionsItems });

    // const optionsArray = options.split(",");
    return optionsArray;
  };

  const mergeOptionsForTable = (list = []) => {
    const mergedFields = list.reduce((acc, field) => {
      const { name, options } = field;
      const optionsArray = getOptionsArray(options);

      return {
        ...acc,
        [name]: optionsArray,
      };
    }, {});
    return mergedFields;
  };

  function convertObjectArrayToStringArrays(selectedOptions = []) {
    // get values from the selectedOptions from state

    const sortedSelectedOptions = orderBy(selectedOptions, "name", "desc");

    const itemsListed = mergeOptionsForTable(sortedSelectedOptions);
    // console.log({ sortedSelectedOptions, itemsListed }, "inside function");

    const getValues = Object.values(itemsListed);
    const getKeys = Object.keys(itemsListed);
    // console.log({ getValues, getKeys });
    const myItems =
      Array.isArray(getValues) &&
      getValues.map((item, index) => {
        // const mapItem = item
        // 	?.map((i, id) => {
        // 		return i;
        // 	})
        // 	.flat();
        return item;
      });
    const getCombinations = (arrays) => {
      const result = [];
      const f = (prefix, arrays) => {
        for (let i = 0; i < arrays[0]?.length; i++) {
          const current = prefix.concat(arrays[0][i]);
          if (arrays?.length > 1) {
            f(current, arrays.slice(1));
          } else {
            result.push(current);
          }
        }
      };
      f([], arrays);
      return result;
    };
    const getCombo =
      Array.isArray(myItems) && myItems?.length > 0 && getCombinations(myItems);
    // console.log("itemsListed", {
    // 	itemsListed,
    // 	getCombo,
    // 	getKeys,
    // 	getValues,
    // 	myItems,
    // });
    // const sortedArray = getKeys.sort();
    // console.log({ getCombo });
    return { option_name: getKeys, option_values: getCombo };
  }
  const selectableOptons = [...productOptions, ...selectedOptions];

  const getValuesOfOptions = convertObjectArrayToStringArrays(selectableOptons);
  // console.log("getValuesOfOptions", getValuesOfOptions);
  const inventoriesToAdd =
    Array.isArray(getValuesOfOptions.option_values) &&
    getValuesOfOptions.option_values.map((item, index) => {
      const joinedItem = item.join(" / ");
      const variantSKU = `${skuFromState}_${item.join("_")}`;
      // console.log({ variantSKU, item });
      // if (index === 0)

      const options = getValuesOfOptions.option_name.map((option, id) => {
        return {
          id: id,
          name: option,
          value: item[id],
          sequence: id,
        };
      });

      return {
        item_title: joinedItem,
        // option_name: getValuesOfOptions.option_name,
        // option_value: item,

        options: options,
        //  [
        // 	{
        // 		id: index,
        // 		name: getValuesOfOptions.option_name,
        // 		value: item,
        // 		sequence: index,
        // 	},
        // ],
        sku: hasDefaultSKU === true ? variantSKU : "",
        item_unit_retail_price:
          hasDefaultRetailPrice === true ? retailPriceFromState : "",
        item_unit_cost_price:
          hasDefaultCostPrice === true ? costPriceFromState : "",
        item_display_image: displayImageFromState,

        // inventory: productWarehouseInventory,
      };
      // return {
      // 	title: joinedItem,
      // 	option_name: getValuesOfOptions.option_name,
      // 	option_value: item,
      // 	inventory: [],
      // };
    });

  const handleNextButtonClick = () => {
    dispatch(
      updateProductOnboardingSteps({
        step: "variants",
        nextStep: "select-vendor",
      })
    );

    router.push(
      `/app/products/create/product/${pageId}?step=select-vendor&id=3`
    );
    // dispatch(setCreateProductData({}));
    // dispatch(removeAllProductImages());
  };

  const filterOnlySelectedOptions = (
    optionsWithLabel = [],
    selectedOptions = []
  ) => {
    // filter the options to select from if the name of item in selectedOptions is present from optionsWithLabel
    const filteredOptions = optionsWithLabel.filter(
      (item) => !selectedOptions.some((option) => option.name === item.value)
    );
    return filteredOptions;
  };
  const filteredOptions = filterOnlySelectedOptions(
    optionsWithLabel,
    selectableOptons
  );
  //  disable the done button if the name of the item in productOptions is empty and if the values are empty for the name of the item in productOptions or if there is no productOptions selected or if there are only spaces in the item in productOptions

  const disableDoneButton =
    (Array.isArray(productOptions) &&
      productOptions.length > 0 &&
      productOptions.some((item) => item.name === "")) ||
    productOptions.some(
      (item) => item.options === ""
      //  ||
      // getOptionsArray(item.options).length === 0,
    ) ||
    productOptions.length === 0;

  // (Array.isArray(productOptions) &&
  // 	productOptions.length > 0 &&
  // 	productOptions.some((item) => item.name === "")) ||
  // productOptions.some((item) => item.options === "") ||
  // productOptions.length === 0;

  const handleChangeValue = (e, key, value) => {
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT_ITEM;
    const data = {
      master_product_id: pageId,
      [key]: e.target.value,
      master_item_id: value,
      user_id: currentUser.merchant_id,
    };

    console.log({ changeMethodCalled: data });
    // Update the value in the state setTableItems where the master_item_id is equal to the value
    const updatedItems = tableItems.map((item) => {
      if (item.master_item_id === value) {
        return {
          ...item,
          [key]: e.target.value,
        };
      }
      return item;
    });
    setTableItems(updatedItems);
  };
  const handleBlurValue = (e, key, value) => {
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      master_product_id: pageId ?? createProductData?.master_product_id,
      // [key]: e.target.value,
      // master_item_id: value,
      user_id: currentUser.merchant_id,

      has_default_sku: hasDefaultSKU,
      has_default_unit_retail_price: hasDefaultRetailPrice,
      has_default_unit_cost_price: hasDefaultCostPrice,

      items: [
        {
          [key]: e.target.value,
          master_item_id: value,
        },
      ],
    };
    appFetch(URL, data)
      .then((json) => {
        // console.log({ json, data });
        if (json.status === "success") {
          handleFetchProductData();
        }
      })
      .catch((err) => console.log(err));
  };

  const [tableItems, setTableItems] = useState(itemsFromState ?? []);
  console.log({ tableItems, itemsFromState });
  useEffect(() => {
    setTableItems(itemsFromState ?? []);
  }, [itemsFromState]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMasterItemId, setSelectedMasterItemId] = useState(null);
  const handleOpenDialog = (e, master_item_id) => {
    setOpenDialog(true);
    setSelectedMasterItemId(master_item_id);
  };

  const optionFields =
    Array.isArray(selectedOptions) &&
    selectedOptions.map((item) => {
      return {
        field: item.name,
        headerName: item.name,
        width: 200,
      };
    });
  const columnData = [
    ...optionFields,
    {
      field: "item_display_image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <AppImage
          src={params.value}
          width="56"
          height="56"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
          onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
    },
    {
      field: "item_title",
      headerName: "Variant Name",
      // width: 200,
      flex: 1,
    },
    {
      field: "sku",
      headerName: "Variant SKU",
      // width: 200,
      flex: 1,
      renderCell: (params) => (
        <TextInput
          value={params.value}
          containerStyles={{
            width: "100%",
            marginTop: "0px",
          }}
          inputStyles={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          onChange={(e) => handleChangeValue(e, "sku", params.row.id)}
          onBlur={(e) => handleBlurValue(e, "sku", params.row.id)}
        />
      ),
    },
    // {
    // 	field: "inventory",
    // 	headerName: "Inventory",
    // 	renderCell: (params) => (
    // 		<Button
    // 			sx={{
    // 				textTransform: "capitalize",
    // 			}}
    // 		>
    // 			Add inventory
    // 		</Button>
    // 	),
    // 	width: 200,
    // },
    {
      field: "item_unit_retail_price",
      headerName: "Price",
      width: 200,
      renderCell: (params) => (
        <RenderTextInput
          params={params}
          onChange={(e) =>
            handleChangeValue(e, "item_unit_retail_price", params.row.id)
          }
          onBlur={(e) =>
            handleBlurValue(e, "item_unit_retail_price", params.row.id)
          }
        />
      ),
    },
    {
      field: "item_unit_cost_price",
      headerName: "Cost Price",
      width: 200,
      renderCell: (params) => (
        <TextInput
          value={params.value}
          containerStyles={{
            width: "100%",
            marginTop: "0px",
            // height: "36px",
          }}
          inputStyles={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          onChange={(e) =>
            handleChangeValue(e, "item_unit_cost_price", params.row.id)
          }
          onBlur={(e) =>
            handleBlurValue(e, "item_unit_cost_price", params.row.id)
          }
        />
      ),
    },

    // {
    // 	field: "action",
    // 	headerName: "Action",
    // 	renderCell: (params) => (
    // 		<IconButton>
    // 			<MoreOptionsIcon />
    // 		</IconButton>
    // 	),
    // },
  ];

  const maxHeight =
    typeof window !== "undefined" ? window.innerHeight - 600 : 0;
  const handleSelectImageClick = (e, item) => {
    // console.log("handleSelectImageClick", item);
    if (item === "" || item === undefined) return;
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      master_product_id: createProductData.master_product_id,
      // [key]: e.target.value,
      // master_item_id: value,
      user_id: currentUser.merchant_id,

      items: [
        {
          item_display_image: item,
          master_item_id: selectedMasterItemId,
          // [key]: e.target.value,
          // master_item_id: value,
        },
      ],
    };
    console.log({ selectedImageCalled: item });
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          handleFetchProductData();
          handleCloseDialog();
        }
        // console.log({ json, data });
      })
      .catch((err) => console.error(err));
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMasterItemId(null);
  };

  const handleClickContinueButton = async () => {
    // await handleAddProduct();
    setLoading(true);
    handleNextButtonClick();
  };

  // console.log({ hasDefaultSKU });

  // disable the update data button if hasDefaultSKU , hasDefaultPrice, hasDefaultCostPrice are not changed from the default value

  const disableUpdateDataButton =
    hasDefaultSKU === hasDefaultSKUFromState &&
    hasDefaultRetailPrice === hasDefaultRetailPriceFromState &&
    hasDefaultCostPrice === hasDefaultCostPriceFromState;

  // hasDefaultSKU && hasDefaultRetailPrice && hasDefaultCostPrice;
  // !hasDefaultSKU && !hasDefaultRetailPrice && !hasDefaultCostPrice;

  // check if the option name and option value is empty array, inside the tableItems, then do not show that item in the table, or the mapped array
  const filteredTableItems =
    Array.isArray(tableItems) &&
    tableItems.filter((item) => {
      return item.options.length > 0;
      // || item.option_value.length > 0;
    });
  // console.log({ filteredTableItems });
  // const isOptionsEmpty =
  const disableContinueButton = filteredTableItems.length === 0;

  const columnSelected =
    Array.isArray(selectedOptions) && selectedOptions.map((item) => item.name);
  const [columnGroups, setColumnGroups] = useState(columnSelected ?? []);

  const handleGroupDataChange = (e) => {
    const groups = e.map((item) => item.value);

    setColumnGroups(groups);
  };
  console.log({ columnGroups });
  const mergeSelectedOptionsAndColGroups = () => {
    // merge the selected options and column groups based on the name of the option

    const mergedOptions = selectedOptions.map((option) => {
      const foundColGroup = columnGroups.find(
        (colGroup) => colGroup === option.name
      );
      if (foundColGroup) {
        return {
          ...option,
          // colGroup: foundColGroup,
          isChecked: true,
        };
      } else {
        return { ...option, isChecked: false };
      }
    });
    // console.log({ mergedOptions });
    return mergedOptions;
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

  const columnsFromColumnGroups =
    Array.isArray(selectedOptions) &&
    selectedOptions.map((item) => {
      return {
        accessorKey: item.name,
        header: item.name,
        enableEditing: false,
        Cell: ({ cell }) => (
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {cell.getValue()}
          </span>
        ),
      };
    });

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    tableItems[row.index] = values;

    console.log({ values, row });
    setTableItems([...tableData]);
    exitEditingMode();
  };

  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);
  const [selectedCell, setSelectedCell] = React.useState(null);
  const handleCloseEditGroupDialog = () => {
    setOpenEditGroupDialog(false);
    setSelectedCell(null);
  };
  const handleOpenEditGroupDialog = (cell) => {
    setOpenEditGroupDialog(true);
    setSelectedCell(cell);
  };
  const tableColumns = [
    // {
    // 	accessorKey: "edit",
    // 	header: "Actions",
    // 	aggregatedCell: ({ cell }) => (
    // 		<>
    // 			<IconButton onClick={() => handleOpenEditGroupDialog(cell)}>
    // 				<EditIcon />
    // 			</IconButton>
    // 		</>
    // 	),
    // 	enableEditing: false,
    // 	aggregatedCell: ({ getValue }) => getValue(),
    // 	// enableHiding: true,
    // 	// columnOrder: 0,
    // 	size: 20,
    // },
    ...columnsFromColumnGroups,
    {
      accessorKey: "item_display_image",
      header: "Image",
      Cell: ({ cell }) => (
        <AppImage
          src={cell.getValue()}
          alt="item image"
          width={40}
          height={40}
          sx={{
            cursor: "pointer",
          }}
          onClick={(e) => handleOpenDialog(e, cell.row.original.master_item_id)}
        />
      ),
      cell: ({ cell }) => (
        <>
          {!cell.getIsGrouped() && (
            <Tooltip title={cell.getValue()}>
              <AppImage
                src={cell.getValue()}
                alt="item image"
                width={40}
                height={40}
                sx={{
                  cursor: "pointer",
                }}
                onClick={(e) =>
                  handleOpenDialog(e, cell.row.original.master_item_id)
                }
              />
            </Tooltip>
          )}
        </>
      ),
      enableEditing: false,
      flex: 1,
    },
    {
      accessorKey: "item_title",
      header: "Variant Title",
      Cell: ({ cell }) => (
        <>
          <Tooltip title={cell.getValue()}>{cell.getValue()}</Tooltip>

          {/* {console.log({ info })} */}
        </>
      ),
      enableEditing: false,
      flex: 1,
    },
    {
      accessorKey: "add_inventory",
      header: "Add Inventory",
      cell: ({ cell }) => "Add",
      // cell: ({ cell }) => <PrimaryButton>Add Inventory</PrimaryButton>,
    },
    // {
    // 	accessorKey: "sku",
    // 	header: "Variant SKU",
    // 	id: "sku",
    // 	Cell: ({ cell }) => (
    // 		<RenderTextInput
    // 			value={cell.getValue()}
    // 			placeholder="Enter variant sku"
    // 		/>
    // 	),

    // 	// size: 100,

    // 	AggregatedCell: ({ cell }) => (
    // 		<>
    // 			{/* {console.log({
    // 				cellInAggregatedCell: aggregatedCellSKU(
    // 					cell.row.original.product_sku,
    // 					// cell.row.groupingValue,
    // 					cell.row,
    // 				),
    // 				cell,
    // 			})} */}
    // 			{/* <RenderTextInput
    // 				value={aggregatedCellSKU(
    // 					cell.row.original.product_sku,
    // 					// cell.row.groupingValue,
    // 					cell.row,
    // 				)}
    // 				placeholder="Enter Variant SKU"
    // 			/> */}
    // 		</>
    // 	),
    // 	// minSize: 600,
    // 	flex: 1,
    // 	// maxSize: 300,
    // 	// aggregatedCell: ({ cell }) => cell.row.original.sku,
    // 	// aggregationFn: ({ cell }) => cell.row.original.sku,
    // },
    // {
    // 	accessorKey: "item_unit_retail_price",
    // 	header: "Unit Retail Price",
    // 	id: "item_unit_retail_price",
    // 	Cell: ({ cell }) => (
    // 		<RenderTextInput
    // 			value={cell.getValue()}
    // 			placeholder="Enter Retail Price"
    // 		/>
    // 	),
    // 	AggregatedCell: ({ cell }) => (
    // 		<>
    // 			{/* {console.log({ cell }, "unit retail price")} */}
    // 			{/* <RenderTextInput
    // 				value={cell.row.original.item_unit_retail_price}
    // 				placeholder="Enter Retail Price"
    // 				onChange={(e) =>
    // 					handleChangeAggregatedCellValues(
    // 						e,
    // 						cell,
    // 						"item_unit_retail_price",
    // 					)
    // 				}
    // 			/> */}
    // 		</>
    // 	),
    // 	flex: 1,
    // 	// aggregationFn: "mean",
    // },
    // {
    // 	accessorKey: "item_unit_cost_price",
    // 	header: "Unit Cost Price",
    // 	id: "item_unit_cost_price",
    // 	// AggregatedCell: ({ cell }) => (
    // 	// 	<RenderTextInput
    // 	// 		value={cell.row.original.item_unit_cost_price}
    // 	// 		placeholder="Enter Retail Price"
    // 	// 	/>
    // 	// ),
    // 	// console.log({ item_unit_cost_price: props }),
    // 	// Math.round(getValue() * 100) / 100 + "%",

    // 	Cell: ({ cell }) => (
    // 		<>
    // 			<RenderTextInput
    // 				value={cell.getValue()}
    // 				placeholder="Enter Cost Price"
    // 			/>
    // 		</>
    // 	),
    // 	flex: 1,
    // 	// aggregationFn: "mean",
    // },
    // ...columnsData,
  ];

  // console.log({ select: mergeSelectedOptionsAndColGroups() });
  return (
    <div>
      {" "}
      {loading && <PageLoader />}
      {Array.isArray(filteredTableItems) && filteredTableItems?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
            pb: 2,
            // maxWidth: "800px",
            // margin: "auto",
            margin: hideContinueNavigation ? "0px" : "auto",
            // mt: hideContinueNavigation && 2,
          }}
        >
          <Typography
            sx={{
              mr: 4,
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "24px",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            View Data As
          </Typography>
          <MultipleSelect
            value={columnGroupWithLabels}
            options={optionsToShow}
            onChange={(e) => handleGroupDataChange(e)}
            containerStyles={{
              maxWidth: "400px",
              minWidth: "400px",
              paddingTop: "0px",
            }}
            placeholder="Select columns to view"
          />
          {/* {mergeSelectedOptionsAndColGroups().map((item, index) => {
					return (
						<CheckboxInput
							label={item.name}
							key={index}
							value={item.isChecked}
							// onChange={(e) => handleGroupDataChange(e, item.name)}
							checkboxProps={{
								sx: {
									color: "black",
								},
								onChange: (e) =>
									handleGroupDataChange(e, item.name),
							}}
						/>
					);
				})} */}
        </Box>
      )}
      <Box>
        {Array.isArray(filteredTableItems) &&
          filteredTableItems?.length > 0 && (
            // <MuiBaseDataGrid
            // 	containerStyles={{
            // 		height: maxHeight,
            // 	}}
            // 	data={filteredTableItems}
            // 	columnDefData={columnData}
            // 	rowIdkey={"master_item_id"}
            // 	checkboxSelection={false}
            // />
            <CustomGroupedTable
              newData={filteredTableItems}
              selectedOptions={selectedOptions}
              columnsData={tableColumns}
              columnGroups={columnGroups}
              // updateData={handleChangeValue}
              handleSaveRow={handleSaveRow}
              // handleSaveCell={handleSaveCell}

              handleFetchProductData={handleFetchProductData}
            />
          )}
      </Box>
      {hideContinueNavigation && (
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            // width: "82%",
            // width: "1200px",
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <NewProductOnboardingBottomNavButtons
            disableSaveButton={disableButton}
            saveButtonClick={() => handleAddProduct()}
            saveButtonTitle={"Update Product"}
            // hideTitle
          />
        </Box>
      )}
      <AddVariantImageDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSaveButton
        handleSelectImageClick={handleSelectImageClick}
        keyForReduxStateData={keyForReduxStateData}
      />
      {selectedCell && openEditGroupDialog && (
        <UpdateVariantGroupDialog
          open={openEditGroupDialog}
          handleClose={handleCloseEditGroupDialog}
          row={selectedCell}
          handleFetchProductData={handleFetchProductData}
        />
      )}{" "}
      {!hideContinueNavigation && (
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            // width: "82%",
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <NewProductOnboardingBottomNavButtons
            maxWidthPage={"800px"}
            saveButtonClick={() => handleClickContinueButton()}
            disableSaveButton={disableContinueButton}
            discardButtonTitle={`Previous Step`}
            discardButtonClick={() =>
              router.push(
                `/app/products/create/product/${pageId}?step=media&id=1`
              )
            }
          />
        </Box>
      )}
    </div>
  );
}

const options = ["Size", "Color", "Material", "Style"];
const optionsWithLabel = options.map((option) => ({
  label: option,
  value: option,
}));

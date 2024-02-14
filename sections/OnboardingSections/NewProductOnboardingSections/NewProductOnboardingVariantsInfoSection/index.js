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
import dynamic from "next/dynamic";
import EditIcon from "components/Common/Icons/EditIcon";
import AddVariantImageDialog from "../AddVariantImageDialog";
import UpdateVariantGroupDialog from "../components/UpdateVariantGroupDialog";
import NewProductOnboardingBottomNavButtons from "../NewProductOnboardingBottomNavButtons";
import SuccessDialogForPO from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import SaveAsDraftComponent from "../components/SaveAsDraftComponent";
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

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  // createProductData: productsData.createProductData,
  productsData,
});
export default function NewProductOnboardingVariantsInfoSection({
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

  const handleAddProduct = async (blur, selectedOptions) => {
    const url = PRODUCT.MERCHANT.ADD_PRODUCT_ITEM;
    setLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: createProductData.master_product_id,

      items:
        (Array.isArray(inventoriesToAdd(selectedOptions)) &&
          inventoriesToAdd(selectedOptions)) ||
        [],
    };
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
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
    setLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: USER_ID,
      master_product_id: createProductData.master_product_id,
    };
    await dispatch(fetchProductDataStart({ url, data, keyForReduxStateData }));
    setLoading(false);
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
  const handleClickDoneButton = async (newProductOptions) => {
    // write the logic to add the productOptions to selectedOptions and clear the productOptions and also save the previous state of selectedOptions to a variable
    const newSelectedOptions = [...selectedOptions, ...productOptions];

    setSelectedOptions(newSelectedOptions);
    setProductOptions([]);
    await handleAddProduct("", newSelectedOptions);
  };

  const handleEditButtonClick = (item, index) => {
    // write the logic to remove the item from selectedOptions and add to productOptions and check it does not exist in productOptions

    const newProductOptions = [...productOptions, item];

    const newSelectedOptions = selectedOptions.filter(
      (option, id) => id !== index
    );
    setProductOptions(newProductOptions);
    setSelectedOptions(newSelectedOptions);
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteDialogOpen = (e, item, index) => {
    setOpenDeleteDialog(true);
    setItemToDelete({ e, item, index });
  };
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setItemToDelete(null);
    // handleAddProduct();
    // handleClickDoneButton();
  };

  const handleDeleteButtonClick = async (e, item, index) => {
    // remove the item from productOptions based on the index

    // handleFetchProductData();
    // handleAddProduct();

    const newProductOptions = [...productOptions];
    newProductOptions.splice(index, 1);
    setProductOptions(newProductOptions);
    // handleClickDoneButton(newProductOptions);
    const optionsToBeAdded = [...selectedOptions, ...newProductOptions];
    handleAddProduct("", optionsToBeAdded);
    handleDeleteDialogClose();
    // handleDeleteDialogClose();
    //write the logic to remove the item from productOptions
    // const newProductOptions = productOptions.filter(
    // 	(option) => option.name !== item.name,
    // );
    // setProductOptions(newProductOptions);
  };
  const confirmDeleteButton = (e, item, index) => {
    handleClickDoneButton();
    handleDeleteDialogClose();
  };
  const getOptionsArray = (options) => {
    // remove the spaces from the options and split them by comma and do not have empty strings
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
  const selectableOptions = [...productOptions, ...selectedOptions];

  const getValuesOfOptions = (options) =>
    convertObjectArrayToStringArrays(options);
  // console.log("getValuesOfOptions", getValuesOfOptions);
  const inventoriesToAdd = (selectedOptions) =>
    Array.isArray(getValuesOfOptions(selectedOptions).option_values) &&
    getValuesOfOptions(selectedOptions).option_values.map((item, index) => {
      const joinedItem = item.join(" / ");
      const variantSKU = `${skuFromState}_${item.join("_")}`;
      // console.log({ variantSKU, item });
      // if (index === 0)

      const options = getValuesOfOptions(selectedOptions).option_name.map(
        (option, id) => {
          return {
            id: id,
            name: option,
            value: item[id],
            sequence: id,
          };
        }
      );

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
    selectableOptions
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

      // items: [
      // 	{
      // 		[key]: e.target.value,
      // 		master_item_id: value,
      // 	},
      // ],
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        // console.log({ json, data });
        if (json.status === "success") {
          setLoading(false);
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
  const [variantImage, setVariantImage] = useState(null);
  const handleOpenDialog = (e, master_item_id, product_image) => {
    setOpenDialog(true);
    setSelectedMasterItemId(master_item_id);
    setVariantImage(product_image);
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
          onClick={(e) => handleOpenDialog(e, params.row.id, params.value)}
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
  const handleChangeSKU = (e) => {
    setHasDefaultSKU(e.target.checked);
    // handleAddProduct();
  };

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

  const TableCell = ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  };

  const aggregatedCellSKU = (sku, row) => {
    const rows = row.subRows;
    const groupingValue = row.groupingValue;

    let depth = 4;
    let title = `${sku}_${groupingValue}`;

    if (row.depth < depth) {
      title += row;
    }

    return `${sku}_${groupingValue}`;
  };

  const handleChangeAggregatedCellValues = (e, cell, key) => {
    const getMasterItemIdsRecursively = (row) => {
      if (row.subRows.length > 0) {
        return row.subRows.map((item) => {
          return getMasterItemIdsRecursively(item);
        });
      } else {
        return row.original.master_item_id;
      }
    };
    const masterItemIdList = getMasterItemIdsRecursively(cell.row).flat();
    console.log({ masterItemIdList });

    const productsList = masterItemIdList.map((item) => {
      return {
        master_product_id: pageId,
        [key]: e.target.value,
        master_item_id: item,
      };
    });
    const updatedItems = tableItems
      .map((item) => {
        const updatedValues = masterItemIdList.map((id) => {
          if (item.master_item_id === id) {
            return {
              ...item,
              [key]: e.target.value,
            };
          }
        });
        return updatedValues;
      })
      .flat()
      .filter((item) => item !== undefined);
    console.log({ updatedItems }, "i am being used");

    // update the table items based on the master item id

    setTableItems((prev) => [...prev, ...updatedItems]);

    const URL = PRODUCT.MERCHANT.UPDATE_VARIANT_GROUPS;
    const data = {
      user_id: currentUser.merchant_id,
      products: productsList,
    };
    // appFetch(URL, data)
    // 	.then((json) => {
    // 		handleFetchProductData();
    // 		console.log({ json });
    // 	})
    // 	.catch((error) => {
    // 		console.log({ error });
    // 	});
  };

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    tableItems[row.index] = values;

    console.log({ values, row });
    setTableItems([...tableData]);
    exitEditingMode();
  };
  // const handleSaveCell = (cell, value) => {
  // 	// let clonedListItem = {
  // 	// 	...tableItems[+cell.row.index][cell.column.id],
  // 	// };
  // 	console.log({ cell, value });
  // 	filteredTableItems[+cell.row.index][cell.column.id] = value;
  // 	setTableItems([...filteredTableItems]);
  // 	console.info("saved cell with value: ", value);
  // };

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
            borderRadius: "5px",
          }}
          onClick={(e) =>
            handleOpenDialog(
              e,
              cell.row.original.master_item_id,
              cell.getValue()
            )
          }
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
                  borderRadius: "5px",
                }}
                onClick={(e) =>
                  handleOpenDialog(
                    e,
                    cell.row.original.master_item_id,
                    cell.getValue()
                  )
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
      accessorKey: "sku",
      header: "Variant SKU",
      id: "sku",
      Cell: ({ cell }) => (
        <RenderTextInput
          value={cell.getValue()}
          placeholder="Enter variant sku"
        />
      ),

      // size: 100,

      AggregatedCell: ({ cell }) => (
        <>
          {/* {console.log({
						cellInAggregatedCell: aggregatedCellSKU(
							cell.row.original.product_sku,
							// cell.row.groupingValue,
							cell.row,
						),
						cell,
					})} */}
          {/* <RenderTextInput
						value={aggregatedCellSKU(
							cell.row.original.product_sku,
							// cell.row.groupingValue,
							cell.row,
						)}
						placeholder="Enter Variant SKU"
					/> */}
        </>
      ),
      // minSize: 600,
      flex: 1,
      // maxSize: 300,
      // aggregatedCell: ({ cell }) => cell.row.original.sku,
      // aggregationFn: ({ cell }) => cell.row.original.sku,
    },
    {
      accessorKey: "item_unit_retail_price",
      header: "Unit Selling Price",
      id: "item_unit_retail_price",
      Cell: ({ cell }) => (
        <RenderTextInput
          value={cell.getValue()}
          // placeholder="Enter Retail Price"
          placeholder="0.0"
        />
      ),
      AggregatedCell: ({ cell }) => (
        <>
          {/* {console.log({ cell }, "unit retail price")} */}
          {/* <RenderTextInput
						value={cell.row.original.item_unit_retail_price}
						placeholder="Enter Retail Price"
						onChange={(e) =>
							handleChangeAggregatedCellValues(
								e,
								cell,
								"item_unit_retail_price",
							)
						}
					/> */}
        </>
      ),
      aggregatedCell: () => <></>,
      flex: 1,
      // aggregationFn: "mean",
    },
    {
      accessorKey: "item_unit_cost_price",
      header: "Unit Cost Price",
      id: "item_unit_cost_price",
      // AggregatedCell: ({ cell }) => (
      // 	<RenderTextInput
      // 		value={cell.row.original.item_unit_cost_price}
      // 		placeholder="Enter Retail Price"
      // 	/>
      // ),
      // console.log({ item_unit_cost_price: props }),
      // Math.round(getValue() * 100) / 100 + "%",

      Cell: ({ cell }) => (
        <>
          <RenderTextInput
            value={cell.getValue()}
            // placeholder="Enter Cost Price"
            placeholder="0.0"
          />
        </>
      ),
      aggregatedCell: () => <></>,

      flex: 1,
      // aggregationFn: "mean",
    },
    // ...columnsData,
  ];

  const [openSaveAsDraftDialog, setOpenSaveAsDraftDialog] = useState(false);

  const handleSaveAsDraftDialogOpen = () => {
    setOpenSaveAsDraftDialog(true);
  };
  const handleSaveAsDraftDialogClose = () => {
    setOpenSaveAsDraftDialog(false);
  };

  const handleSaveAsDraftButtonClick = () => {
    const data = {
      user_id: currentUser.merchant_id,
      status: "draft",
      master_product_id: createProductData.master_product_id,
    };
    console.log({ data });
    setLoading(true);
    const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Product saved as draft", {
            variant: "success",
          });
          router.push(`/app/products`);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const BUNDLE_OR_PRODUCT = "product";

  // console.log({ select: mergeSelectedOptionsAndColGroups() });
  return (
    <div>
      {" "}
      {loading && <PageLoader />}
      <Box
        sx={{
          // maxWidth: "800px",
          margin: hideContinueNavigation ? "0px" : "auto",
          borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
          my: hideContinueNavigation ? "0px" : 4,
        }}
      >
        {!hideContinueNavigation && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              position: "sticky",
              top: "65px",
              py: 2,
              background: "white",
              zIndex: "300",
            }}
          >
            <SectionTitleText
              sx={{
                // pb: 2,
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[200]}`,

                // mb: 2,
                // fontSize: "18px",
                // fontWeight: "600",
                color: (theme) => theme.palette.primary.main,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "39px",

                // ...sectionTitleStyles,
              }}
            >
              Variants
            </SectionTitleText>
            <SaveAsDraftComponent
              BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
              handleSaveAsDraftDialogOpen={() => handleSaveAsDraftDialogOpen()}
              // disableDraftButton={
              // 	productImages === "" ||
              // 	productImages.length === 0
              // 		? true
              // 		: false
              // }
              handleSaveAsDraftButtonClick={() =>
                handleSaveAsDraftButtonClick()
              }
              handleSaveAsDraftDialogClose={() =>
                handleSaveAsDraftDialogClose()
              }
              openSaveAsDraftDialog={openSaveAsDraftDialog}
            />
          </Box>
        )}
        {/* Variants Info */}
        {/* {hideContinueNavigation && (
          <SectionTitleText
            sx={{
              my: hideContinueNavigation ? "0px" : 2,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Variants
          </SectionTitleText>
        )} */}
        <Box>
          {/* Show option values */}
          {Array.isArray(selectedOptions) &&
            selectedOptions.length > 0 &&
            selectedOptions.map((item, index) => {
              const { name, options } = item;
              // console.log({ selectOption: item });
              const optionsArray =
                // options;
                getOptionsArray(options);
              return (
                <div key={`${item.name - index}`}>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      marginTop: "16px",
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                      pb: 2,
                      maxWidth: "60%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "24px",
                        // flex: 1,
                        // background: "#f4f4f4",
                        minWidth: "150px",
                        mr: 8,
                        p: 1,
                        color: "#313131",
                        height: "42px",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        maxWidth: "100%",
                      }}
                    >
                      <VariantChipGroup data={optionsArray} key={index} />

                      <OutlinedButton
                        onClick={() => handleEditButtonClick(item, index)}
                        size="small"
                      >
                        Edit
                      </OutlinedButton>
                    </Box>
                  </Box>
                </div>
              );
            })}

          {/* Input Fields for adding variants */}
          {Array.isArray(productOptions) &&
            productOptions.map((item, index) => {
              return (
                <div key={`${item.name - index}`}>
                  <div
                    style={{
                      display: "flex",
                      // alignItems: "center",
                      flex: 1,
                      alignItems: "center",
                      marginTop: index !== 0 && "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        maxWidth: "800px",
                        // alignItems: "center",
                      }}
                    >
                      <CreatableMultiSelect
                        isMulti={false}
                        value={
                          (item.name && {
                            label: item.name,
                            value: item.name,
                          }) ??
                          ""
                        }
                        onChange={(e) => handleNameChange(e, index)}
                        options={filteredOptions}
                        placeholder="Select an option"
                        title={`Option Name`}
                        containerStyles={{
                          maxWidth: "200px",
                          // marginTop: "8px",
                        }}
                      />
                      <TextInput
                        value={item.options}
                        onChange={(e) => handleValueChange(e, index)}
                        title={`Option Values`}
                        placeholder="Enter option values separated by commas (,)"
                        containerStyles={{
                          marginLeft: "16px",
                          marginTop: "16px",
                        }}
                        helperText={
                          error
                            ? error
                            : `Enter option values separated by commas (,)`
                        }
                        // multiline
                        // minRows={2}
                      />
                    </div>
                    {/* {productOptions.length > 1 && ( */}
                    <IconButton
                      onClick={(e) => handleDeleteDialogOpen(e, item, index)}
                      sx={{ ml: 2, mt: 5 }}
                    >
                      <MdDelete />
                    </IconButton>
                    {/* )}{" "} */}
                  </div>
                </div>
              );
            })}

          <Stack
            direction={"row"}
            // alignItems="center"
            // maxWidth={"xs"}
            sx={{
              maxWidth: "360px",
              my: 2,
              py: 2,
            }}
          >
            {[...productOptions, ...selectedOptions].length < 4 && (
              <OutlinedButton
                onClick={() => handleAddOptions()}
                sx={{
                  // marginTop: "8px",
                  border: "none",
                  textTransform: "capitalize",
                  background: "#F5F4FD",
                }}
                size="small"
              >
                Add Another Option
              </OutlinedButton>
            )}
            <PrimaryButton
              sx={{
                // marginTop: "16px"
                ml: 2,
              }}
              size="small"
              onClick={() => handleClickDoneButton()}
              disabled={disableDoneButton}
            >
              Done
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          margin: hideContinueNavigation ? "0px" : "auto",
          mt: hideContinueNavigation && 4,
          // maxWidth: "800px",
          pb: 2,
        }}
      >
        {Array.isArray(filteredTableItems) &&
          filteredTableItems?.length > 0 && (
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "19px",
                fontWeight: "500 !important",
                color: (theme) => theme.palette.text.primary,
                "& .title": {
                  fontWeight: "600",
                  fontSize: "16px",
                  // mr: 1,
                },
                "& span": {
                  fontWeight: "500",
                  fontSize: "16px",
                  // mr: 1,
                },
              }}
            >
              <span className="title">
                Set Defaults: {/* Apply following rules:{" "} */}
              </span>
              {/* <br /> */}
              {/* <div style={{ display: "flex" }}> */}
              <CheckboxInput
                label={"Use Default Variant SKU "}
                checkboxProps={{
                  sx: {
                    color: (theme) => theme.palette.text.primary,
                    pl: 3,
                  },
                  onChange: handleChangeSKU,
                }}
                value={hasDefaultSKU}
                // setValue={setHasDefaultSKU}

                // onChange={(e) => setHasDefaultSKU(e.target.checked)}
              />
              <CheckboxInput
                label={"Use Same Price as product"}
                checkboxProps={{
                  sx: {
                    color: (theme) => theme.palette.text.primary,
                  },
                }}
                value={hasDefaultRetailPrice}
                setValue={setHasDefaultRetailPrice}
                // onChange={(e) =>
                // 	setHasDefaultRetailPrice(e.target.checked)
                // }
              />
              <CheckboxInput
                label={"Use Same cost as product"}
                checkboxProps={{
                  sx: {
                    color: (theme) => theme.palette.text.primary,
                  },
                }}
                value={hasDefaultCostPrice}
                setValue={setHasDefaultCostPrice}
                onChange={(e) => setHasDefaultCostPrice(e.target.checked)}
              />
              {!disableUpdateDataButton && (
                <OutlinedButton
                  onClick={(e) => handleAddProduct("blur", selectableOptions)}
                  disabled={disableUpdateDataButton}
                  size="small"
                >
                  Update Data
                </OutlinedButton>
              )}
              {/* </div> */}
            </Typography>
          )}{" "}
      </Box>
      {Array.isArray(filteredTableItems) && filteredTableItems?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            p: 0,
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
              mr: 2,
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "24px",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            View Data As:
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
            placeholder="Select Columns to View"
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
      {/* {hideContinueNavigation && (
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
      )} */}
      <SuccessDialogForPO
        message={"Do you want to delete this field?"}
        primaryButtonName={"Delete"}
        secondaryButtonName={"Cancel"}
        // primaryButtonColor={"red"}
        open={openDeleteDialog}
        handleClose={() => handleDeleteDialogClose()}
        onCancel={() => handleDeleteDialogClose()}
        onDelete={(e) =>
          handleDeleteButtonClick(e, itemToDelete?.item, itemToDelete?.index)
        }
        primaryButtonColor="#D92D20"
        icon={<AlertIconPO />}
      />
      <AddVariantImageDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSaveButton
        handleSelectImageClick={handleSelectImageClick}
        keyForReduxStateData={keyForReduxStateData}
        selectedVariantImage={variantImage}
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
            width: "82%",
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

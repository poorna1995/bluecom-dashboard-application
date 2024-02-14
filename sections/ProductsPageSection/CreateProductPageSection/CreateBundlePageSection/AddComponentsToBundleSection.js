import {
  Box,
  IconButton,
  TextField,
  Typography,
  OutlinedInput,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { BUNDLE } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductsToBundleDialog from "./AddProductsToBundleDialog";
import { fetchProductDataStart } from "redux/products/productsSlice";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
// import NewProductOnboardingBottomNavButtons from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingBottomNavButtons";
// import MRTBundleViewAddQuantityTable from "./MRTBundleViewAddQuantityTable";
// import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
// import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";

import dynamic from "next/dynamic";
import appFetch from "utils/appFetch";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import SuccessDialogForPO from "../../../OnboardingSections/PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import EmptyState from "components/Common/EmptyState";
import SaveAsDraftComponent from "sections/OnboardingSections/NewProductOnboardingSections/components/SaveAsDraftComponent";
import { enqueueSnackbar } from "notistack";
import BundleES from "components/Common/Icons/EmptyStates/BundleES";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
const NewProductOnboardingBottomNavButtons = dynamic(() =>
  import(
    "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingBottomNavButtons"
  )
);

const MRTBundleViewAddQuantityTable = dynamic(() =>
  import("./MRTBundleViewAddQuantityTable")
);
const RenderTextInput = dynamic(() =>
  import("components/Common/Tables/RenderComponents/RenderTextInput")
);
const RenderProductDetails = dynamic(() =>
  import("components/Common/Tables/RenderComponents/RenderProductDetails")
);

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  productsData,
});
export default function AddComponentsToBundleSection({
  keyForReduxStateData,
  usedIn = "",
  hideUpdateButtonRow,
  isEditPage,
}) {
  const { currentUser, productsData } = useSelector(mapState);

  const bundleData = productsData[keyForReduxStateData];
  const bundleChildren = useMemo(
    () => (Array.isArray(bundleData.children) && bundleData?.children) || [],
    [bundleData?.children]
  );
  // (Array.isArray(bundleData.children) && bundleData.children) || [];
  const [tableData, setTableData] = useState(bundleChildren || []);
  const [pageLoading, setPageLoading] = useState(false);
  // const [minValue, setMinValue] = useState(getMinimumValueOfRow || 0);
  useEffect(() => {
    setTableData(bundleChildren || []);
  }, [bundleChildren]);
  const mappedTableData =
    Array.isArray(tableData) &&
    tableData.map((item) => ({
      ...item,
      bundle_contribution: Math.floor(item.available / item.qty),
    }));
  const getMinimumValueOfRow = (data) =>
    data.length > 0
      ? Math.min(
          ...data.map((item) =>
            item.qty > 0 ? Math.floor(item.available / item.qty) : 0
          )
        )
      : 0;

  console.log({ getMinimumValueOfRow });
  const router = useRouter();
  const { productId } = router.query;
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const handleOpenSuccessDialog = () => {
    setPageLoading(true);
    setTimeout(() => {
      setOpenSuccessDialog(true);
      setPageLoading(false);
    }, 2000);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    if (isEditPage) {
      return router.replace(
        `/app/products/edit/${productId}?productType=bundle&tab=components&popupTab=products&currentPage=1&isEditPage=true`
      );
    }
    return router.replace(`${router.asPath}&tab=products&currentPage=1`);
  };
  const handleFetchBundleData = async () => {
    setPageLoading(true);
    await dispatch(
      fetchProductDataStart({
        url: BUNDLE.FETCH_BUNDLE,
        data: {
          user_id: currentUser.merchant_id,
          master_product_id: productId,
        },
        keyForReduxStateData,
      })
    );
    setPageLoading(false);
  };

  const handleChangeValue = (e, id, key) => {
    const updatedItems = tableData.map((item) => {
      if (item.master_item_id === id || item.item_id === id) {
        return {
          ...item,
          [key]: e.target.value ?? 0,
          bundleCost: e.target.value * item.item_unit_cost_price,
        };
      }

      return item;
    });

    setTableData(updatedItems);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleOpenDeleteDialog = (cell) => {
    setSelectedCell(cell);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setSelectedCell(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(false);
    handleDeleteBundleItem(selectedCell);
  };

  const handleGotoDashboard = () => {
    setPageLoading(true);
    router.push(`/app/products?selectedProductType=bundle`);
    setOpenSuccessDialog(false);
  };

  const handleDeleteBundleItem = (cell = {}) => {
    setPageLoading(true);
    const master_product_id = cell?.row?.original?.master_product_id;
    const master_item_id = cell?.row?.original?.master_item_id;
    const parent_product_id = cell?.row?.original?.parent_product_id;
    const URL = BUNDLE.DELETE_BUNDLE_CHILD;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: master_product_id,
      master_item_id: master_item_id,
      parent_product_id: parent_product_id,
    };
    appFetch(URL, data)
      .then((json) => {
        setPageLoading(false);
        if (json.status === "success") {
          handleCloseDeleteDialog();
          handleFetchBundleData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // get sum of items in a list
  const getSum = (list = []) => {
    return list.reduce((acc, curr) => acc + curr.qty, 0);
  };
  const columnsData = [
    {
      accessorKey: "product_title",
      header: "Bundle Details",
      align: "left",
      muiTableHeadCellProps: {
        align: "left",
      },
      muiTableBodyCellProps: {
        align: "left",
      },

      Cell: ({ row, getValue }) => (
        <div
          style={{
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            paddingLeft: `${row.depth * 2}rem`,
            display: "flex",
          }}
        >
          <RenderProductDetails
            display_image={row.original.display_image}
            alt={row.original.product_title}
            title={row.original.product_title}
            href={`/app/products/${row.original.master_product_id}`}
            barcode={row.original.product_barcode}
            sku={row.original.product_sku}
            product_id={row.original.master_product_id}
            openInNewTab={true}
          />
          {/* <RenderImageWithText
            display_image={row.original.display_image}
            alt={row.original.product_title}
            title={row.original.product_title}

            // href={`/app/products/${row.original.master_product_id}`}
          />
          SKU: {row.original.product_sku}
          Barcode: {row.original.product_barcode} */}
        </div>
      ),
      // footer: (props) => props.column.id,
      // size: 400,
      maxSize: 700,
      // flex: 1,
      enableEditing: false,
      Footer: () => (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mt: 1,
          }}
        >
          Bundle Overview
        </Typography>
      ),
      muiTableFooterCellProps: {
        align: "left",
      },
    },

    {
      accessorKey: "qty",
      id: "qty",

      header: "Units",
      // footer: (props) => props.column.id,
      size: 80,
      // flex: 0.2,
      muiTableHeadCellProps: {
        align: "left",
      },
      Footer: ({ column, cell, row, table }) => (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mt: 1,
          }}
        >
          Bundle Units:
          {getSum(table.options.data || [])}
          {/* {console.log({ table }, "inside footer")} */}
        </Typography>
      ),
    },
    {
      accessorKey: "unit_cost_price",
      header: "Unit cost ",
      // footer: (props) => props.column.id,
      size: 50,
      enableEditing: false,
      Cell: ({ cell, row }) => <RenderCurrency value={cell.getValue()} />,
    },
    {
      accessorKey: "unit_retail_price",
      header: "Unit retail price",
      // footer: (props) => props.column.id,
      size: 50,
      enableEditing: false,
      Cell: ({ cell, row }) => <RenderCurrency value={cell.getValue()} />,
    },
    {
      accessorKey: "cost_price",
      header: "Bundle Cost",
      enableEditing: false,
      size: 50,
      Cell: ({ cell, row }) => <RenderCurrency value={cell.getValue()} />,

      // Cell: ({ cell, row }) => (
      // 	<span>
      // 		{/* {console.log({ cell, row })} */}
      // 		{cell.row.original.qty * cell.row.original.unit_cost_price}
      // 	</span>
      // ),
      // enableEditing: false,
      Footer: ({ column, cell, row, table }) => (
        <>
          {" "}
          <RenderCurrency
            value={bundleData.item_unit_cost_price}
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              mt: 1,
            }}
          />
        </>
      ),
    },
    {
      accessorKey: "retail_price",
      header: "Retail Price",
      enableEditing: false,
      size: 50,
      Cell: ({ cell, row }) => <RenderCurrency value={cell.getValue()} />,
      Footer: ({ column, cell, row, table }) => (
        <>
          <OutlinedInput
            size="small"
            placeholder="Enter retail price"
            sx={{
              input: {
                textAlign: "right",
              },
            }}
          />
        </>
      ),
    },
    {
      accessorKey: "available",
      header: "Available",
      enableEditing: false,
      size: 50,
      Cell: ({ cell, row }) => (
        <span>{getFormattedNumber(cell.getValue())}</span>
      ),
    },
    {
      accessorKey: "bundle_contribution",
      header: "Bundle Inventory",
      enableEditing: false,
      Cell: ({ cell }) => (
        <span>
          {getFormattedNumber(
            cell.row.original.qty > 0
              ? Math.floor(cell.row.original.available / cell.row.original.qty)
              : 0
          )}
        </span>
      ),
      size: 70,
      Footer: ({ column, cell, row, table }) => (
        <>
          {console.log({ column, cell, row, table })}
          {Array.isArray(table.options.data) &&
            table.options.data.length > 0 && (
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  mt: 1,
                }}
              >
                {" "}
                {`Bundle Inventory: ${getFormattedNumber(
                  getMinimumValueOfRow(table.options.data)
                )} `}
              </div>
            )}{" "}
          {/* {Math.floor(
						4.5,
						// column.original.available / column.original.qty,
					)} */}
        </>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      Cell: ({ cell, row }) => (
        <>
          <IconButton
            onClick={() => handleOpenDeleteDialog(cell)}
            // handleDeleteItem(cell.row.original.master_item_id)
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      enableEditing: false,
      size: 30,
    },
  ];
  useEffect(() => {
    handleFetchBundleData();
  }, []);
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
      // master_product_id: createProductData.master_product_id,
      ...bundleData,
    };
    console.log({ data });
    setPageLoading(true);
    const url = BUNDLE.UPDATE_BUNDLE;

    appFetch(url, data)
      .then((json) => {
        setPageLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Bundle saved as draft", {
            variant: "success",
          });
          router.push(`/app/products?selectedProductType=bundle`);
        }
      })
      .catch((err) => {
        setPageLoading(false);
        console.error(err);
      });
  };

  console.log({ productId });
  const BUNDLE_OR_PRODUCT = "bundle";

  return (
    <Box sx={{ pr: 3 }}>
      {pageLoading && <PageLoader />}
      <Box
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "space-between",
          alignItems: "center",
          // maxWidth: "800px",
          mb: 3,
          // width: "520px",
        }}
      >
        <SectionTitleText
          sx={{
            color: (theme) => theme.palette.text.title,
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "39px",
            // mt: 4,
          }}
        >
          Bundle Components
        </SectionTitleText>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SaveAsDraftComponent
            BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
            handleSaveAsDraftDialogOpen={() => handleSaveAsDraftDialogOpen()}
            // disableDraftButton={
            // 	productImages === "" ||
            // 	productImages.length === 0
            // 		? true
            // 		: false
            // }
            handleSaveAsDraftButtonClick={() => handleSaveAsDraftButtonClick()}
            handleSaveAsDraftDialogClose={() => handleSaveAsDraftDialogClose()}
            openSaveAsDraftDialog={openSaveAsDraftDialog}
          />

          {Array.isArray(tableData) && tableData.length > 0 && (
            <OutlinedButton
              onClick={() => handleOpenDialog()}
              sx={{
                ml: 2,
              }}
            >
              Add Components
            </OutlinedButton>
          )}
        </Box>
        {/* <TextInput /> */}
        {/* <TextField
          placeholder="Search by products"
          inputProps={{
            sx: {
              paddingTop: "10px",
              paddingBottom: "10px",
            },
          }}
        ></TextField> */}
      </Box>
      <Box>
        {/* <BundleViewCustomTable tableData={bundleData.children} /> */}
        <MRTBundleViewAddQuantityTable
          tableData={tableData}
          columnsData={columnsData}
          handleFetchBundleData={handleFetchBundleData}
          showSkeletons={pageLoading}
          renderEmptyRowsFallback={() => (
            <EmptyState
              icon={<BundleES />}
              text={`No Bundle Component Found`}
              bodyText={
                "Please add a component by clicking on the button below!"
              }
              containerStyles={{
                pb: 4,
              }}
            >
              <PrimaryButton onClick={() => handleOpenDialog()} disableRipple>
                Add Components
              </PrimaryButton>
            </EmptyState>
          )}
        />
      </Box>
      {!hideUpdateButtonRow && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: usedIn === "editBundle" ? "95%" : "82%",
            zIndex: (theme) => theme.zIndex.appBar,
            borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <NewProductOnboardingBottomNavButtons
            discardButtonTitle={`Previous Step`}
            discardButtonClick={() => router.back()}
            saveButtonClick={() => handleOpenSuccessDialog()}
            saveButtonTitle={usedIn === "editBundle" ? "Update " : "Done"}
          />
        </Box>
      )}
      {/* <Box>
				<OutlinedButton>Back</OutlinedButton>
				<PrimaryButton onClick={() => handleOpenSuccessDialog()}>
					{" "}
					Save & Continue
				</PrimaryButton>
			</Box> */}

      {/* <SuccessDialog
        open={openSuccessDialog}
        handleClose={() => handleCloseSuccessDialog()}
        handleButtonClick={() =>
          router.push(`/app/products?selectedProductType=bundle`)
        }
        secondaryButtonName={"Go to Dashboard"}
        handleSecondaryButton={() =>
          router.push(`/app/products?selectedProductType=bundle`)
        }
      /> */}
      <SuccessDialogForPO
        open={openSuccessDialog}
        title={"Bundle added Successfully"}
        message={"Your bundle has been added."}
        primaryButtonProps={{
          sx: {
            width: "220px",

            margin: "0 auto",
          },
        }}
        onCancel={() => handleGotoDashboard()}
        // onDelete={() => router.push(`/app/products?selectedProductType=bundle`)}
        onDelete={() => handleGotoDashboard()}
        primaryButtonName={"Go to Dashboard"}
      />

      {/* <BaseDialog
				open={openSuccessDialog}
				handleClose={() => handleCloseSuccessDialog()}
			>
				<Box>
					<Box>
						<SectionTitleText
							sx={{
								color: "#19235A",
								fontWeight: 700,
								fontSize: "21px",
								lineHeight: "25px",
							}}
						>
							Bundle added Successfully
						</SectionTitleText>
						<DescriptionText
							sx={{
								color: "#19235A",
								fontWeight: 400,
								fontSize: "14px",
								lineHeight: "17px",
							}}
						>
							Your bundle has been added.
						</DescriptionText>
					</Box>
				</Box>
				<Box
					sx={{
						borderTop: (theme) =>
							`1px solid ${theme.palette.grey[300]}`,
					}}
				>
					<SecondaryButton
						onClick={() => router.push(`/app/products`)}
					>
						Go To Dashboard
					</SecondaryButton>
				</Box>
			</BaseDialog> */}
      {/* <BaseDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog}>
        <Box
          sx={{
            width: "400px",
            height: "200px",
            display: "grid",
            placeItems: "center",
          }}
        >
          <SectionTitleText
            sx={{
              mt: "24px",
            }}
          >
            Do you want to remove this Item?
          </SectionTitleText>
          <Box>
            <SecondaryButton onClick={handleCloseDeleteDialog}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => handleDeleteBundleItem(selectedCell)}
              // variant="warning"
            >
              Confirm
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}

      <SuccessDialogForPO
        open={openDeleteDialog}
        icon={<AlertIconPO />}
        title="Do you want to remove this Item?"
        message="This item will be removed from the bundle"
        handleClose={handleCloseDeleteDialog}
        onCancel={() => handleCloseDeleteDialog()}
        // onDelete={() => handleDeleteBundleItem(selectedCell)}
        onDelete={() => handleDelete()}
        secondaryButtonName={"Cancel"}
        primaryButtonName={"Confirm"}
        primaryButtonProps={{
          sx: {
            flex: 1,
            ml: 2,
            backgroundColor: "#D92D20",
            "&:hover": {
              backgroundColor: "#D92D20",
            },
          },
        }}
      />

      <AddProductsToBundleDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        keyForReduxStateData={keyForReduxStateData}
        isEditPage={isEditPage}
      />
    </Box>
  );
}

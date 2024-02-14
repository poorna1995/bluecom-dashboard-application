import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PRODUCT, VENDOR } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import CircleIcon from "@mui/icons-material/Circle";
import product from "components/Common/Icons/product";
import { Grid, Stack, Typography } from "@mui/material";
// import { Box } from "@mui/system";
import AppImage from "components/Common/AppImage";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import VendorOnboardingAddProductDialog from "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingAddProductDialog";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import { format, formatDistance } from "date-fns";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import MobileViewProductsPageSection from "sections/ProductsPageSection/components/MobileViewComponents/MobileViewProductsPageSection";
import AppPageSections from "sections/AppPageSections";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import MobileViewListSkeleton from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListSkeleton";
import MobileViewList from "sections/AppPageSections/MobileViewAppPageSections/MobileViewList";
import MobileViewListPagination from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListPagination";
import MobileViewProductCard from "sections/ProductsPageSection/components/MobileViewComponents/MobileViewProductCard";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import { getDateWithTimezone } from "utils/dateUtils/getFormattedDate";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDPProductSection() {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.merchant_id;
  const [productDataWithId, setProductDataWithId] = useState([]);
  const router = useRouter();
  const vendorId = router.query.vendorId;
  const [loading, setLoading] = useState(false);
  const [enterMOQ, setEnterMOQ] = useState(false);
  const [rows, setRows] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClickEnterMOQ = () => {
    setEnterMOQ(true);
  };

  const handleFetchProductsList = () => {
    const URL = VENDOR.FETCH_PRODUCT;
    setLoading(true);
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log("json", json);
        setProductDataWithId(json.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchProductsList();
    }
  }, [vendorId]);
  console.log("**", { productDataWithId });

  function getStr1(str) {
    return str.length > 18 ? str.slice(0, 18) + "..." : str;
  }

  const formattedTableData =
    Array.isArray(productDataWithId) &&
    productDataWithId.length > 0 &&
    productDataWithId.map((product) => {
      const { updated_at } = product;
      const updatedDate = (updated_at && new Date(updated_at)) || "";
      const formattedDate = format(updatedDate, "MMM dd, yyyy") || "";
      const formattedTime = format(updatedDate, "hh:mm a") || "";
      return {
        ...product,
        updated_at: `${formattedDate}`,
      };
    });

  const columnData = [
    {
      accessorKey: "Product Title",
      header: "Product Details",
      Cell: ({ cell }) => (
        <>
          <RenderProductDetails
            openInNewTab={true}
            href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
            title={cell.row.original.product_title}
            product_id={cell.row.original.master_product_id}
            sku={cell.row.original.sku}
            // hide_display_image={true}
            barcode={cell.row.original.product_barcode}
            display_image={cell.row.original.display_image}
          />
        </>
      ),
      size: 650,
      valueGetter: ({ value }) => value,
    },
    {
      accessorKey: "listings",
      header: "Listing Channel",
      size: 70,
      // flex: 1,
      Cell: ({ cell }) => (
        <ListedChannelsNumber
          channelDetails={cell.row.original.channels || []}
        />
      ),
      headerAlign: "center",
      align: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => (
        <>
          <RenderStatusAsChip status={cell.getValue()} />
        </>
      ),
      size: 70,
      valueGetter: ({ value }) => value,
      headerAlign: "center",
      align: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      headerAlign: "center",
    },

    {
      accessorKey: "inventory",
      header: "Inventory",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {cell.row.original.qty_available}
        </Typography>
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "Variants",
      header: "# of Variants",
      size: 70,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            // backgroundColor: "#F5F5F5",
            // borderRadius: "30px",
            // padding: "5px 10px",
          }}
        >
          {cell.row.original.item_count || "-"}
        </Typography>
      ),
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "unit_retail_price",
      header: "Retail Price",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          $ {cell.row.original.unit_retail_price}
        </Typography>
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "updated_at",
      header: "Last update date",
      size: 70,
      Cell: ({ cell }) => (
        <>
          <Stack
            sx={{
              ml: "20px",
              fontWeight: "500",
            }}
            direction="column"
          >
            {/* Edited{" "} */}
            {formatDistance(getDateWithTimezone(cell.getValue()), new Date(), {
              addSuffix: true,
            }).replace("about", "")}{" "}
          </Stack>
        </>
      ),
      headerAlign: "center",
      align: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
  ];

  const handleReceivedMOQChange = (e, row, id) => {
    const { value } = e.target;
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, received_moq: value };
      }
      return row;
    });
    setRows(updatedRows);
  };
  const handleUpdateMOQ = () => {
    const URL = VENDOR.UPDATE_PRODUCT;
    const data = {
      usre_id: user.id,
      product_id: product.id,
      master_product_id: product.master_product_id,
    };
    appFetch(URL, data)
      .then((res) => {
        if (res.status) {
          setRows(res.data);
          // setProduct(res.data[0]);
          setDialogOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editReceivedMOQColumnData = {
    accessorKey: "received_moq",
    header: "Received MOQ",
    width: 150,
    // flex: 1,
    align: "center",
    headerAlign: "center",
    Cell: (cell) => (
      <RenderTextInput
        type="number"
        value={cell.row.moq || ""}
        // placeholder="Enter MOQ"
        placeholder="0"
        onChange={(e) => handleReceivedMOQChange(e, cell.row, cell.row.id)}
      />
    ),
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const columnDatawithReceivedMOQ = [...columnData, editReceivedMOQColumnData];

  const maxHeight = typeof window !== "undefined" && window.innerHeight - 365;

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
        {/* <PrimaryButton
        sx={{
          top: "0",
          marginBottom: "10px",
        }}
        onClick={() => handleClickEnterMOQ()}
      >
        Enter MOQ
      </PrimaryButton> */}

        {enterMOQ && (
          <Box
            sx={{
              display: "flex",
              position: "fixed",
              bottom: "0",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
              pt: "8px",
              pb: "8px",
            }}
          >
            <SecondaryButton
              sx={{
                mr: "16px",
                // flex: 0.1,
              }}
              onClick={() => setEnterMOQ(false)}
            >
              Discard
            </SecondaryButton>
            <PrimaryButton
              sx={
                {
                  // flex: 0.1,
                }
              }
              onClick={() => handleUpdateMOQ()}
            >
              Update
            </PrimaryButton>
          </Box>
        )}
        <Box>
          {/* {productDataWithId.length === 0 && (
      <EmptyState/>
      )}
      {loading && <PageLoader/> } */}

          {Array.isArray(productDataWithId) &&
            productDataWithId.length === 0 &&
            !loading && (
              <EmptyState
                icon={<ProductEmptyState />}
                text={"Connect Products to the Vendor"}
                bodyText={"Add Products to the Vendor by Clicking Below"}
              >
                <PrimaryButton
                  onClick={() =>
                    router.push(`/app/vendors/${vendorId}/edit-products`)
                  }
                >
                  Add products
                </PrimaryButton>
              </EmptyState>
            )}

          {loading && <PageLoader />}

          {/* {Array.isArray(productDataWithId) && productDataWithId.length > 0 && ( */}
          {formattedTableData.length > 0 && (
            <BluecomMRTBaseTable
              // sx={{ height: "370px" }}
              data={formattedTableData}
              columns={enterMOQ ? columnDatawithReceivedMOQ : columnData}
              rowIdkey="master_product_id"
              checkboxSelection={false}
              containerStyles={{ height: maxHeight }}
              // containerStyles={{ height: "350px" }}
              // rows={productDataWithId}
              // rows={rowData}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            right: "0",
            bottom: "0",
          }}
        >
          {/* <PrimaryButton onClick={() => handleDialogOpen()}>
          Update or Add products
        </PrimaryButton> */}
        </Box>
        <VendorOnboardingAddProductDialog
          open={dialogOpen}
          handleClose={() => handleDialogClose()}
          handleFetchVendorProducts={handleFetchProductsList}
        />
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
        {/* <MobileViewAppPageSection
          tableData={formattedTableData}
          totalCount={formattedTableData.length}
          loading={loading}
          basePath={`/app/vendors/${vendorId}/products?`}
        /> */}

        <Box>
          {loading ? (
            <MobileViewListSkeleton />
          ) : (
            <MobileViewList
              data={formattedTableData}
              // component={MobileViewProductCard}
            />
          )}
          {/* <MobileViewProductsList data={tableData} /> */}
        </Box>
        <Box>
          <MobileViewListPagination
            basePath={`/app/vendors/${vendorId}/products?`}
            totalRows={formattedTableData.length}
            shallUseRouter={true}
          />
        </Box>
      </Box>
    </>
  );
}

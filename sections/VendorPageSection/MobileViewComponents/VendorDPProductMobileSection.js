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
import { Grid, Typography } from "@mui/material";
// import { Box } from "@mui/system";
import AppImage from "components/Common/AppImage";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import VendorOnboardingAddProductDialog from "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingAddProductDialog";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import { format } from "date-fns";
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

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDPProductMobileSection() {
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
      field: "Product Title",
      headerName: "Product Details",
      renderCell: (params) => (
        <>
          {/* <ClickPopover
            src={params.row.display_image}
            slides={params.row.display_image}
          /> */}
          {/* <AppImage src={params.row.display_image} width="40" height="40" /> */}
          <RenderProductDetails
            openInNewTab={true}
            href={`/app/products/${params.row.master_product_id}?tab=overview`}
            title={params.row.product_title}
            product_id={params.row.master_product_id}
            sku={params.row.sku}
            // hide_display_image={true}
            barcode={params.row.product_barcode}
            display_image={params.row.display_image}
          />

          {/* <AppImage src={params.row.display_image} width="40" height="40" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& a": {
                color: "#000000",
                "&:hover": {
                  textDecoration: "underline",
                  color: "#484A9E",
                },
              },
            }}
          >
            <RenderAppLink
              href={`/app/products/${params.row.master_product_id}?tab=overview`}
              title={params.row.product_title}
              //         image={params.row.display_image}
              //         // title={params.row.product_title}
              // href={`/app/products/${params.row.master_product_id}?tab=overview`}
              // title={getStr1(params.row["Product Title"])}
            />
            <Box
              sx={{
                display: "flex",
                ml: "16px",
                mt: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#222222",
                  fontWeight: "400",
                }}
              >
                Product Id:{" "}
                <span
                  style={{
                    color: "#494949",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {params.row.master_product_id}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  ml: "16px",
                  color: "#222222",
                }}
              >
                SKU:{" "}
                <span
                  style={{
                    color: "#494949",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  
                  {getStr1(params.row.sku) || "N/A"}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  ml: "16px",
                  color: "#222222",
                  fontWeight: "400",
                }}
              >
                Barcode:{" "}
                <span
                  style={{
                    color: "#494949",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "#222222",
                  }}
                >
                  {params.row.product_barcode || "N/A"}
                </span>
              </Typography>
            </Box>
          </Box> */}
        </>
      ),
      minWidth: 650,
      flex: 1,
      // headerAlign: "center",
      valueGetter: ({ value }) => value,
      // align: "left",
      fontWeight: "600",
      fontSize: "14px",
    },

    // {
    //   field: "vendor_id",
    //   headerName: "Product Details",
    //   // width: 150,
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //         }}
    //       >
    //         <RenderAppLink
    //           href={`/app/vendors/${params.value}?tab=overview`}
    //           // title={getStr1(params.row.company_name)}
    //         />
    //         <Box
    //           sx={{
    //             display: "flex",
    //             ml: "16px",
    //             mt: "6px",
    //           }}
    //         >
    //           <Typography
    //             sx={{
    //               fontSize: "12px",
    //               color: (theme) => theme.palette.grey[600],
    //               fontWeight: "500",
    //             }}
    //           >
    //             Vendor id: {params.row.vendor_id}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     </>
    //   ),
    // },

    {
      field: "listings",
      headerName: "Listing Channel",
      width: 160,
      // flex: 1,
      align: "right",
      headerAlign: "right",
      fontWeight: "600",
      fontSize: "14px",
      color: "#000000",
      renderCell: (params) => (
        // <RenderChannelAsIcon
        //   value={params.value}
        //   channelList={params.row.channelList}
        // />

        <ChannelGroups
          // channels={params.value}
          channelDetails={params.row.channels || []}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <RenderStatusAsChip
            // fontSize={"12px"}
            // fontWeight={"500"}
            // marginTop={"0px"}
            status={params.value}
          />
          {/* {params.value === "active" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CircleIcon
                sx={{
                  mr: "3px",
                  color: "#12B76A",
                  width: "6px",
                  height: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#12B76A",
                }}
              >
                {capitalizeFirstLetter(params.value)}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircleIcon
                sx={{
                  mr: "3px",
                  color: "#F79009",
                  width: "6px",
                  height: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#F79009",
                }}
              >
                {capitalizeFirstLetter(params.value)}
              </Typography>
            </Box>
          )} */}
        </div>
      ),
      width: 120,
      // minWidth: 120,
      // flex: 1,
      align: "center",
      valueGetter: ({ value }) => value,
      headerAlign: "center",
      fontWeight: "600",
      fontSize: "14px",
    },

    {
      field: "inventory",
      headerName: "Inventory",
      width: 110,
      // flex: 1,
      align: "right",
      headerAlign: "right",
      fontWeight: "600",
      fontSize: "14px",
      color: "#000000",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#222222",
          }}
        >
          {params.row.qty_available}
        </Typography>
      ),
    },
    {
      field: "Variants",
      headerName: "# of Variants",
      width: 140,
      align: "right",
      headerAlign: "right",
      fontWeight: "600",
      fontSize: "14px",
      color: "#000000",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#222222",
            backgroundColor: "#F5F5F5",
            borderRadius: "30px",
            padding: "5px 10px",
          }}
        >
          {params.row.item_count || "-"}
        </Typography>
      ),
    },
    {
      field: "unit_retail_price",
      headerName: "Retail Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#222222",
          }}
        >
          $ {params.row.unit_retail_price}
        </Typography>
      ),
      width: 120,
      // flex: 1,
      align: "right",
      headerAlign: "right",
      fontWeight: "600",
      fontSize: "14px",
      color: "#000000",
    },
    // {
    //   field: "unit_cost_price",
    //   headerName: "Cost Price",
    //   renderCell: (params) => (
    //     <Typography
    //       sx={{
    //         fontSize: "14px",
    //         fontWeight: "600",
    //         color: "#222222",
    //       }}
    //     >
    //       $ {params.row.item_unit_cost_price}
    //     </Typography>
    //   ),
    //   width: 120,
    //   // flex: 1,
    //   align: "right",
    //   headerAlign: "right",
    //   fontWeight: "600",
    //   fontSize: "14px",
    //   color: "#000000",
    // },
    {
      field: "updated_at",
      headerName: "Last update date",
      width: 200,
      // flex: 1,
      align: "left",
      headerAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      color: "#000000",
      renderCell: (params) => (
        // <Typography
        //   sx={{
        //     fontSize: "14px",
        //     fontWeight: "600",
        //     marginLeft: "10px",
        //     color: "#222222",
        //   }}
        // >
        //   {params.row.updated_at}
        // </Typography>
        <RenderDate date={params.row.updated_at} />
      ),
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
    field: "received_moq",
    headerName: "Received MOQ",
    width: 150,
    // flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <RenderTextInput
        type="number"
        value={params.row.moq || ""}
        // placeholder="Enter MOQ"
        placeholder="0"
        onChange={(e) => handleReceivedMOQChange(e, params.row, params.row.id)}
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
            <MuiBaseDataGrid
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
        <MobileViewProductsPageSection
          tableData={formattedTableData}
          totalCount={formattedTableData.length}
          loading={loading}
          basePath={`/app/vendors/${vendorId}/products`}
        />
      </Box>
    </>
  );
}

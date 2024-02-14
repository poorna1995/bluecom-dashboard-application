import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import imageList1 from "public/assets/imageList1.png";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TextInput from "components/Common/Inputs/TextInput";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import { PURCHASE_ORDER } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import { getAddressList } from "constants/models/address";

const mapState = ({ user, purchaseOrdersData }) => ({
  currentUser: user.currentUser,
  purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
});

function POpdfPage({ handlePdfDownload }) {
  const router = useRouter();
  const pageId = router.query.pageId ?? router.query.purchaseOrderId;
  const { currentUser, purchaseOrdersData } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableItems, setTableItems] = useState([]);
  const fetchPurchaseOrderData = () => {
    setLoading(true);
    const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
    const data = {
      po_id: pageId,
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          setLoading(false);
          let result = json.result[0];
          let products =
            (Array.isArray(result.products) && result.products) ?? [];
          setData(result);

          if (products.length > 0) {
            setTableItems(products);
          }
        } else if (json.status === "failure") {
          enqueueSnackbar("Error While loading data", {
            variant: "error",
          });
        }
        console.log({ products: json });
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("Error While loading data", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (pageId) {
      fetchPurchaseOrderData();
    }
  }, [pageId]);
  console.log({ pageId });
  console.log({ data });

  const createdAtDate = data && data.created_at && new Date(data.created_at);
  const formattedCreatedAtDate =
    createdAtDate && format(createdAtDate, "MMMM dd, yyyy");

  const expectedDate = data && data.promise_date && new Date(data.promise_date);
  const formattedExpectedDate =
    expectedDate && format(expectedDate, "MMMM dd, yyyy");

  const columnData = [
    {
      field: "product",
      headerName: "Product",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {/* <AppImage
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.row.display_image || imageList1}
					/> */}
          <Typography
            sx={{
              // maxWidth:"250px",
              // marginLeft: "16px",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
              // color: (theme) => theme.palette.primary.main,
            }}
          >
            {params.row.product_title}
          </Typography>
        </Box>
      ),
      flex: 1,
    },
    {
      field: "sku",
      headerName: "SKU",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            // overflow: "hidden",
            wordBreak: "break-word",
          }}
          className="text-clamp"
        >
          {params.row.sku}
        </Typography>
      ),
    },
    {
      field: "item_unit_cost_price",
      headerName: "Unit Cost",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {" "}
          <RenderCurrency value={params.value} />
          {/* {params.value} */}
        </Typography>
      ),

      headerAlign: "center",
      align: "center",
    },
    {
      field: "qty_ordered",
      headerName: "Order Qty",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {params.value}
        </Typography>
      ),

      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_cost",
      headerName: "Total",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {/* {params.row.symbol}
          {params.value} */}
          <RenderCurrency value={params.value} />
        </Typography>
      ),

      headerAlign: "center",
      align: "center",
    },
  ];
  const listOfKeys = [
    "address_1",
    "address_2",
    "city",
    "state",
    "country",
    "zipcode",
  ];

  const billingAddress = data.warehouse && `${data.wh_name}, `;
  const address = data.warehouse && ` ${data.warehouse.address_1} ,`;
  const address2 =
    data.warehouse &&
    `  ${data.warehouse.city}, ${data.warehouse.state}, ${data.warehouse.country}, ${data.warehouse.zipcode}`;

  const warehouseAddress = (data.warehouse && data.warehouse) || {};
  const addressList = getAddressList(warehouseAddress);
  // listOfKeys
  // 	.map((item) => warehouseAddress[item])
  // 	.filter((item) => item) ?? [];

  return (
    <>
      {loading && <PageLoader />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "16px",
        }}
      >
        <SectionTitleText sx={{}}>Pdf Preview </SectionTitleText>
        <OutlinedButton onClick={handlePdfDownload}>
          Download PDF
        </OutlinedButton>
      </Box>

      <Box sx={{ p: "16px" }}>
        <Container
          maxWidth="md"
          sx={{
            border: "1px solid #E4E7EC",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <SectionTitleText
                sx={{
                  color: "#0277BD",
                  mt: "28px",
                }}
              >
                {/* {data.vendor.company_name} */}

                {data.vendor && data.vendor.company_name}
              </SectionTitleText>
              <DescriptionText
                sx={{
                  color: "#0277BD",
                  fontWeight: "700",
                  fontSize: "18px",
                  mt: "58px",
                }}
              >
                Shipping Address
              </DescriptionText>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ mt: "6px" }}>{billingAddress}</Typography>
                <Typography sx={{ mt: "6px" }}>
                  {addressList.map((item, index) => {
                    // if (!data[item]) return null;
                    return (
                      <span key={item}>
                        {item}
                        {index !== addressList.length - 1 && ","}{" "}
                      </span>
                    );
                  })}{" "}
                </Typography>
              </Box>
            </Box>
            <Box>
              <SectionTitleText
                sx={{
                  mt: "28px",
                  "& span": {
                    color: "#FFA726",
                    fontWeight: "600",
                    // fontSize: "18px",
                  },
                }}
              >
                Purchase Order <br />
                <span>{pageId}</span>
              </SectionTitleText>
              <Box sx={{ display: "flex", mt: "28px" }}>
                <Typography sx={{ fontWeight: "600" }}>Issue Date</Typography>
                <Typography
                  sx={{
                    ml: 2,
                  }}
                >
                  :{" "}
                  <RenderDate
                    date={data.created_at}
                    dateFormat={`MMM dd, yyyy`}
                  />
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mt: "6px" }}>
                <Typography sx={{ fontWeight: "600" }}>Expected By</Typography>
                <Typography>
                  :{" "}
                  <RenderDate
                    date={data.promise_date}
                    dateFormat={`MMM dd, yyyy`}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: "18px" }} />
          <Box>
            <DescriptionText
              sx={{
                color: "#0277BD",
                fontWeight: "700",
                mt: "18px",
                fontSize: "18px",
              }}
            >
              Billing Address
            </DescriptionText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ mt: "6px" }}>{billingAddress}</Typography>
              <Typography sx={{ mt: "6px" }}>
                {addressList.map((item, index) => {
                  // if (!data[item]) return null;
                  return (
                    <span key={item}>
                      {item}
                      {index !== addressList.length - 1 && ","}{" "}
                    </span>
                  );
                })}{" "}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: "24px" }}>
            <MuiBaseDataGrid
              columns={columnData}
              // rows={rowsData}
              data={tableItems}
              getRowId={(row) => row.item_id ?? row.master_item_id}
              // hideFooter={true}
              // containerStyles={{
              // 	height: "280px",
              // }}
              containerStyles={{
                height: "400px",
              }}
              checkboxSelection={false}
            />
          </Box>
          {/* <Box sx={{ mt: "24px" }}>
						<SectionTitleText>Customer Notes</SectionTitleText>
						<Typography sx={{ mt: "16px" }}>
							Lorem ipsum dolor sit amet consectetur. Amet neque
							consectetur fermentum sed est amet vitae tellus
							nibh. Turpis at penatibus a sapien vitae
							sollicitudin faucibus pharetra quis. Facilisis quam
							feugiat
						</Typography>
					</Box> */}
          {/* <Divider sx={{ mt: "24px" }} /> */}
          {/* <Box
						sx={{ ml: "65%", width: "50%", mt: "24px", mb: "24px" }}
					>
						<Box sx={{ display: "flex", mt: "30px", mb: "10px" }}>
							
							<Typography sx={{ marginRight: "45px" }}>
								SubTotal
							</Typography>
							<Typography>$ 110.00</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography sx={{ marginRight: "45px" }}>
								Total Qty
							</Typography>
							<Typography>300</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography>Tax %</Typography>
							<TextInput
								sx={{
									"& .MuiOutlinedInput-input": {
										padding: "10px 12px",
									},

									"& .MuiOutlinedInput-notchedOutline": {
										border: "1px solid #E5E5E5",
									},
								}}
								containerStyles={{
									marginTop: "0px",
									width: "100px",
									marginLeft: "70px",
								}}
							/>
						</Box>
						<Divider sx={{ marginRight: "20px" }} />
						<Box sx={{ display: "flex", mt: "30px" }}>
							<SectionTitleText
								sx={{ marginRight: "45px", mt: "-18px" }}
							>
								Total
							</SectionTitleText>
							<SectionTitleText sx={{ mt: "-18px" }}>
								$ 110.00
							</SectionTitleText>
						</Box>
					</Box> */}
        </Container>
      </Box>
    </>
  );
}

export default POpdfPage;

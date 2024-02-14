import { Box, Divider, Grid, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import React, { useState } from "react";
import POemailPage from "./POemailPage";
import POpdfPage from "./POpdfPage";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useDispatch, useSelector } from "react-redux";
import { PURCHASE_ORDER, REPORT } from "constants/API_URL";
import { format } from "date-fns";
import appFetch from "utils/appFetch";
import SuccessDialogForPO from "./components/SuccessDialogForPO";
import { useSnackbar } from "notistack";
import { updatePurchaseOrderOnboardingSteps } from "redux/onboarding/onboardingSlice";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import { getAddressList } from "constants/models/address";

const mapState = ({ purchaseOrdersData, user }) => ({
  purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
  currentUser: user.currentUser,
});
function POPreviewSection() {
  const { purchaseOrdersData, currentUser } = useSelector(mapState);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pageId = router.query.pageId ?? router.query.purchaseOrderId;
  const VENDOR_EMAIL = purchaseOrdersData?.vendor?.email;
  const MERCHANT_EMAIL = currentUser?.merchant_email;
  const tabsData = [
    {
      id: 1,
      label: "PDF",
      component: <POpdfPage />,
      route: `pdf`,
    },
    // {
    //   id: 2,
    //   label: "CSV",
    //   component: <Typography>258674967943</Typography>,
    //   route: "csv",
    // },
  ];
  const pageData = purchaseOrdersData ?? {};
  const [file, setFile] = useState(null);

  const [purchaseOrderCreatedDialogOpen, setPurchaseOrderCreatedDialogOpen] =
    useState(false);

  const handlePurchaseOrderCreatedDialogClose = () => {
    setPurchaseOrderCreatedDialogOpen(false);
  };

  const handleViewPo = () => {
    setPurchaseOrderCreatedDialogOpen(false);
    setLoading(true);

    router.push(`/app/purchase-orders/${pageId}`);
  };

  const handleCreatePO = () => {
    setLoading(true);
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_line_id: pageData.po_line_id,

      po_id: pageId,
      status: "open",
    };

    appFetch(URL, data).then((json) => {
      console.log({ json });
      if (json.status === "success") {
        // console.log("success");
        enqueueSnackbar("PO Created Successfully", {
          variant: "success",
        });

        setPurchaseOrderCreatedDialogOpen(true);

        dispatch(
          updatePurchaseOrderOnboardingSteps({
            step: "preview",
            nextStep: "",
          })
        );
        setLoading(false);
      } else {
        console.log("error");
        enqueueSnackbar("Unable to create PO. Please try again later.", {
          variant: "error",
        });
      }
    });
  };

  // /

  /**address_1
address_2
address_id
city
contact_name
 country
email
end_date
operator_id
org_id
phone
start_date
state
updated_at
user_id
wh_id
wh_name
zipcode */
  // const createdAtDate = data && data.created_at && new Date(data.created_at);
  // const formattedCreatedAtDate =
  //   createdAtDate && format(createdAtDate, "MMMM dd, yyyy");

  // const expectedDate = data && data.promise_date && new Date(data.promise_date);
  // const formattedExpectedDate =
  //   expectedDate && format(expectedDate, "MMMM dd, yyyy");

  const formattedAddress =
    pageData &&
    pageData.warehouse &&
    getAddressList(pageData.warehouse)
      .map((item) => item)
      .join(", ");

  const billingAddress =
    pageData &&
    pageData.warehouse &&
    `${pageData.wh_name}, ${formattedAddress}
    `;

  const productsData =
    Array.isArray(pageData.products) &&
    pageData.products.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });

  const productsForPDF =
    Array.isArray(productsData) &&
    productsData.map((item) => {
      return {
        product: item.product_title,
        sku: item.sku,
        "unit cost": item.item_unit_cost_price,
        "order qty": item.qty_ordered,
        "total($)": `$ ${getFormattedNumber(item.total_cost)}`,
      };
    });

  const createdAtDate = pageData.created_at && new Date(pageData.created_at);
  const formattedCreatedAtDate =
    (createdAtDate && format(createdAtDate, "MMMM dd, yyyy")) ?? "";
  const expectedDate = pageData.promise_date && new Date(pageData.promise_date);
  const formattedExpectedDate =
    (expectedDate && format(expectedDate, "MMMM dd, yyyy")) ?? "";

  console.log({ pageData });

  const [pdfFile, setPdfFile] = useState(null);
  const handleClickDownloadButton = () => {
    setLoading(true);
    const URL = REPORT.CREATE_PDF;
    const data = {
      input_types: {
        vendor_name: pageData.vendor.company_name ?? "",
        shipping_address: billingAddress,
        po_id: pageId,
        billing_address: billingAddress,
        table: [
          {
            output_list: productsForPDF,
            //  [
            // 	{
            // 		product:
            // 			"Samsung Galaxy S23 Plus 5G (Cream, 8GB, 256GB Storage, 5G, 108MP Camera, 6000mAh Battery)",
            // 		sku: "TEST_SKU",
            // 		"unit cost": "500",
            // 		"order qty": "100",
            // 		"total($)": "$55000",
            // 	},
            // 	{
            // 		product:
            // 			"Samsung Galaxy S22 Plus 5G (Cream, 8GB, 128GB Storage",
            // 		sku: "TEST_SKU",
            // 		"unit cost": "500",
            // 		"order qty": "100",
            // 		"total($)": "$55000",
            // 	},
            // ],
          },
        ],
        issue_date: formattedCreatedAtDate,
        // "01/01/2023",
        expected_date: formattedExpectedDate,
        sub_total: `${getFormattedNumber(pageData.total_amount)}`,
        tax: "0",
        total: `${getFormattedNumber(pageData.total_amount)}`,
        currency: "$",
      },
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log({ res });
        return res.blob();
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        setLoading(false);
        window.open(downloadUrl);
        setFile(downloadUrl);
        setPdfFile(blob);
        console.log({ blob });
      });
  };

  // const data = {
  //   file: "file.pdf",
  //   subject: "test subject",
  //   description: "test description",
  //   emails: ["tst4291@gmail.com"],
  // };
  const handleClickEmailSend = async (subject, description, email, file) => {
    const URL = `https://notification.bluecom.ai/api/sendEmail`;
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("emails", [email]);
    formData.append("file", file);
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    const resp = await response.json();
    console.log({ resp });
  };

  return (
    <>
      {loading && <PageLoader />}
      <Box
        sx={{
          position: "sticky",
          top: "62.5px",
          zIndex: "100",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* <SectionTitleText sx={{ mr: "16px" }}>
								{pageTitle ?? `New Purchase Order`}
							</SectionTitleText> */}
            <Typography
              sx={{
                color: (theme) => theme.palette.text.title,

                fontWeight: "700",
                fontSize: "32px",
              }}
            >
              {pageId}
            </Typography>
            {/* <Typography
              sx={{
                color: (theme) => theme.palette.black.main,
                fontWeight: 600,
              }}
            >
              Please select a store where you want to publish the Product
            </Typography> */}
          </Box>
          <Box>
            {/* <OutlinedButton onClick={() => handleClickDownloadButton()}>
              Download Pdf
            </OutlinedButton> */}
            <PrimaryButton
              sx={{
                ml: "16px",
              }}
              onClick={() => handleCreatePO()}
            >
              Create PO
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: "8px" }} />

      <Grid container spacing={2} marginTop="2px">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRight: "1px solid #E5E5E5",
          }}
        >
          <Box>
            <POemailPage handleEmailButtonClick={handleClickEmailSend} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {/* <BasicTabs
              data={tabsData}
              // basepath="/onboarding/purchase-orders/1678906601514?step=preview&id=1"
            /> */}
            <POpdfPage handlePdfDownload={handleClickDownloadButton} />
          </Box>
        </Grid>
      </Grid>

      <SuccessDialogForPO
        title="Your PO is Successfully Created"
        message="View more details on the active page"
        open={purchaseOrderCreatedDialogOpen}
        onCancel={handlePurchaseOrderCreatedDialogClose}
        // onDelete={() => router.push(`/app/purchase-orders/${pageId}?tab=all`)}
        onDelete={() => handleViewPo()}
        primaryButtonName="View PO"
        primaryButtonProps={{
          sx: {
            ml: "16px",
            flex: 2,
          },
        }}
        secondaryButtonName="Cancel"
      />
    </>
  );
}

export default POPreviewSection;

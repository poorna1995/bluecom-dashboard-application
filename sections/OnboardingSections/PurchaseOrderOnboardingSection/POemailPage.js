/* eslint-disable react/jsx-key */
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PDFicon from "components/Common/Icons/PDFicon";
import DownloadIcon from "components/Common/Icons/POicons/DownloadIcon";
import CreatableMultiSelect from "components/Common/Inputs/SelectInput/CreatableMultiSelect";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { REPORT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

const minWidth = "calc(100% - 840px)";

const mapState = ({ purchaseOrdersData, user }) => ({
  purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
  currentUser: user.currentUser,
});
function POemailPage({ handleEmailButtonClick }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { purchaseOrdersData, currentUser } = useSelector(mapState);
  const pageData = purchaseOrdersData || {};
  const pageId = router.query.pageId ?? router.query.purchaseOrderId;
  const VENDOR_EMAIL = purchaseOrdersData?.vendor?.email;
  const MERCHANT_EMAIL = currentUser?.merchant_email;

  const noteDate =
    pageData && pageData.created_at && new Date(pageData.created_at);
  const formattedNoteDate =
    (noteDate && format(noteDate, "MMMM dd, yyyy")) ?? "";

  const noteForEmail = `Dear ${
    pageData.vendor?.company_name
  },\n\nThe purchase order (${
    pageData.po_id
  }) is attached with this email.\n\nAn overview of the purchase order is available below:

Purchase Order # : ${
    pageData.po_id
  }\nOrder Date  : ${formattedNoteDate}\nAmount        : $ ${getFormattedNumber(
    pageData.total_amount
  )}\n\nPlease go through it and confirm the order. We look forward to working with you again\n\nThank you`;

  const [cc, setCC] = React.useState("");
  const [subject, setSubject] = React.useState("Purchase Order");
  const [notes, setNotes] = React.useState(noteForEmail);
  const { enqueueSnackbar } = useSnackbar();
  const [sendTo, setSendTo] = React.useState([
    {
      label: VENDOR_EMAIL,
      value: VENDOR_EMAIL,
    },
  ]);

  // useEffect(() => {
  // 	setSendTo({
  // 		label: VENDOR_EMAIL,
  // 		value: VENDOR_EMAIL,
  // 	});
  // }, [VENDOR_EMAIL]);
  const billingAddress =
    pageData &&
    pageData.warehouse &&
    `${pageData.wh_name}, ${pageData.warehouse.address_1}, ${pageData.warehouse.address_2}, ${pageData.warehouse.city}, ${pageData.warehouse.state}, ${pageData.warehouse.country}, ${pageData.warehouse.zipcode}`;

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
        "total($)": `$ ${item.total_cost}`,
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
    // setLoading(true);
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
          },
        ],
        issue_date: formattedCreatedAtDate,
        // "01/01/2023",
        expected_date: formattedExpectedDate,
        sub_total: productsData.total_amount,
        tax: "0",
        total: productsData.total_amount,
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
        // setPdfFile(res.url);
        return res.blob();
      })
      .then((blob) => {
        if (blob) {
          // const downloadUrl = window.URL.createObjectURL(blob);

          const file = new File([blob], `${pageId}.pdf`, {
            type: "application/pdf",
          });
          handleClickEmailSend(subject, notes, sendTo[0].value, file);

          // setPdfFile(file);
        }
        // const downloadUrl = window.URL.createObjectURL(blob);
        // // setPdfFile(blob);
        // // setLoading(false);
        // window.open(downloadUrl);
        // // setFile(downloadUrl);

        console.log({ blob });
      });
  };
  console.log({ pdfFile });

  // useEffect(() => {
  // 	if (pageId && pageData) {
  // 		handleClickDownloadButton();
  // 	}
  // }, [pageId, pageData]);

  const pdfFormail = pdfFile;
  console.log(pdfFormail);
  const handleClick = () => {
    handleClickDownloadButton();
  };
  const handleClickEmailSend = async (subject, description, email, file) => {
    setLoading(true);
    const URL = `https://notification.bluecom.ai/api/sendEmail`;
    const formData = new FormData();

    const newEmails = [email];
    console.log({ newEmails });
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("emails", JSON.stringify(newEmails));
    // newEmails.forEach((item) => formData.append("emails[]", item))

    formData.append("file", file);

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    const resp = await response.json();
    if (resp.status === "success") {
      setLoading(false);
      enqueueSnackbar(resp.message, { variant: "success" });
    }
    console.log({ resp });
  };

  // const selection = [
  // 	{
  // 		title: "From",
  // 		email: MERCHANT_EMAIL,
  // 	},

  // 	{
  // 		title: "Send to",
  // 		email: VENDOR_EMAIL,
  // 	},
  // 	{
  // 		title: "CC",
  // 	},
  // ];
  return (
    <>
      {loading && <PageLoader />}
      <Container maxWidth="md">
        <Box sx={{}}>
          <SectionTitleText>Send the PO as an Email</SectionTitleText>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "18px",
              position: "fixed",
              backgroundColor: "white",
              zIndex: "100",
              top: "64.5px",
              width: minWidth,
              borderBottom: "1px solid #F2F4F7",
            }}
          >
            <SectionTitleText>Email to ASD Clothing</SectionTitleText>
            <PrimaryButton
              onClick={() => router.push("/app/purchase-orders?tab=all")}
            >
              Save and Send
            </PrimaryButton>
          </Box> */}
          {/* <Divider sx={{ mt: "6px" }} /> */}
        </Box>
        {/* <Box sx={{}}>
					{selection.map((select) => (
						<CreatableMultiSelect
							styles={{
								control: (style) => ({
									...style,
									// borderRadius: "10px",
									paddingTop: "5px",
									paddingBottom: "5px",
								}),

								multiValueRemove: (styles) => ({
									...styles,
									":hover": {
										backgroundColor: "#F2F4F7",
										// color: "white",
									},
								}),

								multiValue: (styles) => ({
									...styles,
									backgroundColor: "#F2F4F7",
									color: "black",
									borderRadius: "10px",
								}),
							}}
							title={select.title}
							value={{
								label: select.email,
								value: select.email,
							}}
						/>
					))}
				</Box> */}
        {/* 

			 */}
        <CreatableMultiSelect
          styles={{
            control: (style) => ({
              ...style,
              // borderRadius: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
              // border: "1px solid #F2F4F7",
            }),

            multiValueRemove: (styles) => ({
              ...styles,
              ":hover": {
                backgroundColor: "#F2F4F7",
                // color: "white",
              },
            }),

            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "#F2F4F7",
              color: "black",
              borderRadius: "10px",
            }),
          }}
          title="Recipient"
          value={sendTo}
          onChange={(e) => setSendTo(e)}
        />

        {/* <CreatableMultiSelect
					styles={{
						control: (style) => ({
							...style,
							// borderRadius: "10px",
							paddingTop: "5px",
							paddingBottom: "5px",
						}),

						multiValueRemove: (styles) => ({
							...styles,
							":hover": {
								backgroundColor: "#F2F4F7",
								// color: "white",
							},
						}),

						multiValue: (styles) => ({
							...styles,
							backgroundColor: "#F2F4F7",
							color: "black",
							borderRadius: "10px",
						}),
					}}
					title="CC"
					value={cc}
					onChange={(e) => setCC(e)}
				/> */}
        <TextInput
          containerStyles={{
            minWidth: "100%",
          }}
          value={subject}
          title="Subject"
          onChange={(e) => setSubject(e.target.value)}
        />

        <Grid
          container
          spacing={2}
          marginTop="4px"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              Attachment:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox defaultChecked />
              <PDFicon />
              <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                {pageId}.pdf
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <TextField
          sx={{
            minWidth: "100%",
          }}
          // containerStyles={{
          //   width: "100%",
          // }}
          placeholder="Type your message here..."
          multiline
          minRows={8}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* <Box
					sx={{
						mt: "8px",
						backgroundColor: "#EFF8FF",
						borderRadius: "10px",
						py: "8px",
						px: "16px",
					}}
				>
					<Grid
						container
						sx={{ display: "flex", alignItems: "center" }}
					>
						<Grid item xs={7}>
							<Typography sx={{ fontWeight: "600" }}>
								Attached Files
							</Typography>
						</Grid>
						<Grid
							item
							sx={{ display: "flex", alignItems: "center" }}
							xs={3}
						>
							<IconButton>
								<PDFicon />
							</IconButton>
							<Typography sx={{ fontWeight: "600" }}>
								PO-00002.pdf
							</Typography>
						</Grid>
						<Grid
							item
							sx={{ display: "flex", alignItems: "center" }}
							xs={2}
						>
							<Typography
								sx={{
									fontSize: "16px",
									color: (theme) =>
										theme.palette.primary.main,
									mr: "30px",
								}}
							>
								View
							</Typography>
							<IconButton>
								<DownloadIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Box> */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            sx={{
              flex: 0.3,
            }}
            onClick={handleClick}
            disabled={
              sendTo.length === 0 || subject.length === 0 || notes.length === 0
            }
          >
            Send Email
          </PrimaryButton>
        </Box>
      </Container>
    </>
  );
}

export default POemailPage;

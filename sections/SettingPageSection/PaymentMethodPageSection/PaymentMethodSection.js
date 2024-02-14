import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import VisaIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/VisaIcon";
import StatusAsChipPayment from "components/Common/Chip/StatusAsChipPayment";
import IosSwitch from "components/Common/Switches/IosSwitch";
import OptionsIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/OptionsIcon";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import AddIcon from "components/Common/Icons/add";
import AddPurpleIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/AddPurpleIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GoBack from "../PlanAndBillDetailsPageSection/components/GoBack";
import PaymentMethodCard from "./PaymentMethodCard";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { PAYMENTS } from "constants/API_URL";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import { useRouter } from "next/router";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function PaymentMethodSection() {
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const {
    data: customerData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () =>
      appFetch(PAYMENTS.FETCH_CUSTOMER, {
        user_id: currentUser.merchant_id,
      }).then((json) => json),
  });
  // console.log({ data });
  const paymentMethods = customerData?.customer.payment_methods;

  const defaultPaymentMethod =
    customerData?.customer?.default_payment_method || undefined;

  const filterPaymentMethods =
    Array.isArray(paymentMethods) &&
    paymentMethods.filter((method) => method.id !== defaultPaymentMethod.id);

  const cards =
    Array.isArray(filterPaymentMethods) &&
    filterPaymentMethods.length > 0 &&
    filterPaymentMethods.map((card, index) => (
      <PaymentMethodCard key={index} card={card} refetch={refetch} />
    ));

  if (defaultPaymentMethod === undefined && !isLoading) {
    return (
      <Box>
        {/* page title and back button */}
        <Box
          sx={{
            display: "flex",
            pb: "16px",
            alignItems: "center",
            gap: "1rem",
            ml: "126px",
          }}
        >
          <GoBack />

          <SectionTitleText
            sx={{
              fontSize: "21px",
              fontWeight: "700",
              color: "#484A9E",
            }}
          >
            Plan & Billing Details
          </SectionTitleText>
        </Box>
        <Divider sx={{ mb: "20px" }} />
        <Box sx={{ px: "300px" }}>
          {isLoading && <PageSpinner />}

          {!isLoading && defaultPaymentMethod !== undefined && (
            <PaymentMethodCard card={defaultPaymentMethod} status="default" />
          )}
          {!isLoading && <>{cards}</>}

          <OutlinedButton
            sx={{ display: "flex", gap: "1rem" }}
            onClick={() =>
              router.push("/settings/payment-method/add-new-method")
            }
          >
            <AddPurpleIcon />
            Add New Payment Method
          </OutlinedButton>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      {/* page title and back button */}
      <Box
        sx={{
          display: "flex",
          pb: "16px",
          alignItems: "center",
          gap: "1rem",
          ml: "126px",
        }}
      >
        <GoBack />

        <SectionTitleText
          sx={{
            fontSize: "21px",
            fontWeight: "700",
            color: "#484A9E",
          }}
        >
          Payment Methods
        </SectionTitleText>
      </Box>
      <Divider sx={{ mb: "20px" }} />
      <Box sx={{ px: "300px" }}>
        {isLoading && <PageSpinner />}

        {!isLoading && <>{cards}</>}

        <OutlinedButton
          sx={{ display: "flex", gap: "1rem" }}
          onClick={() => router.push("/settings/payment-method/add-new-method")}
        >
          <AddPurpleIcon />
          Add New Payment Method
        </OutlinedButton>
      </Box>
    </Box>
  );
}

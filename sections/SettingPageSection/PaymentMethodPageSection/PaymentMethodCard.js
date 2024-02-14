import { Box, Typography } from "@mui/material";
import StatusAsChipPayment from "components/Common/Chip/StatusAsChipPayment";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import OptionsIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/OptionsIcon";
import VisaIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/VisaIcon";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import IconMenu from "components/Common/Menus/IconMenu";
import IosSwitch from "components/Common/Switches/IosSwitch";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PAYMENTS } from "constants/API_URL";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function PaymentMethodCard({
  card = {
    card: {},
  },
  status,
  refetch,
}) {
  const { currentUser } = useSelector(mapState);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardNumber = `**** ${card.card?.last4}`;

  const expiresOn = `${card.card?.exp_month}/${card.card?.exp_year}`;

  const handleSetDefaultMethod = (paymentMethodId) => {
    // e.preventDefault();
    // setChecked(e.checked);
    const URL = PAYMENTS.SET_DEFAULT_PAYMENT_METHOD;
    const data = {
      // user_id: currentUser.merchant_id,
      customer_id: currentUser.stripe_customer_id,
      payment_method_id: paymentMethodId,
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          enqueueSnackbar(json.message, { variant: "success" });
          refetch();
          // setChecked(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeletePaymentMethod = (paymentMethodId) => {
    // e.preventDefault();
    const URL = PAYMENTS.DELETE_PAYMENT_METHOD;
    const data = {
      customer_id: currentUser.stripe_customer_id,
      payment_method_id: paymentMethodId,
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Payment Method Deleted Successfully", {
            variant: "success",
          });
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {loading && <PageLoader />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "20px",
          p: "24px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          {card.card?.brand === "visa" && <VisaIcon />}
          <Box>
            <SectionTitleText
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#484A9E",
              }}
            >
              {cardNumber}
            </SectionTitleText>
            <SectionTitleText
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#484A9E",
              }}
            >
              {expiresOn}
            </SectionTitleText>
          </Box>
          {status === "default" && <StatusAsChipPayment status={card.label} />}{" "}
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 0.3,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* {status !== "default" && (
					<Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
						<IosSwitch
							checked={checked}
							onChange={(e) => handleSetDefaultMethod(e, card.id)}
						/>
						<Typography>Set as Primary</Typography>
					</Box>
				)}{" "} */}
          {status !== "default" && (
            <IconMenu
              buttonIcon={<MoreVertIcon />}
              options={[
                {
                  label: "Set as Default",
                  // icon: <EditIcon />,
                  onClick: () => handleSetDefaultMethod(card.id),
                },
                {
                  label: "Delete",
                  icon: <DeleteIcon />,

                  onClick: () => handleDeletePaymentMethod(card.id),
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

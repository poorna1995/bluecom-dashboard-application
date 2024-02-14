import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Box, Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import appFetch from "/utils/appFetch";
import { PAYMENTS } from "constants/API_URL";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function CheckoutForm({ price_id }) {
  const { currentUser } = useSelector(mapState);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const [baseURL, setBaseURL] = useState("");
  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // handleError(submitError);
      setMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Create the Subscription
    const res = await appFetch(PAYMENTS.CREATE_SUBSCRIPTION, {
      customer_id: currentUser.stripe_customer_id,
      price_id: price_id,
    });

    const clientSecret = await res.subscription.latest_invoice.payment_intent
      .client_secret;
    // const { clientSecret } = await res;

    // Confirm the Subscription using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${baseURL}/settings/plan-and-billing-details`,
        // http://localhost:3000/settings/plan-and-billing-details/Basic?plan_name=Basic&isSuccessPopupOpen=true
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      // handleError(error);
      setMessage(error.message);
      setLoading(false);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  if (!stripe || !elements) return <PageSpinner />;
  return (
    <>
      {isLoading && <PageLoader />}
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement
        options={{
          defaultValues: {
            email: email,
          },
        }}
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
        {/* <AddressElement
				id="address-element-billing"
				options={{
					mode: "billing",
					defaultValues: {
						name: "Jane Doe",
						address: {
							line1: "354 Oyster Point Blvd",
							line2: "",
							city: "South San Francisco",
							state: "CA",
							postal_code: "94080",
							country: "US",
						},
					},
					// allowedCountries: ["US"],
					blockPoBox: true,
					fields: {
						phone: "always",
					},
					validation: {
						phone: {
							required: "never",
						},
					},
				}}
			/> */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            disabled={isLoading || !stripe || !elements}
            id="submit"
            type="submit"
            sx={{
              mt: 3,
              width: "200px",
            }}
          >
            <span id="button-text">
              {isLoading ? (
                <CircularProgress />
              ) : (
                // <div className="spinner" id="spinner"></div>
                "Pay now"
              )}
            </span>
          </PrimaryButton>
        </Box>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}

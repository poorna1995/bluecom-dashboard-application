import { Box, Container } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { PAYMENTS } from "constants/API_URL";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function SetupForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useSelector(mapState);

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [baseURL, setBaseURL] = useState("");
  React.useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);
  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

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
      handleError(submitError);
      setLoading(false);
      return;
    }

    // Create the SetupIntent and obtain clientSecret
    const res = await appFetch(PAYMENTS.CREATE_INTENT, {
      customer_id: currentUser.stripe_customer_id,
    });

    const { client_secret: clientSecret } = await res;

    // Confirm the SetupIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${baseURL}/settings/payment-method`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the setup. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
      setLoading(false);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Container maxWidth="sm">
      {loading && <PageLoader />}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            sx={{
              mt: 2,
              width: "200px",
            }}
            type="submit"
            disabled={!stripe || loading}
          >
            Submit
          </PrimaryButton>
        </Box>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </Container>
  );
}

import { Container } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import SetupForm from "components/StripeComponents/SetupForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function AddNewPaymentMethodPage() {
  const options = {
    mode: "setup",
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <DrawerLayout>
      <Container sx={{ mt: 10, mb: 4 }} maxWidth="sm">
        <SectionTitleText>Add a new Payment Method</SectionTitleText>
      </Container>
      <Elements stripe={stripePromise} options={options}>
        <SetupForm />
      </Elements>
    </DrawerLayout>
  );
}

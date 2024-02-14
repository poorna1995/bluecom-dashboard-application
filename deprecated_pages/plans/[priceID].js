import { useRouter } from "next/router";
import React from "react";
import DrawerLayout from "/layouts/DrawerLayout";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/StripeComponents/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import SectionTitleText from "/components/Common/Typography/HeadingText/SectionTitleText";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PaymenCheckoutPage() {
  const router = useRouter();
  const { priceID, plan_name } = router.query;

  const FETCH_STRIPE_PRODUCTS_URL = `https://api.bluecom.ai/api/payment/fetchStripeProducts`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stripeProducts"],
    queryFn: () => fetch(FETCH_STRIPE_PRODUCTS_URL).then((res) => res.json()),
  });

  const appearance = {
    theme: "flat",
  };
  const options = {
    // clientSecret,
    appearance,
    mode: "subscription",
    amount: 2000,
    currency: "inr",
  };

  return (
    <DrawerLayout>
      <Container
        sx={{
          mt: 8,
        }}
      >
        <SectionTitleText>{plan_name}</SectionTitleText>
        {priceID && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm price_id={priceID} />
          </Elements>
        )}
      </Container>
    </DrawerLayout>
  );
}

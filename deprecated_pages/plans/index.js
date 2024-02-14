import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "components/StripeComponents/CheckoutForm";
import { Button, Container, Typography } from "@mui/material";
import DrawerLayout from "layouts/DrawerLayout";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderCurrency from "/components/Common/Tables/RenderComponents/RenderCurrency";
import PrimaryButton from "/components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API yarnkey.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function PaymentsPage() {
  const { currentUser } = useSelector(mapState);
  const [clientSecret, setClientSecret] = React.useState("");

  const router = useRouter();
  const [priceID, setPriceID] = React.useState("");
  const FETCH_STRIPE_PRODUCTS_URL = `https://api.bluecom.ai/api/payment/fetchStripeProducts`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stripeProducts"],
    queryFn: () => fetch(FETCH_STRIPE_PRODUCTS_URL).then((res) => res.json()),
  });
  const products = data?.products;

  const handleFetchClientSecret = (product_id, amount, price_id, name) => {
    const url = `/api/create-subscription`;
    // `/api/create-payment-intent`;
    // `https://api.bluecom.ai/api/payment/createPaymentIntent`;

    setPriceID(price_id);
    router.push(`/plans/${price_id}?plan_name=${name}`);
    const data = {
      amount: amount,
      currency: "",
      customer: currentUser.stripe_customer_id,
      item: { product_id, price_id },
    };
    // appFetch(url, data)
    // 	.then((json) => {
    // 		console.log({ Subscription_OBJ: json });
    // 		// setClientSecret(json.clientSecret);
    // 	})
    // 	.catch((err) => console.log(err));
  };

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
  if (isLoading)
    return (
      <div>
        <PageLoader />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;

  return (
    <DrawerLayout>
      <Container>
        <Typography
          sx={{
            mt: 8,
            mb: 2,
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Stripe Payment Test
        </Typography>
        {/* <Button onClick={() => handleFetchClientSecret()}>
					Buy Now
				</Button> */}
        {Array.isArray(products) &&
          products.map((product) => {
            return (
              <div key={product?.id}>
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <p>
                  <RenderCurrency
                    value={product?.prices?.unit_amount / 100}
                    currency={product?.prices?.currency}
                    locale={"en-US"}
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  />
                </p>
                {/* {product?.prices?.unit_amount}</p> */}
                <PrimaryButton
                  onClick={() =>
                    handleFetchClientSecret(
                      product.id,
                      product.prices.unit_amount,
                      product.prices.id,
                      product.name
                    )
                  }
                >
                  Buy Now
                </PrimaryButton>
              </div>
            );
          })}
        {/* {clientSecret && ( */}
        {/* {priceID && (
				)}{" "} */}
        {/* )} */}
      </Container>
    </DrawerLayout>
  );
}

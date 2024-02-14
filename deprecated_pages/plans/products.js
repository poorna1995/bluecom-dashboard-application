import React from "react";
import DrawerLayout from "layouts/DrawerLayout";
import { useQuery } from "@tanstack/react-query";
export default function PaymentProductsPage() {
  const URL = `https://api.bluecom.ai/api/payment/fetchStripeProducts`;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stripeProducts"],
    queryFn: () => fetch(URL).then((res) => res.json()),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <DrawerLayout>
      {Array.isArray(products) &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p>{product.unitamount}</p>
            </div>
          );
        })}
    </DrawerLayout>
  );
}

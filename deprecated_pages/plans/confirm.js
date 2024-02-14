import React from "react";
import DrawerLayout from "/layouts/DrawerLayout";
import { Container, Typography } from "@mui/material";
import PrimaryButton from "/components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
export default function PaymentConfirmation() {
  const router = useRouter();
  return (
    <DrawerLayout>
      <Container
        sx={{
          mt: 10,
        }}
      >
        <Typography>
          Your Payment is confirmed. Thank you for your payment. You will
          receive the invoice shortly.
        </Typography>
        <PrimaryButton onClick={() => router.push("/home")}>
          Go to Dashboard
        </PrimaryButton>
      </Container>
    </DrawerLayout>
  );
}

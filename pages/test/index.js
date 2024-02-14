import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const MyComponent = () => {
  return <div>PageComponent</div>;
};

import dynamic from "next/dynamic";

const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"), {
  ssr: false,
});

export default function TestPage() {
  const router = useRouter();
  const step = router.query.step && router.query.step;
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("You're report is ready", {
      variant: "publishProduct",
    });
  };

  return (
    <DrawerLayout>
      {/* <StepperComponent steps={steps} /> */}
      {/* <NewProductOnboardingSections /> */}
      {/* <Button onClick={() => handleClick()}>Show Snackbar</Button> */}
    </DrawerLayout>
  );
}

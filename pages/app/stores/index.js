import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StoresPageSections from "sections/StoresPageSections";

export default function StoresPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <DrawerLayout>
      <StoresPageSections />
    </DrawerLayout>
  );
}

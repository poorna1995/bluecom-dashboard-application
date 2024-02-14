import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const EditInventoryPageSection = dynamic(
  () => import("sections/InventoryPageSection/EditInventoryPageSection"),
  { ssr: false }
);
const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"));
export default function EditInventoryPage() {
  const router = useRouter();

  return (
    <DrawerLayout>
      <EditInventoryPageSection
      //    id={router.query.id}
      />
    </DrawerLayout>
  );
}

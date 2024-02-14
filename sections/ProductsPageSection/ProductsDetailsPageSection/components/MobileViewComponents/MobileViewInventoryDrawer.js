import INVENTORY_DRAWER_STATUS from "constants/status/inventoryDrawerStatus";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryMobileViewDrawerStatus } from "redux/views/viewsSlice";
import MobileViewBottomDrawer from "sections/AppPageSections/MobileViewAppPageSections/MobileViewBottomDrawer";
import WarehouseTable from "sections/InventoryPageSection/WarehouseTable";
import MobileViewInventoryVariantsCard from "sections/InventoryPageSection/components/MobileViewComponents/MobileViewInventoryVariantsComponents/MobileViewInventoryVariantsCard";
import MobileViewInventoryLocationCard from "./MobileViewInventoryLocationCard";
import InventoryTableForMobile from "./InventoryTableForMobile";

const mapState = ({ views }) => ({
  inventoryMobileViewDrawerStatus: views.inventoryMobileViewDrawerStatus,
});
export default function MobileViewInventoryDrawer({ isLoading }) {
  const { inventoryMobileViewDrawerStatus } = useSelector(mapState);
  const dispatch = useDispatch();
  const { type, status, product_id, data } =
    (inventoryMobileViewDrawerStatus && inventoryMobileViewDrawerStatus) || {};

  const openDrawer = status === INVENTORY_DRAWER_STATUS.OPEN;
  const handleClose = () => {
    dispatch(
      setInventoryMobileViewDrawerStatus({
        status: INVENTORY_DRAWER_STATUS.CLOSED,
        type: type,
        product_id: "",
        data: [],
      })
    );
  };

  console.log({ data });

  return (
    <MobileViewBottomDrawer
      openDrawer={openDrawer}
      handleClose={handleClose}
      title="Locations"
    >
      <InventoryTableForMobile data={data} isLoading={isLoading} />
      {/* <MobileViewInventoryLocationCard data={data} /> */}
    </MobileViewBottomDrawer>
  );
}

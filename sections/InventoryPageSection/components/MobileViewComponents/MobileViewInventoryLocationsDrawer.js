import INVENTORY_DRAWER_STATUS from "constants/status/inventoryDrawerStatus";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryMobileViewDrawerStatus } from "redux/views/viewsSlice";
import MobileViewBottomDrawer from "sections/AppPageSections/MobileViewAppPageSections/MobileViewBottomDrawer";
import WarehouseTable from "sections/InventoryPageSection/WarehouseTable";

const mapState = ({ views }) => ({
  inventoryMobileViewDrawerStatus: views.inventoryMobileViewDrawerStatus,
});
export default function MobileViewInventoryLocationsDrawer() {
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

  return (
    <MobileViewBottomDrawer
      openDrawer={openDrawer}
      handleClose={handleClose}
      title="Locations"
    >
      <WarehouseTable masterProductId={product_id} warehouseData={data} />
    </MobileViewBottomDrawer>
  );
}
